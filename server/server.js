import express from "express";
import "dotenv/config";
import cors from "cors";
import connect from "./config/Database.js";
import { clerkMiddleware } from "@clerk/express";
import clerkwebhook from "./Controller/clerkWebhook.js";
import userRouter from "./routes/userroute.js";
import hotelroute from "./routes/Hotelroute.js";
import connectcloudinary from "./config/cloudinary.js";
import roomrouter from "./routes/roomroute.js";
import bookingrouter from "./routes/bookingroute.js";

connect();
connectcloudinary();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
//middleware
app.use(express.json());
app.use(clerkMiddleware());

//api to listen clerk whook
app.post("/api/clerk", clerkwebhook);
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelroute);
app.use("/api/room", roomrouter);
app.use("/api/bookings", bookingrouter);

// enable cross-origin resource sharing

app.get("/", (req, res) => res.send("Api is working"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server is running on " + port));
