const Task = require('../models/Task');
const User = require('../models/User');

// GET /tasks
exports.getTasks = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;

    if (role === 'student') {
      // student: only own tasks
      const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
      return res.json({ success: true, tasks });
    }

    // role === teacher
    // teacher: tasks created by teacher OR tasks belonging to their assigned students
    // find students of this teacher
    const students = await User.find({ teacherId: userId }).select('_id');
    const studentIds = students.map(s => s._id);

    const tasks = await Task.find({
      $or: [
        { userId: userId },
        { userId: { $in: studentIds } }
      ]
    }).sort({ createdAt: -1 });

    return res.json({ success: true, tasks });
  } catch (err) {
    next(err);
  }
};

// POST /tasks
exports.createTask = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { title, description, dueDate } = req.body;
    // userId must match logged-in user - enforced by server (we don't accept arbitrary userId in body)
    const task = new Task({ userId, title, description, dueDate });
    await task.save();
    res.status(201).json({ success: true, message: 'Task created successfully', task });
  } catch (err) {
    next(err);
  }
};

// PUT /tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    // Only owner (creator) can modify
    if (task.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not allowed to modify this task' });
    }

    Object.assign(task, updates);
    await task.save();
    res.json({ success: true, message: 'Task updated successfully', task });
  } catch (err) {
    next(err);
  }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    if (task.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not allowed to delete task' });
    }

    await task.remove();
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
};
