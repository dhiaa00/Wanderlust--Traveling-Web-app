import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  temporaryPrice: {
    type: Number
  },
  temporaryPriceStartDate: {
    type: Date
  },
  temporaryPriceEndDate: {
    type: Date
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: true
  }
},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Offer = mongoose.model('Offer', offerSchema);

export {Offer};
