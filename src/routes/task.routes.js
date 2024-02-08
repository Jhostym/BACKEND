import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getTasks, getTask, createTasks, deleteTasks, updateTasks } from '../controllers/task.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTasksSchema } from '../schemas/task.schema.js';

const router = Router();

router.get('/tasks', authRequired, getTasks)
router.get('/tasks/:id', authRequired, getTask)
router.post('/tasks', authRequired, validateSchema(createTasksSchema), createTasks)
router.delete('/tasks/:id', authRequired, deleteTasks)
router.put('/tasks/:id', authRequired, updateTasks)

export default router;
