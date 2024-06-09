
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./Landing Page/LandingPage";
import PatientLogin from "./Login/PatientLogin/PatientLogin";
import PatientDashboard from "./Patient/PatientDashboard/PatientDashboard";
import PatientDashpage from "./Patient/PatientDashboard/PatientDashpage/PatientDashpage";
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
import DoctorChangeCategoryTable
  from "./Doctor/DoctorFunctions/DoctorAdvanceDiagnose/DoctorChangeCategory/DoctorChangeCategoryTable";
import DoctorChangeTreatmentTable
  from "./Doctor/DoctorFunctions/DoctorAdvanceDiagnose/DoctorChangeTreatment/DoctorChangeTreatmentTable";
import DoctorPauseTreatmentTable
  from "./Doctor/DoctorFunctions/DoctorAdvanceDiagnose/DoctorPauseTreatment/DoctorPauseTreatmentTable";
import DoctorResumeTreatmentTable
  from "./Doctor/DoctorFunctions/DoctorAdvanceDiagnose/DoctorResumeTreatment/DoctorResumeTreatmentTable";
import DoctorConfirmChangeCategory
  from "./Doctor/DoctorFunctions/DoctorAdvanceDiagnose/DoctorChangeCategory/DoctorConfirmChangeCategory";
import DoctorConfirmChangeTreatment
  from "./Doctor/DoctorFunctions/DoctorAdvanceDiagnose/DoctorChangeTreatment/DoctorConfirmChangeTreatment";
import DoctorReference from "./Doctor/DoctorFunctions/DoctorReference/DoctorReference";
import DoctorMakeReferenceTable
  from "./Doctor/DoctorFunctions/DoctorReference/DoctorMakeReference/DoctorMakeReferenceTable";
import DoctorConfirmReference
  from "./Doctor/DoctorFunctions/DoctorReference/DoctorMakeReference/DoctorConfirmReference";
import DoctorIncomingReferenceTable
  from "./Doctor/DoctorFunctions/DoctorReference/DoctorIncomingReference/DoctorIncomingReferenceTable";
import NurseTreatmentRecords from "./Nurse/NurseFunctions/NurseTreatmentRecords/NurseTreatmentRecords";
import NurseNewTreatmentTable
  from "./Nurse/NurseFunctions/NurseTreatmentRecords/NurseNewTreatment/NurseNewTreatmentTable";
import NurseConfirmNewRecord
  from "./Nurse/NurseFunctions/NurseTreatmentRecords/NurseNewTreatment/NurseConfirmNewRecord";
import NursePendingTreatmentTable
  from "./Nurse/NurseFunctions/NurseTreatmentRecords/NursePendingTreatment/NursePendingTreatmentTable";
import DoctorTest from "./Doctor/DoctorFunctions/DoctorTest/DoctorTest";
import DoctorRequestTest from "./Doctor/DoctorFunctions/DoctorTest/DoctorRequestTest/DoctorRequestTest";
import NurseTest from "./Nurse/NurseFunctions/NurseTest/NurseTest";
import NurseRequestedTestTable from "./Nurse/NurseFunctions/NurseTest/NurseRequestedTest/NurseRequestedTestTable";
import NurseConfirmRequestedTest from "./Nurse/NurseFunctions/NurseTest/NurseRequestedTest/NurseConfirmRequestedTest";
import NurseScheduledTestTable from "./Nurse/NurseFunctions/NurseTest/NurseScheduledTest/NurseScheduledTestTable";
import DoctorPendingTestTable from "./Doctor/DoctorFunctions/DoctorTest/DoctorPendingTest/DoctorPendingTestTable";
import NurseConfirmScheduledTest from "./Nurse/NurseFunctions/NurseTest/NurseScheduledTest/NurseConfirmScheduledTest";
import DoctorClinic from "./Doctor/DoctorFunctions/DoctorClinic/DoctorClinic";
import DoctorMakeClinic from "./Doctor/DoctorFunctions/DoctorClinic/DoctorMakeClinic/DoctorMakeClinic";
import DoctorScheduledClinic from "./Doctor/DoctorFunctions/DoctorClinic/DoctorScheduledClinic/DoctorScheduledClinic";
import NurseClinic from "./Nurse/NurseFunctions/NurseClinic/NurseClinic";
import NurseScheduledClinicTable
  from "./Nurse/NurseFunctions/NurseClinic/NurseScheduledClinic/NurseScheduledClinicTable";
import DoctorOngoingClinicTable
  from "./Doctor/DoctorFunctions/DoctorClinic/DoctorOngoingClinic/DoctorOngoingClinicTable";
import PatientClinicHistoryTable from "./Patient/PatientFunctions/PatientClinicHistory/PatientClinicHistoryTable";
import PatientTestHistoryTable
  from "./Patient/PatientFunctions/PatientTestHistory/PatientTestHistoryTable";
import PatientTreatmentHistoryTable from "./Patient/PatientFunctions/PatientTreatmentHistory/PatientTreatmentHistoryTable";
import NurseConfirmRescheduleAppointment
  from "./Nurse/NurseFunctions/NurseAppointmentManagement/NurseRescheduleAppointment/NurseConfirmRescheduleAppointment";
import NurseOngoingClinicTable from "./Nurse/NurseFunctions/NurseClinic/NurseOngoingClinic/NurseOngoingClinicTable";
import PatientReferralHistoryTable from "./Patient/PatientFunctions/PatientReferralHistory/PatientReferralHistoryTable";
import DoctorDashPage from "./Doctor/DoctorDashboard/DoctorDashPage/DoctorDashPage";
import DoctorPatientHistory from "./Doctor/DoctorDashboard/DoctorPatientHistory/DoctorPatientHistory";
import DoctorTestHistory from "./Doctor/DoctorDashboard/DoctorPatientHistory/DoctorTestHistory/DoctorTestHistory";
import DoctorTreatmentHistory
  from "./Doctor/DoctorDashboard/DoctorPatientHistory/DoctorTreatmentHistory/DoctorTreatmentHistory";
import DoctorRefarralHistory
  from "./Doctor/DoctorDashboard/DoctorPatientHistory/DoctorRefarralHistory/DoctorRefarralHistory";
import DoctorClinicHistory from "./Doctor/DoctorDashboard/DoctorPatientHistory/DoctorClinicHistory/DoctorClinicHistory";
import NurseDashPage from "./Nurse/NurseDashboard/NurseDashPage/NurseDashPage";
import NursePatientHistory from "./Nurse/NurseDashboard/NursePatientHistory/NursePatientHistory";
import NurseRescheduleTestTable from "./Nurse/NurseFunctions/NurseTest/NurseRescheduleTest/NurseRescheduleTestTable";
import DoctorFinishTreatmentTable
  from "./Doctor/DoctorFunctions/DoctorAdvanceDiagnose/DoctorFinishTreatment/DoctorFinishTreatmentTable";

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
              <Route path="clinichistory" element={<PatientClinicHistoryTable />}></Route>
              <Route path="treatmenthistory" element={<PatientTreatmentHistoryTable />}></Route>
              <Route path="testhistory" element={<PatientTestHistoryTable />}></Route>
              <Route path="referral" element={<PatientReferralHistoryTable />}></Route>
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRole={"doctor"} />}>
            <Route path='/doctordashboard' element={<DoctorDashboard />}>
              <Route path="" element={<DoctorDashPage />} ></Route>
              <Route path="patienthistory/:patient_id" element={<DoctorPatientHistory />}>
                <Route path="" element={<DoctorTestHistory />} ></Route>
                <Route path="treatmenthistory" element={<DoctorTreatmentHistory />}></Route>
                <Route path="clinichistory" element={<DoctorClinicHistory />}></Route>
                <Route path="referralhistory" element={<DoctorRefarralHistory />}></Route>
              </Route>
              <Route path="patientmanagement" element={<DoctorPatientManagement />}>
                <Route path="" element={<DoctorToDiagnoseTable />}></Route>
                <Route path="todiagnose/:patient_id" element={<DoctorConfirmToDiagnose />}></Route>
                <Route path="toadmit" element={<DoctorToAdmitTable />}></Route>
              </Route>
              <Route path="advancediagnose" element={<DoctorAdvanceDiagnose />}>
                <Route path="" element={<DoctorToCategorizeTable />}></Route>
                <Route path="tocatagorize/:patient_id" element={<DoctorConfirmCategorize />}></Route>
                <Route path="changecategory" element={<DoctorChangeCategoryTable />}></Route>
                <Route path="changecategory/:patient_id" element={<DoctorConfirmChangeCategory />}></Route>
                <Route path="changetreatment" element={<DoctorChangeTreatmentTable />}></Route>
                <Route path="changetreatment/:patient_id" element={<DoctorConfirmChangeTreatment />}></Route>
                <Route path="pausetreatment" element={<DoctorPauseTreatmentTable />}></Route>
                <Route path="resumetreatment" element={<DoctorResumeTreatmentTable />}></Route>
                <Route path="finishtreatment" element={<DoctorFinishTreatmentTable />}></Route>
              </Route>
              <Route path="referral" element={<DoctorReference />}>
                <Route path="" element={<DoctorMakeReferenceTable />}></Route>
                <Route path="makereferral/:patient_id" element={<DoctorConfirmReference />}></Route>
                <Route path="incomingreferral" element={<DoctorIncomingReferenceTable />}></Route>
              </Route>
              <Route path="test" element={<DoctorTest />}>
                <Route path="" element={<DoctorRequestTest />} ></Route>
                <Route path="pendingtest" element={<DoctorPendingTestTable />} ></Route>
              </Route>
              <Route path="clinic" element={<DoctorClinic />}>
                <Route path="" element={<DoctorMakeClinic />}></Route>
                <Route path="scheduledclinic" element={<DoctorScheduledClinic />}></Route>
                <Route path="ongoingclinic" element={<DoctorOngoingClinicTable />}></Route>
              </Route>
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
              <Route path="" element={<NurseDashPage />} ></Route>
              <Route path="patienthistory/:patient_id" element={<NursePatientHistory />}>
                <Route path="" element={<DoctorTestHistory />} ></Route>
                <Route path="treatmenthistory" element={<DoctorTreatmentHistory />}></Route>
                <Route path="clinichistory" element={<DoctorClinicHistory />}></Route>
                <Route path="referralhistory" element={<DoctorRefarralHistory />}></Route>
              </Route>
              <Route path="appointmentmanagement" element={<NurseAppointmentManagement />}>
                <Route path="" element={<NurseConfirmAppointmentTable />}></Route>
                <Route path="confirmappointment/:appointment_id" element={<NurseConfirmAppointment />}></Route>
                <Route path="rescheduleappointment" element={<NurseRescheduleAppointmentTable />}></Route>
                <Route path="rescheduleappointment/:appointment_id" element={<NurseConfirmRescheduleAppointment />}></Route>
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
              <Route path="treatment" element={<NurseTreatmentRecords />}>
                <Route path="" element={<NurseNewTreatmentTable />} ></Route>
                <Route path="newtreatment/:patient_id" element={<NurseConfirmNewRecord />}></Route>
                <Route path="pendingtreatment" element={<NursePendingTreatmentTable />}></Route>
                <Route path="pendingtreatment/:treatment_record_id"></Route>

              </Route>
              <Route path="test" element={<NurseTest />}>
                <Route path="" element={<NurseRequestedTestTable />} ></Route>
                <Route path="requestedtest/:test_id" element={<NurseConfirmRequestedTest />}></Route>
                <Route path="scheduledtest" element={<NurseScheduledTestTable />}></Route>
                <Route path="scheduledtest/:test_id" element={<NurseConfirmScheduledTest />}></Route>
                <Route path="rescheduledtest" element={<NurseRescheduleTestTable />}></Route>
              </Route>
              <Route path="clinic" element={<NurseClinic />}>
                    <Route path="" element={<NurseScheduledClinicTable />}></Route>
                    <Route path="ongoingclinic" element={<NurseOngoingClinicTable />}></Route>

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
