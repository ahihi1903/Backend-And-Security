import { getUsers, setUsers } from "../model/users.js";
import createError from "../middlewares/createError.js";
async function createUser(name) {
  const users = getUsers();

  const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser = { id: newId, name };

  setUsers([...users, newUser]);

  return newUser;
}

async function getAll(page, limit) {
  const users = getUsers();

  const pageGet = Math.max(Number(page) || 1, 1);
  const limitGet = Math.max(Number(limit) || users.length, 1);

  const start = (pageGet - 1) * limitGet;
  const end = start + limitGet;

  const result = users.slice(start, end);

  return result;
}

async function getUserId(id) {
  const users = getUsers();

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    throw createError(404, "User not found");
  }

  return user;
}

async function deleteUserId(id) {
  const users = getUsers();

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    throw createError(404, "User not found");
  }

  setUsers(users.filter((u) => u.id !== Number(id)));

  return user;
}

export { getAll, getUserId, createUser, deleteUserId };
