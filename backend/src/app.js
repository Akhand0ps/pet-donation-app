
import express from "express";
import cors from "cors";
import animalRoutes from "./routes/animal.js";
import donationRoutes from "./routes/donation.js";
import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/admin.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "https://aidforpaws.vercel.app", // Production frontend
    "http://localhost:5173", // Local development
    "http://localhost:3000", // Alternative local port
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/animals", animalRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

export default app;