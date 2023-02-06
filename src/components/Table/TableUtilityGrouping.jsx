import React from "react";
import { useDetectOutsideClick } from "../../utilities/custom hooks/useDetectOutsideClick";

export default function TableUtilityGrouping(table) {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const groupingRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click

  const [groupingToggle, setGroupingToggle] = React.useState(false);

  useDetectOutsideClick(groupingRef, () => setGroupingToggle(false));

  return (
    <div
      ref={groupingRef}
      className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer relative'>
      <div
        className='flex items-center'
        onClick={() => setGroupingToggle(!groupingToggle)}>
        <span className='material-symbols-rounded text-lg pr-1'>ballot</span>
        Group
      </div>
      {groupingToggle && (
        <div className='absolute top-10 left-0 z-50 bg-[#03001C] w-[200px] p-2 rounded-md '>
          Group By:
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
