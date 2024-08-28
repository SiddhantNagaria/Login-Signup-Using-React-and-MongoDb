import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
export const IsLoggedInContext = createContext();
export const SetIsLoggedInContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/user", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(()=> setIsLoggedIn(false))  
  }, []);
  return (
    <>
      <IsLoggedInContext.Provider value={isLoggedIn}>
        <SetIsLoggedInContext.Provider value={setIsLoggedIn}>
          <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn } />
            <Routes>
              <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login/>}></Route> 
              <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <Signup/>}></Route>
              <Route path="/home" element={isLoggedIn?<Home/> : <Navigate to="/login"/>}></Route>
            </Routes>
          </BrowserRouter>
        </SetIsLoggedInContext.Provider>
      </IsLoggedInContext.Provider>
    </>
  );
}

export default App;
