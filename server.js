const express = require('express');
const fs = require('fs');
const cors = require('cors'); 
const app = express();
const PORT = 5000;


app.use(cors()); 
app.use(express.json());


const loadQuestions = () => {
    const data = fs.readFileSync('questions.json', 'utf-8');
    return JSON.parse(data);
};

const saveQuestions = (questions) => {
    fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2));
};


const loadLeaderboard = () => {
    const data = fs.readFileSync('leaderboard.json', 'utf-8');
    return JSON.parse(data);
};

const saveLeaderboard = (leaderboard) => {
    fs.writeFileSync('leaderboard.json', JSON.stringify(leaderboard, null, 2));
};


app.get('/questions', (req, res) => {
    const { difficulty, category } = req.query;
    let questions = loadQuestions();

    
    if (!questions || questions.length === 0) {
        return res.status(200).json([]); 
    }

    
    if (difficulty) {
        questions = questions.filter(q => q.difficulty === difficulty);
    }

    if (category) {
        questions = questions.filter(q => q.category === category);
    }

    res.json(questions);
});

app.post('/questions', (req, res) => {
    const questions = loadQuestions();
    const newQuestion = { id: Date.now(), ...req.body };
    questions.push(newQuestion);
    saveQuestions(questions);
    res.status(201).json(newQuestion);
});

app.put('/questions/:id', (req, res) => {
    const questions = loadQuestions();
    const index = questions.findIndex(q => q.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Question not found' });

    questions[index] = { ...questions[index], ...req.body };
    saveQuestions(questions);
    res.json(questions[index]);
});

app.delete('/questions/:id', (req, res) => {
    const questions = loadQuestions();
    const filteredQuestions = questions.filter(q => q.id !== parseInt(req.params.id));
    saveQuestions(filteredQuestions);
    res.status(204).send();
});


app.get('/leaderboard', (req, res) => {
    let leaderboard = loadLeaderboard();

   
    if (!leaderboard || leaderboard.length === 0) {
        return res.status(200).json([]); 
    }

    leaderboard = leaderboard.sort((a, b) => b.score - a.score);

    res.json(leaderboard.slice(0, 10));
});

app.post('/leaderboard', (req, res) => {
    const leaderboard = loadLeaderboard();
    const newScore = { id: Date.now(), ...req.body };
    leaderboard.push(newScore);
    saveLeaderboard(leaderboard);
    res.status(201).json(newScore);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
