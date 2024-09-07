import { Agency } from "../models/Agency.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const updateAgencyName = async (req, res) => {
  try {
    const agencyId = req.params.id;
    let agency = await Agency.findById(agencyId);
    if (!agency) {
      return res.status(404).json({ message: "Agency not found", data: null });
    }

    const newAgencyName = req.body.agencyName;
    if (newAgencyName === agency.agencyName) {
      return res
        .status(400)
        .json({ message: "You should enter a new agency name", data: null });
    }

    agency = await Agency.findByIdAndUpdate(
      agencyId,
      { agencyName: newAgencyName },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Agency name updated successfully", data: agency });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", data: null });
  }
};

const updateAgencyPhoto = async (req, res) => {
  const agencyId = req.params.id;
  try {
    let agency = await Agency.findById(agencyId);
    if (!agency) {
      return res.status(404).json({ message: "Agency not found", data: null });
    }
    const newPhotoLink = req.body.profilePhoto;
    agency = await Agency.findByIdAndUpdate(
      agencyId,
      { agencyPhoto: newPhotoLink },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Profile photo updated successfully", data: agency });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", data: null });
  }
};

const updateAgencyLocation = async (req, res) => {
  const agencyId = req.params.id;
  try {
    let agency = await Agency.findById(agencyId);
    if (!agency) {
      return res.status(404).json({ message: "Agency not found", data: null });
    }
    const newLocation = req.body.location;
    agency = await Agency.findByIdAndUpdate(
      agencyId,
      { location: newLocation },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Location updated successfully", data: agency });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", data: null });
  }
};

const updateAgencyBio = async (req, res) => {
  const agencyId = req.params.id;
  try {
    let agency = await Agency.findById(agencyId);
    if (!agency) {
      return res.status(404).json({ message: "Agency not found", data: null });
    }
    const newBio = req.body.bio;
    agency = await Agency.findByIdAndUpdate(
      agencyId,
      { bio: newBio },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Bio updated successfully", data: agency });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", data: null });
  }
};

const updateAgencyPassword = async (req, res) => {
  const agencyId = req.params.id;
  try {
    let agency = await Agency.findById(agencyId);
    if (!agency) {
      return res.status(404).json({ message: "Agency not found", data: null });
    }

    const { currentPassword, newPassword } = req.body;

    const isMatched = await bcrypt.compare(currentPassword, agency.password);

    if (!isMatched) {
      return res
        .status(400)
        .json({ message: "Password is not correct", data: null });
    }

    const notChanged = await bcrypt.compare(newPassword, agency.password);

    if (notChanged) {
      return res
        .status(400)
        .json({ message: "Password must be different", data: null });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    agency.password = hashedPassword;
    await agency.save();

    const token = jwt.sign({ id: agency._id }, process.env.JWT_PASSWORD, {
      expiresIn: "30d",
    });

    res.cookie("authorization", token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    });

    res
      .status(200)
      .json({ message: "Password updated successfully", data: agency });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update password", error: error.message });
  }
};

const updateAgencyEmail = async (req, res) => {
  const agencyId = req.params.id;
  let agency = await Agency.findById(agencyId);

  if (!agency) {
    return res.status(404).json({ message: "Agency not found", data: null });
  }

  const newEmail = req.body.email;

  if (newEmail === agency.email) {
    return res
      .status(400)
      .json({ message: "You should enter a new email", data: null });
  }

  try {
    const isMatched = await bcrypt.compare(newEmail, agency.email);
    if (isMatched) {
      return res
        .status(400)
        .json({ message: "Email already exists", data: null });
    }

    agency.email = newEmail;
    await agency.save();

    res
      .status(200)
      .json({ message: "Email updated successfully", data: agency });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update email", error: error.message });
  }
};

const deleteAgency = async (req, res) => {
  const agencyId = req.params.id;
  try {
    const agency = await Agency.findByIdAndDelete(agencyId);
    if (!agency) {
      return res.status(404).json({ message: "Agency not found", data: null });
    }
    res
      .status(200)
      .json({ message: "Agency deleted successfully", data: null });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete agency", error: error.message });
  }
};

const verifyAgency = async (req, res) => {
  const confirmationId = req.params.confirmationId;
  const verificationCode = req.body.verificationCode;
  try {
    const agency = await Agency.findOne({ confirmationId: confirmationId });
    if (!agency) {
      return res.status(404).json({ message: "User not found", data: null });
    }
    if (agency.verificationCode !== verificationCode) {
      return res.status(400).json({
        message: "Invalid verification code",
        data: error.message,
      });
    }
    agency.verified = true;
    await agency.save();
    agency.password = undefined;
    res
      .status(200)
      .json({ message: "User verified successfully", data: agency });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to verify user", error: error.message });
  }
};

const getProfileImage = async (req, res) => {
  const agencyId = req.params.id;
  try {
    const agency = await Agency.findById(agencyId);
    if (!agency) {
      return res.status(404).json({ message: "Agency not found", data: null });
    }
    res.status(200).json({
      message: "Profile image found successfully",
      profileImage: agency.agencyPhoto,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get profile image", error: error.message });
  }
};

export {
  updateAgencyEmail,
  updateAgencyName,
  updateAgencyPhoto,
  updateAgencyPassword,
  deleteAgency,
  verifyAgency,
  getProfileImage,
  updateAgencyLocation,
  updateAgencyBio,
};
