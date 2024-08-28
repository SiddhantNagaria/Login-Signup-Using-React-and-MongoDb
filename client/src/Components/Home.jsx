import React from "react";
import { useLocation } from "react-router-dom";
const Home = () => {
  const location = useLocation();
  const user = location.state?.user;
  return (
    <div style={{ color: "white" }}>
      {" "}
      <h1>Welcome home {user && user.name}</h1>
    </div>
  );
};

export default Home;
