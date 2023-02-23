import React, { useEffect, useState } from "react";
import { useDetectOutsideClick } from "../../../utilities/customHooks/useDetectOutsideClick";
import CustomFilterInput from "./CustomFilterInput";

export default function TableUtilityFilter({ table }) {

  const [filterConditions, setFilterConditions] = useState([]);
  // Create a ref that we add to the element for which we want to detect outside clicks
  const filterRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click
  const [filterToggle, setFilterToggle] = React.useState(false);
  useDetectOutsideClick(filterRef, () => setFilterToggle(false));

  const addConditions = () => {
    let firstType = table.getHeaderGroups()[0]?.headers[0]?.column?.id
    if (filterConditions.length < 1) {
      setFilterConditions([{
        type: firstType || "",
        operator: "contains",
        value: "",
        id: Date.now()
      }]);
    } else {
      setFilterConditions((prevArray) => {
        let newValue = {
          type: firstType || "",
          operator: "contains",
          value: "",
          id: Date.now()
        }
        return [...prevArray, newValue]
      })
    }
  };
  const removeCondition = (id) => {
    setFilterConditions((prev) => {
      return prev.filter((item) => {
        return item.id !== id
      })
    })
  }

  let updatedFilters = filterConditions.map((ele) => {
    return {
      id: ele.type,
      value: ele.value.trim()
    }
  })


  useEffect(() => {
    table.setColumnFilters(updatedFilters)
  }, [filterConditions])

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
        <div className='absolute top-10 left-0 z-50 bg-[#03001C] p-2 rounded-md w-[600px]  max-h-96 overflow-y-scroll'>
          Filter:
          <div className='h-[.5px] mb-2 mt-1 w-full bg-white' />
          <div className="max-h-[700px] overflow-scroll">
            {filterConditions?.length < 1 ? (
              <div className='text-gray-400 m-4'>
                No filter conditions are applied to this view
              </div>
            ) : (
              filterConditions.map((ele, i) => <CustomFilterInput key={i} table={table} type={ele.type} operator={ele.operator} value={ele.value} id={ele.id} removeCondition={removeCondition} setFilterConditions={setFilterConditions} />)
            )}
          </div>
          <div
            className='text-blue-500 hover:text-white m-2 mb-0 inline-block'
            onClick={() => addConditions()}>
            + Add Condition
          </div>
        </div>
      )}
    </div>
  );
}
