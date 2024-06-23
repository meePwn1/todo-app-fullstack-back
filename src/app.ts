import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import taskRoutes from './routes/task.routes'
import todosRoutes from './routes/todos.routes'
import prisma from './utils/prismaClient'

async function main() {
	try {
		await prisma.$connect()
		console.log('Successfully connected to PostgreSQL')
	} catch (error) {
		console.error('Error:', error)
	} finally {
		await prisma.$disconnect()
	}
}
main()

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/todos', todosRoutes)
app.use('/todos/:todosId/tasks', taskRoutes)

// Обработчик ошибок
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack)
	res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
