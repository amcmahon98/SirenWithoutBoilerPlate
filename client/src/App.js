import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Cookies from 'universal-cookie';
import './App.css';
import Home from "./Pages/Home";
import IndividualAlert from "./Pages/IndividualAlert";
import Navigation from "./Components/Navigation";
import CreateAlert from "./Pages/CreateAlert";
import CreateAccount from "./Pages/CreateAccount";
import Login from "./Pages/Login";
import {PrivateRoute} from "./Components/PrivateRoute";
import Account from "./Pages/Account";
import Maintenance from "./Pages/Maintenance";
import Schedule from "./Pages/Schedule";
import Analytics from "./Pages/Analytics";
import ChangePassword from "./Pages/ChangePassword";

function App() {
  const cookies = new Cookies();
  const isLoggedIn = cookies.get('isloggedin');

  return (
    <Router>
    <Navigation />
     <div className="App">

     </div>
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} /> 
      <Route path="/view/alert/:id" element={<PrivateRoute><IndividualAlert /></PrivateRoute>} /> 
      <Route path="/create/alert" element={<PrivateRoute><CreateAlert /></PrivateRoute>} /> 
      <Route path="/create/account" element={<CreateAccount/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/change-password" element={<ChangePassword/>}/>
      <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} /> 
      <Route path="/maintenance" element={<PrivateRoute><Maintenance /></PrivateRoute>} /> 
      <Route path="/schedule" element={<PrivateRoute><Schedule /></PrivateRoute>} /> 
      <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} /> 
    </Routes>
    
  </Router>
  );
}

export default App;
