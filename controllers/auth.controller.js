import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //CHECK IF USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid Creadentials" });

    //CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Creadentials" });

    //GENERATE COOKIE TOKEN AND SEND IT TO THE USER
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("Success");

    const age = 1000 * 60 * 60 * 24 * 7; // 7 days

    res
      .cookie("test2", "myValue", {
        httpOnly: true,
        //secure: true, //for http request for deployment
        maxAge: age, // it expires after 7 days
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  //db operations
};
