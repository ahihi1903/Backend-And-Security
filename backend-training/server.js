import http from "http";

const server = http.createServer((req, res) => {
  const { method, url } = req;
  //   if (method === "GET" && url === "/") {
  //     res.end("Home Page!");
  //   } else if (method === "GET" && url === "/about") {
  //     res.end("About Page");
  //   } else if (method === "POST" && url === "/login") {
  //     res.end("Login success");
  //   } else {
  //     res.statusCode = 404;
  //     res.end("404 Not Found");
  //   }

  //   if (method === "POST" && url === "/login") {
  //     res.end("Login success");
  //   } else {
  //     res.setHeader("Allow", "POST");
  //     res.statusCode = 405;
  //     res.end("405 Not Found");
  //   }

  if (url.startsWith("/user/")) {
    const id = Number(url.split("/")[2]);
    if (Number.isNaN(id) || id <= 0 || !id) {
      res.statusCode = 404;
      return res.end("404 Not Found");
    }
    res.end(`ID là: ${id}`);
  } else {
    res.statusCode = 404;
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
