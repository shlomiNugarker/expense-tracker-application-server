import { ObjectId } from 'mongodb'

import dbService from '../../services/dbService'

export default {
  getById,
  add,
  update,
  remove,
  getExpenses,
}

const COLLECTION_NAME = 'expense'

async function getExpenses(filterBy = {}) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    const expenses = collection.find({}).toArray()
    return expenses
  } catch (err) {
    throw err
  }
}

async function getById(id: string) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    const expense = collection.findOne({ _id: new ObjectId(id) })
    return expense
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function add(expense: any) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.insertOne(expense)
    return expense
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function update(expense: any) {
  try {
    var id = new ObjectId(expense._id)
    delete expense._id
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.updateOne({ _id: id }, { $set: { ...expense } })
    const addedExpense = { ...expense, _id: id }
    return addedExpense
  } catch (err) {
    console.error(err)
    throw err
  }
}
async function remove(id: string) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.deleteOne({ _id: new ObjectId(id) })
    return id
  } catch (err) {
    throw err
  }
}
