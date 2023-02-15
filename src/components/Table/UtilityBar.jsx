import React from "react";
import { usePostViewsMutation } from "../../store/services/alphaTruckingApi";
import TableUtilityFilter from "./TableUtilityFilter";
import TableUtilityGrouping from "./TableUtilityGrouping";
import TableUtilityHideFields from "./TableUtilityHideFields";
import TableUtilityRowHeight from "./TableUtilityRowHeight";
import TableUtilitySearching from "./TableUtilitySearch";
import TableUtilitySort from "./TableUtilitySort";

export default function UtilityBar(
  globalFilter,
  setGlobalFilter,
  rowHeight,
  setRowHeight,
  table
) {
  const [updateData, response] = usePostViewsMutation()
  console.log(updateData)
  const addViews = (table) => {
    updateData(table.getState())
      .unwrap()
      .then(() => { })
      .then((error) => {
        console.log(error);
      });
    // console.log(table.getState())
  }

  return (
    <div className='flex items-center p-2 w-full justify-between bg-[#2f2a40] select-none' >
      <div className='flex items-center gap-2 '>
        <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
          <span className='material-symbols-rounded text-lg pr-1'>menu</span>
          Views
        </div>
        {TableUtilityHideFields(table)}
        {TableUtilityFilter(table)}
        {TableUtilitySort(table)}
        {TableUtilityGrouping(table)}
        {TableUtilityRowHeight(rowHeight, setRowHeight)}
        <div onClick={() => addViews(table)} className='bg-purple-600 rounded-lg p-2 px-4'>
          Add Views
        </div>
      </div>
      {TableUtilitySearching(globalFilter, setGlobalFilter)
      }
    </div>
  );
}


