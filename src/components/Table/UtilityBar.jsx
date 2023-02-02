import React, { useRef } from "react";
import { useDetectOutsideClick } from "../../utilities/custom hooks/useDetectOutsideClick";
import Switch from "../utilities/Switch";
import TableUtilityHideFields from "./TableUtilityHideFields";
import TableUtilityRowHeight from "./TableUtilityRowHeight";

export default function UtilityBar(
  globalFilter,
  setGlobalFilter,
  rowHeight,
  setRowHeight,
  table
) {
  return (
    <div className='flex items-center p-2 w-full justify-between bg-[#2f2a40] select-none'>
      <div className='flex items-center gap-2 '>
        <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
          <span className='material-symbols-rounded text-lg pr-1'>menu</span>
          Views
        </div>
        {TableUtilityHideFields(table)}
        <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
          <span className='material-symbols-rounded text-lg pr-1  '>
            filter_list
          </span>
          Filter
        </div>
        <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
          <span className='material-symbols-rounded text-lg pr-1  '>
            swap_vert
          </span>
          Sort
        </div>
        <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
          <span className='material-symbols-rounded text-lg pr-1'>ballot</span>
          Group
        </div>
        {TableUtilityRowHeight(rowHeight, setRowHeight)}
      </div>
      {search(globalFilter, setGlobalFilter)}
    </div>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function search(globalFilter, setGlobalFilter) {
  return (
    <div className='w-60'>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium bg-[#03001C] sr-only '>
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
          </svg>
        </div>
        <DebouncedInput
          type='search'
          id='default-search'
          className='block w-full p-2 pl-10 bg-[#03001C] border border-gray-300 rounded-lg  text-white text-base'
          placeholder='Search all columns'
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
        />
      </div>
    </div>
  );
}
