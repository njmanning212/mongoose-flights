import { Meal } from "../models/meal.js";

function newMeal (req, res) {
  Meal.find({})
  .then(meals => {
    res.render('meals/new', {
      title: 'New Meal',
      meals 
    })
  })
  .catch(error => {
    console.log(error)
    res.render('meals/new')
  })
}

export {
  newMeal as new,
}