
const routes = [];

function addRoute(method, path, handler) {
  routes.push({ method, path, handler });
}

export { routes, addRoute };
