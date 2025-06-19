import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import { connect, createExercise, getAllExercises, getExerciseById, updateExerciseById, deleteExerciseById } from './exercises_model.mjs';

const app = express();
app.use(express.json());

app.disable('x-powered-by');

app.set('etag', false);

const PORT = process.env.PORT;

const ERROR_INVALID_REQUEST = { Error: 'Invalid request' };
const ERROR_NOT_FOUND = { Error: 'Not found' };

// Connect to MongoDB
(async () => {
  try {
    await connect();
    console.log('MongoDB connection established');

    // Define routes after the connection is established

    // POST /exercises
    app.post('/exercises', [
      body('name').isString().notEmpty().withMessage('The name of the exercise is required'),
      body('reps').isInt({ gt: 0 }).withMessage('The number of times the exercise was performed must be an integer greater than 0'),
      body('weight').isInt({ gt: 0 }).withMessage('The weight of the weights used for the exercise must be an integer greater than 0'),
      body('unit').isIn(['kgs', 'lbs']).withMessage('The unit of measurement of the weight must be either "kgs" or "lbs"'),
      body('date').matches(/^\d{2}-\d{2}-\d{2}$/).withMessage('The date must be in the format MM-DD-YY')
    ], asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(ERROR_INVALID_REQUEST);
      }

      const { name, reps, weight, unit, date } = req.body;

      try {
        const exercise = await createExercise({ name, reps, weight, unit, date });
        res.status(201).json(exercise);
      } catch (error) {
        console.error('Error creating exercise:', error);
        res.status(500).json({ Error: 'Internal server error' });
      }
    }));

    // GET /exercises
    app.get('/exercises', asyncHandler(async (req, res) => {
      try {
        const exercises = await getAllExercises();
        res.status(200).json(exercises);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({ Error: 'Internal server error' });
      }
    }));

    // GET /exercises/:id
    app.get('/exercises/:id', asyncHandler(async (req, res) => {
      try {
        const exercise = await getExerciseById(req.params.id);
        if (exercise) {
          res.status(200).json(exercise);
        } else {
          res.status(404).json(ERROR_NOT_FOUND);
        }
      } catch (error) {
        console.error('Error fetching exercise by ID:', error);
        res.status(500).json({ Error: 'Internal server error' });
      }
    }));

    // PUT /exercises/:id
    app.put('/exercises/:id', [
      body('name').isString().notEmpty().withMessage('The name of the exercise is required'),
      body('reps').isInt({ gt: 0 }).withMessage('The number of times the exercise was performed must be an integer greater than 0'),
      body('weight').isInt({ gt: 0 }).withMessage('The weight of the weights used for the exercise must be an integer greater than 0'),
      body('unit').isIn(['kgs', 'lbs']).withMessage('The unit of measurement of the weight must be either "kgs" or "lbs"'),
      body('date').matches(/^\d{2}-\d{2}-\d{2}$/).withMessage('The date must be in the format MM-DD-YY')
    ], asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(ERROR_INVALID_REQUEST);
      }

      const { name, reps, weight, unit, date } = req.body;

      try {
        const exercise = await updateExerciseById(req.params.id, { name, reps, weight, unit, date });
        if (exercise) {
          res.status(200).json(exercise);
        } else {
          res.status(404).json(ERROR_NOT_FOUND);
        }
      } catch (error) {
        console.error('Error updating exercise:', error);
        res.status(500).json({ Error: 'Internal server error' });
      }
    }));

    // DELETE /exercises/:id
    app.delete('/exercises/:id', asyncHandler(async (req, res) => {
      try {
        const exercise = await deleteExerciseById(req.params.id);
        if (exercise) {
          res.status(204).send();
        } else {
          res.status(404).json(ERROR_NOT_FOUND);
        }
      } catch (error) {
        console.error('Error deleting exercise:', error);
        res.status(500).json({ Error: 'Internal server error' });
      }
    }));

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
})();