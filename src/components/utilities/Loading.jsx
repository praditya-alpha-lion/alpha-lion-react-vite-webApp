import React from "react";
import './loader.css'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full relative">
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
