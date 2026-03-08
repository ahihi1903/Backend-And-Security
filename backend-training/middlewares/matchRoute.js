import { routes } from "./router.js";

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
      return { handlers: route.handlers, params };
    }
  }

  return null;
}
