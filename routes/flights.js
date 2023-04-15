import { Router } from 'express'
import * as flightCtrl from '../controllers/flights.js'

const router = Router()

// GET localhost:3000/users
router.get('/', flightCtrl.index)
router.get('/new', flightCtrl.new)
router.get('/:flightId', flightCtrl.show)
router.post('/', flightCtrl.create)
router.delete('/:flightId', flightCtrl.delete)

export { router }
