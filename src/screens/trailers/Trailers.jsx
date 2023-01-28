import React from "react";
import ReactDOM from "react-dom/client";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
} from "@tanstack/react-table";
import { makeData } from "./makeData";
import { rankItem, compareItems } from "@tanstack/match-sorter-utils";
import getAllDriverPartData from "../../store/LocalAPi/getAllDriversPart.json";
import getAllDriverData from "../../store/LocalAPi/getAllDrivers.json";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
  );
  return [...columnOrder];
};

const DraggableColumnHeader = ({ header, table }) => {
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
    <th
      {...{
        key: header.id,
        colSpan: header.colSpan,
        style: {
          width: header.getSize(),
        },
      }}
      ref={dropRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div ref={previewRef}>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        <button ref={dragRef}>🟰</button>
        <div
          className='bg-yellow-500 w-40 h-40'
          {...{
            onMouseDown: header.getResizeHandler(),
            onTouchStart: header.getResizeHandler(),
            className: `resizer ${
              header.column.getIsResizing() ? "isResizing" : ""
            }`,
          }}
        />
      </div>
    </th>
  );
};

const DraggableRow = ({ row, reorderRow }) => {
  const [, dropRef] = useDrop({
    accept: "row",
    drop: (draggedRow) => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: "row",
  });

  return (
    <tr
      //previewRef could go here
      ref={previewRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}>
      <td ref={dropRef}>
        <button ref={dragRef}>🟰</button>
      </td>
      {row.getVisibleCells().map((cell) => (
        <td
          {...{
            key: cell.id,
            style: {
              width: cell.column.getSize(),
            },
          }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
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

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default function Trailers() {
  const [data, setData] = React.useState(
    getAllDriverData.map((ele) => {
      return {
        name: ele?.data?.Name || "N/A",
        phone: ele?.data?.Phone || "N/A",
        dl: ele?.data?.DL || "N/A",
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
        pastEmployment: ele?.data?.["Past Employment"] || "N/A",
        MVR: ele?.data?.MVR || "N/A",
      };
    })
  );
  const [columns] = React.useState(() => [...defaultColumns]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnOrder, setColumnOrder] = React.useState(
    //must start out with populated columnOrder so we can splice
    columns.map((column) => column.id)
  );

  const reorderRow = (draggedRowIndex, targetRowIndex) => {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);
    setData([...data]);
  };

  const regenerateData = () => setData(() => makeData(20));

  const resetOrder = () => setColumnOrder(columns.map((column) => column.id));
  const [columnResizeMode, setColumnResizeMode] = React.useState("onChange");
  const table = useReactTable({
    columnResizeMode,
    state: {
      columnOrder,
      globalFilter,
      columnFilters,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onColumnOrderChange: setColumnOrder,
    getRowId: (row) => row.userId, //good to have guaranteed unique row ids/keys for rendering
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='h-screen w-full'>
        <div className='flex items-center p-2 w-full justify-between bg-[#2f2a40]'>
          <div className='flex items-center gap-2 '>
            <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
              <span className='material-symbols-rounded    text-lg pr-1'>
                menu
              </span>
              Views
            </div>
            <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
              <span className='material-symbols-rounded   text-lg pr-1'>
                visibility_off
              </span>
              Hide Fields
            </div>
            <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
              <span className='material-symbols-rounded text-lg pr-1  '>
                filter_list
              </span>
              Filter
            </div>
            <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
              <span className='material-symbols-rounded text-lg pr-1  '>
                swap_vert
              </span>
              Sort
            </div>
            <div className='flex items-center bg-[#03001C] rounded-md text-white p-1 px-2 text-lg hover:bg-opacity-50 cursor-pointer'>
              <span className='material-symbols-rounded    text-lg pr-1'>
                ballot
              </span>
              Group
            </div>
          </div>
          <div className='w-60'>
            <label
              htmlFor='default-search'
              className='mb-2 text-sm font-medium bg-[#03001C] sr-only '>
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                className='block w-full p-2 pl-10 bg-[#03001C] border border-gray-300 rounded-lg  text-white text-base'
                placeholder='Search all columns'
                required
              />
            </div>
          </div>
        </div>
        <div className='p-2 text-white h-screen overflow-scroll'>
          {/* {newFunction(globalFilter, setGlobalFilter, table)} */}
          <table
            {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}>
            <thead className=' sticky'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <th />
                  {headerGroup.headers.map((header) => (
                    <DraggableColumnHeader
                      key={header.id}
                      header={header}
                      table={table}
                      columnResizeMode={columnResizeMode}
                    />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <DraggableRow key={row.id} row={row} reorderRow={reorderRow} />
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
      </div>
    </DndProvider>
  );
}
function newFunction(globalFilter, setGlobalFilter, table) {
  return (
    <div className='inline-block border border-black shadow rounded'>
      <div>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className='p-2 font-lg shadow border border-block text-black'
          placeholder='Search all columns...'
        />
      </div>
      <div className='px-1 border-b border-black'>
        <label>
          <input
            {...{
              type: "checkbox",
              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler(),
            }}
          />{" "}
          Toggle All
        </label>
      </div>
      {table.getAllLeafColumns().map((column) => {
        return (
          <div key={column.id} className='px-1'>
            <label>
              <input
                {...{
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />{" "}
              {column.id}
            </label>
          </div>
        );
      })}
    </div>
  );
}
