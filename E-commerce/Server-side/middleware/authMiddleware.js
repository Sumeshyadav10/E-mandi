
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import ApiError from "../utils/apiError.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log("Token from cookie:", token); // Debugging line
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Exclude password
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
          return next(new ApiError(403, "Forbidden: Access denied"));
      }
      next();
  };
};


const protect = async (req, res, next) => {
  let token = req.cookies.jwt; // Extract token from cookies
  // console.log("Token from cookie:", token); // Debugging line

  // if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
  //     token = req.headers.authorization.split(" ")[1];
  // }

  if (!token) {
      return next(new ApiError(401, "Not authorized, no token"));
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
  } catch (error) {
      return next(new ApiError(401, "Invalid token"));
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};


// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   console.log(req.cookies.token);

//   // Check if token is in cookies
//   if (req.cookies && req.cookies.token) {
//     try {
//       token = req.cookies.token;

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, invalid token");
//     }
//   } else {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    console.log(req.body);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const admin = asyncHandler(async (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "admin" || req.user.role === "superadmin")
  ) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
});

export { authenticateToken, admin, authMiddleware, authorize , protect, isAdmin };
