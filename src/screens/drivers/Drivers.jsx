import React from "react";
import { useGetDriversQuery } from "../../store/services/alphaTruckingApi";
import Table from "../../components/Table/Table";
import Loading from "../../components/utilities/Loading";
import Error from "../../components/utilities/Error";
import getAllDrivers from "../../store/LocalAPi/getAllDrivers.json"



export default function Drivers() {
  // let { data, error, isFetching } = useGetDriversQuery();
  let data = getAllDrivers;
  // if (isFetching) {
  //   return <Loading />;
  // }
  // if (error) {
  //   return <Error error={error} />;
  // }


  const keysMap = new Map();

  for (let index = 0; index < data.length; index++) {
    const keys = Object.keys(data[index].data);
    keys.map((ele) => {
      keysMap.set(ele);
    })
  }

  const dataKeys = [];
  for (const [key] of keysMap) {
    dataKeys.push(key);
  }

  return (
    <Table
      dataKeys={dataKeys}
      tableData={data}
    />
  );
}
