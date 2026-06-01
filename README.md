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

