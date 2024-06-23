import prisma from '../utils/prismaClient'

class TodosService {
	async getTodos() {
		return prisma.todo.findMany({
			orderBy: { order: 'asc' },
		})
	}
	async createTodo(title: string) {
		const lastTodo = await prisma.todo.findFirst({
			orderBy: { order: 'desc' },
		})

		const order = lastTodo ? lastTodo.order + 1 : 0

		return await prisma.todo.create({
			data: { title, order },
		})
	}

	async updateTodo(id: string, title: string, order: number) {
		return await prisma.todo.update({
			where: { id },
			data: { title, order },
		})
	}
	async deleteTodo(id: string) {
		try {
			await prisma.$transaction([
				prisma.task.deleteMany({ where: { todoId: id } }),
				prisma.todo.delete({ where: { id } }),
			])
		} catch (error) {
			console.error('Error deleting todo and associated tasks:', error)
			throw new Error('Failed to delete todo and associated tasks')
		}
	}
}

export default new TodosService()
