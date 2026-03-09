import { getUsers, setUsers } from "../model/users.js";

function getAllUsers(req, res) {
  const users = getUsers();
  res.end(JSON.stringify(users));
}

async function getId(req, res) {
  const users = getUsers();

  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "User not found" }));
  }

  return res.end(JSON.stringify(user));
}

async function postId(req, res) {
  const data = req.body;
  const users = getUsers();

  const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser = { id: newId, name: data.name };

  //users.push(newUser);
  setUsers([...users, newUser]);

  res.statusCode = 201;
  return res.end(JSON.stringify(newUser));
}

async function deleId(req, res) {
  const users = getUsers();
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

export { getId, postId, deleId, getAllUsers };
