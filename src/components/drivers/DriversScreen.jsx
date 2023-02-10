import React from "react";
import Error from "../utilities/Error";
import Loading from "../utilities/Loading";
import { useGetDriversQuery } from "../../store/services/alphaTruckingApi";

export default function DriversScreen() {
  const { data, error, isFetching } = useGetDriversQuery();

  if (error) <Error />;
  if (isFetching) return <Loading />;

  // console.log(data);

  return <div>DriversScreen</div>;
}
