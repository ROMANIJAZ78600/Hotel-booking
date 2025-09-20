import express from "express";
import {
  checkAvailability,
  createbooking,
  gethotelbookings,
  getUserbookings,
} from "../Controller/bookingController.js";
import authmiddleware from "../middleware/authmiddleware.js";

const bookingrouter = express.Router();

bookingrouter.post("/check-Availability", checkAvailability);
bookingrouter.post("/book", authmiddleware, createbooking);
bookingrouter.get("/user", authmiddleware, getUserbookings);
bookingrouter.get("/hotel", authmiddleware, gethotelbookings);

export default bookingrouter;
