import { ObjectId } from 'mongodb'

import dbService from '../../services/dbService'

export default {
  getById,
  add,
  update,
}

const COLLECTION_NAME = 'item'

async function getById(itemId: string) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    const item = collection.findOne({ _id: new ObjectId(itemId) })
    return item
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function add(item: any) {
  try {
    const stateToAdd = { ...item, createdAt: new Date().getTime() }
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.insertOne(stateToAdd)
    return stateToAdd
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function update(item: any) {
  try {
    var id = new ObjectId(item._id)
    delete item._id
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.updateOne({ _id: id }, { $set: { ...item } })
    const addedItem = { ...item, _id: id }
    return addedItem
  } catch (err) {
    console.error(err)
    throw err
  }
}
