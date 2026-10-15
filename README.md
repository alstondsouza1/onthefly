
# ✈️ On the Fly

On the Fly is a travel planning backend API built for CodePath's WEB103 Advanced Web Development course.

The application helps users organize trips, manage destinations, plan activities, and track trip details such as dates, descriptions, and budgets.

## Technologies

- Node.js
- Express.js
- PostgreSQL
- Render PostgreSQL
- JavaScript (ES Modules)
- dotenv
- CORS
- Nodemon

## Features

- Create, view, update, and delete trips
- Manage travel destinations
- Add and remove destinations from trips
- Find trips associated with a destination
- Create, view, update, and delete activities
- Retrieve activities associated with a trip
- Update activity vote counts
- Store trip budgets, dates, and descriptions

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/alstondsouza1/onthefly.git
cd onthefly/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder:

```env
PGUSER=your_database_username
PGPASSWORD=your_database_password
PGHOST=your_database_hostname
PGPORT=5432
PGDATABASE=your_database_name
```

Never commit your `.env` file to GitHub.

### 4. Set up the database

After configuring your PostgreSQL connection:

```bash
node config/reset.js
```

### 5. Start the server

```bash
npm start
```

The API runs locally at:

http://localhost:3001

## API Endpoints

### Trips

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/trips` | Get all trips |
| GET | `/api/trips/:id` | Get one trip |
| POST | `/api/trips` | Create a trip |
| PATCH | `/api/trips/:id` | Update a trip |
| DELETE | `/api/trips/:id` | Delete a trip |
| GET | `/api/trips/:tripId/destinations` | Get a trip's destinations |
| GET | `/api/trips/:tripId/activities` | Get a trip's activities |

### Destinations

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/destinations` | Get all destinations |
| GET | `/api/destinations/:id` | Get one destination |
| POST | `/api/destinations` | Create a destination |
| PATCH | `/api/destinations/:id` | Update a destination |
| DELETE | `/api/destinations/:id` | Delete a destination |
| GET | `/api/destinations/:destinationId/trips` | Get trips for a destination |

### Activities

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/activities` | Get all activities |
| GET | `/api/activities/:id` | Get one activity |
| GET | `/api/activities/trip/:tripId` | Get activities for a trip |
| POST | `/api/activities` | Create an activity |
| PATCH | `/api/activities/:id` | Update an activity or its votes |
| DELETE | `/api/activities/:id` | Delete an activity |

### Trip–Destination Relationships

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/trips-destinations` | Get all relationships |
| GET | `/api/trips-destinations/trip/:tripId` | Get destinations for a trip |
| GET | `/api/trips-destinations/trips/:destinationId` | Get trips for a destination |
| GET | `/api/trips-destinations/destinations/:tripId` | Get destinations for a trip |
| POST | `/api/trips-destinations` | Link a destination to a trip |
| DELETE | `/api/trips-destinations/:tripId/:destinationId` | Remove a relationship |

## Database

The PostgreSQL database includes six tables:

- `trips`
- `destinations`
- `activities`
- `trips_destinations`
- `users`
- `trips_users`

Foreign keys and join tables are used to represent relationships between trips, destinations, activities, and users.

## Course

**CodePath — WEB103: Advanced Web Development**

Unit 5 Lab: On the Fly — Part 1

## Author

Alston Dsouza

GitHub: https://github.com/alstondsouza1