import { Router } from 'express'
import * as mealCtrl from '../controllers/meals.js'

const router = Router()

// GET localhost:3000/
router.get('/new', mealCtrl.new)
router.post('/', mealCtrl.create)

export { router }