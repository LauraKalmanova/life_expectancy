const userService = require('../service/userService');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await userService.registerUser(username, password, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await userService.loginUser(username, password);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
