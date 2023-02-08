import React from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { useVirtual } from "react-virtual";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { rankItem, compareItems } from "@tanstack/match-sorter-utils";
import { useSelector } from "react-redux";
import getAllDriverData from "../../store/LocalAPi/getAllDrivers.json";
import UtilityBar from "../../components/Table/UtilityBar";

const defaultColumns = [
  // {
  //   accessorKey: "sNo",
  //   id: "sNo",
  //   header: "SNo.",
  //   size: 60,
  // },
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
const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
  );
  return [...columnOrder];
};
const DraggableColumnHeader = ({ header, table, index }) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggedColumn) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: "column",
  });

  return (
    <div
      className={`th ${index === 0 && "fixed-column"}`}
      {...{
        key: header.id,
        style: {
          width: header.getSize(),
        },
      }}
      ref={(el) => {
        previewRef(el);
        dropRef(el);
      }}
      colSpan={header.colSpan}>
      <div
        ref={dragRef}
        className='capitalize text-left text-lg font-normal px-2 truncate'>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </div>
      <div
        {...{
          onMouseDown: header.getResizeHandler(),
          onTouchStart: header.getResizeHandler(),
          className: `resizer ${header.column.getIsResizing() ? "isResizing" : ""
            }`,
        }}
      />
    </div>
  );
};
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

export default function Drivers() {
  // this is for checking is the side bar is opened ?
  const { toggle } = useSelector(
    (state) => state.globalStateManagement.mainSideBar
  );
  const [data, setData] = React.useState(() =>
    getAllDriverData.map((ele, index) => {
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
  const tableContainerRef = React.useRef(null);
  const [columns] = React.useState(() => [...defaultColumns]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [rowHeight, setRowHeight] = React.useState([
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
  const [grouping, setGrouping] = React.useState([]);
  let { activeRowHeight, activeNumberOfLines } = handleRowHeight(rowHeight);

  const [columnOrder, setColumnOrder] = React.useState(
    //must start out with populated columnOrder so we can splice
    columns.map((column) => column.id)
  );
  const [columnPinning, setColumnPinning] = React.useState({});
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
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });
  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 100,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;


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
        <div
          // className={`overflow-scroll ${toggle ? "w-[1830px]" : "w-[1690px]"}`}>
          className={`overflow-scroll ${toggle ? "w-[calc(100vw_-_90px)]" : `w-[calc(100vw_-_230px)]`
            }`}>
          <div
            ref={tableContainerRef}
            {...{
              style: {
                width: table.getTotalSize(),
              },
            }}
            className={`divTable`}>
            <div className='thead bg-[#000000] text-white'>
              {table.getHeaderGroups().map((headerGroup) => (
                <div key={headerGroup.id} className='tr'>
                  {headerGroup.headers.map((header, index) => (
                    <DraggableColumnHeader
                      key={header.id}
                      header={header}
                      table={table}
                      index={index}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className='tbody'>
              {paddingTop > 0 && (
                <div style={{ height: `${paddingTop}px` }}></div>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <div
                    {...{
                      key: row.id,
                      className: "tr",
                      style: {
                        height: activeRowHeight,
                      },
                    }}>
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <div
                          className={`td 
                          webkitLineClamp${activeNumberOfLines} `}
                          key={cell.id}
                          {...{
                            style: {
                              width: cell.column.getSize(),
                              height: activeRowHeight,
                              background: cell.getIsGrouped()
                                ? "#0aff0082"
                                : cell.getIsAggregated()
                                  ? "#ffa50078"
                                  : cell.getIsPlaceholder()
                                    ? "#ff000042"
                                    : "",
                            },
                          }}>
                          {cell.getIsGrouped() ? (
                            // If it's a grouped cell, add an expander and row count
                            <>
                              <button
                                className="flex"
                                {...{
                                  onClick: row.getToggleExpandedHandler(),
                                  style: {
                                    cursor: row.getCanExpand()
                                      ? "pointer"
                                      : "normal",
                                  },
                                }}>
                                <div>
                                  {row.getIsExpanded() ? "👇" : "👉"}{" "}
                                </div>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}{" "}
                                ({row.subRows.length})
                              </button>
                            </>
                          ) : cell.getIsAggregated() ? (
                            // If the cell is aggregated, use the Aggregated
                            // renderer for cell
                            flexRender(
                              cell.column.columnDef.aggregatedCell ??
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                            // Otherwise, just render the regular cell
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {paddingBottom > 0 && (
                <div style={{ height: `${paddingBottom}px` }}></div>
              )}
              {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
              <div className='h-20' />
            </div>
          </div>
        </div>
      </div>
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
