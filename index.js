require("dotenv").config();
const express = require("express");
const { route } = require("./routes/authRoute");
const app = express();

const PORT = process.env.PORT || 8000;
app.use(express.json())
app.use(express.static("/public"))
app.use("/api" , route)

app.get("/" , (req,res) =>{
  res.send("<h1>Welcome to backend side 🙏</h1>")
})

app.listen(PORT , console.log(`Server is running on http://localhost:${PORT}`))