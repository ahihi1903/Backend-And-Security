import http from "http";
import "./routes/userRoutes.js";
import matchRoute from "./middlewares/matchRoute.js";

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  //ghi thành URL đầy đủ vd: http://localhost:3000/users?page=2&limit=2
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  //lấy ra pathname: /users
  const pathname = parsedUrl.pathname;
  //lấy ra search (nếu có): ?page=2&limit=2
  req.query = Object.fromEntries(parsedUrl.searchParams);
  //body ko nhận req là GET
  const body = await parseBody(req);

  req.body = body;

  res.status = function (code) {
    res.statusCode = code;
    return res;
  };

  res.json = function (data) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };

  // res.setHeader("Content-Type", "application/json");

  const matched = matchRoute(req.method, pathname);

  if (matched) {
    req.params = matched.params;
    try {
      const handlers = matched.handlers; //mảng các function của route.
      let index = 0;

      async function next() {
        const handler = handlers[index++];
        if (!handler) return;

        if (handler.length === 3) {
          //function.length trong JS = số tham số của function.
          // middleware (req,res,next)=> số tham số của function = 3 (req,res,next).
          await handler(req, res, next);
        } else {
          // controller (req,res)
          await handler(req, res);
        }
      }

      await next();
    } catch (err) {
      console.error(err);
      //res.statusCode = 500;
      //return res.end(JSON.stringify({ message: err.message }));
      return res.status(500).json({ message: err.message });
    }

    return;
  }

  //res.statusCode = 404;
  //return res.end(JSON.stringify({ message: "Route not found" }));
  return res.status(404).json({ message: "Route not found" });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
