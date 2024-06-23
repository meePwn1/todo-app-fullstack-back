import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../constants/status_codes'
import TaskService from '../services/task.service'

class TaskController {
	async getTasks(req: Request, res: Response, next: NextFunction) {
		try {
			const { todosId } = req.params
			const tasks = await TaskService.getTasks(todosId)
			res.status(HttpStatus.OK).json(tasks)
		} catch (error) {
			next(error)
		}
	}

	async createTask(req: Request, res: Response, next: NextFunction) {
		try {
			const { todosId } = req.params
			const { title } = req.body
			const task = await TaskService.createTask({
				title,
				todoId: todosId,
			})
			res.status(201).json(task)
		} catch (error) {
			next(error)
		}
	}

	async updateTask(req: Request, res: Response, next: NextFunction) {
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
			next(error)
		}
	}

	async deleteTask(req: Request, res: Response, next: NextFunction) {
		try {
			const { id, todosId } = req.params
			await TaskService.deleteTask(id, todosId)
			res.status(204).send()
		} catch (error) {
			next(error)
		}
	}
}

export default new TaskController()
