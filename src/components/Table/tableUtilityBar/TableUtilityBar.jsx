import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TableUtilityFilter from "./TableUtilityFilter";
import TableUtilityGrouping from "./TableUtilityGrouping";
import TableUtilityHideFields from "./TableUtilityHideFields";
import TableUtilityRowHeight from "./TableUtilityRowHeight";
import TableUtilitySearching from "./TableUtilitySearch";
import TableUtilitySort from "./TableUtilitySort";
import { TableContext } from "../tableComponents/TableComponents";
import { handleAddViews } from "../../../store/features/viewsSlice";
export default function TableUtilityBar() {
  const { table } = useContext(TableContext);
  const dispatch = useDispatch();
  // const [tableStates, setTableStates] = useState(table.options.state);

  // let tabledata = table.options.state
  useEffect(() => {
    // dispatch(handleAddViews(tabledata))
  }, [])


  return (
    <div className='flex items-center p-2 w-full justify-between bg-[#2f2a40] select-none' >
      <div className='flex items-center gap-2 '>
        <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
          <span className='material-symbols-rounded text-lg pr-1'>menu</span>
          Views
        </div>
        <TableUtilityHideFields table={table} />
        {/* <TableUtilityFilter table={table} /> */}
        <TableUtilitySort table={table} />
        <TableUtilityGrouping table={table} />
        <TableUtilityRowHeight />
        <div className='bg-purple-600 rounded-lg p-2 px-4'>
          Add Views
        </div>
      </div>
      {TableUtilitySearching()}
    </div>
  );
}


