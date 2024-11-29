import express from "express";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();
app.use(express.json()); // to parse json request
app.use(cookieParser()); // to parse cookie request

// app.use("/", (req, res) => {
//   res.send("Server is running");
// });

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(5000, () => {
  console.log("server is running");
});
