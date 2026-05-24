import app from "./app.js";
// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";
import connectDB from "./config/database.js";

await connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
