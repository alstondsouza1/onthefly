import { pool } from '../config/database.js'

export const getTrips = async (req, res) => {
  try {
    const results = await pool.query(
      'SELECT * FROM trips ORDER BY id ASC'
    )

    res.status(200).json(results.rows)
  } catch (error) {
    console.error('Error getting trips:', error.message)

    res.status(500).json({
      error: 'Failed to get trips'
    })
  }
}

export const getTripById = async (req, res) => {
    try {
      const { id } = req.params
  
      const results = await pool.query(
        'SELECT * FROM trips WHERE id = $1',
        [id]
      )
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          error: 'Trip not found'
        })
      }
  
      res.status(200).json(results.rows[0])
    } catch (error) {
      console.error('Error getting trip:', error.message)
  
      res.status(500).json({
        error: 'Failed to get trip'
      })
    }
}

export const createTrip = async (req, res) => {
    try {
      const {
        title,
        description,
        img_url,
        num_days,
        start_date,
        end_date,
        total_cost
      } = req.body
  
      if (
        !title ||
        !description ||
        !img_url ||
        !num_days ||
        !start_date ||
        !end_date ||
        total_cost === undefined
      ) {
        return res.status(400).json({
          error: 'Please provide all trip details'
        })
      }
  
      const results = await pool.query(
        `INSERT INTO trips
         (title, description, img_url, num_days, start_date, end_date, total_cost)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          title,
          description,
          img_url,
          num_days,
          start_date,
          end_date,
          total_cost
        ]
      )
  
      res.status(201).json(results.rows[0])
    } catch (error) {
      console.error('Error creating trip:', error.message)
  
      res.status(500).json({
        error: 'Failed to create trip'
      })
    }
}

export const updateTrip = async (req, res) => {
    try {
      const { id } = req.params
  
      const allowedFields = [
        'title',
        'description',
        'img_url',
        'num_days',
        'start_date',
        'end_date',
        'total_cost'
      ]
  
      const fields = Object.keys(req.body).filter(
        field => allowedFields.includes(field)
      )
  
      if (fields.length === 0) {
        return res.status(400).json({
          error: 'Please provide at least one valid field to update'
        })
      }
  
      const setClause = fields
        .map((field, index) => `${field} = $${index + 1}`)
        .join(', ')
  
      const values = fields.map(field => req.body[field])
      values.push(id)
  
      const results = await pool.query(
        `UPDATE trips
         SET ${setClause}
         WHERE id = $${values.length}
         RETURNING *`,
        values
      )
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          error: 'Trip not found'
        })
      }
  
      res.status(200).json(results.rows[0])
    } catch (error) {
      console.error('Error updating trip:', error.message)
  
      res.status(500).json({
        error: 'Failed to update trip'
      })
    }
}

export const deleteTrip = async (req, res) => {
    try {
      const { id } = req.params
  
      const results = await pool.query(
        'DELETE FROM trips WHERE id = $1 RETURNING *',
        [id]
      )
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          error: 'Trip not found'
        })
      }
  
      res.status(200).json({
        message: 'Trip deleted successfully',
        deletedTrip: results.rows[0]
      })
    } catch (error) {
      console.error('Error deleting trip:', error.message)
  
      res.status(500).json({
        error: 'Failed to delete trip'
      })
    }
}
  
  
  
  
