import express from 'express'
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity
} from '../controllers/activities.js'

const router = express.Router()

router.get('/', getActivities)
router.get('/:id', getActivityById)
router.post('/', createActivity)
router.patch('/:id', updateActivity)
router.delete('/:id', deleteActivity)

export default router
