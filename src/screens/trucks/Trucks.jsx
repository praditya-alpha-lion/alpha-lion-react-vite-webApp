import Table from "../../components/Table/Table";
import Error from "../../components/utilities/Error";
import Loading from "../../components/utilities/Loading";
import { useGetTrucksQuery } from "../../store/services/alphaTruckingApi";

export default function Trucks() {
  let { data, error, isFetching } = useGetTrucksQuery();

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
