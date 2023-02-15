import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { rankItem } from "@tanstack/match-sorter-utils";
import { useSelector } from "react-redux";
import UtilityBar from "../../components/Table/UtilityBar";
import CustomTable from "../../components/Table/CustomTable";

export default function Table({ tableData, defaultColumns }) {
  // this is for checking is the side bar is opened ?
  const { toggle } = useSelector((state) => state.globalState.mainSideBar);

  const [data, setData] = React.useState(() =>
    tableData.map((ele, index) => {
      return {
        sNo: index + 1,
        name: ele?.data?.Name || "N/A",
        phone: ele?.data?.Phone || "N/A",
        dl: ele?.data?.DL || [],
        status: ele?.data?.Status || "N/A",
        dlNo: ele?.data?.["DL #"] || "N/A",
        state: ele?.data?.State || "N/A",
        licenseExp: ele?.data?.["License EXP"] || "N/A",
        snn: ele?.data?.SSN || "N/A",
        bank: ele?.data?.Bank || "N/A",
        account: ele?.data?.Account || "N/A",
        routing: ele?.data?.Routing || "N/A",
        dob: ele?.data?.DOB || "N/A",
        application: ele?.data?.Application || [],
        notes: ele?.data?.Notes || "N/A",
        pastEmployment: ele?.data?.["Past Employment"] || [],
        MVR: ele?.data?.MVR || [],
      };
    })
  );
  const [columns] = useState(() => [...defaultColumns]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [rowHeight, setRowHeight] = useState([
    {
      name: "small",
      isActive: true,
      icon: "density_small",
      height: 30,
      numberOfLines: 1,
    },
    {
      name: "medium",
      isActive: false,
      icon: "density_medium",
      height: 50,
      numberOfLines: 2,
    },
    {
      name: "large",
      isActive: false,
      icon: "density_large",
      height: 70,
      numberOfLines: 3,
    },
    {
      name: "Extra large",
      isActive: false,
      icon: "density_large",
      height: 90,
      numberOfLines: 4,
    },
  ]);
  const [grouping, setGrouping] = useState([]);
  let { activeRowHeight, activeNumberOfLines } = handleRowHeight(rowHeight);
  const [columnOrder, setColumnOrder] = useState(
    //must start out with populated columnOrder so we can splice
    columns.map((column) => column.id)
  );
  const [columnPinning, setColumnPinning] = useState({});
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
  const table = useReactTable({
    columnResizeMode: "onChange",
    state: {
      columnOrder,
      globalFilter,
      columnFilters,
      columnPinning,
      grouping,
      sorting,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    data,
    columns,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onColumnOrderChange: setColumnOrder,
    getRowId: (row) => row.userId, //good to have guaranteed unique row ids/keys for rendering
    globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnPinningChange: setColumnPinning,
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip age index reset until after next rerender
        skipAutoResetPageIndex()
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value
              }
            }
            return row
          })
        )
      }
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });
  const { rows } = table.getRowModel();
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

  console.log(table._features)


  return (
    <DndProvider backend={HTML5Backend}>
      <div className='p-2 h-screen text-white'>
        {UtilityBar(
          globalFilter,
          setGlobalFilter,
          rowHeight,
          setRowHeight,
          table
        )}
        {CustomTable(toggle, table, rows, activeRowHeight, activeNumberOfLines)}
      </div>
      {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
    </DndProvider>
  );
}

function handleRowHeight(rowHeight) {
  let activeRowHeight = 30;
  let activeNumberOfLines = 1;
  rowHeight.map((ele) => {
    if (ele.isActive) {
      activeRowHeight = ele.height;
      activeNumberOfLines = ele.numberOfLines;
    }
  });
  return { activeRowHeight, activeNumberOfLines };
}


const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};


function useSkipper() {
  const shouldSkipRef = React.useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  React.useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip]
}
