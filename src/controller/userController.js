const userService = require("../services/users/userService");

exports.createUser = async (req, res) => {
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
