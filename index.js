require("dotenv").config();
const express = require("express")
const connectDB = require("./config/db_connect");
const route = require("./routes/authRoute")
const adminRoute = require("./routes/adminRoutes")
const categoryRouter = require("./routes/commonRoute")
const app = express();

const PORT = process.env.PORT || 8000;

// Middleware to parse JSON
app.use(express.json());

// Serving static files from the "public" folder
app.use(express.static("public"));

// Using routes
app.use("/api", route);
app.use("/api/admin", adminRoute)
app.use("/api", categoryRouter)

app.get("/", (req, res) => {
  res.send("<h1>Welcome to backend side 🙏</h1>");
});

// Connect to the database and handle errors
connectDB().catch((error) => {
  console.error("Database connection failed:", error);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
