const jwt = require('jsonwebtoken');

// Use environment secret or fallback to a default
const SECRET = process.env.JWT_SECRET || 'your_secret';

/**
 * 🔐 Middleware: Authenticate user with JWT token
 */
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // e.g., { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * 🔐 Middleware: Verify JWT Token
 */
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Format must be: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // attach {_id, role} to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * 🛡 Middleware: Check Role Authorization
 * @param  {...string} roles Allowed roles like 'admin', 'user', 'club-admin'
 */
exports.requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};




exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // contains id, role, etc.
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
