import { routes, routeMiddlewares } from "./router.js";

export default function matchRoute(method, pathname) {
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
      // collect route-level middlewares whose path matches the request (prefix match)
      const mwHandlers = [];
      for (let rmw of routeMiddlewares) {
        const rmwParts = rmw.path.split("/").filter(Boolean);
        if (rmwParts.length > routeParts.length) continue; // middleware path longer than route path -> skip

        let mwMatch = true;
        for (let i = 0; i < rmwParts.length; i++) {
          if (rmwParts[i].startsWith(":")) continue;
          if (rmwParts[i] !== routeParts[i]) {
            mwMatch = false;
            break;
          }
        }

        if (mwMatch) {
          mwHandlers.push(...rmw.handlers);
        }
      }

      return { handlers: [...mwHandlers, ...route.handlers], params };
    }
  }

  return null;
}
