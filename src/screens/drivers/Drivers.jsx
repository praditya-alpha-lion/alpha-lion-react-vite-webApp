import React from "react";

import { useGetDriversQuery, useGetTrucksQuery } from "../../store/services/alphaTruckingApi";
import Table from "../../components/Table/Table";
import { useDispatch } from "react-redux";
import Loading from "../../components/utilities/Loading";
import Error from "../../components/utilities/Error";

export default function Drivers() {
  const dispatch = useDispatch();
  let { data, error, isFetching } = useGetDriversQuery();

  if (isFetching) {
    return <Loading />
  }
  if (error) {
    return <Error error={error} />
  }

  return (
    <Table tableData={data} />
  );
}




