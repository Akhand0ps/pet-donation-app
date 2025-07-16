
import express from "express";
import cors from "cors";
import animalRoutes from "./routes/animal.js";
import donationRoutes from "./routes/donation.js";
import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/animals", animalRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

export default app;