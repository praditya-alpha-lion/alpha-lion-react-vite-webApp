import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TableComponents from "./tableComponents/TableComponents";
import { useSelector } from "react-redux";


export default function Table({ tableData }) {
  // this is for checking is the side bar is opened ?
  const { toggle } = useSelector((state) => state.globalState.mainSideBar);
  const keysMap = new Map();

  for (let index = 0; index < tableData.length; index++) {
    const keys = Object.keys(tableData[index].data);
    keys.map((ele) => {
      keysMap.set(ele);
    })
  }

  const dataKeys = [];
  for (const [key] of keysMap) {
    dataKeys.push(key);
  }

  const defaultColumns = dataKeys.map((item) => {
    return ({
      accessorKey: item,
      id: item,
      header: item,
    })
  })

  const [data, setData] = React.useState(tableData.map(({ data }) => {
    const object = {}
    dataKeys.map((key) => {
      object[key] = data?.[key] || "N/A"
    })
    return object
  })
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <TableComponents toggle={toggle} defaultColumns={defaultColumns} data={data} setData={setData} />
    </DndProvider>
  );
}

// <pre>{JSON.stringify(table.getState(), null, 2)}</pre> 
