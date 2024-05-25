
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./Landing Page/LandingPage";
import PatientLogin from "./Login/PatientLogin/PatientLogin";
import PatientDashboard from "./Patient/PatientDashboard/PatientDashboard";
import PatientDashpage from "./Patient/PatientDashboard/PatientDashpage";
import StaffLogin from "./Login/StaffLogin/StaffLogin";
import DoctorDashboard from "./Doctor/DoctorDashboard/DoctorDashboard";
import AdminDashboard from "./Admin/AdminDashboard/AdminDashboard";
import NurseDashboard from "./Nurse/NurseDashboard/NurseDashboard";
import PatientRegister from "./Login/PatientRegister/PatientRegister";
import AdminDashpage from "./Admin/AdminDashboard/AdminDashpage";
import AdminAccountManagement from "./Admin/AdminFunctions/AccountManagement/AdminAccountManagement";
import AdminCreateAccount from "./Admin/AdminFunctions/AccountManagement/AdminCreateAccount";
import AdminUpdateAccount from "./Admin/AdminFunctions/AccountManagement/AdminUpdateAccount";
import AdminUpdateAccountPassword from "./Admin/AdminFunctions/AccountManagement/AdminUpdateAccountPassword";
import NursePatientManagement from "./Nurse/NurseFunctions/NursePatientManagement/NursePatientManagement";
import NurseConfirmInitialAppointment from "./Nurse/NurseFunctions/NursePatientManagement/NurseInitialAppointment/NurseConfirmInitialAppointment";
import RequireAuth from "./Util/RequireAuth";
import NurseInitialAppointmentTable from "./Nurse/NurseFunctions/NursePatientManagement/NurseInitialAppointment/NurseInitialAppointmentTable";
import NurseTestDoneTable from "./Nurse/NurseFunctions/NursePatientManagement/NurseTestDone/NurseTestDoneTable";
import NurseConfirmTestDone from "./Nurse/NurseFunctions/NursePatientManagement/NurseTestDone/NurseConfirmTestDone";
import DoctorPatientManagement from "./Doctor/DoctorFunctions/DoctorpatientManagement/DoctorPatientManagement";
import DoctorToDiagnoseTable
  from "./Doctor/DoctorFunctions/DoctorpatientManagement/DoctorToDiagnose/DoctorToDiagnoseTable";
import PatientMakeAppointments from "./Patient/PatientFunctions/PatientMakeAppointments/PatientMakeAppointments";
import NurseAppointmentManagement from "./Nurse/NurseFunctions/NurseAppointmentManagement/NurseAppointmentManagement";
import NurseConfirmAppointmentTable
  from "./Nurse/NurseFunctions/NurseAppointmentManagement/NurseConfirmAppointment/NurseConfirmAppointmentTable";
import NurseConfirmAppointment
  from "./Nurse/NurseFunctions/NurseAppointmentManagement/NurseConfirmAppointment/NurseConfirmAppointment";
import NurseOngoingAppointmentTable
  from "./Nurse/NurseFunctions/NurseAppointmentManagement/NurseOngoingAppointment/NurseOngoingAppointmentTable";
import NurseRescheduleAppointmentTable
  from "./Nurse/NurseFunctions/NurseAppointmentManagement/NurseRescheduleAppointment/NurseRescheduleAppointmentTable";
import NurseFinishedAppointment
  from "./Nurse/NurseFunctions/NurseAppointmentManagement/NurseFinishedAppointment/NurseFinishedAppointment";
import NurseToDiagnoseTable from "./Nurse/NurseFunctions/NursePatientManagement/NurseToDiagnose/NurseToDiagnoseTable";
import DoctorConfirmToDiagnose
  from "./Doctor/DoctorFunctions/DoctorpatientManagement/DoctorToDiagnose/DoctorConfirmToDiagnose";
import DoctorToAdmitTable from "./Doctor/DoctorFunctions/DoctorpatientManagement/DoctorToAdmit/DoctorToAdmitTable";
import NurseToAdmitTable from "./Nurse/NurseFunctions/NursePatientManagement/NurseToAdmit/NurseToAdmitTable";
import NurseConfirmToAdmit from "./Nurse/NurseFunctions/NursePatientManagement/NurseToAdmit/NurseConfirmToAdmit";
import NurseAdmittedTable
  from "./Nurse/NurseFunctions/NursePatientManagement/NurseAddmittedPatients/NurseAdmittedTable";
import NurseDischargePatient
  from "./Nurse/NurseFunctions/NursePatientManagement/NurseAddmittedPatients/NurseDischargePatient";
import DoctorAdvanceDiagnose from "./Doctor/DoctorFunctions/DoctorAdvanceDiagnose/DoctorAdvanceDiagnose";
import DoctorToCategorizeTable
  from "./Doctor/DoctorFunctions/DoctorAdvanceDiagnose/DoctorToCategorize/DoctorToCategorizeTable";
import DoctorConfirmCategorize
  from "./Doctor/DoctorFunctions/DoctorAdvanceDiagnose/DoctorToCategorize/DoctorConfirmCategorize";

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
            <Route path='/patientappointment/:patient_id' element={<PatientMakeAppointments />}></Route>
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
              <Route path="patientmanagement" element={<DoctorPatientManagement />}>
                <Route path="" element={<DoctorToDiagnoseTable />}></Route>
                <Route path="todiagnose/:patient_id" element={<DoctorConfirmToDiagnose />}></Route>
                <Route path="toadmit" element={<DoctorToAdmitTable />}></Route>
              </Route>
              <Route path="advancediagnose" element={<DoctorAdvanceDiagnose />}>
                <Route path="" element={<DoctorToCategorizeTable />}></Route>
                <Route path="tocatagorize/:patient_id" element={<DoctorConfirmCategorize />}></Route>
              </Route>
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
              <Route path="appointmentmanagement" element={<NurseAppointmentManagement />}>
                <Route path="" element={<NurseConfirmAppointmentTable />}></Route>
                <Route path="confirmappointment/:appointment_id" element={<NurseConfirmAppointment />}></Route>
                <Route path="rescheduleappointment" element={<NurseRescheduleAppointmentTable />}></Route>
                <Route path="rescheduleappointment/:appointment_id"></Route>
                <Route path="ongoingappointment" element={<NurseOngoingAppointmentTable />}></Route>
                <Route path="finishedappointment" element={<NurseFinishedAppointment />}></Route>

              </Route>
              <Route path="patientmanagement" element={<NursePatientManagement />}>
                <Route path="" element={<NurseInitialAppointmentTable />}></Route>
                <Route path="confirmpatient/:patient_id" element={<NurseConfirmInitialAppointment />}></Route>
                <Route path="testdone" element={<NurseTestDoneTable />}></Route>
                <Route path="testdone/:patient_id" element={<NurseConfirmTestDone />}></Route>
                <Route path="todiagnose" element={<NurseToDiagnoseTable />}></Route>
                <Route path="toadmit" element={<NurseToAdmitTable />}></Route>
                <Route path="toadmit/:patient_id" element={<NurseConfirmToAdmit />}></Route>
                <Route path="admitted" element={<NurseAdmittedTable />}></Route>
                <Route path="admitted/:patient_id" element={<NurseDischargePatient />}></Route>
              </Route>
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
