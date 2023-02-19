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



  // const [data, setData] = React.useState(tableData.map((ele, index) => {
  //   return {
  //     sNo: index + 1,
  //     name: ele?.data?.Name || "N/A",
  //     phone: ele?.data?.Phone || "N/A",
  //     dl: ele?.data?.DL || [],
  //     status: ele?.data?.Status || "N/A",
  //     dlNo: ele?.data?.["DL #"] || "N/A",
  //     state: ele?.data?.State || "N/A",
  //     licenseExp: ele?.data?.["License EXP"] || "N/A",
  //     snn: ele?.data?.SSN || "N/A",
  //     bank: ele?.data?.Bank || "N/A",
  //     account: ele?.data?.Account || "N/A",
  //     routing: ele?.data?.Routing || "N/A",
  //     dob: ele?.data?.DOB || "N/A",
  //     application: ele?.data?.Application || [],
  //     notes: ele?.data?.Notes || "N/A",
  //     pastEmployment: ele?.data?.["Past Employment"] || [],
  //     MVR: ele?.data?.MVR || [],
  //   };
  // })
  // );

  // console.log(data)


    // const [allStates, setAllStates] = useState(table.getState())

  // let allStates = table.getState()

  // const { driver } = useSelector((state) => state.views);
  // useEffect(() => {
  //   dispatch(addViews({ view: 'driver', data: table.getState() }))
  // console.log(table.getState())
  // }, [])

  // if (isFetching) {
  //   return <>Fetching</>
  // }
  // const updateData = usePostViewsQuery(table.getState())

  // console.log(table._features)
