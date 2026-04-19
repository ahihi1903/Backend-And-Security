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
// SET ALL (nếu cần)
// =========================
function setUsers(newUsers) {
  users = [...newUsers];
}

export { getUsers, setUsers };
