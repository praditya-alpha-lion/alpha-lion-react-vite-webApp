import React from 'react'
import { useGetCarriersDataQuery } from '../../store/services/alphaTruckingApi';
import Loading from "../../components/utilities/Loading"
import Error from "../../components/utilities/Error"
import Table from '../../components/Table/Table';

export default function Carriers() {
    const { data, error, isFetching } = useGetCarriersDataQuery()

    if (isFetching) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }
    return <Table tableData={data} />
}
