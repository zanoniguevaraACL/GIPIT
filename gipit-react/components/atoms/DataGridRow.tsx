import "./dataGridRow.css";

interface Column<T> {
  name: string;
  key: keyof T; // Clave que referencia la propiedad del objeto T
  width: number; // Ancho de la columna
}

interface DataGridRowProps<T> {
  data: T;
  columns: Column<T>[];
}

const DataGridRow = <T,>({ data, columns }: DataGridRowProps<T>) => {
  const spacing = columns.map((c) => `${c.width}fr`).join(" ");
  return (
    <div className="data-grid-row" style={{ gridTemplateColumns: spacing }}>
      {columns.map((col, colIndex) => (
        <p key={colIndex} className="text-14">
          {data[col.key] ? String(data[col.key]) : "-"}
          {/* Muestra el valor correspondiente de data */}
        </p>
      ))}
    </div>
  );
};

export default DataGridRow;
