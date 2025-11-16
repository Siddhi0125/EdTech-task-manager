const { body } = require('express-validator');

exports.signupValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  body('role').isIn(['student', 'teacher']).withMessage('role must be student or teacher'),
  body('teacherId').custom((value, { req }) => {
    if (req.body.role === 'student' && !value) throw new Error('teacherId required for student');
    return true;
  })
];

exports.loginValidator = [
  body('email').isEmail(),
  body('password').exists()
];

exports.taskCreateValidator = [
  body('title').notEmpty().withMessage('Title required'),
  body('description').optional().isString(),
  body('dueDate').optional().isISO8601().toDate(),
];

exports.taskUpdateValidator = [
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('progress').optional().isIn(['not-started','in-progress','completed'])
];
