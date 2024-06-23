import { Request, Response } from 'express'
import { HttpStatus } from '../constants/status_codes'
import TodosService from '../services/todos.service'

class TodoController {
	async getTodos(req: Request, res: Response) {
		try {
			const todos = await TodosService.getTodos()
			res.status(HttpStatus.OK).json(todos)
		} catch (error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
		}
	}

	async createTodo(req: Request, res: Response) {
		try {
			const { title } = req.body
			const todo = await TodosService.createTodo(title)
			res.status(HttpStatus.CREATED).json(todo)
		} catch (error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
		}
	}

	async updateTodo(req: Request, res: Response) {
		try {
			const { id } = req.params
			const { title, order } = req.body
			const todo = await TodosService.updateTodo(id, title, order)
			res.status(HttpStatus.OK).json(todo)
		} catch (error) {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
		}
	}

	async deleteTodo(req: Request, res: Response) {
		try {
			const { id } = req.params
			await TodosService.deleteTodo(id)
			res.status(HttpStatus.NO_CONTENT).send()
		} catch (error) {
			console.error('Error deleting todo:', error)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
		}
	}
}

export default new TodoController()
