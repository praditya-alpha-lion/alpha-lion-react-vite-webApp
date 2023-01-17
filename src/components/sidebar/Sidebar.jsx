import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleMainSideBar } from "../../store/features/globalStateManagementSlice";

export default function Sidebar() {
  const { toggle } = useSelector(
    (state) => state.globalStateManagement.mainSideBar
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const menus = [
    { title: "Dashboard", icons: "home", to: "/", subMenu: {} },
    { title: "Chat", icons: "chat", to: "/chats" },
    { title: "Master", icons: "contacts", gap: true, to: "/master" },
    { title: "Scheduler ", icons: "calendar_month", to: "/schedule" },
    { title: "Trailers", icons: "", to: "/trailers" },
    { title: "Trucks", icons: "", to: "/trucks" },
    { title: "Drivers", icons: "", to: "/drivers" },
    { title: "Customers ", icons: "", gap: true, to: "/customers" },
    {
      title: "Setting",
      src: "Setting",
      to: "/company",
    },
    {
      title: "Files ",
      src: "Folder",
      gap: true,
      to: "/brokers",
    },
    {
      title: "Setting",
      src: "Setting",
      to: "/about",
    },
  ];

  //     <Item title='Dashboard' to='/' icon={<HomeOutlined />} />
  //   <Item title='Chat' to='/chats' icon={<UserOutlined />} />
  //   <Item title='Master' to='/master' icon={<ContactsOutlined />} />

  //   <Item
  //     title='Scheduler'
  //     to='/schedule'
  //     icon={<ReconciliationOutlined />}
  //   />
  //   <Item title='Trailers' to='/trailers' icon={<CalendarOutlined />} />
  //   <Item title='Trucks' to='/trucks' icon={<CalendarOutlined />} />
  //   <Item title='Drivers' to='/drivers' icon={<ContactsOutlined />} />
  //   <Item title='Customers' to='/customers' icon={<ContactsOutlined />} />
  //   <Item title='Company' to='/company' icon={<PieChartOutlined />} />
  //   <Item title='Brokers' to='/brokers' icon={<ContactsOutlined />} />
  //   <Item title='About' to='/about' icon={<InfoCircleOutlined />} />

  return (
    <div className='h-screen'>
      {/* <div
        className={`px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800 `}>
        <ul className='space-y-2'>
          {menus.map((menu) => {})}
          <span className='material-symbols-rounded'>home</span>
          <span className='material-symbols-outlined'>close</span>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <svg
                className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
              </svg>
              <span className='ml-3'>Dashboard</span>
            </a>
          </li>
          <li>
            <button
              type='button'
              className='flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
              aria-controls='dropdown-example'
              data-collapse-toggle='dropdown-example'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
                  clip-rule='evenodd'></path>
              </svg>
              <span
                className='flex-1 ml-3 text-left whitespace-nowrap'
                sidebar-toggle-item>
                E-commerce
              </span>
              <svg
                sidebar-toggle-item
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clip-rule='evenodd'></path>
              </svg>
            </button>
            <ul id='dropdown-example' className=' py-2 space-y-2'>
              <li>
                <a
                  href='#'
                  className='flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11'>
                  Products
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11'>
                  Billing
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 pl-11'>
                  Invoice
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
              </svg>
              <span className='flex-1 ml-3 whitespace-nowrap'>Kanban</span>
              <span className='inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300'>
                Pro
              </span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z'></path>
                <path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z'></path>
              </svg>
              <span className='flex-1 ml-3 whitespace-nowrap'>Inbox</span>
              <span className='inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200'>
                3
              </span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clip-rule='evenodd'></path>
              </svg>
              <span className='flex-1 ml-3 whitespace-nowrap'>Users</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
                  clip-rule='evenodd'></path>
              </svg>
              <span className='flex-1 ml-3 whitespace-nowrap'>Products</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                  clip-rule='evenodd'></path>
              </svg>
              <span className='flex-1 ml-3 whitespace-nowrap'>Sign In</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  d='M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z'
                  clip-rule='evenodd'></path>
              </svg>
              <span className='flex-1 ml-3 whitespace-nowrap'>Sign Up</span>
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );

  //     <div
  //       className={`bg-[#1f2a40] ${
  //         open ? "w-72" : "w-20 "
  //       }  h-screen  pt-8 relative duration-300`}>
  //       <img
  //         src='../assets/control.png'
  //         className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
  //  border-2 rounded-full  ${!open && "rotate-180"}`}
  //         onClick={() => setOpen(!open)}
  //       />
  //       <div className='flex gap-x-4 items-center'>
  //         <img
  //           src='../assets/logo.png'
  //           className={`cursor-pointer duration-500 ${
  //             open && "rotate-[360deg]"
  //           }`}
  //         />
  //         <h1
  //           className={`text-white origin-left font-medium text-xl duration-200 ${
  //             !open && "scale-0"
  //           }`}>
  //           Designer
  //         </h1>
  //       </div>
  //       <ul className='pt-6'>
  //         {Menus.map((Menu, index) => (
  //           <Link to={Menu.to}>
  //             <li
  //               key={index}
  //               className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
  //     ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}>
  //               <img src={`../assets/${Menu.src}.png`} />
  //               <span
  //                 className={`${!open && "hidden"} origin-left duration-200`}>
  //                 {Menu.title}
  //               </span>
  //             </li>
  //           </Link>
  //         ))}
  //       </ul>

  //       {/* <aside className='w-64' aria-label='Sidebar'> */}

  //       {/* </aside> */}
  //     </div>;
  // {/* <SideBar /> */}

  //   const [open, setOpen] = useState(false);
  //   return (
  //     <div className='flex'>
  //       <div
  //         className={` ${
  //           open ? "w-40" : "w-60 "
  //         } flex flex-col h-screen p-3 bg-gray-800 shadow duration-300`}>
  //         <div className='space-y-3'>
  //           <div className='flex items-center justify-between'>
  //             <h2 className='text-xl font-bold text-white'>Dashboard</h2>
  //             <button onClick={() => setOpen(!open)}>
  //               <svg
  //                 xmlns='http://www.w3.org/2000/svg'
  //                 className='w-6 h-6 text-white'
  //                 fill='none'
  //                 viewBox='0 0 24 24'
  //                 stroke='currentColor'
  //                 strokeWidth={2}>
  //                 <path
  //                   strokeLinecap='round'
  //                   strokeLinejoin='round'
  //                   d='M4 6h16M4 12h8m-8 6h16'
  //                 />
  //               </svg>
  //             </button>
  //           </div>
  //           <div className='relative'>
  //             <span className='absolute inset-y-0 left-0 flex items-center py-4'>
  //               <button
  //                 type='submit'
  //                 className='p-2 focus:outline-none focus:ring'>
  //                 <svg
  //                   xmlns='http://www.w3.org/2000/svg'
  //                   className='w-6 h-6'
  //                   fill='none'
  //                   viewBox='0 0 24 24'
  //                   stroke='currentColor'
  //                   strokeWidth={2}>
  //                   <path
  //                     strokeLinecap='round'
  //                     strokeLinejoin='round'
  //                     d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
  //                   />
  //                 </svg>
  //               </button>
  //             </span>
  //             <input
  //               type='search'
  //               name='Search'
  //               placeholder='Search...'
  //               className='w-full py-2 pl-10 text-sm rounded-md focus:outline-none'
  //             />
  //           </div>
  //           <div className='flex-1'>
  //             <ul className='pt-2 pb-4 space-y-1 text-sm'>
  //               <li className='rounded-sm'>
  //                 <a
  //                   href='#'
  //                   className='flex items-center p-2 space-x-3 rounded-md'>
  //                   <svg
  //                     xmlns='http://www.w3.org/2000/svg'
  //                     className='w-6 h-6 text-gray-100'
  //                     fill='none'
  //                     viewBox='0 0 24 24'
  //                     stroke='currentColor'
  //                     strokeWidth={2}>
  //                     <path
  //                       strokeLinecap='round'
  //                       strokeLinejoin='round'
  //                       d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  //                     />
  //                   </svg>
  //                   <span className='text-gray-100'>Home</span>
  //                 </a>
  //               </li>
  //               <li className='rounded-sm'>
  //                 <a
  //                   href='#'
  //                   className='flex items-center p-2 space-x-3 rounded-md'>
  //                   <svg
  //                     xmlns='http://www.w3.org/2000/svg'
  //                     className='w-6 h-6 text-gray-100'
  //                     fill='none'
  //                     viewBox='0 0 24 24'
  //                     stroke='currentColor'
  //                     strokeWidth={2}>
  //                     <path
  //                       strokeLinecap='round'
  //                       strokeLinejoin='round'
  //                       d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
  //                     />
  //                   </svg>
  //                   <span className='text-gray-100'>Inbox</span>
  //                 </a>
  //               </li>
  //               <li className='rounded-sm'>
  //                 <a
  //                   href='#'
  //                   className='flex items-center p-2 space-x-3 rounded-md'>
  //                   <svg
  //                     xmlns='http://www.w3.org/2000/svg'
  //                     className='w-6 h-6 text-gray-100'
  //                     fill='none'
  //                     viewBox='0 0 24 24'
  //                     stroke='currentColor'
  //                     strokeWidth={2}>
  //                     <path
  //                       strokeLinecap='round'
  //                       strokeLinejoin='round'
  //                       d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
  //                     />
  //                   </svg>
  //                   <span className='text-gray-100'>Orders</span>
  //                 </a>
  //               </li>
  //               <li className='rounded-sm'>
  //                 <a
  //                   href='#'
  //                   className='flex items-center p-2 space-x-3 rounded-md'>
  //                   <svg
  //                     xmlns='http://www.w3.org/2000/svg'
  //                     className='w-6 h-6 text-gray-100'
  //                     fill='none'
  //                     viewBox='0 0 24 24'
  //                     stroke='currentColor'
  //                     strokeWidth={2}>
  //                     <path
  //                       strokeLinecap='round'
  //                       strokeLinejoin='round'
  //                       d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  //                     />
  //                     <path
  //                       strokeLinecap='round'
  //                       strokeLinejoin='round'
  //                       d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
  //                     />
  //                   </svg>
  //                   <span className='text-gray-100'>Settings</span>
  //                 </a>
  //               </li>
  //               <li className='rounded-sm'>
  //                 <a
  //                   href='#'
  //                   className='flex items-center p-2 space-x-3 rounded-md'>
  //                   <svg
  //                     xmlns='http://www.w3.org/2000/svg'
  //                     className='w-6 h-6 text-gray-100'
  //                     fill='none'
  //                     viewBox='0 0 24 24'
  //                     stroke='currentColor'
  //                     strokeWidth={2}>
  //                     <path
  //                       strokeLinecap='round'
  //                       strokeLinejoin='round'
  //                       d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
  //                     />
  //                   </svg>
  //                   <span className='text-gray-100'>Logout</span>
  //                 </a>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //       <div className='container mx-auto mt-12'>
  //         <div className='grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3'>
  //           <div className='w-full px-4 py-5 bg-white rounded-lg shadow'>
  //             <div className='text-sm font-medium text-gray-500 truncate'>
  //               Total users
  //             </div>
  //             <div className='mt-1 text-3xl font-semibold text-gray-900'>
  //               12,00
  //             </div>
  //           </div>
  //           <div className='w-full px-4 py-5 bg-white rounded-lg shadow'>
  //             <div className='text-sm font-medium text-gray-500 truncate'>
  //               Total Profit
  //             </div>
  //             <div className='mt-1 text-3xl font-semibold text-gray-900'>
  //               $ 450k
  //             </div>
  //           </div>
  //           <div className='w-full px-4 py-5 bg-white rounded-lg shadow'>
  //             <div className='text-sm font-medium text-gray-500 truncate'>
  //               Total Orders
  //             </div>
  //             <div className='mt-1 text-3xl font-semibold text-gray-900'>20k</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
}

// import React, { useState } from "react";
// import {
//   CalendarOutlined,
//   ContactsOutlined,
//   HomeOutlined,
//   InfoCircleOutlined,
//   MenuOutlined,
//   PieChartOutlined,
//   ReconciliationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";

// export default function SideBar() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   return (
//     <div
//       className={`bg-[#1f2a40] backdrop-blur-lg  p-2 ${
//         isCollapsed ? "w-[50px]" : "w-[250px]"
//       }`}>
//       {!isCollapsed && (
//         <div
//           className='flex items-center justify-between px-2'
//           onClick={() => setIsCollapsed(!isCollapsed)}>
//           <p className='text-2xl'>Alpha Lion</p>
//           <MenuOutlined className='cursor-pointer ml-5' />
//         </div>
//       )}
//       {isCollapsed && (
//         <div className='flex justify-center'>
//           <MenuOutlined
//             className='cursor-pointer mt-2'
//             onClick={() => setIsCollapsed(!isCollapsed)}
//           />
//         </div>
//       )}
//       {!isCollapsed && (
//         <div className='my-6'>
//           <div className='flex justify-center items-center'>
//             <img
//               alt='profile-user'
//               width='100px'
//               height='100px'
//               src='logo.webp'
//               style={{
//                 cursor: "pointer",
//                 borderRadius: "50%",
//                 objectFit: "contain",
//                 background: "white",
//               }}
//               className='h-[100px]'
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

/*
return (
  <Sidebar style={{ height: "100%" }} backgroundColor='#1f2a40'>
    <Menu
      iconShape='square'
      menuItemStyles={{
        button: ({ level, active, disabled }) => {
          // only apply styles on first level elements of the tree
          return {
            color: active ? "#d359ff" : "#f5d9ff",
            backgroundColor: "transparent !important",
          };import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

        },
      }}>
      <MenuItem
        onClick={() => {
          collapseSidebar();
        }}
        icon={collapsed ? <MenuOutlined /> : undefined}
        style={{
          margin: "10px 0 20px 0",
          // color: colors.grey[100],
        }}>
        {!collapsed && (
          <div className='flex justify-between items-center ml-4'>
            <p className='text-2xl'>Alpha Lion</p>
            <MenuOutlined className='align-middle' />
          </div>
        )}
      </MenuItem>

      {!collapsed && (
        <div className='mb-6'>
          <div className='flex justify-center items-center'>
            <img
              alt='profile-user'
              width='100px'
              height='100px'
              src='logo.webp'
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                objectFit: "contain",
                background: "white",
              }}
              className='h-[100px]'
            />
          </div>
        </div>
      )}
      <Item title='Dashboard' to='/' icon={<HomeOutlined />} />
      <Item title='Chat' to='/chats' icon={<UserOutlined />} />
      <Item title='Master' to='/master' icon={<ContactsOutlined />} />

      <Item
        title='Scheduler'
        to='/schedule'
        icon={<ReconciliationOutlined />}
      />
      <Item title='Trailers' to='/trailers' icon={<CalendarOutlined />} />
      <Item title='Trucks' to='/trucks' icon={<CalendarOutlined />} />
      <Item title='Drivers' to='/drivers' icon={<ContactsOutlined />} />
      <Item title='Customers' to='/customers' icon={<ContactsOutlined />} />
      <Item title='Company' to='/company' icon={<PieChartOutlined />} />
      <Item title='Brokers' to='/brokers' icon={<ContactsOutlined />} />
      <Item title='About' to='/about' icon={<InfoCircleOutlined />} />
    </Menu>
  </Sidebar>
)
 */
