// const routes = [];
// const routeMiddlewares = [];

// function addRoute(method, path, ...handlers) {
//   // handlers có thể chứa middleware (req,res,next) hoặc controller (req,res)
//   routes.push({ method, path, handlers });
// }

// function addRouteMiddleware(path, ...handlers) {
//   // middlewares áp dụng cho tất cả route có path bắt đầu bởi `path` (prefix match)
//   routeMiddlewares.push({ path, handlers });
// }

// export { routes, routeMiddlewares, addRoute, addRouteMiddleware };

// router.js

const routes = [];
const routeMiddlewares = [];

// =========================
// ADD ROUTE
// =========================
function addRoute(method, path, ...handlers) {
  if (!method || !path || handlers.length === 0) {
    throw new Error("Invalid route definition");
  }

  // chuẩn hóa method
  const normalizedMethod = method.toUpperCase();

  // validate handler
  handlers.forEach((h) => {
    if (typeof h !== "function") {
      throw new Error("Handler must be a function");
    }
  });

  routes.push({
    method: normalizedMethod,
    path: normalizePath(path),
    handlers,
  });
}

// =========================
// ADD MIDDLEWARE
// =========================
function addRouteMiddleware(path, ...handlers) {
  if (!path || handlers.length === 0) {
    throw new Error("Invalid middleware definition");
  }

  handlers.forEach((h) => {
    if (typeof h !== "function") {
      throw new Error("Middleware must be a function");
    }
  });

  routeMiddlewares.push({
    path: normalizePath(path),
    handlers,
  });
}

// =========================
// HELPER: NORMALIZE PATH
// =========================
function normalizePath(path) {
  return path.replace(/\/+$/, "") || "/";
}

export { routes, routeMiddlewares, addRoute, addRouteMiddleware };
