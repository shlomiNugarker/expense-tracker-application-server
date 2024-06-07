import itemService from './itemService'
import { Request, RequestHandler, Response } from 'express'

export default { getItemById, updateItem, addItem }

async function getItemById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const item = await itemService.getById(id)
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to get Item By Id' })
  }
}

async function updateItem(req: Request, res: Response) {
  try {
    const item = req.body
    const addeditem = await itemService.update(item)
    res.json(addeditem)
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to update item' })
  }
}

async function addItem(req: Request, res: Response) {
  try {
    const item = req.body
    const addeditem = await itemService.add(item)
    res.json(addeditem)
  } catch (err) {
    console.error(err)
    res.status(401).send({ err: 'Failed to add item' })
  }
}
