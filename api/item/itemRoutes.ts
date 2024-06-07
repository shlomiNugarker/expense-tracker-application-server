import express from 'express'
import itemController from './itemController'

const router = express.Router()

router.get('/:id', itemController.getItemById)
router.put('/:id', itemController.updateItem)
router.post('/', itemController.addItem)

export default router
