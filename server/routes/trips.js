
import { getTripDestinations } from '../controllers/tripsDestinations.js'
import { getActivitiesByTrip } from '../controllers/activities.js'
import express from 'express'
import {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip
} from '../controllers/trips.js'

const router = express.Router()

router.get('/', getTrips)
router.get('/:id', getTripById)
router.get('/:tripId/destinations', getTripDestinations)
router.get('/:tripId/activities', getActivitiesByTrip)

router.post('/', createTrip)
router.patch('/:id', updateTrip)
router.delete('/:id', deleteTrip)

export default router
