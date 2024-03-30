const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const subcategoriesRoute = require("./routes/subcategoriesRoute");
const productsRoute = require("./routes/productsRoute");
const ordersRoute = require("./routes/ordersRoute");
const cors = require("cors");

// REST object
const app = express();

// Configure env
dotenv.config();

// Connect to MongoDB Database
connectDB();

// PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/subcategories", subcategoriesRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);

// GET Response from server
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Amazon.com Backend API",
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.MODE} mode`);
});
