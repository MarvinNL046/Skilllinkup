"use client";

import React from "react";

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  emptyIcon?: string;
}

export function DataTable<T extends { _id?: string; id?: string }>({
  columns,
  data,
  emptyMessage = "No data found.",
  emptyIcon = "flaticon-file",
}: DataTableProps<T>) {
  const getRowKey = (item: T, index: number): string => {
    return (item._id as string) ?? (item.id as string) ?? String(index);
  };

  const getCellValue = (item: T, col: Column<T>): React.ReactNode => {
    if (col.render) {
      return col.render(item);
    }
    const value = (item as Record<string, unknown>)[col.key];
    if (value === null || value === undefined) return "-";
    return String(value);
  };

  return (
    <div className="packages_table table-responsive">
      <table className="table-style3 table at-savein">
        <thead className="t-head">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.className ?? ""}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="t-body">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="text-center py40">
                  <span className={`fz40 ${emptyIcon}`} />
                  <p className="fz15 mt10 text-light">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={getRowKey(item, index)}>
                {columns.map((col) => (
                  <td key={col.key} className={col.className ?? ""}>
                    {getCellValue(item, col)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
