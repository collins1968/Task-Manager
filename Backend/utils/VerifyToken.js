import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JWT_KEY } = process.env;

const VerifyToken = (req, res, next) => {
  const token = req.headers["token"];
  try {
    if (!token) {
      return res.status(401).json({ message: "Forbidden" });
    }
    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded;
  } catch (error) {
    return res.json({ error});
  }
  next();
};

export default VerifyToken;