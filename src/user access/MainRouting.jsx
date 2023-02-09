import React from "react";
import { Route, Routes } from "react-router";
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
import { useSelector } from "react-redux";


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
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
