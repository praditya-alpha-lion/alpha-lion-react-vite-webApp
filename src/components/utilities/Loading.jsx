import React from "react";
import './loader.css'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full mx-auto relative">
      <figure class="loader">
        <div class="dot white"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </figure>
    </div>
  );
}


    // <div className='flex items-center justify-center h-full mx-auto'>
    //   <div className='w-40 h-40 border-t-4 border-b-4 border-white rounded-full animate-spin' />
    // </div>

