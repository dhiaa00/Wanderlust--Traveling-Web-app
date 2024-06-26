import { Agency } from "../models/Agency.js";
import { Offer } from "../models/Offer.js";

const createOffer = async (req, res) => {
  try {
    const {
      title,
      country,
      description,
      placeFrom,
      placeTo,
      flightTime,
      flightDuration,
      price,
      startDate,
      endDate,
      thumbImageUrl,
      otherImagesUrl,
      videoUrl,
      categories,
      agencyId,
    } = req.body;
    const offer = new Offer({
      title,
      country,
      placeTo,
      placeFrom,
      flightTime,
      flightDuration,
      description,
      price,
      startDate,
      endDate,
      thumbImageUrl,
      otherImagesUrl,
      videoUrl,
      categories,
      agency: agencyId,
    });
    const savedOffer = await offer.save();
    res
      .status(201)
      .json({ message: "Offer created successfully", data: savedOffer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create offer", error: error.message });
  }
};

const updateOfferById = async (req, res) => {
  try {
    const offerId = req.params.id;
    const agencyId = req.agency.id;
    const {
      title,
      startDate,
      endDate,
      flightTime,
      flightDuration,
      country,
      placeFrom,
      placeTo,
      description,
      thumbImageUrl,
      price,
      temporaryPrice,
      temporaryPriceDurationDays,
    } = req.body;

    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found", data: null });
    }

    if (offer.agency.toString() !== agencyId.toString()) {
      return res.status(403).json({ message: "Unauthorized", data: null });
    }

    // Update offer fields
    offer.title = title;
    offer.description = description;
    offer.country = country;
    offer.placeFrom = placeFrom;
    offer.placeTo = placeTo;
    offer.flightTime = flightTime;
    offer.flightDuration = flightDuration;
    offer.price = price;
    offer.startDate = startDate;
    offer.endDate = endDate;
    offer.thumbImageUrl = thumbImageUrl;

    // Handle temporary price update
    if (temporaryPrice && temporaryPriceDurationDays) {
      const currentDate = new Date();
      const temporaryEndDate = new Date();
      temporaryEndDate.setDate(
        currentDate.getDate() + temporaryPriceDurationDays
      );

      offer.temporaryPrice = temporaryPrice;
      offer.temporaryPriceStartDate = currentDate;
      offer.temporaryPriceEndDate = temporaryEndDate;
    } else {
      // Clear temporary price fields
      offer.temporaryPrice = undefined;
      offer.temporaryPriceStartDate = undefined;
      offer.temporaryPriceEndDate = undefined;
    }

    const updatedOffer = await offer.save();

    res
      .status(200)
      .json({ message: "Offer updated successfully", data: updatedOffer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update offer", error: error.message });
  }
};

const deleteOfferById = async (req, res) => {
  try {
    const offerId = req.params.id;
    const agencyId = req.agency._id; // Assuming the authenticated user is an agency

    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found", data: null });
    }

    if (offer.agency.toString() !== agencyId.toString()) {
      return res.status(403).json({ message: "Unauthorized", data: null });
    }

    await Offer.findByIdAndDelete(offerId);

    res.status(200).json({ message: "Offer deleted successfully", data: null });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete offer", error: error.message });
  }
};

const getAllOffers = async (req, res) => {
  try {
    const { id } = req.body; // Assuming the authenticated user is an agency
    if (!id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing agency ID" });
    }
    const offers = await Offer.find({ agency: id });
    return res
      .status(200)
      .json({ message: "Offers retrieved successfully", data: offers });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve offers",
      error: error,
    });
  }
};

const getOfferById = async (req, res) => {
  try {
    const offerId = req.params.id;
    const agencyId = req.agency._id;
    const offer = await Offer.findOne({ _id: offerId, agency: agencyId });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found", data: null });
    }

    res
      .status(200)
      .json({ message: "Offer retrieved successfully", data: offer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve offer", error: error.message });
  }
};

const offerSearch = async (req, res) => {
  try {
    const { id, searchInput } = req.body;
    const offers = await Offer.find({
      agency: id,
      $or: [
        { title: { $regex: searchInput, $options: "i" } },
        { country: { $regex: searchInput, $options: "i" } },
      ],
    });
    return res
      .status(200)
      .json({ message: "Offers retrieved successfully", data: offers });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve offers",
      error: error,
    });
  }
};

const addCollaboration = async (req, res) => {
  try {
    const offerId = req.params.id;
    const agencyId = req.agency._id;
    const { name, type, contact, priority } = req.body;

    const offer = await Offer.findOne({ _id: offerId, agency: agencyId });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found", data: null });
    }

    offer.collaborations.push({ name, type, contact, priority });
    const updatedOffer = await offer.save();

    res.status(200).json({
      message: "Collaboration added successfully",
      data: updatedOffer.collaborations,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add collaboration", error: error.message });
  }
};

export {
  createOffer,
  getAllOffers,
  updateOfferById,
  deleteOfferById,
  getOfferById,
  offerSearch,
  addCollaboration,
};
