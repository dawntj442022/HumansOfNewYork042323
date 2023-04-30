const express = require("express");
const router = express.Router();

const {
  checkToken,
  dataController,
  apiController,
} = require("../../controllers/api/usersController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

//show all users from the database
router.get("/all", dataController.findAll);

// POST /api/users: creates a new user and generates a JSON webtoken to authenicate the user
router.post("/", dataController.create, apiController.auth);

// Post /api/users/login: logs in the user with email/password and generates a JWT to authenicate the user
router.post("/login", dataController.login, apiController.auth);

// Get /api/users/check-token: used to make sure that the user is authenicated before accessing the check-token which rtn exp date
router.get("/check-token", ensureLoggedIn, checkToken);

// POST /api/users/signup: signs up a user with their name email/password/and generates a JWT to authenicate the user
router.post("/signup", dataController.createUser, apiController.auth);

module.exports = router;
