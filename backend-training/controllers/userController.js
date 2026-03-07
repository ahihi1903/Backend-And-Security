import { getUsers, setUsers } from "../model/users.js";

const users = getUsers();

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

async function getId(req, res) {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "User not found" }));
  }

  return res.end(JSON.stringify(user));
}

async function postId(req, res) {
  const data = await parseBody(req);

  const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser = { id: newId, name: data.name };

  users.push(newUser);

  res.statusCode = 201;
  return res.end(JSON.stringify(newUser));
}

async function deleId(req, res) {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "User not found" }));
  }

  // users = users.filter((u) => u.id !== id);
  setUsers(users.filter((u) => u.id !== id));
  return res.end(JSON.stringify(user));
}

export { getId, postId, deleId };
