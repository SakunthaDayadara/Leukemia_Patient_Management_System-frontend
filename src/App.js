
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./Landing Page/LandingPage";
import PatientLogin from "./Login/PatientLogin/PatientLogin";
import PatientDashboard from "./PatientDashboard/PatientDashboard";
import PatientDashpage from "./PatientDashboard/PatientDashpage";
import StaffLogin from "./Login/StaffLogin/StaffLogin";
import DoctorDashboard from "./DoctorDashboard/DoctorDashboard";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import NurseDashboard from "./NurseDashboard/NurseDashboard";
import PatientRegister from "./Login/PatientRegister/PatientRegister";
import AdminDashpage from "./AdminDashboard/AdminDashpage";
import AdminAccountManagement from "./AdminFunctions/AccountManagement/AdminAccountManagement";
import AdminCreateAccount from "./AdminFunctions/AccountManagement/AdminCreateAccount";
import AdminUpdateAccount from "./AdminFunctions/AccountManagement/AdminUpdateAccount";
import AdminUpdateAccountPassword from "./AdminFunctions/AccountManagement/AdminUpdateAccountPassword";
import NursePatientManagement from "./NurseFunctions/NursePatientManagement/NursePatientManagement";
import NurseConfirmPatient from "./NurseFunctions/NursePatientManagement/NurseConfirmPatient";
import RequireAuth from "./Util/RequireAuth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/patientlogin' element={<PatientLogin />}></Route>
          <Route path='/patientregister' element={<PatientRegister />}></Route>
          <Route path='/stafflogin' element={<StaffLogin />}></Route>
          <Route element={<RequireAuth allowedRole={"patient"} />}>
            <Route path='/patientdashboard' element={<PatientDashboard />}>
              <Route path="" element={<PatientDashpage />} ></Route>
              <Route path="part1"></Route>
              <Route path="part2"></Route>
              <Route path="part3"></Route>
              <Route path="part4"></Route>
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRole={"doctor"} />}>
            <Route path='/doctordashboard' element={<DoctorDashboard />}>
              <Route path="" element={<PatientDashpage />} ></Route>
              <Route path="part1"></Route>
              <Route path="part2"></Route>
              <Route path="part3"></Route>
              <Route path="part4"></Route>
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRole={"admin"} />}>
            <Route path='/admindashboard' element={<AdminDashboard />}>
              <Route path="" element={<AdminDashpage />} ></Route>
              <Route path="accountmanagement" element={<AdminAccountManagement />}>
                <Route path="" element={<AdminCreateAccount />}></Route>
                <Route path="updateaccount" element={<AdminUpdateAccount />}>
                  <Route path=":type/:user_id" element={<AdminUpdateAccountPassword />}></Route>
                </Route>
              </Route>
              <Route path="part2"></Route>
              <Route path="part3"></Route>
              <Route path="part4"></Route>
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRole={"nurse"} />}>
            <Route path='/nursedashboard' element={<NurseDashboard />}>
              <Route path="" element={<PatientDashpage />} ></Route>
              <Route path="patientmanagement" element={<NursePatientManagement />}></Route>
              <Route path="confirmpatient/:patient_id" element={<NurseConfirmPatient />}></Route>
              <Route path="part2"></Route>
              <Route path="part3"></Route>
              <Route path="part4"></Route>
            </Route>
          </Route>

        </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
