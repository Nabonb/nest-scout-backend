import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("this!");
  console.log("router work");
});

export default router;
