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
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function index (req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights,
      title: "All Flights"
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function deleteFlight (req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(deletedFlight =>{
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function show (req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/show', {
      flight,
      title: 'Flight Details'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })

}

export {
  newflight as new,
  create,
  index,
  deleteFlight as delete,
  show,
}