const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const UserModel = require("./model/User");

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
})); //communicate frontend with backend or vice-versa

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
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.post("/login", async(req,res)=>{
    try {
        const {email, password } = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch){
            req.session.user = {id:user_id, name:user.name, email:user.email}
        }else{
            res.status(400).json("password does not match");
            res.json("Success");
            console.log(email);
        }
    }else{
        return res.status(400).json("No records found")
    }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URI
    }),
    cookie:{maxAge: 24 * 60 * 60 * 1000}
}))

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})

app.get('/user', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json("Not authenticated");
    }
});