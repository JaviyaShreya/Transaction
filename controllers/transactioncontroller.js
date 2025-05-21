const mongoose = require("mongoose");
const User = require("../models/user");
const { status } = require("../utils/status");
const Transaction = require("../models/transaction");

// create a new transaction using a session
const createTransaction = async (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const fromUser = await User.findById(fromUserId).session(session);
    const toUser = await User.findById(toUserId).session(session);

    if (!fromUser || !toUser) {
      throw new Error("User(s) not found");
    }

    if (fromUser.balance < amount) {
      throw new Error("Insufficient balance");
    }

    fromUser.balance -= amount;
    toUser.balance += amount;

    await fromUser.save({ session });
    await toUser.save({ session });

    await Transaction.create([
      {
        userId: fromUser._id,
        type: "debit",
        amount,
        note: `Transferred to ${toUser.name}`,
      },
      {
        userId: toUser._id,
        type: "credit",
        amount,
        note: `Received from ${fromUser.name}`,
      },
    ], { session , ordered: true });

    await session.commitTransaction();
    res.status(status.OK).json({ message: "Transaction successful" });
  } catch (error) {
    await session.abortTransaction();
    res.status(status.SERVER_ERROR).json({ error: error.message });
  } finally {
    session.endSession();
  }
};

// update a transaction note
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const updated = await Transaction.findByIdAndUpdate(id, { note }, { new: true });
    if (!updated) return res.status(404).json({ error: "Transaction not found" });
    res.status(status.OK).json(updated);
  } catch (err) {
    res.status(status.SERVER_ERROR).json({ error: err.message });
  }
};

// get transactions for a user
const getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const txns = await Transaction.find({ userId }).sort({ date: -1 });
    res.status(status.OK).json(txns);
  } catch (err) {
    res.status(status.SERVER_ERROR).json({ error: err.message });
  }
};

module.exports = {
  createTransaction,
  updateTransaction,
  getUserTransactions,
};
