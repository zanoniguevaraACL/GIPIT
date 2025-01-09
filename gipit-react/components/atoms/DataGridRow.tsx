import Link from "next/link";
import React from "react";
import "./dataGridRow.css";

interface Column<T> {
  name: string;
  key: keyof T;
  width: number;
}

interface DataGridRowProps<T extends { id: string | number }> {
  data: T;
  columns: Column<T>[];
  baseUrl: string;
  hasNoClick?: boolean;
}

const DataGridRow = <T extends { id: string | number }>({
  data,
  columns,
  baseUrl,
  hasNoClick,
}: DataGridRowProps<T>) => {
  const spacing = columns.map((c) => `${c.width}fr`).join(" ");

  const renderCellContent = (value: any) => {
    if (React.isValidElement(value)) {
      return value;
    }
    return value ? String(value) : "-";
  };

  return (
    <Link
      href={hasNoClick ? "" : `${baseUrl}/${data.id}`}
      className="data-grid-row"
      style={{ gridTemplateColumns: spacing }}
    >
      {columns.map((col, colIndex) => (
        <p className="text-14" key={colIndex}>
          {renderCellContent(data[col.key])}
        </p>
      ))}
    </Link>
  );
};

export default DataGridRow;