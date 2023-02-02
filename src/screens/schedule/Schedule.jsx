import React from "react";
import ReactDOM from "react-dom/client";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { makeData } from "./makeData";
import { useVirtual } from "react-virtual";

export default function Schedule() {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = React.useState([]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 60,
      },
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        size: 50,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        size: 80,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: (info) => info.getValue().toLocaleString(),
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(50_0));
  const refreshData = () => setData(() => makeData(50_000));

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const tableContainerRef = React.useRef(null);

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
    <div className='p-2'>
      <div className='h-2' />
      <div ref={tableContainerRef} className='text-white overflow-x-auto'>
        <div
          {...{
            className: "divTable",
            style: {
              width: table.getTotalSize(),
            },
          }}>
          <div className='thead'>
            {table.getHeaderGroups().map((headerGroup) => (
              <div
                {...{
                  key: headerGroup.id,
                  className: "tr",
                }}>
                {headerGroup.headers.map((header) => {
                  return (
                    <div
                      {...{
                        key: header.id,
                        className: "th",
                        style: {
                          width: header.getSize(),
                        },
                      }}
                      colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div
            {...{
              className: "tbody",
            }}>
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
                  }}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <div
                        {...{
                          key: cell.id,
                          className: "td",
                          style: {
                            width: cell.column.getSize(),
                          },
                        }}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
          </div>
        </div>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
    </div>
  );
}
