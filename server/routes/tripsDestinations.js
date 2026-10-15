import express from 'express'
import {
  addDestinationToTrip,
  getTripDestinations,
  getTripsByDestination,
  getAllTripsDestinations,
  removeDestinationFromTrip
} from '../controllers/tripsDestinations.js'

const router = express.Router()

router.get('/', getAllTripsDestinations)
router.get('/trip/:tripId', getTripDestinations)
router.get('/trips/:destinationId', getTripsByDestination)
router.get('/destinations/:tripId', getTripDestinations)

router.post('/', addDestinationToTrip)
router.delete('/:tripId/:destinationId', removeDestinationFromTrip)

export default router
