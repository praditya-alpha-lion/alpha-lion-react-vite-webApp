import React from "react";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import getAllDriverData from "../../store/LocalAPi/getAllDrivers.json";
import { useVirtual } from "react-virtual";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import UtilityBar from "../../components/Table/UtilityBar";
import { rankItem, compareItems } from "@tanstack/match-sorter-utils";

const defaultColumns = [
  {
    accessorKey: "name",
    id: "name",
    header: "name",

    size: 250,
  },
  {
    accessorKey: "phone",
    id: "phone",
    header: "phone",
    size: 250,
  },
  {
    accessorKey: "dl",
    id: "dl",
    header: "dl (Documents)",
    size: 250,
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
    size: 250,
  },
  {
    accessorKey: "dlNo",
    id: "dlNo",
    header: "DL Number",
    size: 250,
  },
  {
    accessorKey: "state",
    id: "state",
    header: "State",
    size: 250,
  },
  {
    accessorKey: "licenseExp",
    id: "licenseExp",
    header: "License Expiry",
    size: 250,
  },
  {
    accessorKey: "snn",
    id: "snn",
    header: "SNN",
    size: 250,
  },
  {
    accessorKey: "bank",
    id: "bank",
    header: "Bank",
    size: 250,
  },
  {
    accessorKey: "account",
    id: "account",
    header: "Account",
    size: 250,
  },
  {
    accessorKey: "routing",
    id: "routing",
    header: "Routing",
    size: 250,
  },
  {
    accessorKey: "dob",
    id: "dob",
    header: "DOB",
    size: 250,
  },
  {
    accessorKey: "application",
    id: "application",
    header: "Application",
    size: 250,
  },
  {
    accessorKey: "notes",
    id: "notes",
    header: "Notes",
    size: 250,
  },
  {
    accessorKey: "pastEmployment",
    id: "Past Employment",
    header: "Past Employment",

    size: 250,
  },
  {
    accessorKey: "MVR",
    id: "MVR",
    header: "MVR",
    size: 250,
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
      className='cursor-pointer '
      onClick={() => {
        header.column.pin("left");
      }}
      {...{
        key: header.id,
        colSpan: header.colSpan,
        style: {
          width: header.getSize(),
        },
      }}
      ref={(el) => {
        previewRef(el);

        dropRef(el);
      }}
      style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div
        ref={dragRef}
        className='capitalize text-left text-lg font-normal px-4'>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </div>
      <div
        {...{
          onMouseDown: header.getResizeHandler(),
          onTouchStart: header.getResizeHandler(),
          className: `resizer ${
            header.column.getIsResizing() ? "isResizing" : ""
          }`,
        }}
      />
    </th>
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
const reorderRow = (draggedRowIndex, targetRowIndex) => {
  data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);
  setData([...data]);
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
  const tableContainerRef = React.useRef(null);
  const [columnResizeMode, setColumnResizeMode] = React.useState("onChange");
  const [columns] = React.useState(() => [...defaultColumns]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnOrder, setColumnOrder] = React.useState(
    //must start out with populated columnOrder so we can splice
    columns.map((column) => column.id)
  );
  const [columnPinning, setColumnPinning] = React.useState({});
  console.log("called column");
  const table = useReactTable({
    columnResizeMode,
    state: {
      columnOrder,
      globalFilter,
      columnFilters,
      columnPinning,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onColumnOrderChange: setColumnOrder,
    getRowId: (row) => row.userId, //good to have guaranteed unique row ids/keys for rendering
    data,
    columns,
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
    overscan: 1,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='h-screen text-white'>
        {UtilityBar(globalFilter, setGlobalFilter, table)}
        <div
          ref={tableContainerRef}
          className='  h-[calc(100vh-51px)] overflow-scroll w-[1700px] '>
          <table
            {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}>
            <thead className=' sticky bg-[#000000] text-white'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
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
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <tr key={row.id} className='h-10'>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          className='text-left align-top'
                          key={cell.id}
                          {...{
                            key: cell.id,
                            style: {
                              width: cell.column.getSize(),
                            },
                          }}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </table>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre>
          <pre>{JSON.stringify(table.getState().columnPinning, null, 2)}</pre> */}
        </div>
      </div>
    </DndProvider>
  );
}

// const regenerateData = () => setData(() => makeData(20));

// const resetOrder = () => setColumnOrder(columns.map((column) => column.id));

// const fuzzySort = (rowA, rowB, columnId) => {
//   let dir = 0;

//   // Only sort by rank if the column has ranking information
//   if (rowA.columnFiltersMeta[columnId]) {
//     dir = compareItems(
//       rowA.columnFiltersMeta[columnId]?.itemRank,
//       rowB.columnFiltersMeta[columnId]?.itemRank
//     );
//   }

//   // Provide an alphanumeric fallback for when the item ranks are equal
//   return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
// };

// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   // Rank the item
//   const itemRank = rankItem(row.getValue(columnId), value);

//   // Store the itemRank info
//   addMeta({
//     itemRank,
//   });

//   // Return if the item should be filtered in/out
//   return itemRank.passed;
// };

// {
//   /* <tr
//   // previewRef could go here
//   ref={previewRef}
//   style={{ opacity: isDragging ? 0.5 : 1 }}>
//   <td ref={dropRef}>
//     <button ref={dragRef}>🟰</button>
//   </td>
//   {row.getVisibleCells().map((cell) => (
//     <td
//       {...{
//         key: cell.id,
//         style: {
//           width: cell.column.getSize(),
//         },
//       }}>
//       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//     </td>
//   ))}
// </tr> */
// }
