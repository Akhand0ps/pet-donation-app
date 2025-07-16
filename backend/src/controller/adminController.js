import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;
  // For now, use hardcoded credentials
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign(
      { username: "admin", role: "admin" },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "2h" }
    );
    return res.json({ token });
  }
  return res.status(401).json({ error: "Invalid credentials" });
}; 