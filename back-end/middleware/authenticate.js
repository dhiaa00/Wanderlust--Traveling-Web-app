import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.authorization;
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default authenticate;
