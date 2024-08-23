const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const UserModel = require("./model/User")

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors()); //communicate frontend with backend or vice-versa

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to database");
  }).catch((err) => {
    console.log("failed to connect to Database", err);
});

app.post("/signup", async(req,res)=>{
    try {
        const {name, email, password } = req.body;
        console.log(name + " " + email + " " + password);
        const existingUser = await UserModel.findOne({ email });
        console.log(existingUser);
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({name, email, password: hashedPassword});
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})