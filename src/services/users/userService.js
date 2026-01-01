const userModel = require("../../model/userModel");

async function createUser(body) {
  try {
    await validationCreateUser(body);
    const userBody = new userModel(body);
    await userBody.save();
  } catch (err) {
    throw err;
  }
}
async function validationCreateUser(body) {
  try {
    // data validation
    const isEmailExist = await userModel.findOne({ email: body.email });
    if (isEmailExist) {
      throw new Error("Email already registered");
    }
    const usernameLength = body.username.length;
    if (usernameLength < 3) {
      throw new Error("Username minimum 3 characters");
    }
    const isUsernameExist = await userModel.findOne({
      username: body.username,
    });
    if (isUsernameExist) {
      throw new Error("Username already registered");
    }
    const passwordLength = body.password.length;
    if (passwordLength < 6) {
      throw new Error("Password minimum 6 characters");
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
};
