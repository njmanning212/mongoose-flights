import { Meal } from "../models/meal.js";


function newMeal (req, res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      title: 'New Meal',
      meals,
      error: false 
    })
  })
  .catch(error => {
    console.log(error)
    res.render('meals/new')
  })
}

function create (req, res) {
  Meal.find({})
  .then(meals => {
    if (req.body.name === '') {
      res.redirect('/meals/new')
    }
    Meal.findOne({name: req.body.name})
    .then(duplicateMeal=> {
      if (duplicateMeal) {
        res.render('meals/new', {
          title: 'New Meal',
          meals,
          error: true
        })
      } else {
        Meal.create(req.body)
        .then (meal => {
          res.redirect('/meals/new')
        })
        .catch(error => {
          console.log(error)
          res.render('meals/new')
        })
      }
    })
    .catch(error => {
      console.log(error)
      res.render('meals/new')
    })
  })
  .catch(error => {
    console.log(error)
    res.render('meals/new')
  })
}

export {
  newMeal as new,
  create,
}