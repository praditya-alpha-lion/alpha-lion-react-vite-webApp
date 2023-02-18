import Table from "../../components/Table/Table";
import Error from "../../components/utilities/Error";
import Loading from "../../components/utilities/Loading";
import { useGetTrucksQuery } from "../../store/services/alphaTruckingApi";



export default function Trucks() {
  let { data, error, isFetching } = useGetTrucksQuery();

  if (isFetching) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }

  const keysMap = new Map();

  for (let index = 0; index < data.length; index++) {
    const keys = Object.keys(data[index].data);
    keys.map((ele) => {
      keysMap.set(ele);
    })
  }

  const dataKeys = [];
  for (const [key, value] of keysMap) {
    dataKeys.push(key);
  }
  console.log(dataKeys)
  return <Table
    dataKeys={dataKeys}
    tableData={data}
  />
}
