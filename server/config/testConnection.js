import { pool } from './database.js'

try {
  const result = await pool.query('SELECT NOW() AS current_time')

  console.log('✅ Connected to PostgreSQL successfully!')
  console.log('Database time:', result.rows[0].current_time)
} catch (error) {
  console.error('❌ Database connection failed:', error.message)
} finally {
  await pool.end()
}
