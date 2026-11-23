# PEAKING

_A rpg habit tracker_

This project was made for hack club terra, which theme this week was ***PEAK***. I think a self-improvement app is perferct for becoming the ***PEAK***est version of yourself. If you have any ideas, dm me on slack @dgmautner. Have fun and become ***PEAK***

peaking is a habit tracker which helps you organize and achive youre daily goals.

## Quickstart

### 1. Prerequisites
- **Node.js** (v20+ recommended) & **npm**
- **PostgreSQL** running locally (or reachable via `DATABASE_URL`)

### 2. Install Dependencies & Configure Environment
```bash
npm install
```

Create a .env file in the project root with your real PostgreSQL connection details:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/peaking"
```

### 3. Push Database Schema & Run

For local development:
```bash
npx prisma db push
npm run dev
```

Or build and run the portable Linux executable (dist/peaking-linux):
```bash
npm run package
chmod +x dist/peaking-linux
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/peaking" PORT=3000 ./dist/peaking-linux
```

Open http://localhost:3000 in your browser.
