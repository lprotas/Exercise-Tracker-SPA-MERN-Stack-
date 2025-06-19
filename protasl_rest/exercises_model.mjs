import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        // Store the connection object
        connection = mongoose.connection;

        // Log success message
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch (err) {
        // Log any errors that occur during connection
        console.error(err);
        
        // Throw an error with a custom message
        throw new Error(`Could not connect to MongoDB: ${err.message}`);
    }
}

/**
 * This function returns the current MongoDB connection.
 */
function getConnection() {
    return connection;
}

// The Exercise model schema
const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The name of the exercise'],
    },
    reps: {
      type: Number,
      required: [true, 'The number of times the exercise was performed'],
      validate: {
        validator: (value) => Number.isInteger(value) && value > 0,
        message: 'The value must be an integer greater than 0',
      },
    },
    weight: {
      type: Number,
      required: [true, 'The weight of the weights used for the exercise'],
      validate: {
        validator: (value) => Number.isInteger(value) && value > 0,
        message: 'The value must be an integer greater than 0',
      },
    },
    unit: {
      type: String,
      required: [true, 'The unit of measurement of the weight'],
      enum: ['kgs', 'lbs'],
    },
    date: {
      type: String,
      required: [true, 'The date the exercise was performed'],
      validate: {
        validator: (value) => /^\d{2}-\d{2}-\d{2}$/.test(value),
        message: 'The date must be in the format MM-DD-YY',
      },
    },
  },
  { 
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Customize the JSON output to place _id after date
exerciseSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

const createExercise = async (exerciseData) => {
  const exercise = new Exercise(exerciseData);
  await exercise.save();
  return exercise;
};

const getAllExercises = async () => {
  return await Exercise.find({});
};

const getExerciseById = async (id) => {
  return await Exercise.findById(id);
};

const updateExerciseById = async (id, exerciseData) => {
  return await Exercise.findByIdAndUpdate(id, exerciseData, { new: true });
};

const deleteExerciseById = async (id) => {
  return await Exercise.findByIdAndDelete(id);
};

export { connect, getConnection, createExercise, getAllExercises, getExerciseById, updateExerciseById, deleteExerciseById };