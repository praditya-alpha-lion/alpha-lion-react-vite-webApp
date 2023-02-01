import Dashboard from "./screens/dashboard/Dashboard.jsx";
import Trucks from "./screens/trucks/Trucks";
import Sidebar from "./components/sidebar/Sidebar";
import Chats from "./components/chats/Chats";
import Master from "./screens/master/Master";
import Trailers from "./screens/trailers/Trailers";
import Drivers from "./screens/drivers/Drivers";
import Customer from "./screens/customer/Customer";
import Company from "./screens/company/Company";
import About from "./screens/about/About";
import Brokers from "./screens/brokers/Brokers";
import Schedule from "./screens/schedule/Schedule";
import SignIn from "./screens/authentication/SignIn";
import "./App.css";
import { Route, Routes, redirect, Navigate } from "react-router";
import "./stylesheet/main.scss";
import "./stylesheet/sidebar.scss";
import { useSelector } from "react-redux";
import PrivateRoute from "./screens/authentication/PrivateRoutes";
import Switch from "./components/utilities/Switch";
import { useState } from "react";

function App() {
  const user = useSelector((state) => state.userAuthentication.user);

  // if (user === "user detected") {
  //   Navigate("/dashboard");
  // } else if (user !== "user detected") {
  //   Navigate("/login");
  // }
  const [value, setValue] = useState(false);
  return (
    <div className='app h-screen overflow-hidden w-screen bg-[#131b2d]'>
      {user.message === "user detected" && <Sidebar />}
      <Sidebar />
      <main className='content'>
        <Routes>
          <Route index path='/' element={<SignIn />} />
          <Route path='/' element={<Dashboard />} />
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
          <Route path='/login' element={<SignIn />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
