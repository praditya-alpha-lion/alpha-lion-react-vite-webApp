import React from "react";
import TableUtilityFilter from "./TableUtilityFilter";
import TableUtilityGrouping from "./TableUtilityGrouping";
import TableUtilityHideFields from "./TableUtilityHideFields";
import TableUtilityRowHeight from "./TableUtilityRowHeight";
import TableUtilitySearching from "./TableUtilitySearch";
import TableUtilitySort from "./TableUtilitySort";

export default function UtilityBar({ table, rowHeight, setRowHeight, globalFilter, setGlobalFilter }) {
  return (
    <div className='flex items-center p-2 w-full justify-between bg-[#2f2a40] select-none' >
      <div className='flex items-center gap-2 '>
        <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
          <span className='material-symbols-rounded text-lg pr-1'>menu</span>
          Views
        </div>
        <TableUtilityHideFields table={table} />
        <TableUtilityFilter table={table} />
        <TableUtilitySort table={table} />
        <TableUtilityGrouping table={table} />
        <TableUtilityRowHeight rowHeight={rowHeight} setRowHeight={setRowHeight} />
        <div onClick={() => addViews(table)} className='bg-purple-600 rounded-lg p-2 px-4'>
          Add Views
        </div>
      </div>
      <TableUtilitySearching globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
    </div>
  );
}


