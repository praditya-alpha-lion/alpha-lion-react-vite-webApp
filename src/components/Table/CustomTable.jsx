import React from 'react'
import TableVirtualRows from './TableVirtualRows';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import {
    flexRender,
} from "@tanstack/react-table";

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
const reorderColumn = (draggedColumnId, targetColumnId, columnOrder) => {
    columnOrder.splice(
        columnOrder.indexOf(targetColumnId),
        0,
        columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
    );
    return [...columnOrder];
};


export default function CustomTable(toggle, table, rows, activeRowHeight, activeNumberOfLines) {
    const tableContainerRef = React.useRef(null);
    return <div
        className={`overflow-scroll ${toggle ? "w-[calc(100vw_-_90px)]" : `w-[calc(100vw_-_230px)]`}`}>
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
                                index={index} />
                        ))}
                    </div>
                ))}
            </div>
            {TableVirtualRows(tableContainerRef, rows, activeRowHeight, activeNumberOfLines)}
        </div>
    </div>;
}
