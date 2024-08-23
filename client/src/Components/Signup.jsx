import { Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import React from "react";

export const Signup = () => {
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
          <form>
            <Typography style={heading}>Signup</Typography>
            <TextField style={row} sx={{label: { fontWeight: '700', fontSize:"1.2rem" }}} label="Enter name" type="text"></TextField>
            <TextField style={row} sx={{label: { fontWeight: '700', fontSize:"1.2rem" }}} label="Enter Email" type="email"></TextField>
            <TextField style={row} sx={{label: { fontWeight: '700', fontSize:"1.2rem" }}} label="Enter Password" type="password"></TextField>
            <Button style={btnStyle} variant = "contained" type="submit">SignUp</Button>
          </form>
          <p>
            Already have an account?<Link href="/login"> Login</Link>
          </p>
        </Paper>
      </Grid>
    </>
  );
};

export default Signup;
