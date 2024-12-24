import React, { useEffect, useState } from 'react';

function QuestionCard({ question, options, correct, dispatch, totalQuestions }) {
  const [time, setTime] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          
          dispatch({type:'TIME_UP', payload:{ totalQuestions }});
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, totalQuestions]);

  const handleAnswer = (option) => {
    const isCorrect = (option === correct);
    dispatch({ type:'ANSWER_QUESTION', payload:{ isCorrect } });
    dispatch({ type:'NEXT_QUESTION', payload:{ totalQuestions } });
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <h3>{question}</h3>
        <p>Time Left: {time}s</p>
      </div>
      {options.map((opt, index) => (
        <button key={index} onClick={() => handleAnswer(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export default QuestionCard;
