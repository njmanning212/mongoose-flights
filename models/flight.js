import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = mongoose.Schema ({
  seat: {type: String, match: /[A-F][1-9]\d?/}, 
  price: {
    type: Number,
    min: 0
  }
})

const flightSchema = new Schema ({
  airline: {
    type: String, 
    required: true, 
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String,
    required: true,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN',
  },
  flightNo: {
    min: 10, 
    max: 9999, 
    type: Number,
  },
  departs: {
    type: Date,
    default: function (){
      let today = new Date();
      let oneYearFromToday = new Date(today.getTime());
      oneYearFromToday.setFullYear(today.getFullYear() + 1);
      return oneYearFromToday
    }
  }, 
  tickets: [ticketSchema], 
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight,
}
