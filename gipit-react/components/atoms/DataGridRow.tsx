import Link from "next/link";
import "./dataGridRow.css";

interface Column<T> {
  name: string;
  key: keyof T; // Clave que referencia la propiedad del objeto T
  width: number; // Ancho de la columna
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

  console.log("DATOS DE LA TABLA--->",data);
  const spacing = columns.map((c) => `${c.width}fr`).join(" ");
  return (
    <Link
      href={hasNoClick ? "" : `${baseUrl}/${data.id}`}
      className="data-grid-row"
      style={{ gridTemplateColumns: spacing }}
    >
      {columns.map((col, colIndex) => (
        <p className="text-14" key={colIndex}>
          {data[col.key] ? String(data[col.key]) : "-"}
          {/* Muestra el valor correspondiente de data */}
        </p>
      ))}
    </Link>
  );
};

export default DataGridRow;
