const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

const checkToken = (req, res) => {
  console.log("req.user", req.user);
  res.json(req.exp);
};

const dataController = {
  async findAll(req, res, next) {
    try {
      const allUsers = await User.find({});
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async createUser(req, res, next) {
    try {
      console.log("Create user request received with data:", req.body);
      const { name, email, password } = req.body;
      // const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password });
      const token = createJWT(user);

      res.locals.data.user = user;
      res.locals.data.token = token;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log({ email, password });
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("Invalid email");
      }
      console.log({ user });
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Invalid email or password");
      }
      const token = createJWT(user);

      // Remove password field from user object
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;

      res.locals.data.user = userWithoutPassword;
      res.locals.data.token = token;
      // res.status(200);
      next();
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({ error: "Invalid email or password" });
    }
  },
};

const apiController = {
  auth(req, res) {
    res.json(res.locals.data.token);
  },
  async login(req, res) {
    res.json({ user: res.locals.data.user, token: res.locals.data.token });
  },
};

/** Helper functions */

function createJWT(user) {
  try {
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return token;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating token");
  }
}

module.exports = {
  checkToken,
  dataController,
  apiController,
};
