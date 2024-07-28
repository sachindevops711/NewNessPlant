const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require("dotenv").config();
const app = express();
const port = 4000; // Use environment variable for port

// Define routes and target microservices
const routes = [
  {
    path: '/api/v1/user',
    target: 'http://localhost:4003',
  },
  {
    path: '/api/v1/admin',
    target: 'http://localhost:4001',
  },
];

routes.forEach((route) => {
  app.use(route.path, createProxyMiddleware({
    target: route.target,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      // Modify the proxy request if needed
    },
    onError: (err, req, res) => {
      res.status(500).json({ message: 'Proxy error', error: err.message });
    },
  }));
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.statusCode) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API Gateway is running on http://localhost:${port}`);
});
