import { pool } from './database.js'

const labTables = [
  'trips',
  'destinations',
  'activities',
  'trips_destinations',
  'users',
  'trips_users'
]

try {
  const result = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `)

  const existingTables = result.rows.map(row => row.table_name)

  console.log('\n📋 Existing PostgreSQL tables:')
  console.log(existingTables.length ? existingTables.join('\n') : 'No tables found')

  const conflicts = labTables.filter(name => existingTables.includes(name))

  console.log('\n🔎 On the Fly table name conflicts:')
  console.log(conflicts.length ? conflicts.join('\n') : '✅ No conflicts found')
} catch (error) {
  console.error('❌ Could not check tables:', error.message)
} finally {
  await pool.end()
}
