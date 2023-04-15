import { Flight } from "../models/flight.js";

function newflight (req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create (req, res) {
  if (req.body.flightN0) {
    req.body.flightN0 = parseInt(req.body.flightN0)
  }
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights/new')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

export {
  newflight as new,
  create,
}