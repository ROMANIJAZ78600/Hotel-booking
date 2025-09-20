import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("DB is Connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connect;
