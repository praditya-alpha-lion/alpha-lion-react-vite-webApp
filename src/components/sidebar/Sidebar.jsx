import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleToggleMainSideBar } from "../../store/features/globalStateSlice";
import "../../stylesheet/sidebar.scss";

export default function Sidebar() {
  const { toggle } = useSelector(
    (state) => state.globalState.mainSideBar
  );
  const dispatch = useDispatch();
  const [menus, setMenus] = useState([
    {
      title: "Dashboard",
      icons: "home",
      to: "/",
    },
    { title: "Chat", icons: "chat", to: "/chats" },
    { title: "Scheduler ", icons: "edit_calendar", to: "/schedule" },
    { title: "Master", icons: "contacts", gap: true, to: "/master" },
    {
      title: "Operation", icons: "contacts", gap: true, to: "/operation", subMenu: [
        { title: "Claims", to: "/operation/claims" },
        { title: "Examination/Tickets", to: "/operation/examination-tickets" },
        { title: "Recruitment - DH Team", to: "/operation/recruitment" },
        { title: "SMS Violation Summary - Shivani", to: "/operation/sms-violation-summary" },
        { title: "SMS Inspections - Shivani", to: "/operation/sms-inspections" },
        { title: "Court Claims", to: "/operation/court-claims" },
        { title: "Driver Hiring Form", to: "/operation/driver-hiring-form" },
        { title: "Carriers", to: "/operation/carriers" },
      ]
    },
    { title: "Trailers", icons: "calendar_month", to: "/trailers" },
    { title: "Trucks", icons: "local_shipping", to: "/trucks" },
    //here we are adding repairs.
    {
      title: "Repairs", icons: "tools_wrench", to: "/repairs",
      subMenu: [
        { title: "Preventative Maintenance", to: "/repairs/preventative-maintenance" },
        { title: "Work Queue - Kent Yard", to: "/repairs/work-queue-kent-yard" },
        { title: "Preventative Maintenance", to: "/repairs/inventory" },

      ]
    },
    {
      title: "Payroll", icons: "tools_wrench", to: "/payrolls",
      subMenu: [
        { title: "Drivers", to: "/payrolls/drivers-payroll" },
        { title: "Company", to: "/payrolls/company-payroll" },

      ]
    },
    { title: "Drivers", icons: "airline_seat_recline_extra", to: "/drivers" },
    {
      title: "Customers",
      icons: "support_agent",
      to: "/customers",
    },
    {
      title: "Company",
      icons: "pie_chart",
      to: "/company",
    },
    {
      title: "Brokers",
      icons: "diversity_3",
      to: "/brokers",
    },
    {
      title: "About",
      icons: "info",
      to: "/about",
    },
  ]);

  return (
    <div className={`sidebar_container scrollbar-hidden select-none ${toggle ? "closed" : "opened"} `}>
      <div
        className='navLink menu'
        onClick={() => dispatch(handleToggleMainSideBar())}>
        <h2 className='title'>Alpha Lion</h2>
        <span className='material-symbols-rounded'>menu</span>
      </div>
      <div className='image'>
        <div>
          <img src='logo.webp' alt='logo' />
        </div>
      </div>
      <ul className=''>
        {menus.map((menu, i) => {
          return (
            <li className='menu_item' key={i}>
              <NavLink
                to={menu.to && menu.to}
                className={({ isActive }) =>
                  isActive ? "navLink active" : "navLink"
                }
                onClick={() => {
                  if (menu.subMenu) toggleMenu(setMenus, menu);
                }}>
                <div>
                  <span className='material-symbols-rounded'>{menu.icons}</span>
                  <span className={`title`}>{menu.title}</span>
                </div>
                {menu.subMenu && (
                  <span
                    className={`material-symbols-rounded arrow ${menu.isOpened && "rotate_arrow"
                      }`}>
                    arrow_right
                  </span>
                )}
              </NavLink>
              {menu.isOpened && (
                <ul>
                  {menu.subMenu.map((menu, index) => (
                    <li key={index} className='submenu_item max-w-[170px]'>
                      <NavLink
                        to={menu.to}
                        className={({ isActive }) =>
                          isActive ? "navLink active" : "navLink"
                        }>
                        <span className={`title truncate `}>{menu.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}

              {/* this is for displaying the menu list on hover in the closed drawer */}
              {menu.subMenu && toggle && (
                <ul className='toggle_closed'>
                  {menu.subMenu.map((menu, index) => (
                    <li key={index} className='submenu_item'>
                      <NavLink
                        to={menu.to}
                        className={({ isActive }) =>
                          isActive ? "navLink active" : "navLink"
                        }>
                        <span className={`title truncate`}>{menu.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function toggleMenu(setMenus, menu) {
  setMenus((prev) => {
    return prev.map((prevMenu, i) => {
      if (menu.title === prevMenu.title) {
        prevMenu.isOpened = !prevMenu.isOpened;
      }
      return prevMenu;
    });
  });
}
