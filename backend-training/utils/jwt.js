import jwt from "jsonwebtoken";

//const SECRET = process.env.JWT_SECRET; //khóa bí mật(secret) cua tôi
//console.log("JWT_SECRET =", process.env.JWT_SECRET);
// -> gọi process.env.JWT_SECRET trước sẽ khiến server chưa load kịp .env nên
// const SECRET = process.env.JWT_SECRET === undefire --> lỗi
export function generateToken(user) {
  //create token

  return jwt.sign(
    { id: user.id, username: user.username }, //payload:tải trọng
    process.env.JWT_SECRET, //secret:bảo mật
    { expiresIn: process.env.JWT_EXPIRES_IN }, //option:lựa chọn
  );
}

export function verifyToken(token) {
  // xác minh token
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}
