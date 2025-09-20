import express from "express";
import "dotenv/config";
import cors from "cors";
import connect from "./config/Database.js";
import { clerkMiddleware } from "@clerk/express";
import clerkwebhook from "./Controller/clerkWebhook.js";

connect();
const app = express();
//middleware
app.use(express.json());
app.use(clerkMiddleware());

//api to listen clerk whook
app.use("/api/clerk", clerkwebhook);

app.use(cors()); // enable cross-origin resource sharing

app.get("/", (req, res) => res.send("Api is working"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server is running on " + port));
