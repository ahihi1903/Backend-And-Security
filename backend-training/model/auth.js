import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true, //tính bắt buộc
      unique: true, //tính độc nhất (không trùng)
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"], //chỉ cho role hợp lệ
      default: "user",
    },
  },
  { timestamps: true }, //tự tạo createdAt & updatedAt
);
export default mongoose.model("Auth", authSchema);
