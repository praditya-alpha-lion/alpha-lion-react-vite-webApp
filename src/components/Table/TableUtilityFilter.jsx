import React from "react";
import { useDetectOutsideClick } from "../../utilities/custom hooks/useDetectOutsideClick";

export default function TableUtilityFilter(table) {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const filterRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click

  const [filterToggle, setFilterToggle] = React.useState(false);

  useDetectOutsideClick(filterRef, () => setFilterToggle(false));

  return (
    <div
      ref={filterRef}
      className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer relative'>
      <div
        className='flex items-center'
        onClick={() => setFilterToggle(!filterToggle)}>
        <span className='material-symbols-rounded text-lg pr-1'>
          filter_list
        </span>
        Filter
      </div>
      {filterToggle && (
        <div className='absolute top-10 left-0 z-50 bg-[#03001C] w-[200px] p-2 rounded-md '>
          Filter By:
          <div className='h-[.5px] mb-2 mt-1 w-full bg-white' />
          {table.getAllLeafColumns().map((column) => {
            return (
              <label
                key={column.id}
                className='flex items-center text-base gap-4 p-1 hover:bg-[#2f2a40] rounded-sm pl-2 cursor-pointer'>
                <div className='capitalize truncate'>{column.id}</div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
