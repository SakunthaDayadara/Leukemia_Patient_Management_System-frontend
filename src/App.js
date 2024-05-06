
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./Landing Page/LandingPage";
import PatientLogin from "./PatientLogin/PatientLogin";
import PatientDashboard from "./PatientDashboard/PatientDashboard";
import PatientDashpage from "./PatientDashboard/PatientDashpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/patientlogin' element={<PatientLogin />}></Route>
          <Route path='/patientdashboard' element={<PatientDashboard />}>
            <Route path="" element={<PatientDashpage />} ></Route>
            <Route path="part1"></Route>
            <Route path="part2"></Route>
            <Route path="part3"></Route>
            <Route path="part4"></Route>
          </Route>
        </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
