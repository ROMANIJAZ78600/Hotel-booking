import express from "express";
import authmiddleware from "../middleware/authmiddleware.js";
import { registerHotel } from "../Controller/hotelController.js";

const hotelroute = express.Router();

hotelroute.post("/", authmiddleware, registerHotel);

export default hotelroute;
