import React from "react";
import { useTable } from "react-table";

const TaskTableComponent = ({ tasks}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: tasks });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()} className="w-full table-auto shadow-lg bg-white rounded-lg overflow-hidden">
    <thead className="bg-gray-200">
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps()}
              className="border p-3 font-semibold text-left"
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} className="border-t hover:bg-gray-50">
            {row.cells.map((cell) => (
              <td
                  {...cell.getCellProps()}
                  className={`border p-3 text-left ${cell.column.id === 'priority' ? (
                    cell.value === 'low' ? 'bg-[#C8D9CF]' : cell.value === 'medium' ? 'bg-[#F2994A]' : 'bg-[#EB5757]'
                  ) : ''}`}
              >
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
  );
};

export default TaskTableComponent;
