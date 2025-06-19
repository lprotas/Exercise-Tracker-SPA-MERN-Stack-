import React from 'react';
import ExerciseRow from './ExerciseRow';

const ExerciseTable = ({ exercises, onDelete, setSelectedExercise }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise) => (
                    <ExerciseRow
                        key={exercise.id}
                        exercise={exercise}
                        onDelete={onDelete}
                        setSelectedExercise={setSelectedExercise}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ExerciseTable;