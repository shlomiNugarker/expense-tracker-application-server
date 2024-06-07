const MongoClient = require('mongodb').MongoClient

import { Collection } from 'mongodb'

export default { getCollection }

const dbName = 'expense_tracker_db'

var dbConn: any = null

async function getCollection(collectionName: string) {
  try {
    const db = await connect()
    console.log('getCollection')
    const collection: Collection = await db.collection(collectionName)
    return collection
  } catch (err) {
    throw err
  }
}

async function connect() {
  if (dbConn) return dbConn
  try {
    console.log('connect')

    const client = await MongoClient.connect(
      `mongodb+srv://shlomin1231:${process.env.DB_PASSWORD}@cluster0.ysm5t.mongodb.net/social_network_db?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    const db = client.db(dbName)
    dbConn = db
    return db
  } catch (err) {
    throw err
  }
}
