import * as React from "react";
import ReactDOM from "react-dom/client";
import getAllDriverData from "../../store/LocalAPi/getAllDrivers.json";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const defaultData = [
  getAllDriverData.map((ele) => {
    return {
      name: ele?.data?.Name || "N/A",
      phone: ele?.data?.Phone || "N/A",
      dl: ele?.data?.DL || [],
      status: ele?.data?.Status,
      dlNo: ele?.data?.["DL #"] || "N/A",
      state: ele?.data?.State || "N/A",
      licenseExp: ele?.data?.["License EXP"] || "N/A",
      snn: ele?.data?.SSN || "N/A",
      bank: ele?.data?.Bank || "N/A",
      account: ele?.data?.Account || "N/A",
      routing: ele?.data?.Routing || "N/A",
      dob: ele?.data?.DOB || "N/A",
      application: ele?.data?.Application || [],
    };
  }),
];

// {
//   firstName: "tanner",
//   lastName: "linsley",
//   age: 24,
//   visits: 100,
//   status: "In Relationship",
//   progress: 50,
// },
// {
//   firstName: "tandy",
//   lastName: "miller",
//   age: 40,
//   visits: 40,
//   status: "Single",
//   progress: 80,
// },
// {
//   firstName: "joe",
//   lastName: "dirte",
//   age: 45,
//   visits: 20,
//   status: "Complicated",
//   progress: 10,
// },

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => {
      console.log(info);
    },
  }),
  columnHelper.accessor("phone", {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
  }),
  columnHelper.accessor("dl", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("status", {
    header: () => <span>Visits</span>,
  }),
  columnHelper.accessor("dlNo", {
    header: "Status",
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
  }),
];

export default function Trailers() {
  const [data, setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const TableData = React.useMemo(
    () => [
      getAllDriverData.map((ele) => {
        return {
          col1: ele?.data?.Name || "N/A",
          col2: ele?.data?.Phone || "N/A",
          col3: ele?.data?.DL || [],
          col4: ele?.data?.Status,
          col5: ele?.data?.["DL #"] || "N/A",
          col6: ele?.data?.State || "N/A",
          col7: ele?.data?.["License EXP"] || "N/A",
          col8: ele?.data?.SSN || "N/A",
          col9: ele?.data?.Bank || "N/A",
          col10: ele?.data?.Account || "N/A",
          col11: ele?.data?.Routing || "N/A",
          col12: ele?.data?.DOB || "N/A",
          col13: ele?.data?.Application || [],
        };
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(columns);
  return (
    <div className='p-2 text-gray-300'>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
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
      <div className='h-4' />
      <button onClick={() => rerender()} className='border p-2'>
        Rerender
      </button>
    </div>
  );
}
