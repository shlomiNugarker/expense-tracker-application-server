const MongoClient = require('mongodb').MongoClient

import { Collection } from 'mongodb'
import config from '../config/index'

export default { getCollection }

const dbName = 'expense_tracker_db'

var dbConn: any = null

async function getCollection(collectionName: string) {
  try {
    const db = await connect()
    const collection: Collection = await db.collection(collectionName)
    return collection
  } catch (err) {
    throw err
  }
}

async function connect() {
  if (dbConn) return dbConn
  try {
    const client = await MongoClient.connect(config.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const db = client.db(dbName)
    dbConn = db
    return db
  } catch (err) {
    throw err
  }
}
