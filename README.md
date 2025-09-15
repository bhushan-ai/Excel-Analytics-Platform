# Excel Analytics Platform (Backend + Frontend)

Excel Analytics Platform is a web application that aims to let users upload Excel sheets, analyze them with AI, generate summaries and charts, and manage accounts & settings. The backend is already working; frontend is in progress.

---

## 🚀 Features

These are current/planned features:

- User Authentication (login, signup)
- Upload Excel files
- AI-powered analysis of the data: summaries, charts, insights
- Account section: user settings, history/dashboard
- Route guards & permissions: only authenticated users can access protected routes

---

## 🛠 Tech Stack

Here are the main technologies being used / planned:

- **Backend**: Node.js / Express (or whatever your backend is)
- **Database**: (specify: MongoDB / PostgreSQL / other)  
- **AI / Data Processing**: (if you’re using any ML libraries, data processing libs, specify them)  
- **Frontend**: React + React Router + (any state management: Redux / Context API / etc.)  
- **Authentication**: (JWT / session / another method)  
- **Hosting / Deployment**: (if planned: e.g. AWS / Heroku / Vercel / DigitalOcean)

---

## 🔧 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Make sure you have installed:

- Node.js (v14+ or whichever version you need)  
- npm or yarn  
- (Database, if local, e.g. MongoDB / Postgres)  

### Setup Backend

```bash
cd backend
npm install      # or yarn install
# configure .env (database URL, API keys, etc)
npm run dev      # or the start script
