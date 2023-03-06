import React from "react";
import './loader.css'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full mx-auto relative">
      <figure className="loader">
        <div className="dot white"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </figure>
    </div>
  );
}


    // <div className='flex items-center justify-center h-full mx-auto'>
    //   <div className='w-40 h-40 border-t-4 border-b-4 border-white rounded-full animate-spin' />
    // </div>

