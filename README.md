# User Onboarding Flow

A full-stack web application that takes a new user through a complete signup and onboarding experience — including authentication, simulated payment, and a personalized dashboard.

## Features

- User signup and login with secure hashed passwords
- JWT-based authentication (sessions persist across page refreshes)
- Simulated payment step (no real money involved)
- 3-question onboarding form
- Protected routes — users cannot skip steps
- Personal dashboard showing all entered data
- Data privacy — users only see their own data

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** React (Vite)
- **Database:** SQLite (via better-sqlite3)
- **Auth:** bcrypt + JWT

## Environment Variables

The following environment variable is required to run the backend.

| Variable | Description |
|---|---|
| `JWT_SECRET` | A long random string used to sign and verify JWT tokens |

Create a `.env` file inside the `server/` folder and add:

```
JWT_SECRET=your_long_random_secret_here
```

See `server/.env.example` for the template.

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/pranavchaudharyyy/user-onboarding-flow.git
cd user-onboarding-flow
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Setup Environment Variables

```bash
cp .env.example .env
```

Open `.env` and set your secret:

```
JWT_SECRET=your_long_random_secret_here
```

### 4. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## Running the Project

You need **two terminals open at the same time.**

**Terminal 1 — Start the backend:**

```bash
cd server
node index.js
```

Server runs on: `http://localhost:3000`

**Terminal 2 — Start the frontend:**

```bash
cd client
npm run dev
```

Frontend runs on: `http://localhost:5173`

Open `http://localhost:5173` in your browser.

## User Flow

1. **Sign Up** — Create an account with your name, email, and password
2. **Payment** — Click the "Pay ₹4,999" button (simulated, no real money)
3. **Onboarding** — Answer 3 questions about your college and career goal
4. **Dashboard** — See your personalized welcome page with all your data

## Security Practices

- Passwords hashed using **bcrypt** — never stored in plain text
- JWT tokens expire after **7 days**
- Protected routes enforce step order — no step can be skipped
- Each user can only access their own data (enforced server-side via JWT)
- `.env` file is excluded from version control via `.gitignore`
