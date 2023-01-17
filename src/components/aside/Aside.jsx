import React from "react";
import AsideBody from "./AsideBody";
import AsideHeader from "./AsideHeader";
import { useDispatch, useSelector } from "react-redux";
import AsideMenu from "./AsideMenu";
import AsideHeaderSearch from "./AsideHeaderSearch";

export default function Aside() {
  const { selectedScreen, screenTabsToggle } = useSelector(
    (state) => state.globalStateManagement
  );
  const [isOpen, setIsOpen] = React.useState(false);
  // console.log(isOpen)
  return (
    <div className='flex flex-col min-w-[28rem] overflow-hidden relative'>
      <AsideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <AsideHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <AsideHeaderSearch />
      <AsideBody />
    </div>
  );
}
