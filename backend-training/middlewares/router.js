const routes = [];

function addRoute(method, path, ...handlers) {
  //...handlers = có thể truyền nhiều function.
  routes.push({ method, path, handlers });
}

export { routes, addRoute };
