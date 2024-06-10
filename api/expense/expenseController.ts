import { CustomRequest } from '../../services/jwtService'
import expenseService from './expenseService'
import { Response } from 'express'

export default {
  getExpenses,
  getExpenseById,
  updateExpense,
  addExpense,
  removeExpense,
}

async function getExpenses(req: CustomRequest, res: Response) {
  try {
    const { userId } = req

    if (userId) {
      const expenses = await expenseService.getExpenses(userId)
      res.json(expenses)
    }
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to get Expenses' })
  }
}
async function getExpenseById(req: CustomRequest, res: Response) {
  try {
    const { id } = req.params
    const { userId } = req

    const expense = await expenseService.getById(id)

    if (userId !== expense?.userId)
      return res.status(400).json({ msg: 'Cant get expense' })

    res.json(expense)
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to get expense By Id' })
  }
}

async function updateExpense(req: CustomRequest, res: Response) {
  try {
    const { userId } = req
    const expense = req.body

    if (userId !== expense.userId)
      return res.status(400).json({ msg: 'Cant get expense' })

    const addeditem = await expenseService.update(expense)
    res.json(addeditem)
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to update expense' })
  }
}

async function addExpense(req: CustomRequest, res: Response) {
  try {
    const expense = req.body
    const addeditem = await expenseService.add(expense)

    res.json(addeditem)
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to add expense' })
  }
}
async function removeExpense(req: CustomRequest, res: Response) {
  try {
    const { userId } = req
    const { id } = req.params
    const deletedId = await expenseService.remove(id)
    if (deletedId) {
      res.status(200).json({ _id: deletedId })
    } else {
      res.status(404).json({ error: 'Expense not found' })
    }
  } catch (err) {
    res.status(500).send({ err: 'Failed to delete expense' })
  }
}
