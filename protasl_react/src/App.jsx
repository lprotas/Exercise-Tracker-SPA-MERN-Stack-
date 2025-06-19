import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import './App.css';

const App = () => {
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch('/api/exercises');
                if (!response.ok) {
                    throw new Error('Failed to fetch exercises');
                }
                const data = await response.json();
                setExercises(data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchExercises();
    }, []);

    const handleDelete = (id) => {
        setExercises(exercises.filter(exercise => exercise.id !== id));
    };

    const handleAddExercise = (newExercise) => {
        setExercises([...exercises, newExercise]);
    };

    const handleUpdateExercise = (updatedExercise) => {
        setExercises(exercises.map(exercise => 
            exercise.id === updatedExercise.id ? updatedExercise : exercise
        ));
    };

    return (
        <Router>
            <div className="container">
                <header>
                    <h1>FitJourney</h1>
                    <p>Your personal fitness companion on your path to a healthier life</p>
                    <Navigation />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage exercises={exercises} onDelete={handleDelete} setSelectedExercise={setSelectedExercise} />} />
                        <Route path="/add-exercise" element={<AddExercisePage onAddExercise={handleAddExercise} />} />
                        <Route path="/edit-exercise/:id" element={<EditExercisePage exercise={selectedExercise} onUpdateExercise={handleUpdateExercise} />} />
                    </Routes>
                </main>
                <footer>
                    <p>© 2025 Lev Protas</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;