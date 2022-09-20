const express = require("express");
const {
  userLogin,
  userSignup,
  changePassword,
  isUserAuthenticated,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.post("/changepassword", isUserAuthenticated, changePassword);

module.exports = router;
