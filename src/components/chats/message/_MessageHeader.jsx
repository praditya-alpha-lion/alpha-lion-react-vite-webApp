import React from "react";
import { useSelector } from "react-redux";

export default function _MessageHeader() {
  const load = useSelector((state) => state.load.load);

  return (
    <div className='bg-white w-full'>
      <div className='flex items-center'>
        <div className='flex'>
          <img src='/demo.jpg' className='w-10 m-2 h-10 rounded-full' alt='' />
        </div>
        <div className='flex flex-col  gap-1 w-full'>
          <div className='flex  gap-2 '>
            <p className='text-sm capitalize'>
              {load.DriverData?.driverAInfo?.Name || "N/A"}
            </p>
            <p className='text-sm text-green-500 px-2 rounded-full bg-[#e7edf4]'>
              {load?.load_status || "N/A"}
            </p>
            <p className='text-sm text-black px-2 rounded-full bg-[#e7edf4]'>
              {load?.PU_time || "N/A"}
            </p>
          </div>
          <div className='flex  justify-between'>
            <div className='flex gap-2'>
              <p className='text-sm capitalize'>
                Load No: {load?.load_number || "N/A"}
              </p>
              <p className='text-sm capitalize'>
                Dispatch: {load?.dispatch || "N/A"}
              </p>
              <p className='text-sm capitalize'>
                Customer: {load?.customerName || "N/A"}
              </p>
            </div>
            <div className='flex items-center'>
              <p className='text-sm capitalize flex mr-2'>LOC:</p>
              <button>
                <p className='text-[#6baa9e] ml-[-5px] mr-2 truncate max-w-xs'>
                  {load?.customerAddress && (load?.customerAddress[0] || "N/A")}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
