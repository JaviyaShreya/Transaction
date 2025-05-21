const express = require("express");
const connectDB = require("./config/db");
const {port} = require("./config/config");
const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

app.use(function (req, res, next) {
  res.status(404).json({ message: "Route not found" });
});

const PORT = port;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
