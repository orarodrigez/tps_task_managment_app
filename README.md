# Task Management Application

A full-stack task management application with a Node.js/Express backend and React frontend.

## Features

### Backend (Node.js/Express)
- RESTful API with CORS support
- SQLite database integration
- Task CRUD operations
- Proper error handling

### Frontend (React)
- Create tasks with title and description
- View all tasks with progress tracking
- Mark tasks as complete/incomplete
- Edit task details
- Search tasks by title
- Responsive design with modern UI

## Project Structure

```
project tasks/
├── backend/
│   ├── server.js           # Express server entry point
│   ├── database.js         # SQLite database module
│   ├── package.json        # Backend dependencies
│   └── .gitignore
└── frontend/
    ├── public/
    │   └── index.html      # HTML entry point
    ├── src/
    │   ├── App.js          # Main app component
    │   ├── App.css
    │   ├── index.js        # React DOM render
    │   ├── index.css
    │   └── components/
    │       ├── TaskForm.js      # Add task form
    │       ├── TaskList.js      # Task list display
    │       ├── TaskItem.js      # Individual task item
    │       └── SearchBar.js     # Search functionality
    ├── package.json        # Frontend dependencies
    └── .gitignore
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```
Or for development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## API Endpoints

### Get All Tasks
```
GET /api/tasks
```

### Create a New Task
```
POST /api/tasks
Body: {
  "title": "Task title",
  "description": "Task description"
}
```

### Update a Task
```
PUT /api/tasks/:id
Body: {
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

## Task Object Structure

```json
{
  "id": "uuid",
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "createdAt": "2025-02-08T10:00:00Z",
  "updatedAt": "2025-02-08T10:00:00Z"
}
```

## Usage

1. **Create a Task**: Fill in the form at the top with a title and optional description, then click "Add Task"
2. **View Tasks**: All tasks are displayed in the main list with a progress bar
3. **Mark Complete**: Click the checkbox next to a task to mark it as complete/incomplete
4. **Edit Task**: Click the edit icon (✎) on a task to modify its title or description
5. **Search**: Use the search bar to filter tasks by title

## Features Implemented

✅ GET /api/tasks - Retrieve all tasks
✅ POST /api/tasks - Create new task
✅ PUT /api/tasks/:id - Update task (title, description, completion status)
✅ CORS configured for frontend integration
✅ SQLite database with persistent storage
✅ Task creation with title and description
✅ Mark tasks as complete/incomplete
✅ Search tasks by title keyword
✅ Responsive design
✅ Task progress tracking
✅ Edit existing tasks
✅ Error handling and validation
