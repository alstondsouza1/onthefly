import express from 'express'
import { getTripsByDestination } from '../controllers/tripsDestinations.js'
import {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
} from '../controllers/destinations.js'

const router = express.Router()

router.get('/', getDestinations)
router.get('/:id', getDestinationById)
router.get('/:destinationId/trips', getTripsByDestination)
router.post('/', createDestination)
router.patch('/:id', updateDestination)
router.delete('/:id', deleteDestination)

export default router