const mongoose = require("mongoose")



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log("Connectedd to databse successfully ✌")
  } catch (error) {
    console.log("error while connecting to databse database " + error)
  }
}
module.exports = connectDB