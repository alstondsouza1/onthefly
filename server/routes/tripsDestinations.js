import express from 'express'
import {
  addDestinationToTrip,
  getTripDestinations,
  removeDestinationFromTrip
} from '../controllers/tripsDestinations.js'

const router = express.Router()

router.post('/', addDestinationToTrip)
router.get('/trip/:tripId', getTripDestinations)
router.delete('/:tripId/:destinationId', removeDestinationFromTrip)

export default router
