import React from "react";

export default function Loading() {
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='w-40 h-40 border-t-4 border-b-4 border-white rounded-full animate-spin' />
    </div>
  );
}
