import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    temporaryPrice: {
      type: Number,
    },
    temporaryPriceStartDate: {
      type: Date,
    },
    temporaryPriceEndDate: {
      type: Date,
    },
    thumbImageUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4=",
    },
    otherImagesUrl: {
      type: Array,
      default: [],
    },
    videoUrl: {
      type: String,
      default: "",
    },
    collaborations: [
      {
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        contact: {
          type: String,
          required: true,
        },
        priority: {
          type: String,
        },
      },
    ],
    agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agency",
      required: true,
    },
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Offer = mongoose.model("Offer", offerSchema);

export { Offer };
