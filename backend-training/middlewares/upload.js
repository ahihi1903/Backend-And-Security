import multer from "multer";
import path from "path";

//cấu hình lưu file
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     // lưu ảnh ở folder nào
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     //đặt tên file ảnh tendocnhat + tengoc
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueName + path.extname(file.originalname));
//   },
// });

//filter loại file
function fileFilter(req, file, cb) {
  //chỉ cho upload các loại file trong allowedTypes
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only image files allowed"), false);
  }

  cb(null, true);
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, //giới hạn 5MB
    files: 1,
  },
});

export default upload;
