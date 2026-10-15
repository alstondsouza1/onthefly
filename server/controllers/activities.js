import { pool } from '../config/database.js'

export const getActivities = async (req, res) => {
  try {
    const results = await pool.query(
      'SELECT * FROM activities ORDER BY id ASC'
    )

    res.status(200).json(results.rows)
  } catch (error) {
    console.error('Error getting activities:', error.message)

    res.status(500).json({
      error: 'Failed to get activities'
    })
  }
}

export const createActivity = async (req, res) => {
  try {
    const { trip_id, activity } = req.body

    if (
      !Number.isInteger(trip_id) ||
      trip_id <= 0 ||
      typeof activity !== 'string' ||
      !activity.trim()
    ) {
      return res.status(400).json({
        error: 'Please provide a valid trip ID and activity'
      })
    }

    const results = await pool.query(
      `INSERT INTO activities (trip_id, activity, num_votes)
       VALUES ($1, $2, 0)
       RETURNING *`,
      [trip_id, activity.trim()]
    )

    res.status(201).json(results.rows[0])
  } catch (error) {
    console.error('Error creating activity:', error.message)

    if (error.code === '23503') {
      return res.status(404).json({
        error: 'Trip not found'
      })
    }

    res.status(500).json({
      error: 'Failed to create activity'
    })
  }
}

export const getActivityById = async (req, res) => {
    try {
      const { id } = req.params
  
      if (!/^[1-9]\d*$/.test(id)) {
        return res.status(400).json({
          error: 'Invalid activity ID'
        })
      }
  
      const results = await pool.query(
        'SELECT * FROM activities WHERE id = $1',
        [id]
      )
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          error: 'Activity not found'
        })
      }
  
      res.status(200).json(results.rows[0])
    } catch (error) {
      console.error('Error getting activity:', error.message)
  
      res.status(500).json({
        error: 'Failed to get activity'
      })
    }
}

export const updateActivity = async (req, res) => {
    try {
      const { id } = req.params
      const { activity, num_votes } = req.body
  
      if (!/^[1-9]\d*$/.test(id)) {
        return res.status(400).json({
          error: 'Invalid activity ID'
        })
      }
  
      if (activity === undefined && num_votes === undefined) {
        return res.status(400).json({
          error: 'Please provide an activity or vote count'
        })
      }
  
      if (
        activity !== undefined &&
        (typeof activity !== 'string' || !activity.trim())
      ) {
        return res.status(400).json({
          error: 'Activity must be a non-empty string'
        })
      }
  
      if (
        num_votes !== undefined &&
        (!Number.isInteger(num_votes) || num_votes < 0)
      ) {
        return res.status(400).json({
          error: 'Votes must be a non-negative integer'
        })
      }
  
      const results = await pool.query(
        `UPDATE activities
         SET activity = COALESCE($1, activity),
             num_votes = COALESCE($2, num_votes)
         WHERE id = $3
         RETURNING *`,
        [
          activity === undefined ? null : activity.trim(),
          num_votes === undefined ? null : num_votes,
          id
        ]
      )
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          error: 'Activity not found'
        })
      }
  
      res.status(200).json(results.rows[0])
    } catch (error) {
      console.error('Error updating activity:', error.message)
  
      res.status(500).json({
        error: 'Failed to update activity'
      })
    }
}

export const deleteActivity = async (req, res) => {
    try {
      const { id } = req.params
  
      if (!/^[1-9]\d*$/.test(id)) {
        return res.status(400).json({
          error: 'Invalid activity ID'
        })
      }
  
      const results = await pool.query(
        'DELETE FROM activities WHERE id = $1 RETURNING *',
        [id]
      )
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          error: 'Activity not found'
        })
      }
  
      res.status(200).json({
        message: 'Activity deleted successfully',
        deletedActivity: results.rows[0]
      })
    } catch (error) {
      console.error('Error deleting activity:', error.message)
  
      res.status(500).json({
        error: 'Failed to delete activity'
      })
    }
}

export const getActivitiesByTrip = async (req, res) => {
    try {
      const { tripId } = req.params
  
      const results = await pool.query(
        `SELECT *
         FROM activities
         WHERE trip_id = $1
         ORDER BY id`,
        [tripId]
      )
  
      res.status(200).json(results.rows)
    } catch (error) {
      console.error('Error getting trip activities:', error.message)
  
      res.status(500).json({
        error: 'Failed to get trip activities'
      })
    }
  }  
  
  
  
