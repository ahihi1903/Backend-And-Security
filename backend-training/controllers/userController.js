import {
  createUser,
  getAll,
  getUserId,
  deleteUserId,
} from "../services/userServices.js";

async function getAllUsers(req, res, next) {
  try {
    const result = await getAll(req.query.page, req.query.limit);
    return res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getId(req, res, next) {
  try {
    const user = await getUserId(req.params.id);
    return res.json(user);
  } catch (error) {
    next(error);
  }
}

async function postId(req, res, next) {
  try {
    const newUser = await createUser(req.body.name);
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

async function deleId(req, res, next) {
  try {
    const user = await deleteUserId(req.params.id);
    //return res.json({ message: "Đã xóa User: ", user });
    return res.json({
      success: true,
      message: "User deleted",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export { getId, postId, deleId, getAllUsers };
