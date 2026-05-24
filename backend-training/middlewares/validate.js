import { ZodError } from "zod";

export default function validate(schema) {
  // return (req, res, next) => {
  //   console.log("schema:", schema);
  //   try {
  //     req.body = schema.parse(req.body);

  //     next();
  //   } catch (error) {
  //     // ✅ Chỉ xử lý ZodError, còn lại chuyển cho error handler
  //     if (error instanceof ZodError) {
  //       return res.status(400).json({
  //         message: error.errors[0].message,
  //       });
  //     }
  //     next(error); // lỗi khác (TypeError, v.v.) → đẩy lên global handler
  //   }
  // };
  return (req, res, next) => {
    const result = schema.safeParse(req.body); // ✅ không throw, trả về object

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message, // Zod v4 dùng .issues thay vì .errors
      });
    }

    req.body = result.data;
    next();
  };
}
