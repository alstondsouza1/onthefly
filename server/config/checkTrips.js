import { pool } from './database.js'

try {
  const result = await pool.query(`
    SELECT id, title, num_days, total_cost
    FROM trips
    ORDER BY id
  `)

  console.log('\n✈️ Trips saved in PostgreSQL:')
  console.table(result.rows)
  console.log(`✅ Found ${result.rowCount} trips`)
} catch (error) {
  console.error('❌ Error checking trips:', error.message)
} finally {
  await pool.end()
}
