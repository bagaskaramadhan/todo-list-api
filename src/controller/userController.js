const userService = require("../services/users/userService");

exports.loginUser = async (req, res) => {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password,
    };
    await userService.loginUser(body);
    res.status(200).json({ message: "Login Successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const body = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    await userService.createUser(body);
    res.status(201).json({ message: "User Created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
