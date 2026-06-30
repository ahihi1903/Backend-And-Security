import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, //tính bắt buộc
      unique: true, //tính độc nhất (không trùng)
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"], //chỉ cho role hợp lệ
      default: "user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verifyToken: String,

    resetPasswordToken: String,

    resetPasswordExpire: Date,
  },
  { timestamps: true }, //tự tạo createdAt & updatedAt
);
export default mongoose.model("Auth", authSchema);
