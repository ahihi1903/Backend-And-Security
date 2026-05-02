import { getUsers, setUsers } from "../model/users.js";
import createError from "../middlewares/createError.js";
async function createUser(name) {
  const users = getUsers();

  const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser = { id: newId, name };

  setUsers([...users, newUser]);

  return newUser;
}

async function getAll(page, limit, search, sort, role) {
  let users = getUsers();

  //chuẩn hóa input
  const pageGet = Math.max(Number(page) || 1, 1);
  const limitGet = Math.min(Math.max(Number(limit) || 5, 1), 20); // chống spam
  const searchGet = (search || "").toLowerCase();
  const sortGet = sort || "";
  const roleGet = role || "";

  // 🔎 SEARCH
  if (searchGet) {
    users = users.filter((u) => u.name.toLowerCase().includes(searchGet));
  }

  // 🛡 FILTER (role)
  if (roleGet) {
    users = users.filter((u) => u.role === roleGet);
  }

  // 🔽 SORT
  if (sortGet === "name") {
    users.sort((a, b) => a.name.localeCompare(b.name));
  }

  // 📄 PAGINATION
  const total = users.length;

  const start = (pageGet - 1) * limitGet;
  const end = start + limitGet;

  const data = users.slice(start, end);

  // 📦 RESPONSE chuẩn
  return {
    success: true,
    total,
    page: pageGet,
    limit: limitGet,
    data,
  };
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
