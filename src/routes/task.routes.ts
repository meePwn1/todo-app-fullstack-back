import { Router } from 'express'
import TaskController from '../controllers/task.controller'

const router = Router({ mergeParams: true })

router.get('/', TaskController.getTasks)
router.post('/', TaskController.createTask)
router.put('/:id', TaskController.updateTask)
router.delete('/:id', TaskController.deleteTask)

export default router
