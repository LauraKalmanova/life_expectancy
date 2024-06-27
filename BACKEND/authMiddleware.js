const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  // Get token from headers
  const authHeader = req.header('authorization');

  // Check if token is present
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied, token missing' });
  }

  // Token format should be "Bearer <token>"
  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  const token = tokenParts[1]; // Extract token from parts


  try {
    // Verify token
    console.log("middleware:", process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; 
    // Attach user information to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token', message: error });
  }
};

module.exports = authMiddleware;
