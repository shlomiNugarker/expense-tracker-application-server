import express from 'express'
import expenseController from './expenseController'

const router = express.Router()

router.get('/', expenseController.getExpenses)
router.get('/:id', expenseController.getExpenseById)
router.put('/:id', expenseController.updateExpense)
router.post('/', expenseController.addExpense)
router.delete('/:id', expenseController.removeExpense)

export default router
