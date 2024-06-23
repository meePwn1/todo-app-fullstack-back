import { Request, Response } from 'express'
import { HttpStatus } from '../constants/status_codes'
import TaskService from '../services/task.service'

class TaskController {
	async getTasks(req: Request, res: Response) {
		try {
			const { todosId } = req.params
			const tasks = await TaskService.getTasks(todosId)
			res.status(HttpStatus.OK).json(tasks)
		} catch (error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
		}
	}

	async createTask(req: Request, res: Response) {
		try {
			const { todosId } = req.params
			const { title } = req.body
			const task = await TaskService.createTask({
				title,
				todoId: todosId,
			})
			res.status(201).json(task)
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' })
		}
	}

	async updateTask(req: Request, res: Response) {
		try {
			const { id, todosId } = req.params
			const { title, completed } = req.body
			const task = await TaskService.updateTask(id, {
				title,
				completed,
				todoId: todosId,
			})
			res.status(200).json(task)
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' })
		}
	}

	async deleteTask(req: Request, res: Response) {
		try {
			const { id, todosId } = req.params
			await TaskService.deleteTask(id, todosId)
			res.status(204).send()
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' })
		}
	}
}

export default new TaskController()
