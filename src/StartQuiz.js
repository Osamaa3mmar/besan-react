import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StartQuiz() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState(''); 
  const [category, setCategory] = useState(''); 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/questions');
        setQuestions(response.data); 
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    let filtered = questions;

    if (difficulty) {
      filtered = filtered.filter(q => q.difficulty === difficulty);
    }

    if (category) {
      filtered = filtered.filter(q => q.category === category);
    }

    setFilteredQuestions(filtered);
  }, [difficulty, category, questions]);

  const handleAnswer = (answer) => {
    if (answer === filteredQuestions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const submitScore = async () => {
    try {
      await axios.post('http://localhost:5000/leaderboard', {
        name: name, 
        score: score
      });
      setQuizFinished(false);
      setName('');
      setScore(0);
      setCurrentQuestionIndex(0);
    } catch (err) {
      console.error('Error submitting score:', err);
    }
  };

 
  if (!filteredQuestions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    
      <div>
        <label>Select Difficulty:</label>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

     
      <div>
        <label>Select Category:</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
       
        </select>
      </div>

      {!quizFinished ? (
        <div>
          <h3>{filteredQuestions[currentQuestionIndex].question}</h3>
          {filteredQuestions[currentQuestionIndex].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {filteredQuestions.length}</p>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
          <button onClick={submitScore}>Submit Score</button>
        </div>
      )}
    </div>
  );
}

export default StartQuiz;
