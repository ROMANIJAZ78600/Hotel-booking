import {
  getUserData,
  storerecentcities,
} from "../Controller/userController.js";
import authmiddleware from "../middleware/authmiddleware.js";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", authmiddleware, getUserData);
userRouter.post("/store-recent-search", authmiddleware, storerecentcities);

export default userRouter;
