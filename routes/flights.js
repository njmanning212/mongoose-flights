import { Router } from 'express'
import * as flightCtrl from '../controllers/flights.js'

const router = Router()

// GET localhost:3000/users
router.get('/new', flightCtrl.new)
router.post('/', flightCtrl.create)

export { router }
