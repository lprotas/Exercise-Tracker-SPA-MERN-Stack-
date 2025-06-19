import React from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ExerciseRow = ({ exercise, onDelete, setSelectedExercise }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        setSelectedExercise(exercise);
        navigate(`/edit-exercise/${exercise.id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/exercises/${exercise.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                onDelete(exercise.id);
                alert('Exercise deleted successfully!');
                navigate('/');
            } else {
                alert('Failed to delete exercise.');
            }
        } catch (error) {
            console.error('Error deleting exercise:', error);
            alert('Error deleting exercise.');
        }
    };

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <MdModeEdit onClick={handleEdit} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <RiDeleteBin2Fill onClick={handleDelete} style={{ cursor: 'pointer' }} />
            </td>
        </tr>
    );
};

export default ExerciseRow;