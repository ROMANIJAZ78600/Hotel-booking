import express from "express";
import upload from "../middleware/uploadmiddleware.js";
import authmiddleware from "../middleware/authmiddleware.js";
import {
  availroom,
  createRoom,
  getOwnerRoom,
  getRooms,
} from "../Controller/roomController.js";

const roomrouter = express.Router();

roomrouter.post(
  "/",
  authmiddleware, // check auth first
  upload.array("images", 4), // handle up to 4 images
  createRoom // finally create room
);

roomrouter.get("/", getRooms);
roomrouter.get("/owner", authmiddleware, getOwnerRoom);
roomrouter.post("/toggle-availability", authmiddleware, availroom);

export default roomrouter;
