import { Flight } from "../models/flight.js";

function newflight (req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })

}

export {
  newflight as new,
}