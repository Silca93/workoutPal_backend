const express = require('express')

const { MongooseError } = require('mongoose')

const {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout

} = require('./../controllers/workoutController')


const requireAuth = require('./../middleware/requireAuth')

const router = express.Router()

//require auth for all workouts
router.use(requireAuth)

//get all workouts
router.get('/', getAllWorkouts)

//get a single workout
router.get('/:id', getWorkout)

//post  a workout
router.post('/', createWorkout)

//delete post
router.delete('/:id', deleteWorkout)

//update post
router.patch('/:id', updateWorkout)

module.exports = router;