import React, { useState, useEffect } from "react";
import TableData from "./TableData";

const DynamicTable = () => {
  const columnNames = Object.keys(TableData[0] || 0);
  const [inputValues, setInputValues] = useState([...TableData]);
  const [columnTotals, setColumnTotals] = useState({});

  useEffect(() => {
    calculateColumnTotals();
  }, [inputValues]);

  const calculateColumnTotals = () => {
    const totals = {};

    columnNames.forEach((columnName) => {
      if (columnName !== "id") {
        let sum = 0;

        inputValues.forEach((rowData) => {
          sum += parseInt(rowData[columnName]) || 0;
        });

        totals[columnName] = sum;
      }
    });

    setColumnTotals(totals);
  };

  const onChange = (id, columnName, value) => {
    setInputValues((prevInputValues) => {
      return prevInputValues.map((rowData) => {
        if (rowData.id === id) {
          return {
            ...rowData,
            [columnName]: value,
          };
        }
        return rowData;
      });
    });
  };

  const ThData = () => {
    return (
      <tr>
        {columnNames.map((columnName) => (
          <th
            key={columnName}
            scope="col"
            className="px-6 py-3 sm:px-8 md:px-12 lg:px-16 xl:px-20"
          >
            {columnName}
          </th>
        ))}
      </tr>
    );
  };

  const tdData = () => {
    return inputValues.map((rowData) => (
      <tr key={rowData.id}>
        {columnNames.map((columnName) => {
          if (columnName === "id") {
            return (
              <td
                key={columnName}
                className="whitespace-nowrap px-6 py-3 sm:px-8 md:px-12 lg:px-16 xl:px-20 font-medium border-b dark:border-neutral-500"
              >
                {rowData[columnName]}
              </td>
            );
          }

          return (
            <td
              key={columnName}
              className="whitespace-nowrap px-6 py-3 sm:px-8 md:px-12 lg:px-16 xl:px-20 font-medium border-b dark:border-neutral-500"
            >
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                invalid:border-pink-500 invalid:text-pink-600
                                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="text"
                placeholder={rowData.id + columnName}
                value={rowData[columnName] || ""}
                onChange={(e) =>
                  onChange(rowData.id, columnName, e.target.value)
                }
              />
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light border dark:border-neutral-500">
              <thead className="border-b font-medium dark:border-neutral-500">
                {ThData()}
              </thead>
              <tbody>{tdData()}</tbody>
            </table>
            <table className="min-w-full text-left text-sm font-light border dark:border-neutral-500 mt-4">
              <tbody>
                <tr>
                  {" "}
                  {columnNames.length > 0 && (
                    <td className="whitespace-nowrap px-4  font-medium border-b dark:border-neutral-500">
                      Total
                    </td>
                  )}
                  {columnNames.map((columnName) => {
                    if (columnName !== "id") {
                      return (
                        <td
                          key={columnName}
                          className="whitespace-nowrap px-6 py-3 font-medium border-b dark:border-neutral-500"
                        >
                          <input
                            disabled
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={columnTotals[columnName] || 0}
                            readOnly
                          />
                        </td>
                      );
                    }
                    return null;
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DynamicTable;
