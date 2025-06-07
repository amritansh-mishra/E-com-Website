const jwt = require('jsonwebtoken');

// Middleware to check if the logged-in user is an admin or owner
module.exports = function isAdmin(req, res, next) {
  try {
    // Get the token from cookies (make sure you have cookie-parser middleware enabled)
    const token = req.cookies.token;

    // If no token found, user is not authenticated
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    // Verify the token using JWT_SECRET (use your secret key here)
    // This also decodes the token payload which contains user info like role, id, etc.
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Check the user's role stored in the decoded token
    // Only allow if role is 'owner' or 'admin'
    if (decoded.role === 'owner') {
      // Attach decoded user info to the request object for use in later middleware/routes
      req.user = decoded;

      // Call next() to allow request to proceed
      next();
    } else {
      // User is logged in but not authorized (not admin or owner)
      return res.status(403).send("Forbidden: You are not authorized");
    }
  } catch (err) {
    // If any error occurs during token verification (e.g., invalid token or expired token)
    console.error(err);

    // Respond with 401 Unauthorized error
    return res.status(401).send("Unauthorized: Invalid token");
  }
};

