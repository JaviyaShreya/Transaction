const express = require("express");
const router = express.Router();
const { createUser, getAllUsers } = require("../controllers/usercontroller");

router.post("/", createUser);
router.get("/", getAllUsers);

module.exports = router;
