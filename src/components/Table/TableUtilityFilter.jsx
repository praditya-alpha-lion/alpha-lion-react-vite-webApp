import React, { useState } from "react";
import { useDetectOutsideClick } from "../../utilities/custom hooks/useDetectOutsideClick";
import { useForm } from "react-hook-form";

export default function TableUtilityFilter(table) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  const [filterConditions, setFilterConditions] = useState([]);
  // Create a ref that we add to the element for which we want to detect outside clicks
  const filterRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click

  const [filterToggle, setFilterToggle] = React.useState(false);

  useDetectOutsideClick(filterRef, () => setFilterToggle(false));

  const addConditions = () => {
    if (filterConditions.length < 1) {
      setFilterConditions([
        {
          type: "where",
          field: "",
          operator: "",
          value: "",
        },
      ]);
    } else {
      setFilterConditions((prevArray) => {
        return prevArray;
      });
    }
  };
  console.log(filterConditions);

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
        <div className='absolute top-10 left-0 z-50 bg-[#03001C] p-2 rounded-md w-[600px]'>
          In this view, show tasks
          <div className='h-[.5px] mb-2 mt-1 w-full bg-white' />
          {filterConditions?.length < 1 ? (
            <div className='text-gray-400 m-4'>
              No filter conditions are applied to this view
            </div>
          ) : (
            <div className='m-2'>
              <div className='flex border my-2 border-cyan-200'>
                <select
                  {...register("type", { required: true })}
                  className='block w-60 p-2  bg-[#03001C] border border-gray-300 outline-none appearance-none text-white text-base'>
                  {table
                    .getHeaderGroups()
                    .map((headerGroup) =>
                      headerGroup.headers.map((header) => (
                        <option>{header.column.id}</option>
                      ))
                    )}
                </select>
                <select
                  {...register("field", { required: true })}
                  className='block w-60 p-2  bg-[#03001C] border border-gray-300 outline-none appearance-none text-white text-base'>
                  <option>Contains</option>
                  <option>Does Not Contains</option>
                </select>
                <input
                  {...register("value", { required: true })}
                  className='block w-60 p-2  bg-[#03001C] border border-gray-300  text-white text-base'
                  type='text'
                  placeholder='Enter a Value'
                />
                <div className='bg-[#2f2a40] flex items-center hover:bg-[#413c52]'>
                  <span class='material-symbols-rounded text-white mx-2'>
                    delete
                  </span>
                </div>
              </div>
            </div>
          )}
          <div
            className='text-blue-500 hover:text-white m-2 mb-0'
            onClick={() => addConditions()}>
            + Add Condition
          </div>
          {/* {table.getAllLeafColumns().map((column) => {
            return (
              <label
                key={column.id}
                className='flex items-center text-base gap-4 p-1 hover:bg-[#2f2a40] rounded-sm pl-2 cursor-pointer'>
                <div className='capitalize truncate'>{column.id}</div>
              </label>
            );
          })} */}
        </div>
      )}
    </div>
  );
}
