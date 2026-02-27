import http from "http";

let users = [
  { id: 1, name: "An" },
  { id: 2, name: "Binh" },
  { id: 3, name: "Binh" },
  { id: 4, name: "Binh" },
  { id: 5, name: "Binh" },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`); // http://localhost:3000
  const pathname = parsedUrl.pathname; //url(/users/...)

  res.setHeader("Content-Type", "application/json"); //JSON

  const index = users.length;

  if (method === "GET") {
    // get/users trả về toàn bộ mảng
    if (pathname === "/users") {
      return res.end(JSON.stringify(users));
    }
    //GET /users/:id
    if (pathname.startsWith("/users/")) {
      const id = Number(pathname.split("/")[2]);
      if (id <= 0 || !id || Number.isNaN(id)) {
        res.statusCode = 404;
        return res.end("404 not found");
      }
      for (let i = 0; i < index; i++) {
        if (users[i].id === id) {
          return res.end(JSON.stringify(users[i]));
        }
      }
      res.statusCode = 404;
      return res.end(JSON.stringify({ message: "User not found" }));
    }
  }
  // DELETE /users/:id
  if (method === "DELETE") {
    if (pathname.startsWith("/users/")) {
      const idDele = Number(pathname.split("/")[2]);

      if (!idDele) {
        res.statusCode = 404;
        return res.end();
      }

      const user = users.find((u) => u.id === idDele);

      if (!user) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: "User not found" }));
      }
      users = users.filter((u) => u.id !== idDele);
      // res.end(JSON.stringify(users[idDele]));
      return res.end("User đã được xóa!");
    }
  }

  //POST /users
  if (method === "POST" && pathname === "/users") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        if (!data.name) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ message: "Name is required" }));
        }
        // let tmp;
        // if (!users) {
        //   tmp = 0;
        // } else {
        //   tmp = users[users.length - 1].id + 1;
        // }
        const maxId =
          users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;

        const newId = maxId + 1;

        const newUser = { id: newId, name: data.name };

        //push vào mảng
        users.push(newUser);

        res.statusCode = 201;
        return res.end(JSON.stringify(newUser));
      } catch (error) {
        return res.end(JSON.stringify({ message: "Name is required" }));
      }
    });
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
