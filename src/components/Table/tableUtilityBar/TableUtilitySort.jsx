import React from "react";
import { useDetectOutsideClick } from "../../../utilities/customHooks/useDetectOutsideClick";

export default function TableUtilitySort({ table }) {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const sortRef = React.useRef();
  // Call hook passing in the ref and a function to call on outside click

  const [sortToggle, setSortToggle] = React.useState(false);

  useDetectOutsideClick(sortRef, () => setSortToggle(false));

  return (
    <div
      ref={sortRef}
      className="flex items-center hover:bg-black hover:bg-opacity-10 rounded-md text-[#4d4d4d] p-0.5 px-2 text-lg cursor-pointer relative "
    >
      <div
        className="flex items-center font-medium"
        onClick={() => setSortToggle(!sortToggle)}
      >
        <span className="material-symbols-rounded text-lg pr-1">swap_vert</span>
        Sort
      </div>
      {sortToggle && (
        <div className="absolute top-10 left-0 z-50 bg-white w-[300px] p-2 rounded-md  max-h-96 overflow-y-scroll border-[#c8c8c8] border-2">
          Sort By:
          <div className="h-[.5px] mb-2 mt-1 w-full bg-[#03001C]" />
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <div
                    onClick={() => {
                      header.column.toggleSorting();
                    }}
                    key={header.id}
                    colSpan={header.colSpan}
                    className="flex justify-between items-center hover:bg-black hover:bg-opacity-10 pr-2"
                  >
                    {header.isPlaceholder ? null : (
                      <label className="flex items-center text-base gap-4 p-1  rounded-sm pl-2 cursor-pointer">
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                          }}
                        >
                          <div className="capitalize truncate flex-1">
                            {header.column.id}
                          </div>
                        </div>
                      </label>
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
