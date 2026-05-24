//import { getUsers, setUsers } from "../model/users.js";
import createError from "../middlewares/createError.js";
import User from "../model/User.js";

async function createUser(name) {
  // const users = getUsers();

  // const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  // const newUser = { id: newId, name };

  // setUsers([...users, newUser]);

  // return newUser;

  return await User.create({ name });
}

// async function getAll(page, limit, search, sort, role) {
//   let users = getUsers();

//   //chuẩn hóa input
//   const pageGet = Math.max(Number(page) || 1, 1);
//   const limitGet = Math.min(Math.max(Number(limit) || 5, 1), 20); // chống spam
//   const searchGet = (search || "").toLowerCase();
//   const sortGet = sort || "";
//   const roleGet = role || "";

//   // 🔎 SEARCH
//   if (searchGet) {
//     users = users.filter((u) => u.name.toLowerCase().includes(searchGet));
//   }

//   // 🛡 FILTER (role)
//   if (roleGet) {
//     users = users.filter((u) => u.role === roleGet);
//   }

//   // 🔽 SORT
//   if (sortGet === "name") {
//     users.sort((a, b) => a.name.localeCompare(b.name));
//   }

//   // 📄 PAGINATION
//   const total = users.length;

//   const start = (pageGet - 1) * limitGet;
//   const end = start + limitGet;

//   const data = users.slice(start, end);

//   // 📦 RESPONSE chuẩn
//   return {
//     success: true,
//     total,
//     page: pageGet,
//     limit: limitGet,
//     data,
//   };
// }
async function getAll(page, limit, search, sort, role) {
  // ==========================
  // 1. CHUẨN HÓA QUERY PARAMS
  // ==========================

  const pageGet = Number(page) > 0 ? Number(page) : 1;

  const limitGet = Number(limit) > 0 ? Math.min(Number(limit), 20) : 5;

  const searchGet = search || "";

  const sortGet = sort || "";

  const roleGet = role || "";

  // ==========================
  // 2. TẠO ĐIỀU KIỆN TÌM KIẾM
  // ==========================

  const query = {};

  // search theo name
  if (searchGet) {
    query.name = {
      $regex: searchGet,
      $options: "i",
    };
  }

  // filter role
  if (roleGet) {
    query.role = roleGet;
  }

  // ==========================
  // 3. TẠO ĐIỀU KIỆN SORT
  // ==========================

  const sortOption = {};

  if (sortGet === "name") {
    sortOption.name = 1;
  }

  // ==========================
  // 4. TÍNH PHÂN TRANG
  // ==========================

  const skip = (pageGet - 1) * limitGet;

  // ==========================
  // 5. QUERY DATABASE
  // ==========================

  const users = await User.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limitGet);

  // ==========================
  // 6. ĐẾM TỔNG SỐ USER
  // ==========================

  const total = await User.countDocuments(query);

  // ==========================
  // 7. RESPONSE
  // ==========================

  return {
    success: true,
    total,
    page: pageGet,
    limit: limitGet,
    data: users,
  };
}

async function getUserId(id) {
  const user = await User.findById(id);

  if (!user) {
    throw createError(404, "User not found");
  }

  return user;
}

async function deleteUserId(id) {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw createError(404, "User not found");
  }

  return user;
}

export { getAll, getUserId, createUser, deleteUserId };
