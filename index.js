import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import userModel from "./schema/authentication.js";


const app = express();
app.use(express.json());
dotenv.config();
const db = process.env.DB_URL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("<center><h1>welcome</h1></center>");
});


app.get("/users", async (req, res) => {
  const user = await  userModel.find({});
  if (user) {
    return res.status(200).json({
      status : true,
      message: "successful",
      data: user,
    });
  }
  else {
    return res.status(400).json({
      status: false,
      message:"not found",
    })
  }
});

// app.post("/registration", async (req, res) => {
//   const {  } =
//     req.body;

//   })

  app.post('/user', async (req, res) => {
    //const { name, email, address, number, city } =req.body;
    //email and password
    //const email = req.body.email
    //const password = req.body.password
    try {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(req.body.password, salt);
      console.log(salt);
      console.log(password);
      const { name, email,number,city,address } = req.body;
  
      
      const user = await userModel.create({
        name,
        email,
        password,
        address,
        number,
        city,
      })
      if (user) {
        return res.status(201).json({
          status: true,
          message: "registration successful",
          data: userModel,
        });
      } else {
        return res.status(400).json({
          status: "registration failed to create",
        });
      }
  
      }
     catch (err) {
      console.log(err);
    }
    
  })
   
  app.post('/user/login', (req, res) => {
    //email and password
    const email = req.body.email
    const password = req.body.password
  
    //find user exist or not
    userModel.findOne({ email })
        .then(user => {
            //if user not exist than return status 400
            if (!user) return res.status(400).json({ msg: "User not exist" })
  
            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err
  
                //if both match than you can do anything
                if (data) {
                    return res.status(200).json({ msg: "Login success" })
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" })
                }
  
            })
  
        })
      }) 
  
  app.listen(5000, () => {
    console.log("sever is listening");
  });