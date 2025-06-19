import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditExercisePage = ({ exercise, onUpdateExercise }) => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (exercise) {
            setName(exercise.name);
            setReps(exercise.reps);
            setWeight(exercise.weight);
            setUnit(exercise.unit);
            setDate(exercise.date);
        }
    }, [exercise]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedExercise = { name, reps: parseInt(reps), weight: parseInt(weight), unit, date };
        try {
            const response = await fetch(`/api/exercises/${exercise.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedExercise),
            });
            if (response.ok) {
                onUpdateExercise({ ...updatedExercise, id: exercise.id });
                alert('Exercise updated successfully!');
                navigate('/');
            } else {
                alert('Failed to update exercise.');
            }
        } catch (error) {
            console.error('Error updating exercise:', error);
            alert('Error updating exercise.');
        }
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
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
                <button type="submit">Update Exercise</button>
            </form>
        </div>
    );
};

export default EditExercisePage;