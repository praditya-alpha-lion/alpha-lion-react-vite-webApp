import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TableComponents from "./tableComponents/TableComponents";
import { useSelector } from "react-redux";
import { useGetSavedViewQuery } from "../../store/services/alphaTruckingApi";
import Loading from "../utilities/Loading";
import Error from "../utilities/Error";


export default function Table({ tableData }) {
  const { driver } = useSelector(state => state.views);
  const { data, error, isFetching } = useGetSavedViewQuery();


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

  const [tableDataModified, setTableDataModified] = React.useState(tableData.map(({ data }) => {
    const object = {}
    dataKeys.map((key) => {
      object[key] = data?.[key]
    })
    return object
  })
  );

  // if (isFetching) {
  //   return <Loading />
  // }

  // if (error) {
  //   return <Error />
  // }


  // console.log(data)



  return (
    <DndProvider backend={HTML5Backend}>
      <TableComponents toggle={toggle} defaultColumns={defaultColumns} data={tableDataModified} setData={setTableDataModified} tableConditions={data} />
    </DndProvider>
  );
}

// <pre>{JSON.stringify(table.getState(), null, 2)}</pre> 
