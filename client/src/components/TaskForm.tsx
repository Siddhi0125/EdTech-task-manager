import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createTask } from '../api/taskApi';

interface TaskFormProps {
  onTaskAdded: () => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded, onCancel }) => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    progress: 'not-started' as 'not-started' | 'in-progress' | 'completed',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(token!, form);
      onTaskAdded();
      onCancel();
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />
      <select name="progress" value={form.progress} onChange={handleChange}>
        <option value="not-started">Not Started</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default TaskForm;
