import React from "react";
import "./dataGrid.css";
import DataGridRow from "../atoms/DataGridRow";
import Pagination from "../molecules/Pagination";

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
  baseUrl: string;
  hasNoClick?: boolean;
  hasNoPagination?: boolean;
}

const DataGrid = <T extends { id: string | number }>({
  data,
  baseUrl,
  hasNoClick = false,
  hasNoPagination = false,
}: Props<T>) => {
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
      <div className="rows-container">
        {data.batch.map((register) => (
          <DataGridRow
            key={register.id} // Use a unique key based on `id`
            data={register}
            columns={data.columns}
            baseUrl={baseUrl}
            hasNoClick={hasNoClick}
          />
        ))}
      </div>
      {/* Componente de Paginación */}
      {!hasNoPagination && <Pagination totalRecords={data.total} />}
    </div>
  );
};

export default DataGrid;
