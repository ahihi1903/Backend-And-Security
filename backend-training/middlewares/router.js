const routes = [];
const routeMiddlewares = [];

function addRoute(method, path, ...handlers) {
  // handlers có thể chứa middleware (req,res,next) hoặc controller (req,res)
  routes.push({ method, path, handlers });
}

function addRouteMiddleware(path, ...handlers) {
  // middlewares áp dụng cho tất cả route có path bắt đầu bởi `path` (prefix match)
  routeMiddlewares.push({ path, handlers });
}

export { routes, routeMiddlewares, addRoute, addRouteMiddleware };
