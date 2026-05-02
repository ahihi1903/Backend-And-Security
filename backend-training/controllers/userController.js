import {
  createUser,
  getAll,
  getUserId,
  deleteUserId,
} from "../services/userServices.js";
//CRUD user
async function getAllUsers(req, res, next) {
  try {
    
    const result = await getAll(
      req.query.page,
      req.query.limit,
      req.query.search,
      req.query.sort,
      req.query.role,
    );

    return res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getId(req, res, next) {
  const user = await getUserId(req.params.id);
  return res.json(user);
}

async function postId(req, res, next) {
  const newUser = await createUser(req.body.name);
  return res.status(201).json(newUser);
}

async function deleId(req, res, next) {
  const user = await deleteUserId(req.params.id);
  return res.json({
    success: true,
    message: "User deleted",
    data: user,
  });
}

export { getId, postId, deleId, getAllUsers };
