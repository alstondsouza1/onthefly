import { pool } from '../config/database.js'

export const addDestinationToTrip = async (req, res) => {
  try {
    const { trip_id, destination_id } = req.body

    if (
      !Number.isInteger(trip_id) ||
      !Number.isInteger(destination_id) ||
      trip_id <= 0 ||
      destination_id <= 0
    ) {
      return res.status(400).json({
        error: 'Please provide valid trip and destination IDs'
      })
    }

    const result = await pool.query(
      `INSERT INTO trips_destinations (trip_id, destination_id)
       VALUES ($1, $2)
       ON CONFLICT (trip_id, destination_id) DO NOTHING
       RETURNING *`,
      [trip_id, destination_id]
    )

    if (result.rows.length === 0) {
      return res.status(409).json({
        error: 'Destination is already linked to this trip'
      })
    }

    res.status(201).json({
      message: 'Destination added to trip!',
      connection: result.rows[0]
    })
  } catch (error) {
    console.error('Error linking destination:', error.message)

    if (error.code === '23503') {
      return res.status(404).json({
        error: 'Trip or destination not found'
      })
    }

    res.status(500).json({
      error: 'Failed to add destination to trip'
    })
  }
}

export const getTripDestinations = async (req, res) => {
    try {
      const { tripId } = req.params
  
      if (!/^[1-9]\d*$/.test(tripId)) {
        return res.status(400).json({
          error: 'Invalid trip ID'
        })
      }
  
      const results = await pool.query(
        `SELECT d.*
         FROM destinations d
         JOIN trips_destinations td
           ON d.id = td.destination_id
         WHERE td.trip_id = $1
         ORDER BY d.id`,
        [tripId]
      )
  
      res.status(200).json(results.rows)
    } catch (error) {
      console.error('Error getting trip destinations:', error.message)
  
      res.status(500).json({
        error: 'Failed to get trip destinations'
      })
    }
}

export const removeDestinationFromTrip = async (req, res) => {
    try {
      const { tripId, destinationId } = req.params
  
      if (
        !/^[1-9]\d*$/.test(tripId) ||
        !/^[1-9]\d*$/.test(destinationId)
      ) {
        return res.status(400).json({
          error: 'Invalid trip or destination ID'
        })
      }
  
      const results = await pool.query(
        `DELETE FROM trips_destinations
         WHERE trip_id = $1 AND destination_id = $2
         RETURNING *`,
        [tripId, destinationId]
      )
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          error: 'Trip and destination connection not found'
        })
      }
  
      res.status(200).json({
        message: 'Destination removed from trip successfully',
        removedConnection: results.rows[0]
      })
    } catch (error) {
      console.error('Error removing destination:', error.message)
  
      res.status(500).json({
        error: 'Failed to remove destination from trip'
      })
    }
}

export const getTripsByDestination = async (req, res) => {
    try {
      const { destinationId } = req.params
  
      if (!/^[1-9]\d*$/.test(destinationId)) {
        return res.status(400).json({
          error: 'Invalid destination ID'
        })
      }
  
      const results = await pool.query(
        `SELECT t.*
         FROM trips t
         JOIN trips_destinations td
           ON t.id = td.trip_id
         WHERE td.destination_id = $1
         ORDER BY t.id`,
        [destinationId]
      )
  
      res.status(200).json(results.rows)
    } catch (error) {
      console.error('Error getting trips by destination:', error.message)
  
      res.status(500).json({
        error: 'Failed to get trips by destination'
      })
    }
}
  
  
  
