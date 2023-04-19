import { Flight } from "../models/flight.js";
import { Meal } from "../models/meal.js";

function newflight (req, res) {
  const newFlight = new Flight()
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0, 16)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate,
  })
}

function create (req, res) {
  if (req.body.flightN0) {
    req.body.flightN0 = parseInt(req.body.flightN0)
  }
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  Flight.create(req.body)
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function index (req, res) {
  Flight.find({})
  .then(flights => {
    flights.sort((a,b) => {
      return a.departs - b.departs
    })
    res.render('flights/index', {
      flights,
      title: "All Flights"
      // averageReview:
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

function show(req, res) {
  Flight.findById(req.params.flightId)
    .populate('meals')
    .then(flight => {
      Meal.find({})
        .then(meals => {
          res.render('flights/show', {
            flight,
            title: 'Flight Details',
            meals
          })
        })
        .catch(error => {
          console.log(error)
          res.redirect('/flights/')
        })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights/new')
    })
}


function edit (req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/edit', {
      flight, 
      title: 'Edit Flight Details'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function update (req, res) {
  if (req.body.flightN0) {
    req.body.flightN0 = parseInt(req.body.flightN0)
  }
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new:true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function createTicket (req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() =>{
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function deleteTicket (req, res) {
  // find flight by id
  Flight.findById(req.params.flightId)
    .then(flight => {
      flight.tickets.remove({_id: req.params.ticketId})
      // save updated flight
      flight.save()
      .then(() => {
        // redirect user to /flights/:flightId
        res.redirect(`/flights/${req.params.flightId}`)
      })
      .catch(error => {
        console.log(error)
        res.redirect('/flights')
      })
      .catch(error => {
        console.log(error)
        res.redirect('/flights')
      })
    })
}



export {
  newflight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  deleteTicket,
}