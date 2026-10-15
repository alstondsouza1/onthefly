import express from 'express'
import {
  getActivities,
  getActivityById,
  getActivitiesByTrip,
  createActivity,
  updateActivity,
  deleteActivity
} from '../controllers/activities.js'

const router = express.Router()

router.get('/', getActivities)

// Get all activities for a specific trip
router.get('/trip/:tripId', getActivitiesByTrip)

// Get a single activity
router.get('/:id', getActivityById)

// Create an activity
router.post('/', createActivity)

// Update an activity or its votes
router.patch('/:id', updateActivity)

// Delete an activity
router.delete('/:id', deleteActivity)

export default router
