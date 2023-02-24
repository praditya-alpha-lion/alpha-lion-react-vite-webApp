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
import TableUtilityViews from "./tableViews/TableUtilityViews";
import { usePostViewsMutation } from "../../../store/services/alphaTruckingApi";
export default function TableUtilityBar() {
  const { table } = useContext(TableContext);
  const dispatch = useDispatch();
  // const [tableStates, setTableStates] = useState();
  const [updatePost, result] = usePostViewsMutation()

  // let tabledata = table.options.state
  useEffect(() => {
    let data = table.options.state
    // console.log(data)

    // setTableStates(table.options.state)
    updatePost({ model: table.options.state })
    // dispatch(handleAddViews({ view: "driver", data: tableStates }))
  }, [table.options.state])

  // console.log(tableStates)x

  return (
    <div className='flex items-center p-2  w-full justify-between bg-[#2f2a40] select-none' >
      <div className='flex items-center gap-2 '>
        <TableUtilityViews table={table} />
        <TableUtilityHideFields table={table} />
        <TableUtilityFilter table={table} />
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


