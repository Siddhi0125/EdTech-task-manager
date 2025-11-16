import React from 'react';
import { useAuth } from '../context/AuthContext';
import { updateTask, deleteTask } from '../api/taskApi';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate?: string;
  progress: 'not-started' | 'in-progress' | 'completed';
  userId: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdated }) => {
  const { token, user } = useAuth();

  const handleProgressChange: (taskId: string, progress: string) => Promise<void> = async (taskId: string, progress: string) => {
    try {
      await updateTask(token!, taskId, { progress });
      onTaskUpdated();
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleDelete: (taskId: string) => Promise<void> = async (taskId: string) => {
    try {
      await deleteTask(token!, taskId);
      onTaskUpdated();
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</p>
          <p>Progress: {task.progress}</p>
          {user?.id === task.userId && (
            <>
              <select
                value={task.progress}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleProgressChange(task._id, e.target.value)}
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
