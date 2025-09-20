import hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import room from "../models/room.js";

//api too create room
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const Hotel = await hotel.findOne({ owner: req.auth.userId });
    if (!Hotel) return res.json({ success: false, message: "No Hotel fouond" });

    //upload
    const uploadimages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    const images = await Promise.all(uploadimages);
    await room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });
    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//api to get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await room
      .find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//api to get all rooms for specific hotel
export const getOwnerRoom = async (req, res) => {
  try {
    const hoteldata = await hotel({ owner: req.auth.userId });
    const rooms = await room
      .find({ hotel: hoteldata._id.toString() })
      .populate("hotel");
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//api tto toggle availability of a room
export const availroom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomdata = await room.findById(roomId);
    roomdata.isAvailable = !roomdata.isAvailable;
    await roomdata.save();
    res.json({ success: true, message: "Room availability updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
