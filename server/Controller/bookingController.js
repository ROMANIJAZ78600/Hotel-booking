import booking from "../models/bookings.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/room.js";
export const checkAvailability = async ({
  checkindate,
  checkoutdate,
  room,
}) => {
  try {
    const bookings = await booking.find({
      room,
      checkindate: { $lte: checkoutdate },
      checkoutdate: { $gte: checkindate },
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.error(error.message);
  }
};

//Api to check availability of room

export const checkavailapi = async (req, res) => {
  try {
    const { room, checkindate, checkoutdate } = req.body;
    const isAvailable = await checkAvailability({
      checkindate,
      checkoutdate,
      room,
    });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to create a new booking

export const createbooking = async (req, res) => {
  try {
    const { room, checkindate, checkoutdate, guests } = req.body;
    const user = req.user._id;

    const isAvailable = await checkAvailability({
      checkindate,
      checkoutdate,
      room,
    });
    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not  available " });
    }
    const roomdata = await Room.findById(room).populate("hotel");
    let totalPrice = roomdata.pricePerNight;

    const checkin = new Date(checkindate);
    const checkout = new Date(checkoutdate);
    const timeDiff = checkout.getTime() - checkin.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice *= nights;

    const bookings = await booking.create({
      user,
      room,
      hotel: roomdata.hotel._id,
      guests: +guests,
      checkindate,
      checkoutdate,
      totalPrice,
    });
    res.json({
      success: true,
      bookings,
      message: "Booking created successfully",
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to create booking" });
  }
};

export const getUserbookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await booking
      .find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch booking" });
  }
};

export const gethotelbookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({
      owner: req.auth.userId,
    });
    if (!hotel) {
      return res.json({ success: false, message: "No hotel Found" });
    }
    const bookings = await booking
      .find({ hotel: hotel._id })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    const totalbookings = bookings.length;

    const totalRevenue = bookings.reduce((acc, b) => acc + b.totalPrice);
    res.json({
      success: true,
      dashboaarddata: { totalbookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: "failed to fetch message" });
  }
};
