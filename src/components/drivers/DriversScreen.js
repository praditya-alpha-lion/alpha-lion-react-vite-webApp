import React from "react";
import Error from "../../components/utilities/Error";
import Loading from "../../components/utilities/Loading";
import { useGetDriversQuery } from "../../store/services/alphaTruckingApi";

export default function DriversScreen() {
  const { data, error, isFetching } = useGetDriversQuery();

  if (error) <Error />;
  if (isFetching) return <Loading />;

  // console.log(data);

  return <div>DriversScreen</div>;
}
