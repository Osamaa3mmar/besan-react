import React, { useState } from 'react';
import StartQuiz from './StartQuiz'; 
import Leaderboard from './Leaderboard'; 
import AdminPage from './AdminPage.js';
import './App.css'; 

function App() {
  const [view, setView] = useState('home'); 

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>

      
      <nav className="navbar">
        <button onClick={() => setView('home')}>Home</button>
        <button onClick={() => setView('admin')}>Admin</button>
        <button onClick={() => setView('takeQuiz')}>Take Quiz</button>
        <button onClick={() => setView('leaderboard')}>Leaderboard</button>
      </nav>

      {view === 'home' && <h2>Welcome to the Quiz App</h2>}

      {view === 'admin' && (
        <div>
         
        <AdminPage/>
        </div>
      )}

      {view === 'takeQuiz' && <StartQuiz />}

      {view === 'leaderboard' && <Leaderboard />} 
    </div>
  );
}

export default App;
