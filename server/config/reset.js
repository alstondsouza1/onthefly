import { pool } from './database.js'
import { readFileSync } from 'node:fs'

const trips = JSON.parse(
  readFileSync(new URL('./data/data.json', import.meta.url), 'utf8')
)

try {
  console.log('✈️ Setting up On the Fly database...')

  await pool.query('BEGIN')

  await pool.query(`
    CREATE TABLE IF NOT EXISTS trips (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      description VARCHAR(500) NOT NULL,
      img_url TEXT NOT NULL,
      num_days INTEGER NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      total_cost MONEY NOT NULL
    );

    CREATE TABLE IF NOT EXISTS destinations (
      id SERIAL PRIMARY KEY,
      destination VARCHAR(100) NOT NULL,
      description VARCHAR(500) NOT NULL,
      city VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      img_url TEXT NOT NULL,
      flag_img_url TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS activities (
      id SERIAL PRIMARY KEY,
      trip_id INTEGER NOT NULL REFERENCES trips(id),
      activity VARCHAR(100) NOT NULL,
      num_votes INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS trips_destinations (
      trip_id INTEGER NOT NULL REFERENCES trips(id) ON UPDATE CASCADE,
      destination_id INTEGER NOT NULL REFERENCES destinations(id) ON UPDATE CASCADE,
      PRIMARY KEY (trip_id, destination_id)
    );

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      githubid INTEGER NOT NULL,
      username VARCHAR(100) NOT NULL,
      avatarurl VARCHAR(500) NOT NULL,
      accesstoken VARCHAR(500) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS trips_users (
      trip_id INTEGER NOT NULL REFERENCES trips(id) ON UPDATE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON UPDATE CASCADE,
      PRIMARY KEY (trip_id, user_id)
    );
  `)

  const countResult = await pool.query('SELECT COUNT(*) FROM trips')

  if (Number(countResult.rows[0].count) === 0) {
    for (const trip of trips) {
      await pool.query(
        `INSERT INTO trips
          (title, description, img_url, num_days, start_date, end_date, total_cost)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          trip.title,
          trip.description,
          trip.img_url,
          trip.num_days,
          trip.start_date,
          trip.end_date,
          trip.total_cost
        ]
      )
    }

    console.log('✅ Added 4 sample trips!')
  } else {
    console.log('ℹ️ Trips already exist, skipping sample data.')
  }

  await pool.query('COMMIT')
  console.log('✅ All 6 On the Fly tables are ready!')
} catch (error) {
  await pool.query('ROLLBACK')
  console.error('❌ Database setup failed:', error.message)
  process.exitCode = 1
} finally {
  await pool.end()
}