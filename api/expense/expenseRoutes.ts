import express from 'express'
import itemController from './expenseController'

const router = express.Router()

router.get('/', itemController.getExpenses)
router.get('/:id', itemController.getExpenseById)
router.put('/:id', itemController.updateExpense)
router.post('/', itemController.addExpense)
router.delete('/:id', itemController.removeExpense)

export default router
