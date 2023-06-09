import { Router } from 'express'
import * as flightCtrl from '../controllers/flights.js'

const router = Router()

// GET localhost:3000/users
router.get('/', flightCtrl.index)
router.get('/new', flightCtrl.new)
router.get('/:flightId', flightCtrl.show)
router.get('/:flightId/edit', flightCtrl.edit)
router.post('/', flightCtrl.create)
router.post('/:flightId/tickets', flightCtrl.createTicket)
router.post('/:flightId/meals', flightCtrl.addMeal)
router.delete('/:flightId', flightCtrl.delete)
router.delete('/:flightId/tickets/:ticketId', flightCtrl.deleteTicket)
router.delete('/:flightId/meals/:mealId', flightCtrl.deleteMeal)
router.put('/:flightId', flightCtrl.update)

export { router }
