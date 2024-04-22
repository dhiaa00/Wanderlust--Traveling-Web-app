import {Agency} from '../models/Agency.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const updateAgencyName = async (req, res) => {
  try {
    const agencyId = req.params.id;
    let agency = await Agency.findById(agencyId);
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found', data: null });
    }

    const newAgencyName = req.body.agencyName;
    if (newAgencyName === agency.agencyName) {
      return res.status(400).json({ message: 'You should enter a new agency name', data: null });
    }
    
    agency = await Agency.findByIdAndUpdate(agencyId, { agencyName: newAgencyName }, { new: true });
    return res.status(200).json({ message: 'Agency name updated successfully', data: agency });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', data: null });
  }
};

const updateAgencyPassword = async (req, res) => {
  const agencyId = req.params.id; 
  let agency = await Agency.findById(agencyId);
  if (!agency) {
    return res.status(404).json({ message: 'Agency not found', data: null });
  }

  const newPassword = req.body.password;
  
  if (newPassword === agency.password) {
    return res.status(400).json({ message: 'You should enter a new password', data: null });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    agency.password = hashedPassword;
    await agency.save();
    
    const token = jwt.sign({ id: agency._id }, process.env.JWT_AGENCY_PASSWORD);

    res.status(200).json({ message: 'Password updated successfully', data: agency });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update password', error: error.message });
  }
};

const updateAgencyEmail = async (req, res) => {
  const agencyId = req.params.id;
  let agency = await Agency.findById(agencyId);

  if (!agency) {
    return res.status(404).json({ message: 'Agency not found', data: null });
  }

  const newEmail = req.body.email;

  if (newEmail === agency.email) {
    return res.status(400).json({ message: 'You should enter a new email', data: null });
  }

  try {
    const isMatched = await bcrypt.compare(newEmail, agency.email);
    if (isMatched) {
      return res.status(400).json({ message: 'Email already exists', data: null });
    }

    agency.email = newEmail;
    await agency.save();

    res.status(200).json({ message: 'Email updated successfully', data: agency });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update email', error: error.message });
  }
};

const deleteAgency = async (req, res) => {
  const agencyId = req.params.id;
  try {
    const agency = await Agency.findByIdAndDelete(agencyId);
    if (!agency) {
      return res.status(404).json({ message: 'Agency not found', data: null });
    }
    res.status(200).json({ message: 'Agency deleted successfully', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete agency', error: error.message });
  }
};



export {updateAgencyEmail, updateAgencyName, updateAgencyPassword, deleteAgency};