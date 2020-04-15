// Problem: We need a simple way to look at a user's badge count and
// JavaScript points from a web browser

// Solution: Use Node.js to perform the profile lookups and serve
// our template via HTTP

// 1. Create a web server
const http = require("http");
const router = require("./router.js");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  router.home(req, res);
  router.user(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
