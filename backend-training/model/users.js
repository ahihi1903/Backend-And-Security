// let users = [
//   { id: 1, name: "An" },
//   { id: 2, name: "Binh" },
// ];

// function getUsers() {
//   return users;
// }

// function setUsers(newUsers) {
//   users = newUsers;
// }

// export { getUsers, setUsers };


// user.js

let users = [
  { id: 1, name: "An" },
  { id: 2, name: "Binh" },
];

// =========================
// GET ALL
// =========================
function getUsers() {
  return [...users]; // tránh bị sửa trực tiếp
}

// =========================
// GET BY ID
// =========================
function getUserById(id) {
  return users.find(u => u.id === Number(id));
}

// =========================
// CREATE
// =========================
function createUser(name) {
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name
  };

  users.push(newUser);
  return newUser;
}

// =========================
// UPDATE
// =========================
function updateUser(id, name) {
  const user = users.find(u => u.id === Number(id));
  if (!user) return null;

  user.name = name;
  return user;
}

// =========================
// DELETE
// =========================
function deleteUser(id) {
  const index = users.findIndex(u => u.id === Number(id));
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
}

// =========================
// SET ALL (nếu cần)
// =========================
function setUsers(newUsers) {
  users = [...newUsers];
}

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  setUsers
};