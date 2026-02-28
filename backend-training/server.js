import http from "http";

let users = [
  { id: 1, name: "An" },
  { id: 2, name: "Binh" }
];

/* =========================
   1️⃣ ROUTER CORE
========================= */

const routes = [];

function addRoute(method, path, handler) {
  routes.push({ method, path, handler });
}

function matchRoute(method, pathname) {
  const urlParts = pathname.split("/").filter(Boolean);

  for (let route of routes) {
    if (route.method !== method) continue;

    const routeParts = route.path.split("/").filter(Boolean);

    if (routeParts.length !== urlParts.length) continue;

    let params = {};
    let isMatch = true;

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(":")) {
        const key = routeParts[i].slice(1);
        params[key] = urlParts[i];
      } else if (routeParts[i] !== urlParts[i]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      return { handler: route.handler, params };
    }
  }

  return null;
}

const router = {
  get: (path, handler) => addRoute("GET", path, handler),
  post: (path, handler) => addRoute("POST", path, handler),
  delete: (path, handler) => addRoute("DELETE", path, handler)
};

/* =========================
   2️⃣ DEFINE ROUTES
========================= */

router.get("/users", (req, res) => {
  res.end(JSON.stringify(users));
});

router.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "User not found" }));
  }

  return res.end(JSON.stringify(user));
});

router.post("/users", (req, res) => {
  let body = "";

  req.on("data", chunk => body += chunk);

  req.on("end", () => {
    const data = JSON.parse(body);

    const newId = users.length
      ? Math.max(...users.map(u => u.id)) + 1
      : 1;

    const newUser = { id: newId, name: data.name };

    users.push(newUser);

    res.statusCode = 201;
    return res.end(JSON.stringify(newUser));
  });
});

router.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "User not found" }));
  }

  users = users.filter(u => u.id !== id);

  return res.end(JSON.stringify(user));
});

/* =========================
   3️⃣ SERVER
========================= */

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  res.setHeader("Content-Type", "application/json");

  const matched = matchRoute(req.method, pathname);

  if (matched) {
    req.params = matched.params;
    return matched.handler(req, res);
  }

  res.statusCode = 404;
  return res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});