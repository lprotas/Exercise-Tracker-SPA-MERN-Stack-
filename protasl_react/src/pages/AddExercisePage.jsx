import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddExercisePage = ({ onAddExercise }) => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExercise = { name, reps: parseInt(reps), weight: parseInt(weight), unit, date };
        try {
            const response = await fetch('/api/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExercise),
            });
            if (response.ok) {
                const addedExercise = await response.json();
                onAddExercise(addedExercise);
                alert('Exercise added successfully!');
                navigate('/');
            } else {
                alert('Failed to add exercise.');
            }
        } catch (error) {
            console.error('Error adding exercise:', error);
            alert('Error adding exercise.');
        }
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Reps:</label>
                    <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} required />
                </div>
                <div>
                    <label>Weight:</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                </div>
                <div>
                    <label>Unit:</label>
                    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                    </select>
                </div>
                <div>
                    <label>Date:</label>
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="MM-DD-YY" required />
                </div>
                <button type="submit">Add Exercise</button>
            </form>
        </div>
    );
};

export default AddExercisePage;