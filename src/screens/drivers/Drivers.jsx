import React from "react";
import { useGetDriversQuery, useGetTrucksQuery } from "../../store/services/alphaTruckingApi";
import Table from "../../components/Table/Table";
import Loading from "../../components/utilities/Loading";
import Error from "../../components/utilities/Error";

const defaultColumns = [
  {
    accessorKey: "name",
    id: "name",
    header: "name",
  },
  {
    accessorKey: "phone",
    id: "phone",
    header: "phone",
  },
  {
    accessorKey: "dl",
    id: "dl",
    header: "dl (Documents)",
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
  },
  {
    accessorKey: "dlNo",
    id: "dlNo",
    header: "DL Number",
  },
  {
    accessorKey: "state",
    id: "state",
    header: "State",
  },
  {
    accessorKey: "licenseExp",
    id: "licenseExp",
    header: "License Expiry",
  },
  {
    accessorKey: "snn",
    id: "snn",
    header: "SNN",
  },
  {
    accessorKey: "bank",
    id: "bank",
    header: "Bank",
  },
  {
    accessorKey: "account",
    id: "account",
    header: "Account",
  },
  {
    accessorKey: "routing",
    id: "routing",
    header: "Routing",
  },
  {
    accessorKey: "dob",
    id: "dob",
    header: "DOB",
  },
  {
    accessorKey: "application",
    id: "application",
    header: "Application",
  },
  {
    accessorKey: "notes",
    id: "notes",
    header: "Notes",
  },
  {
    accessorKey: "pastEmployment",
    id: "Past Employment",
    header: "Past Employment",
  },
  {
    accessorKey: "MVR",
    id: "MVR",
    header: "MVR",
  },
];

export default function Drivers() {
  let { data, error, isFetching } = useGetDriversQuery();

  if (isFetching) {
    return <Loading />
  }
  if (error) {
    return <Error error={error} />
  }

  return (
    <Table tableData={data} defaultColumns={defaultColumns} />
  );
}




