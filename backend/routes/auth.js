const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
;
;

// For demo, we use a hardcoded admin user. In production, this would be in DB.
const adminUser = {
  username: 'admin',
  // password: 'kaiadmin2024' hashed:
  passwordHash: '$2b$10$Pb9X1o4ORM6TeQpSKtf2HOe6NLA5kDruOk3wo./i1xJ1NrN7Xv1DS'
};
;
;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username !== adminUser.username) {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }
  const match = await bcrypt.compare(password, adminUser.passwordHash);
  if (!match) {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});
;
;

module.exports = router;
