import React from "react";
import AsideBody from "./AsideBody";
import AsideHeaderSearch from "./AsideHeaderSearch";

export default function Aside() {
  return (
    <div className='flex flex-col min-w-[28rem] overflow-hidden relative'>
      <AsideHeaderSearch />
      <AsideBody />
    </div>
  );
}
