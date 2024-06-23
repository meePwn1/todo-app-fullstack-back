import prisma from '../utils/prismaClient'

class TaskService {
	async getTasks(todosId: string) {
		return await prisma.task.findMany({
			where: { todoId: todosId },
			orderBy: { order: 'asc' },
		})
	}

	async createTask(data: { title: string; todoId: string }) {
		const lastTask = await prisma.task.findFirst({
			where: { todoId: data.todoId },
			orderBy: { order: 'desc' },
		})

		const order = lastTask ? lastTask.order + 1 : 0

		return await prisma.task.create({
			data: {
				title: data.title,
				description: '',
				status: 0,
				priority: 0,
				deadline: new Date(),
				startDate: new Date(),
				completed: false,
				order,
				todoId: data.todoId,
			},
		})
	}

	async updateTask(
		id: string,
		data: {
			title: string
			completed: boolean
			todoId: string
		}
	) {
		return await prisma.task.update({
			where: { id, todoId: data.todoId },
			data,
		})
	}

	async deleteTask(id: string, todolistId: string) {
		return await prisma.task.delete({ where: { id, todoId: todolistId } })
	}
}

export default new TaskService()
