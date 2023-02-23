import React, { useState, createContext } from "react";
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
import CustomTable from "../src/components/Table/CustomTable";

export const TableStateContext = createContext(null);

export default function TableContext({ tableData, dataKeys }) {



    // this is for checking is the side bar is opened ?
    const { toggle } = useSelector((state) => state.globalState.mainSideBar);

    console.log("Table called")

    const defaultColumns = dataKeys.map((item) => {
        return ({
            accessorKey: item,
            id: item,
            header: item,
        })
    })

    const [data, setData] = React.useState(tableData.map(({ data }) => {
        const object = {}
        dataKeys.map((key) => {
            object[key] = data?.[key] || "N/A"
        })
        return object
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
        // {
        //   name: "large",
        //   isActive: false,
        //   icon: "density_large",
        //   height: 70,
        //   numberOfLines: 3,
        // },
        // {
        //   name: "Extra large",
        //   isActive: false,
        //   icon: "density_large",
        //   height: 90,
        //   numberOfLines: 4,
        // },
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

    return (
        <DndProvider backend={HTML5Backend}>
            <TableStateContext.Provider value={[globalFilter, setGlobalFilter, rowHeight, setRowHeight, table]} >
                <div className='p-2 h-screen text-white '>
                    {/* <UtilityBar globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} rowHeight={rowHeight} setRowHeight={setRowHeight} table={table} /> */}
                    {/* <CustomTable toggle={toggle} table={table} rows={rows} activeRowHeight={activeRowHeight} activeNumberOfLines={activeNumberOfLines} /> */}
                </div>
            </TableStateContext.Provider>
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
