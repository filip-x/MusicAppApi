# Music App API

A full-stack music application built with NestJS backend and React frontend.

## Project Structure

```
MusicAppApi/
├── backend/        # NestJS API (RESTful backend)
│   ├── src/       # Source code
│   └── test/      # E2E tests
└── frontend/      # React + Vite frontend
    └── src/       # React components
```

## Tech Stack

### Backend
- **Framework:** NestJS
- **Database:** MySQL (via TypeORM)
- **Language:** TypeScript

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Features

The backend API provides REST endpoints for managing:
- **Artists** - Music artists
- **Albums** - Music albums
- **Songs** - Individual tracks
- **Playlists** - User-created song collections
- **Users** - User accounts with authentication

## How to Run

### Prerequisites
- Node.js installed
- MySQL database running

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure database connection in `src/app.module.ts` (update host, username, password, database name)

4. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Available Scripts

### Backend
- `npm run start` - Start the application
- `npm run start:dev` - Start in watch mode (development)
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run e2e tests

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Database Schema

The application uses the following entities with relationships:
- Songs belong to Artists and Albums
- Songs can be added to multiple Playlists
- Users can create and manage Playlists