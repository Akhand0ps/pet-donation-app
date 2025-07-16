import express from "express";
import * as donationController from "../controller/donationController.js";

const router = express.Router();

// Get all donations
router.get("/", donationController.getAllDonations);

// Create a new donation
router.post("/", donationController.createDonation);

export default router; 