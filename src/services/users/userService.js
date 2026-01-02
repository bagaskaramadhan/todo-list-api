const userModel = require("../../model/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { SALT_ROUNDS, JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/env");
const jwt = require("jsonwebtoken");

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
    return await bcrypt.hash(password, SALT_ROUNDS);
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
    const isPasswordValid = await comparePassword(
      body.password,
      checkUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const accessToken = await generateAccessToken({
      username: checkUser.username,
    });
    return {
      accessToken,
      user: {
        username: checkUser.username,
        email: checkUser.email,
      },
    };
  } catch (err) {
    throw err;
  }
}

async function comparePassword(inputPassword, storedHashedPassword) {
  return await bcrypt.compare(inputPassword, storedHashedPassword);
}

async function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

module.exports = {
  createUser,
  loginUser,
};
