const userModel = require("../model/userModel");

module.exports = (req, res, next) => {
  try {
    let authUser = req.user.id;
    const checkData = userModel.findById(authUser);
    if (!checkData) {
      throw new Error("Invalid authorization");
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
