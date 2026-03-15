import { getUsers, setUsers } from "../model/users.js";

function getAllUsers(req, res) {
  const users = getUsers();

  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || users.length, 1);

  const start = (page - 1) * limit;
  const end = start + limit;

  const result = users.slice(start, end);

  res.json(result);
}

function createError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

async function getId(req, res) {
  const users = getUsers();

  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    //return res.status(400).json({ message: "Invalid user id" });
    throw createError(400, "Invalid user id");
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    //return res.status(404).json({ message: "User not found" });
    throw createError(404, "User not found");
  }

  return res.json(user);
}

async function postId(req, res) {
  const data = req.body;

  if (!data.name) {
    //return res.status(400).json({ message: "Name is required" });
    throw createError(400, "Name is required");
  }
  if (typeof data.name !== "string") {
    //return res.status(400).json({ message: "Name must be string" });
    throw createError(404, "Name must be string");
  }
  if (data.name.length < 2) {
    //return res.status(400).json({ message: "Name too short" });
    throw createError(404, "Name too short");
  }

  const users = getUsers();

  const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser = { id: newId, name: data.name };

  //users.push(newUser);
  setUsers([...users, newUser]);

  return res.status(201).json(newUser);
}

async function deleId(req, res) {
  const users = getUsers();
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    //return res.status(400).json({ message: "Id must be number" });
    throw createError(400, "Id must be number");
  }
  if (id <= 0) {
    //return res.status(400).json({ message: "ID must be greater than zero!" });
    throw createError(400, "ID must be greater than zero!");
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    // return res.status(404).json({ message: "User not found" });
    throw createError(404, "User not found");
  }

  setUsers(users.filter((u) => u.id !== id));

  return res.json(user);
}

export { getId, postId, deleId, getAllUsers };
