const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT || 8080;

//mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

// USER

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
});

//model
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", async (req, res) => {
  res.send("Server is running");
});
//sign up
app.post("/sign_up", (req, res) => {
  console.log("User registered:");
  console.log(req.body);
  const { email } = req.body;

  userModel.findOne({ email: email }).then((result) => {
    if (result) {
      res.send({ message: "Email is already registered!", alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "You have successfully registered!", alert: true });
    }
  });
});
//login
app.post("/login", (req, res) => {
  console.log("User logged in:");
  console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email }).then((result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
      };
      res.send({
        message: "You have successfully logged in!",
        alert: true,
        data: dataSend,
      });
      console.log("Account exists in database");
    } else {
      res.send({
        message: "No account registered with these credentials!",
        alert: false,
      });
      console.log("Account not in database");
    }
  });
});

// PRODUCT
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

//save product in database
app.post("/uploadProduct", async (req, res) => {
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "Upload successfully" });
});

//get product from database
app.get("/product", async(req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

app.listen(PORT, () => console.log("Server is running at PORT: " + PORT));