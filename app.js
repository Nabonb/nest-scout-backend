import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // to enable cross-origin request and credential true for send cookies to the client side.
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

// npm run start --env-file .env
