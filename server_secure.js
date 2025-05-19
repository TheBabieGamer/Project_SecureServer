const express = require('express');
const app = express();
const helmet = require('helmet');

// Use Helmet to set various security headers
app.use(helmet());

// Custom CSP
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';");
  next();
});

// CORS configuration (only allow from self)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://yourtrusteddomain.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// HSTS - only works over HTTPS
app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  next();
});

// Disable X-Powered-By
app.disable('x-powered-by');

// Prevent MIME-type sniffing
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// Cache control for dynamic content
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  next();
});

// Sample route
app.get("/", (req, res) => {
  res.send("<h1>Hello from Secure Server</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Secure server running at http://localhost:${PORT}`);
});
