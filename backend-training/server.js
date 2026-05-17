import app from "./app.js";
// import dotenv from "dotenv";

// dotenv.config();
import "dotenv/config";

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
