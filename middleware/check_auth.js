import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    try {
      // console.log(req.headers.authorization);
      const token = req.headers.authorization;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userData = { email: decodedToken.email, userId: decodedToken.userId };
      console.log(req.userData);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Auth failed!" });
    }
  };

export default checkAuth;