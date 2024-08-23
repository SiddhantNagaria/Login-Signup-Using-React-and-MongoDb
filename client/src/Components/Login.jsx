import { Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const heading = { fontSize: "2.5rem", fontWeight: "600" };
  const paperStyle = {
    padding: "2rem",
    margin: "100px auto",
    borderRadius: "1rem",
    boxShadow: "10px 10px 10px",
  };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = {
    marginTop: "2rem",
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroundColor: "blue",
    borderRadius: "0.5rem",
  };
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/login", {email, password}, {withCredentials:true})
    .then(result =>{
      if(result.data == "Success"){
        axios.get("http://localhost:3001/user", {withCredentials:true})
        .then(response=>{
          if(response.data.user){
            navigate("/home" , { state:{user:response.data.user}});
          }
        })
      }else{
        alert("Invalid Credentials");
      }
    })
    .catch(err => console.log(err))
  }
  return (
    <>
      <Grid align="center">
        <Paper
          style={paperStyle}
          sx={{
            width: {
              xs: "80vw", // 0
              sm: "50vw", // 600
              md: "40vw", // 900
              lg: "30vw", // 1200
              xl: "20vw", // 1536
            },
            height: {
              lg: "60vh", // 1200px and up
            },
          }}
        >
        <Typography style={heading}>Login</Typography>
          <form onSubmit={handleLogin}>
            {/* <TextField style={row} sx={{label: { fontWeight: '700', fontSize:"1.2rem" }}} label="Enter name" type="text"></TextField> */}
            <TextField onChange={(e)=>setEmail(e.target.value)} name ="email" style={row} sx={{label: { fontWeight: '700', fontSize:"1.2rem" }}} label="Enter Email" type="email"></TextField>
            <TextField onChange={(e)=>setPassword(e.target.value)} name="password" style={row} sx={{label: { fontWeight: '700', fontSize:"1.2rem" }}} label="Enter Password" type="password"></TextField>
            <Button style={btnStyle} variant = "contained" type="submit">Login</Button>
          </form>
          <p>
            Don't have an account?<Link href="/signup"> Signup</Link>
          </p>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;