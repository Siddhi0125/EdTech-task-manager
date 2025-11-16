import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { getTasks } from '../api/taskApi';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate?: string;
  progress: 'not-started' | 'in-progress' | 'completed';
  userId: string;
}

const Dashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(token!);
      setTasks(response.data.tasks);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.progress === filter);

  return (
    <div className="dashboard">
      <header>
        <h1>Task Manager</h1>
        <div className="user-info">
          <p>Role: {user?.role}</p>
          {user?.role === 'student' && <p>Teacher ID: {user.teacherId}</p>}
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <div className="controls">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
        <select value={filter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {showForm && <TaskForm onTaskAdded={fetchTasks} onCancel={() => setShowForm(false)} />}
      <TaskList tasks={filteredTasks} onTaskUpdated={fetchTasks} />
    </div>
  );
};

export default Dashboard;
