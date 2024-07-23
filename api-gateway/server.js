const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // For logging requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Define proxy options
const adminServiceProxy = createProxyMiddleware({
  target: "http://localhost:4001",
  changeOrigin: true,
  pathRewrite: {
    "^/api/v1/admin": "", // Remove /api/admin from the request path
  },
});

const vendorServiceProxy = createProxyMiddleware({
  target: "http://localhost:4002",
  changeOrigin: true,
  pathRewrite: {
    "^/api/v1/vendor": "", // Remove /api/vendor from the request path
  },
});

const userServiceProxy = createProxyMiddleware({
  target: "http://localhost:4003",
  changeOrigin: true,
  pathRewrite: {
    "^/api/v1/user": "", // Remove /api/user from the request path
  },
});

// Routes
app.use("/api/v1/admin", adminServiceProxy);
app.use("/api/v1/vendor", vendorServiceProxy);
app.use("/api/v1/user", userServiceProxy);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "API Gateway is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
