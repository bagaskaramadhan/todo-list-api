const userModel = require("../../model/userModel");
const bcrypt = require("bcrypt");

async function createUser(body) {
  try {
    await validationCreateUser(body);
    body.password = await hashPassword(body.password);
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

async function hashPassword(password) {
  try {
    if (!password) {
      throw new Error("Password is required");
    }
    return await bcrypt.hash(password, 12);
  } catch (err) {
    throw err;
  }
}

async function loginUser(body) {
  try {
    const checkUser = await userModel.findOne({ email: body.email });
    if (!checkUser) {
      throw new Error("Email not found");
    }
    const isPasswordValid = await bcrypt.compare(
      body.password,
      checkUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  loginUser,
};
