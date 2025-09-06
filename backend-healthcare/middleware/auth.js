const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: 'Invalid token: user not found' });
    req.user = { id: user.id, name: user.name, email: user.email };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token verification failed', error: err.message });
  }
};

module.exports = auth;
