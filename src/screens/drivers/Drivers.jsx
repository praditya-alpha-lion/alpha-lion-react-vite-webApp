import React, { useCallback, useEffect, useMemo } from "react";

import { useGetDriversQuery } from "../../store/services/alphaTruckingApi";
import Table from "../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";

export default function Drivers() {

  const dispatch = useDispatch();
  let { userData, error, isFetching } = useGetDriversQuery();

  console.log("first")
  return (
    <Table />
  );
}

{/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */ }



