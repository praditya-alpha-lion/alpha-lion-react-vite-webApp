import React from "react";
import { useDetectOutsideClick } from "../../utilities/custom hooks/useDetectOutsideClick";

export default function TableUtilityRowHeight(rowHeight, setRowHeight) {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const rowHeightRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click

  const [rowHeightToggle, setRowHeightToggle] = React.useState(false);

  useDetectOutsideClick(rowHeightRef, () => setRowHeightToggle(false));

  const handleRowHeightChange = (ele) => {
    setRowHeight((prev) => {
      return prev.map((item) => {
        if (item.name === ele.name) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
        return item;
      });
    });
  };

  return (
    <div
      ref={rowHeightRef}
      className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer relative'>
      <div
        className='flex items-center'
        onClick={() => setRowHeightToggle(!rowHeightToggle)}>
        <span className='material-symbols-rounded text-lg pr-1'>
          table_rows
        </span>
        Row Height
      </div>
      {rowHeightToggle && (
        <div className='absolute top-10 left-0 z-50 bg-[#03001C] w-[200px] p-4 rounded-md '>
          {rowHeight.map((ele) => {
            return (
              <div
                key={ele.name}
                onClick={() => handleRowHeightChange(ele)}
                className={`flex items-center text-base gap-4 cursor-pointer p-1 hover:bg-[#2f2a40] rounded-sm pl-2 ${
                  ele.isActive && "text-purple-500"
                } `}>
                <span className='material-symbols-rounded text-lg pr-1'>
                  {ele.icon}
                </span>
                <div>{ele.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
