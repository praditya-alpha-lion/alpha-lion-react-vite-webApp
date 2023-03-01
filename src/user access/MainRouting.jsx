import React from "react";
import { Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import Login from "../screens/authentication/Login";
import ProtectedRoute from "../screens/authentication/ProtectedRoute";
import Dashboard from "../screens/dashboard/Dashboard";
import Schedule from "../screens/schedule/Schedule";
import Master from "../screens/master/Master";
import Trucks from "../screens/trucks/Trucks";
import Drivers from "../screens/drivers/Drivers";
import Customer from "../screens/customer/Customer";
import Company from "../screens/company/Company";
import Brokers from "../screens/brokers/Brokers";
import About from "../screens/about/About";
import Trailers from "../screens/trailers/Trailers";
import Chats from "../components/chats/Chats";
import PageNotFound from "../screens/PageNotFound";
import Operation from "../screens/operation/Operation";
import Claims from "../screens/operation/Claims";
import ExaminationTickets from "../screens/operation/ExaminationTickets";
import Recruitment from "../screens/operation/Recruitment";
import SmsViolationSummary from "../screens/operation/SmsViolationSummary";
import SmsInspections from "../screens/operation/SmsInspections";
import CourtClaims from "../screens/operation/CourtClaims";
import Repairs from "../screens/repairs/Repairs";
import PreventativeMaintenance from "../screens/repairs/PreventativeMaintenance";
import Inventory from "../screens/repairs/Inventory";
import WorkQueueKentYard from "../screens/repairs/WorkQueueKentYard";
import DriversPayroll from '../screens/payrolls/DriversPayroll'
import CompanyPayroll from '../screens/payrolls/CompanyPayroll'
import Payrolls from "../screens/payrolls/Payrolls";
import DriverHiringForm from "../screens/operation/DriverHiringForm";
import Carriers from "../screens/operation/Carriers";

export default function MainRouting() {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <Routes>
      <Route path='/' element={userInfo ? <Dashboard /> : <Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/chats' element={<Chats />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/master' element={<Master />} />
        <Route path='/trailers' element={<Trailers />} />
        <Route path='/trucks' element={<Trucks />} />
        <Route path='/drivers' element={<Drivers />} />
        <Route path='/customers' element={<Customer />} />
        <Route path='/company' element={<Company />} />
        <Route path='/brokers' element={<Brokers />} />
        <Route path='/about' element={<About />} />

        <Route path='/operation' element={<Operation />} />
        <Route path='/operation/claims' element={<Claims />} />
        <Route path='/operation/examination-tickets' element={<ExaminationTickets />} />
        <Route path='/operation/recruitment' element={<Recruitment />} />
        <Route path='/operation/sms-violation-summary' element={<SmsViolationSummary />} />
        <Route path='/operation/sms-inspections' element={<SmsInspections />} />
        <Route path='/operation/court-claims' element={<CourtClaims />} />
        <Route path='/operation/driver-hiring-form' element={<DriverHiringForm />} />
        <Route path='/operation/carriers' element={<Carriers />} />

        <Route path='/repairs' element={<Repairs />} />
        <Route path='/repairs/preventative-maintenance' element={<PreventativeMaintenance />} />
        <Route path='/repairs/work-queue-kent-yard' element={<WorkQueueKentYard />} />
        <Route path='/repairs/inventory' element={<Inventory />} />

        <Route path='/payrolls' element={<Payrolls />} />
        <Route path='/payrolls/drivers-payroll' element={<DriversPayroll />} />
        <Route path='/payrolls/company-payroll' element={<CompanyPayroll />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
