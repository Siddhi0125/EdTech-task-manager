import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const { token, user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    if (!token) return;
    const res = await getTasks(token!);
    setTasks(res.data.tasks);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    await createTask(token!, form);
    fetchTasks();
  };

  const handleUpdate = async (id: string, data: any) => {
    if (!token) return;
    await updateTask(token!, id, data);
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    await deleteTask(token!, id);
    fetchTasks();
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t: any) => t.progress === filter);

  return (
    <div style={{ margin: 40 }}>
      <h2>Dashboard</h2>
      <p>Logged in as: {user?.role}</p>

      {user?.role === "student" && (
        <p>Assigned Teacher: {user?.teacherId}</p>
      )}

      <button onClick={logout}>Logout</button>

      <h3>Add Task</h3>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, title: e.target.value })}
        /><br/>

        <input
          placeholder="Description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, description: e.target.value })}
        /><br/>

        <input
          type="date"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, dueDate: e.target.value })}
        /><br/>

        <button>Add</button>
      </form>

      <h3>Filter Tasks</h3>
      <select value={filter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="not-started">Not Started</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <h2>Your Tasks</h2>
      {filteredTasks.map((task: any) => (
        <div key={task._id}>
          <TaskCard
            task={task}
            user={user!}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
