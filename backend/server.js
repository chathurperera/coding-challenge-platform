require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
connectDB(process.env.MONGO_URI);

const authRoutes = require('./routes/authRoutes')
const codeRoutes = require('./routes/codeRoutes')
const testRoutes = require('./routes/testRoutes')

app.use(cors({
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

//Routes
app.use('/api/', authRoutes);
app.use('/api/code', codeRoutes);
app.use('/api/test', testRoutes);

//SERVE STATIC ASSETS IF IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  //SET STATIC FOLDER
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

//CONNECTING TO THE DATABASE
mongoose.connection.once("open", async () => {
  console.log("connected to MongoDB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}...`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});


