import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const res = await axios.get('http://localhost:5000/leaderboard'); 
                setScores(res.data);
            } catch (err) {
                console.error('Error fetching scores:', err);
            }
        };
        fetchScores();
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            {scores.map((score, index) => (
                <div key={index}>
                    <p>{score.name} - {score.score}</p>
                </div>
            ))}
        </div>
    );
}

export default Leaderboard;
