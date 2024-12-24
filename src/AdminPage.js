import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function AdminPage() {
    const [questions, setQuestions] = useState([]);
    const [form, setForm] = useState({ question: '', options: '', correct: '', difficulty: '', category: '' });
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false); 
    const [currentEditId, setCurrentEditId] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const res = await axios.get('http://localhost:5000/questions'); 
            console.log(res.data);
            setQuestions(res.data); 
        } catch (err) {
            console.error('Error fetching questions:', err);
            setError('Failed to fetch questions.');
        }
    };

    const handleAdd = async () => {
        if (!form.question || !form.options || !form.correct || !form.difficulty || !form.category) {
            setError('All fields are required.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/questions', { 
                ...form, 
                options: form.options.split(',') 
            });
            setForm({ question: '', options: '', correct: '', difficulty: '', category: '' });
            setError('');
            fetchQuestions();
        } catch (err) {
            console.error('Error adding question:', err);
            setError('Failed to add question.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/questions/${id}`);
            fetchQuestions();
        } catch (err) {
            console.error('Error deleting question:', err);
            setError('Failed to delete question.');
        }
    };

    const handleEdit = (q) => {
       
        setForm({
            question: q.question,
            options: q.options.join(','),
            correct: q.correct,
            difficulty: q.difficulty,
            category: q.category
        });
        setEditMode(true); 
        setCurrentEditId(q.id); 
    };

    const handleUpdate = async () => {
        if (!form.question || !form.options || !form.correct || !form.difficulty || !form.category) {
            setError('All fields are required.');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/questions/${currentEditId}`, { 
                ...form, 
                options: form.options.split(',')
            });
            setForm({ question: '', options: '', correct: '', difficulty: '', category: '' });
            setError('');
            setEditMode(false); 
            setCurrentEditId(null); 
            fetchQuestions(); 
        } catch (err) {
            console.error('Error updating question:', err);
            setError('Failed to update question.');
        }
    };

    return (
        <div className="admin-page">
            <h2>Admin Page</h2>

            {error && <p className="error-message">{error}</p>} 

            <div className="form-container">
                <input
                    type="text"
                    placeholder="Question"
                    value={form.question}
                    onChange={e => setForm({ ...form, question: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Options (comma separated)"
                    value={form.options}
                    onChange={e => setForm({ ...form, options: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Correct Answer"
                    value={form.correct}
                    onChange={e => setForm({ ...form, correct: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Difficulty (Easy, Medium, Hard)"
                    value={form.difficulty}
                    onChange={e => setForm({ ...form, difficulty: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                />
                {editMode ? (
                    <button onClick={handleUpdate}>Update Question</button>
                ) : (
                    <button onClick={handleAdd}>Add Question</button>
                )}
            </div>

            <h3>Existing Questions</h3>
            <div className="questions-container">
                {console.log(questions)}
                {questions.map(q => (
                    <div key={q.id} className="question-item">
                        <p>{q.question} - {q.difficulty} - {q.category}</p>
                        <button className="edit-button" onClick={() => handleEdit(q)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(q.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPage;
