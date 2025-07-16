import jwt from "jsonwebtoken";

export default function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      // Replace 'your_jwt_secret' with your actual secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
      // Optionally, check for admin role or user info in decoded
      req.admin = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  }
  return res.status(401).json({ error: "Unauthorized" });
}
