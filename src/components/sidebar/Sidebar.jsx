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
        { title: "Claims", icons: "", to: "/operation/claims" },
        { title: "Examination/Tickets", icons: "", to: "/operation/examination-tickets" },
        { title: "Recruitment - DH Team", icons: "", to: "/operation/recruitment" },
        { title: "SMS Violation Summary - Shivani", icons: "", to: "/operation/sms-violation-summary" },
        { title: "SMS Inspections - Shivani", icons: "", to: "/operation/sms-inspections" },
        { title: "Court Claims", icons: "", to: "/operation/court-claims" },
      ]
    },
    { title: "Trailers", icons: "calendar_month", to: "/trailers" },
    { title: "Trucks", icons: "local_shipping", to: "/trucks" },

    //here we are adding repairs.
    {
      title: "Repairs", icons: "tools_wrench", to: "/repairs",
      subMenu: [
        { title: "Preventative Maintenance", icons: "", to: "/repairs/preventative_maintenance" },
        { title: "Work Queue - Kent Yard", icons: "", to: "/repairs/work_queue_kent_yard" },
        { title: "Preventative Maintenance", icons: "", to: "/repairs/invetory" },

      ]
    },
    //here we are adding repairs.
    {
      title: "Payroll", icons: "tools_wrench",
      subMenu: [
        { title: "Drivers", icons: "", to: "/payrolls/driverspayroll" },
        { title: "Company", icons: "", to: "/payrolls/companypayroll" },

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
    <div className={`sidebar_container ${toggle ? "closed" : "opened"} `}>
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
