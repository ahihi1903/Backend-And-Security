import http from "http";
import "./routes/userRoutes.js";
import matchRoute from "./middlewares/matchRoute.js";

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  res.setHeader("Content-Type", "application/json");

  const matched = matchRoute(req.method, pathname);

  if (matched) {
    req.params = matched.params;
    try {
      await matched.handler(req, res);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      return res.end(JSON.stringify({ message: err.message }));
    }

    return;
  }

  res.statusCode = 404;
  return res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
