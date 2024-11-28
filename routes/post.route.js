import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("are baba its workds");
  console.log("router work");
});

export default router;
