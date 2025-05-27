const jwt = require('jsonwebtoken');
require('dotenv').config();
&nbsp;
&nbsp;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });
&nbsp;
&nbsp;

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });
&nbsp;
&nbsp;

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = payload;
    next();
  });
}
&nbsp;
&nbsp;

module.exports = authenticateToken;