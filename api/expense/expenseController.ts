import expenseService from './expenseService'
import { Request, Response } from 'express'

export default {
  getExpenses,
  getExpenseById,
  updateExpense,
  addExpense,
  removeExpense,
}

async function getExpenses(req: Request, res: Response) {
  try {
    const { id } = req.params
    const expense = await expenseService.getExpenses()
    res.json(expense)
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to get Expenses' })
  }
}
async function getExpenseById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const expense = await expenseService.getById(id)
    res.json(expense)
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to get expense By Id' })
  }
}

async function updateExpense(req: Request, res: Response) {
  try {
    const expense = req.body
    const addeditem = await expenseService.update(expense)
    res.json(addeditem)
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to update expense' })
  }
}

async function addExpense(req: Request, res: Response) {
  try {
    const expense = req.body
    const addeditem = await expenseService.add(expense)
    res.json(addeditem)
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to add expense' })
  }
}
async function removeExpense(req: Request, res: Response) {
  try {
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
