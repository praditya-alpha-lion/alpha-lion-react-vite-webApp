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

{
  /* <pre>{JSON.stringify(data, null, 2)}</pre>
          <pre>{JSON.stringify(table.getState().columnPinning, null, 2)}</pre> */
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
