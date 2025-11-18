# EdTech Learning Task Manager

A full-stack application for managing learning tasks with role-based access control for Students and Teachers.

## Features

- **Authentication**: Email/password signup and login with JWT tokens.
- **Role-Based Access**:
  - **Students**: CRUD only on their own tasks.
  - **Teachers**: View tasks of assigned students, CRUD only on their own tasks.
- **Task Management**: Create, read, update, delete tasks with title, description, due date, and progress status.
- **Filtering**: Filter tasks by progress status.
- **Responsive UI**: Built with React and CSS.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Joi
- **Frontend**: React, TypeScript, Axios, React Router DOM
- **Database**: MongoDB

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the `server` directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `server` directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/edtech-task-manager
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `client` directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Role Functionality Explanation

### Student Role
- Can only view and manage their own tasks.
- Must provide a teacher ID during signup to establish the Student-Teacher relationship.
- Dashboard displays their assigned teacher's information.

### Teacher Role
- Can view all tasks created by themselves and tasks belonging to their assigned students.
- Can only edit or delete tasks they personally created.
- Cannot modify tasks created by students.

### Authorization Logic
- **GET /tasks**: Teachers fetch tasks using a query that includes their own tasks and tasks of students where `teacherId` matches the teacher's ID. Students fetch only their own tasks.
- **PUT /tasks/:id** and **DELETE /tasks/:id**: Only the task owner (userId matches the logged-in user) can update or delete the task. This ensures teachers cannot edit student tasks.

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Create new user (role: student or teacher)
- `POST /api/auth/login`: Login and receive JWT token

### Tasks
- `GET /api/tasks`: Get tasks based on role
- `POST /api/tasks`: Create new task
- `PUT /api/tasks/:id`: Update task (only owner)
- `DELETE /api/tasks/:id`: Delete task (only owner)

## AI Assistance Disclosure

I used AI tools during this project mainly for support and guidance, not as a replacement for my own work. AI helped me with things like structuring some React components, organizing state management patterns, and writing a few boilerplate sections such as Axios API functions. I also used it to debug certain issues and get ideas for improving responsiveness in the UI.

However, all core logic—especially the authentication flow, authorization rules, task CRUD functionality, and overall application wiring—was fully implemented, reviewed, and understood by me. I made sure I knew exactly how everything works, and I manually tested the complete system end-to-end.


## Known Issues

- Teacher info display for students is placeholder; requires additional API endpoint to fetch teacher details by ID.
- No pagination implemented for large task lists.
- No date filtering or overdue task highlighting.

## Suggestions for Improvement

- Add pagination for teacher task views.
- Implement date filtering (e.g., tasks due this week).
- Add email notifications for due dates.
- Enhance UI with a CSS framework like Tailwind CSS.
- Add unit and integration tests.
- Implement deployment to a platform like Render or Heroku.
