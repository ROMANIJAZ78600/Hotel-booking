import hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    //check if user Already exist
    const Hotel = await hotel.findOne({ owner });
    if (Hotel) {
      return res.json({ success: false, message: "Hotel Already existed" });
    }
    await hotel.create({ name, address, contact, city, owner });

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.json({
      success: true,
      message: "Hotel registered successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
