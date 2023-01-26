import React from "react";
import ReactDOM from "react-dom/client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { makeData } from "./makeData";

import getAllDriverPartData from "../../store/LocalAPi/getAllDriversPart.json";

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

export default function Trailers() {
  const [data, setData] = React.useState(
    getAllDriverPartData.map((ele) => {
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
    data,
    columns,
    columnResizeMode,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    getRowId: (row) => row.userId, //good to have guaranteed unique row ids/keys for rendering
  });
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='p-2 text-white h-screen overflow-scroll'>
        <div className='inline-block border border-black shadow rounded'>
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
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}>
          <thead>
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
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </DndProvider>
  );
}

// import React from "react";
// import ReactDOM from "react-dom/client";
// import {
//   flexRender,
//   getCoreRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { makeData } from "./MakeData";
// import { useVirtual } from "react-virtual";

// export default function Trailers() {
//   const rerender = React.useReducer(() => ({}), {})[1];

//   const [sorting, setSorting] = React.useState([]);

//   const columns = React.useMemo(
//     () => [
//       {
//         accessorKey: "id",
//         header: "ID",
//         size: 60,
//       },
//       {
//         accessorKey: "firstName",
//         cell: (info) => info.getValue(),
//       },
//       {
//         accessorFn: (row) => row.lastName,
//         id: "lastName",
//         cell: (info) => info.getValue(),
//         header: () => <span>Last Name</span>,
//       },
//       {
//         accessorKey: "age",
//         header: () => "Age",
//         size: 50,
//       },
//       {
//         accessorKey: "visits",
//         header: () => <span>Visits</span>,
//         size: 50,
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//       },
//       {
//         accessorKey: "progress",
//         header: "Profile Progress",
//         size: 80,
//       },
//       {
//         accessorKey: "createdAt",
//         header: "Created At",
//         cell: (info) => info.getValue().toLocaleString(),
//       },
//     ],
//     []
//   );

//   const [data, setData] = React.useState(() => makeData(5000));
//   const refreshData = () => setData(() => makeData(5000));

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting,
//     },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     debugTable: true,
//   });

//   const tableContainerRef = React.useRef(null);

//   const { rows } = table.getRowModel();
//   const rowVirtualizer = useVirtual({
//     parentRef: tableContainerRef,
//     size: rows.length,
//     overscan: 10,
//   });
//   const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

//   const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
//   const paddingBottom =
//     virtualRows.length > 0
//       ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
//       : 0;

//   return (
//     <div className='p-2 text-white'>
//       <div className='h-2' />
//       <div ref={tableContainerRef} className='container'>
//         <table className='overflow-scroll h-screen'>
//           <thead className='sticky'>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <th
//                       key={header.id}
//                       colSpan={header.colSpan}
//                       style={{ width: header.getSize() }}>
//                       {header.isPlaceholder ? null : (
//                         <div
//                           {...{
//                             className: header.column.getCanSort()
//                               ? "cursor-pointer select-none"
//                               : "",
//                             onClick: header.column.getToggleSortingHandler(),
//                           }}>
//                           {flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                           {{
//                             asc: " 🔼",
//                             desc: " 🔽",
//                           }[header.column.getIsSorted()] ?? null}
//                         </div>
//                       )}
//                     </th>
//                   );
//                 })}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {paddingTop > 0 && (
//               <tr>
//                 <td style={{ height: `${paddingTop}px` }} />
//               </tr>
//             )}
//             {virtualRows.map((virtualRow) => {
//               const row = rows[virtualRow.index];
//               return (
//                 <tr key={row.id}>
//                   {row.getVisibleCells().map((cell) => {
//                     return (
//                       <td key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//             {paddingBottom > 0 && (
//               <tr>
//                 <td style={{ height: `${paddingBottom}px` }} />
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div>{table.getRowModel().rows.length} Rows</div>
//       <div>
//         <button onClick={() => rerender()}>Force Rerender</button>
//       </div>
//       <div>
//         <button onClick={() => refreshData()}>Refresh Data</button>
//       </div>
//     </div>
//   );
// }

// import * as React from "react";
// import ReactDOM from "react-dom/client";
// import getAllDriverData from "../../store/LocalAPi/getAllDrivers.json";
// import getAllDriverPartData from "../../store/LocalAPi/getAllDriversPart.json";
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// const data = getAllDriverPartData.map((ele) => {
//   return {
//     name: ele?.data?.Name || "N/A",
//     phone: ele?.data?.Phone || "N/A",
//     dl: ele?.data?.DL || "N/A",
//     status: ele?.data?.Status || "N/A",
//     // dlNo: ele?.data?.["DL #"] || "N/A",
//     // state: ele?.data?.State || "N/A",
//     // licenseExp: ele?.data?.["License EXP"] || "N/A",
//     // snn: ele?.data?.SSN || "N/A",
//     // bank: ele?.data?.Bank || "N/A",
//     // account: ele?.data?.Account || "N/A",
//     // routing: ele?.data?.Routing || "N/A",
//     // dob: ele?.data?.DOB || "N/A",
//     // application: ele?.data?.Application || [],
//   };
// });

// const defaultData = [data];

// const columnHelper = createColumnHelper();

// const columns = [
//   columnHelper.accessor("name", {
//     cell: (info) => {
//       console.log(info);
//     },
//   }),
//   columnHelper.accessor("phone", {
//     cell: (info) => <i>{info.getValue()}</i>,
//   }),
//   columnHelper.accessor("dl", {
//     cell: (info) => info.renderValue(),
//   }),
//   columnHelper.accessor("status", {}),
//   columnHelper.accessor("dlNo", {}),
//   // columnHelper.accessor("progress", {}),
// ];

// // const defaultData = [
// //   {
// //     name: "tanner",
// //     phone: "linsley",
// //     dl: 24,
// //     status: "In Relationship",
// //   },
// // ];

// // console.log(defaultData1, defaultData);

// // const defaultData = [
// //   {
// //     firstName: "tanner",
// //     lastName: "linsley",
// //     age: 24,
// //     visits: 100,
// //     status: "In Relationship",
// //     progress: 50,
// //   },
// //   {
// //     firstName: "tandy",
// //     lastName: "miller",
// //     age: 40,
// //     visits: 40,
// //     status: "Single",
// //     progress: 80,
// //   },
// //   {
// //     firstName: "joe",
// //     lastName: "dirte",
// //     age: 45,
// //     visits: 20,
// //     status: "Complicated",
// //     progress: 10,
// //   },
// // ];

// // const columns = [
// //   columnHelper.accessor("firstName", {
// //     cell: (info) => info.getValue(),
// //     footer: (info) => info.column.id,
// //   }),
// //   columnHelper.accessor((row) => row.lastName, {
// //     id: "lastName",
// //     cell: (info) => <i>{info.getValue()}</i>,
// //     header: () => <span>Last Name</span>,
// //     footer: (info) => info.column.id,
// //   }),
// //   columnHelper.accessor("age", {
// //     header: () => "Age",
// //     cell: (info) => info.renderValue(),
// //     footer: (info) => info.column.id,
// //   }),
// //   columnHelper.accessor("visits", {
// //     header: () => <span>Visits</span>,
// //     footer: (info) => info.column.id,
// //   }),
// //   columnHelper.accessor("status", {
// //     header: "Status",
// //     footer: (info) => info.column.id,
// //   }),
// //   columnHelper.accessor("progress", {
// //     header: "Profile Progress",
// //     footer: (info) => info.column.id,
// //   }),
// // ];

// // const defaultData = [
// //   {
// //     name: "tanner",
// //     lastName: "linsley",
// //     age: 24,
// //     visits: 100,
// //     status: "In Relationship",
// //     progress: 50,
// //   },
// // ];

// // const columnHelper = createColumnHelper();

// // const columns = [
// //   columnHelper.accessor("name", {
// //     cell: (info) => info.getValue(),
// //   }),
// //   columnHelper.accessor((row) => row.lastName, {
// //     id: "lastName",
// //     cell: (info) => <i>{info.getValue()}</i>,
// //     header: () => <span>Last Name</span>,
// //   }),
// //   columnHelper.accessor("age", {
// //     header: () => "Age",
// //     cell: (info) => info.renderValue(),
// //   }),
// //   columnHelper.accessor("visits", {
// //     header: () => <span>Visits</span>,
// //   }),
// //   columnHelper.accessor("status", {
// //     header: "Status",
// //   }),
// //   columnHelper.accessor("progress", {
// //     header: "Profile Progress",
// //   }),
// // ];

// export default function Trailers() {
//   const [data, setData] = React.useState(() => [...defaultData]);
//   const rerender = React.useReducer(() => ({}), {})[1];

//   const TableData = React.useMemo(
//     () => [
//       getAllDriverData.map((ele) => {
//         return {
//           col1: ele?.data?.Name || "N/A",
//           col2: ele?.data?.Phone || "N/A",
//           col3: ele?.data?.DL || [],
//           col4: ele?.data?.Status,
//           col5: ele?.data?.["DL #"] || "N/A",
//           col6: ele?.data?.State || "N/A",
//           col7: ele?.data?.["License EXP"] || "N/A",
//           col8: ele?.data?.SSN || "N/A",
//           col9: ele?.data?.Bank || "N/A",
//           col10: ele?.data?.Account || "N/A",
//           col11: ele?.data?.Routing || "N/A",
//           col12: ele?.data?.DOB || "N/A",
//           col13: ele?.data?.Application || [],
//         };
//       }),
//     ],
//     []
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });
//   console.log(columns);
//   return (
//     <div className='p-2 text-gray-300'>
//       <table>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           {table.getFooterGroups().map((footerGroup) => (
//             <tr key={footerGroup.id}>
//               {footerGroup.headers.map((header) => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.footer,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </tfoot>
//       </table>
//       <div className='h-4' />
//       <button onClick={() => rerender()} className='border p-2'>
//         Rerender
//       </button>
//     </div>
//   );
// }
