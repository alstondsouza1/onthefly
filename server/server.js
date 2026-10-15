import express from 'express'
import cors from 'cors'
import tripsRouter from './routes/trips.js'
import destinationsRouter from './routes/destinations.js'
import tripsDestinationsRouter from './routes/tripsDestinations.js'
import activitiesRouter from './routes/activities.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).send(
    '<h1 style="text-align: center; margin-top: 50px;">✈️ On the Fly API</h1>'
  )
})

app.use('/api/trips', tripsRouter)
app.use('/api/destinations', destinationsRouter)
app.use('/api/trips-destinations', tripsDestinationsRouter)
app.use('/api/activities', activitiesRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
