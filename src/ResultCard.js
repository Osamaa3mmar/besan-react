import React from 'react';

function ResultCard({ score, totalQuestions, previousScore, dispatch }) {
  return (
    <div className="result-card">
      <h2>Quiz Completed!</h2>
      <p>You scored {score} out of {totalQuestions}.</p>
      {previousScore !== null && <p>Previous Score: {previousScore} / {totalQuestions}</p>}
      <button onClick={() => dispatch({type:'RESTART_QUIZ'})}>Restart Quiz</button>
    </div>
  );
}

export default ResultCard;
