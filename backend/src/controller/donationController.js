import { donationZod } from "../models/donation.js";
import * as donationServices from "../services/donationServices.js";

// Get all donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await donationServices.getAllDonations();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

// Create new donation
export const createDonation = async (req, res) => {
  try {
    const parsed = donationZod.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }
    const donation = await donationServices.createDonation(parsed.data);
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ error: "Failed to create donation" });
  }
}; 