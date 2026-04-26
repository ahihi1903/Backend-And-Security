import { routes, routeMiddlewares } from "./router.js";

export default function matchRoute(method, pathname) {
  //b1: tách URL thành mảng "/users/123" → ["users", "123"]
  const urlParts = pathname.split("/").filter(Boolean);
  //b2: duyệt tất cả routes
  // mỗi route có dạng:
  // {
  // method: "GET",
  // path: "/users/:id",
  // handlers: [...]
  // }
  for (let route of routes) {
    //b3: so sánh method (ss phương thức)
    if (route.method !== method) continue;
    //b4: so sánh path
    const routeParts = route.path.split("/").filter(Boolean);

    if (routeParts.length !== urlParts.length) continue;

    let params = {};
    let isMatch = true; 
    //b5: Match từng phần
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(":")) {
        //case 1: Param (":id"). lấy param: params["id"] = "123"
        const key = routeParts[i].slice(1);
        params[key] = urlParts[i];
      } else if (routeParts[i] !== urlParts[i]) {
        //Case 2: Không phải param -> loại route
        isMatch = false;
        break;
      }
    }
    //b6:Nếu match thành công
    if (isMatch) {
      // collect route-level middlewares whose path matches the request (prefix match)
      const mwHandlers = [];
      for (let rmw of routeMiddlewares) {
        const rmwParts = rmw.path.split("/").filter(Boolean);
        //Check middleware có match không
        if (rmwParts.length > routeParts.length) continue; // middleware path longer than route path -> skip

        let mwMatch = true;
        //so sánh từng phần
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
