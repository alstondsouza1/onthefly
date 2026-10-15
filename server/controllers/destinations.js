import { pool } from '../config/database.js'

export const getDestinations = async (req, res) => {
  try {
    const results = await pool.query(
      'SELECT * FROM destinations ORDER BY id ASC'
    )

    res.status(200).json(results.rows)
  } catch (error) {
    console.error('Error getting destinations:', error.message)

    res.status(500).json({
      error: 'Failed to get destinations'
    })
  }
}

export const createDestination = async (req, res) => {
    try {
      const {
        destination,
        description,
        city,
        country,
        img_url,
        flag_img_url
      } = req.body
  
      if (
        !destination ||
        !description ||
        !city ||
        !country ||
        !img_url ||
        !flag_img_url
      ) {
        return res.status(400).json({
          error: 'Please provide all destination details'
        })
      }
  
      const results = await pool.query(
        `INSERT INTO destinations
         (destination, description, city, country, img_url, flag_img_url)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          destination,
          description,
          city,
          country,
          img_url,
          flag_img_url
        ]
      )
  
      res.status(201).json(results.rows[0])
    } catch (error) {
      console.error('Error creating destination:', error.message)
  
      res.status(500).json({
        error: 'Failed to create destination'
      })
    }
}

export const getDestinationById = async (req, res) => {
    try {
      const { id } = req.params
  
      if (!/^\d+$/.test(id)) {
        return res.status(400).json({
          error: 'Invalid destination ID'
        })
      }
  
      const results = await pool.query(
        'SELECT * FROM destinations WHERE id = $1',
        [id]
      )
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          error: 'Destination not found'
        })
      }
  
      res.status(200).json(results.rows[0])
    } catch (error) {
      console.error('Error getting destination:', error.message)
  
      res.status(500).json({
        error: 'Failed to get destination'
      })
    }
}

export const updateDestination = async (req, res) => {
    try {
      const { id } = req.params
  
      if (!/^\d+$/.test(id)) {
        return res.status(400).json({
          error: 'Invalid destination ID'
        })
      }
  
      const allowedFields = [
        'destination',
        'description',
        'city',
        'country',
        'img_url',
        'flag_img_url'
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
        `UPDATE destinations
         SET ${setClause}
         WHERE id = $${values.length}
         RETURNING *`,
        values
      )
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          error: 'Destination not found'
        })
      }
  
      res.status(200).json(results.rows[0])
    } catch (error) {
      console.error('Error updating destination:', error.message)
  
      res.status(500).json({
        error: 'Failed to update destination'
      })
    }
}

export const deleteDestination = async (req, res) => {
    try {
      const { id } = req.params
  
      if (!/^\d+$/.test(id)) {
        return res.status(400).json({
          error: 'Invalid destination ID'
        })
      }
  
      const results = await pool.query(
        'DELETE FROM destinations WHERE id = $1 RETURNING *',
        [id]
      )
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          error: 'Destination not found'
        })
      }
  
      res.status(200).json({
        message: 'Destination deleted successfully',
        deletedDestination: results.rows[0]
      })
    } catch (error) {
      console.error('Error deleting destination:', error.message)
  
      if (error.code === '23503') {
        return res.status(409).json({
          error: 'This destination is linked to a trip and cannot be deleted yet'
        })
      }
  
      res.status(500).json({
        error: 'Failed to delete destination'
      })
    }
}
  
  
  
  
