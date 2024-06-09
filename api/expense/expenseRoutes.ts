import express from 'express'
import expenseController from './expenseController'
import { jwtService } from '../../services/jwtService'

const router = express.Router()

const { validateToken } = jwtService

router.get('/:userId', validateToken, expenseController.getExpenses)
router.get('/:id', validateToken, expenseController.getExpenseById)
router.put('/:id', validateToken, expenseController.updateExpense)
router.post('/', validateToken, expenseController.addExpense)
router.delete('/:id', validateToken, expenseController.removeExpense)

export default router
