import React from 'react';

interface Task {
  _id: string;
  title: string;
  description: string;
  progress: string;
  dueDate?: string;
  userId: string;
}

interface User {
  id: string;
  role: string;
}

interface TaskCardProps {
  task: Task;
  user: User;
  onUpdate: (id: string, data: any) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onUpdate, onDelete, user }: TaskCardProps) => {
  const isOwner = user.id === task.userId;

  return (
    <div style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Progress: {task.progress}</p>
      <p>Due: {task.dueDate ? task.dueDate.substring(0, 10) : "None"}</p>

      {isOwner && (
        <>
          <select
            value={task.progress}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onUpdate(task._id, { progress: e.target.value })
            }
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button onClick={() => onDelete(task._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskCard;
