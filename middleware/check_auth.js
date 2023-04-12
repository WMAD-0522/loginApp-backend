import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = { email: decodedToken.email, userId: decodedToken.userId };
      next();
    } catch (error) {
      res.status(401).json({ message: "Auth failed!" });
    }
  };

export default checkAuth;