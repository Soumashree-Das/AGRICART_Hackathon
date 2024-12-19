import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model.js'; // Assuming you have a User model

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Debugging output for Authorization header
  console.log('Authorization Header:', req.headers.authorization);

  // Check for token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from Authorization header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token and get user data
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(401).json({
        statusCode: 401,
        message: 'Not authorized, token failed',
        success: false,
      });
    }
  } else {
    res.status(401).json({
      statusCode: 401,
      message: 'Not authorized, no token',
      success: false,
    });
  }
});

export { protect };

























// // Importing necessary modules
// import jwt from 'jsonwebtoken';
// import {Order} from '../models/order.model.js'; // Assuming you have a User model to find users in your database
// import asyncHandler from 'express-async-handler'; // To handle async/await in middleware

// // Protect middleware to check if the user is authenticated
// const protect = asyncHandler(async (req, res, next) => {
//     let token;

//     // Check if the token is present in the authorization header
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             // Get token from the authorization header
//             token = req.headers.authorization.split(' ')[1];

//             // Verify the token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             // Find the user by the ID embedded in the token and exclude the password
//             req.user = await User.findById(decoded.id).select('-password');

//             // If user exists, proceed to the next middleware or route handler
//             next();
//         } catch (error) {
//             console.error('Token verification failed:', error);
//             res.status(401);
//             throw new Error('Not authorized, token failed');
//         }
//     }

//     // If no token is found, return a 401 status
//     if (!token) {
//         res.status(401);
//         throw new Error('Not authorized, no token');
//     }
// });

// // Exporting the protect middleware
// export { protect };
