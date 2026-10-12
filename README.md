# Nexra

Nexra is a live presentation platform for presenters who need a synchronized, browser-based way to display PDF decks and deliver audience updates in real time.

Developed and maintained by Abin Wilson.
GitHub: https://github.com/Abinw001X
Repository: https://github.com/Abinw001X/tax-assister

## Overview

The application enables a host to upload presentations, manage a live session, and push slide changes to all connected viewers without requiring a custom desktop client. Viewers join via a session code and remain synchronized with the active slide, blackout state, and presentation controls managed by the host.

## Features

- Real-time slide sync across host and audience using WebSockets
- Presentation library for uploading and managing PDF decks
- Host dashboard for session control and audience monitoring
- Viewer join flow using a short session code
- Presenter notes and presentation metadata management
- Fullscreen presentation mode and blackout states
- Audience count and viewer session tracking
- Basic download support for presentation files

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Fastify, TypeScript
- Database: Prisma ORM with SQLite for local development
- Real-time: WebSockets
- PDF rendering: PDF.js

## Architecture

```text
.
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── package.json
├── package.json
├── README.md
├── .env.example
├── LICENSE
├── docker-compose.yml
└── .gitignore
```

## Prerequisites

- Node.js 22+
- npm 10+
- A local environment capable of writing a SQLite database file

## Environment Setup

Create a local environment file for the backend before running the application:

```bash
cp .env.example .env
```

Example values:

```env
DATABASE_URL="file:./backend/data/nexra.db"
JWT_SECRET="replace-with-a-long-random-secret"
JWT_REFRESH_SECRET="replace-with-a-different-long-random-secret"
COOKIE_SECRET="replace-with-a-cookie-secret"
SESSION_SECRET="replace-with-a-session-secret"
PORT=1050
NODE_ENV=development
PUBLIC_URL=http://localhost:1050
```

This repository does not ship production secrets.

## Installation

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

## Database Setup

```bash
mkdir -p backend/data
DATABASE_URL='file:./data/nexra.db' JWT_SECRET='local-dev-access-secret' JWT_REFRESH_SECRET='local-dev-refresh-secret' npm run db:migrate --prefix backend
```

## Run Locally

From the project root:

```bash
DATABASE_URL='file:./data/nexra.db' JWT_SECRET='local-dev-access-secret' JWT_REFRESH_SECRET='local-dev-refresh-secret' VITE_PUBLIC_URL='http://localhost:1050' npm run dev
```

Then open:

- Frontend: http://localhost:5173
- Host dashboard: http://localhost:5173/host
- API health check: http://localhost:1050/api/health

## Build and Validation

```bash
DATABASE_URL='file:./data/nexra.db' JWT_SECRET='local-dev-access-secret' JWT_REFRESH_SECRET='local-dev-refresh-secret' npm run build --prefix backend
DATABASE_URL='file:./data/nexra.db' JWT_SECRET='local-dev-access-secret' JWT_REFRESH_SECRET='local-dev-refresh-secret' npm run build --prefix frontend
```

No dedicated automated test suite was present in this repository at the time of review.

## API Endpoints

The backend includes the following HTTP routes:

### Authentication

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Sessions

- `POST /api/session/`
- `GET /api/session/:code`
- `POST /api/session/:id/end`
- `POST /api/session/:code/regenerate-code`
- `PUT /api/session/:code/settings`

### Presentation library

- `GET /api/presentation/library`
- `POST /api/presentation/library/upload`
- `DELETE /api/presentation/library/:id`
- `PUT /api/presentation/library/:id/rename`
- `POST /api/presentation/library/:id/duplicate`
- `PUT /api/presentation/library/:id/notes`
- `GET /api/presentation/:id/download`

## Deployment Notes

This project can be run locally in development mode and can also be deployed in a Node environment with a secure backend `.env` file and a valid database URL. The included Docker Compose file is present for infrastructure orchestration, but the app itself has been validated with local SQLite support for developer workflows.

## Screenshots

No screenshots are committed to the repository in the current project state.

## Limitations and Future Improvements

- No dedicated automated test suite at the current revision
- Session flows are host-managed and designed around a single presentation host
- File validation is limited to basic integrity checks and extension handling
- Additional deployment hardening may be needed for production internet exposure

## Developer

- Developer name: Abin Wilson
- GitHub username: Abinw001X
- GitHub profile: https://github.com/Abinw001X
- Repository: https://github.com/Abinw001X/tax-assister

## License

This project includes an existing LICENSE file. Review the license terms before redistribution or commercial use.
