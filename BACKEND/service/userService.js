const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Register a new user
exports.registerUser = async (username, password, email) => {
  try {
    const newUser = await User.create({ username, password, email });
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login user and generate JWT
exports.loginUser = async (username, password) => {

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };

    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};
