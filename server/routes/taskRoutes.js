const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { taskCreateValidator, taskUpdateValidator } = require('../utils/validators');
const validate = require('../middleware/validate');

router.use(auth);

router.get('/', getTasks);
router.post('/', taskCreateValidator, validate, createTask);
router.put('/:id', taskUpdateValidator, validate, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
