const express = require("express");
const router = express.Router();
const {
  createTransaction,
  updateTransaction,
  getUserTransactions,
} = require("../controllers/transactioncontroller");

router.post("/", createTransaction);
router.put("/:id", updateTransaction);                
router.get("/user/:userId", getUserTransactions);       

module.exports = router;
