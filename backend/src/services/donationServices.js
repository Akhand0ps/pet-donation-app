import Donation from "../models/donation.js";

// Create donation
export const createDonation = async (data) => {
  return await Donation.create(data);
};

// Get all donations
export const getAllDonations = async () => {
  return await Donation.find().populate("animal").sort({createdAt:-1});
};

// Get donation by ID (optional, not required by frontend)
export const getDonationById = async (id) => {
  return await Donation.findById(id).populate("animal");
}; 