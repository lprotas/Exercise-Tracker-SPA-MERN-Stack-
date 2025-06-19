import { Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';

function HomePage({ exercises, onDelete, setSelectedExercise }) {
    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseTable exercises={exercises} onDelete={onDelete} setSelectedExercise={setSelectedExercise} />
            <Link to="/add-exercise">
                <button style={{ marginTop: '20px' }}>Add an Exercise</button>
            </Link>
        </>
    );
}

export default HomePage;