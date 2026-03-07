let users = [
  { id: 1, name: "An" },
  { id: 2, name: "Binh" },
];

function getUsers() {
  return users;
}

function setUsers(newUsers) {
  users = newUsers;
}

export { getUsers, setUsers };
