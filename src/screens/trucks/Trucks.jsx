import Error from "../../components/utilities/Error";
import Loading from "../../components/utilities/Loading";
import { useGetTrucksQuery } from "../../store/services/alphaTruckingApi";
import getAllTrucks from "../../store/LocalAPi/getAllTrucks.json";

export default function Trucks() {
  // const { data, error, isFetching } = useGetTrucksQuery();

  // if (error) <Error />;
  // if (isFetching) return <Loading />;

  return <div className='overflow-scroll break-all h-full'></div>;
}
