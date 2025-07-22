# Online MCQ System - Frontend

## Overview

The frontend for the Online MCQ System is a React application built with Vite, Tailwind CSS, and React Router. It provides a user interface for registering, logging in, taking multiple-choice exams, submitting answers, and viewing result history. It communicates with the backend API at `http://localhost:5000`.

## Features

- **User Authentication**: Register and login with JWT-based authentication.
- **Exam Interface**: List exams, take exams with 5 questions each, and submit answers.
- **Result History**: View past exam results with scores and answer details.
- **Responsive Design**: Styled with Tailwind CSS for a modern, responsive UI.
- **Toast Notifications**: Feedback for user actions using `react-toastify`.

## Technologies

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify

## Prerequisites

- Node.js (v16 or higher)
- npm
- Backend server running at `http://localhost:5000`

## Setup Instructions

1. **Clone the Repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd online-mcq-system-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Required dependencies (in `package.json`):
   ```json
   {
     "dependencies": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0",
       "react-router-dom": "^6.16.0",
       "axios": "^1.4.0",
       "react-toastify": "^9.1.3"
     },
     "devDependencies": {
       "@vitejs/plugin-react": "^4.0.0",
       "vite": "^4.4.0",
       "tailwindcss": "^3.3.3",
       "postcss": "^8.4.27",
       "autoprefixer": "^10.4.14"
     }
   }
   ```

3. **Configure Vite Proxy**:
   - Ensure `vite.config.js` proxies API requests to the backend:
     ```javascript
     import { defineConfig } from 'vite';
     import react from '@vitejs/plugin-react';

     export default defineConfig({
       plugins: [react()],
       server: {
         proxy: {
           '/api': {
             target: 'http://localhost:5000',
             changeOrigin: true,
             secure: false,
           },
         },
       },
     });
     ```

4. **Configure Tailwind CSS**:
   - Verify `tailwind.config.js`:
     ```javascript
     /** @type {import('tailwindcss').Config} */
     export default {
       content: [
         './index.html',
         './src/**/*.{js,ts,jsx,tsx}',
       ],
       theme: {
         extend: {},
       },
       plugins: [],
     };
     ```
   - Verify `postcss.config.js`:
     ```javascript
     export default {
       plugins: {
         tailwindcss: {},
         autoprefixer: {},
       },
     };
     ```
   - Verify `index.css`:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   - The frontend runs on `http://localhost:5173`.

## Directory Structure

```
online-mcq-system-frontend/
├── src/
│   ├── components/
│   │   ├── ExamList.jsx
│   │   ├── ExamAttempt.jsx
│   │   ├── ResultHistory.jsx
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   └── Home.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Usage

1. **Register/Login**:
   - Navigate to `http://localhost:5173/register` or `/login`.
   - Use `name: Test User`, `email: test@example.com` (seeded user).

2. **Take an Exam**:
   - Go to `/exams`, select an exam (e.g., Math Mock Test).
   - Answer 5 questions and submit.

3. **View Results**:
   - Visit `/history` to see past exam results with scores and answer details.

## Troubleshooting

- **404 Errors**: Ensure backend is running (`http://localhost:5000`) and `vite.config.js` proxy is set.
- **401 Unauthorized**: Verify JWT token in `localStorage` and login with seeded user credentials.
- **Tailwind CSS Issues**: Check browser console (F12) for CSS errors and verify Tailwind configuration.
- **No Results in History**: Submit an exam to populate the `Result` collection.
- Contact: `serendilabs@gmail.com` for support.