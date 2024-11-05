import React from "react";
import "./dataGrid.css";
import DataGridRow from "../atoms/DataGridRow";

interface Column<T> {
  name: string;
  key: keyof T; // Clave que referencia la propiedad del objeto T
  width: number; // Ancho de la columna
}

interface ResponseData<T> {
  total: number;
  columns: Column<T>[];
  batch: T[];
}

interface Props<T> {
  data: ResponseData<T>;
}

const DataGrid = <T,>({ data }: Props<T>) => {
  // Calcula el ancho de las columnas basado en `width`
  const spacing = data.columns.map((c) => `${c.width}fr`).join(" ");

  return (
    <div className="data-grid-container">
      {/* Cabecera de la tabla */}
      <div className="table-header" style={{ gridTemplateColumns: spacing }}>
        {data.columns.map((c, index) => (
          <p key={index} className="overline">
            {c.name}
          </p>
        ))}
      </div>

      {/* Filas de datos */}
      <div>
        {data.batch.map((register, index) => (
          <DataGridRow key={index} data={register} columns={data.columns} />
        ))}
      </div>
    </div>
  );
};

export default DataGrid;
