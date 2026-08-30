# BuildTrack

BuildTrack is a full-stack construction project management application built to manage construction projects, track their status, and perform CRUD operations.

## Features

- Create new projects
- View all projects
- Edit existing projects
- Delete projects with confirmation
- Project status validation
- Loading and error states
- Responsive design
- PostgreSQL database

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- FastAPI
- Python
- SQLAlchemy
- Pydantic

### Database
- PostgreSQL

## Architecture

React → FastAPI → SQLAlchemy → PostgreSQL

The React frontend communicates with the FastAPI backend through REST API endpoints.

## Project Structure

```text
BuildTrack/
├── backend/
│   ├── main.py
│   ├── database.py
│   └── models.py
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── api.js
│   │   └── index.css
│   └── package.json
│
├── .gitignore
└── README.md