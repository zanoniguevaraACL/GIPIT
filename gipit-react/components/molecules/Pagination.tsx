"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import "./pagination.css";

function Pagination({ totalRecords }: { totalRecords: number }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const recordsPerPage: number = 15;
  const pageCount: number = Math.ceil(totalRecords / recordsPerPage);

  // Obtener el valor actual de la página o asignar "1" por defecto
  const actualPage: number = parseInt(params.get("page") ?? "1");

  // Determinar si los botones deben estar deshabilitados
  const isNextDisabled = actualPage >= pageCount;
  const isPreviousDisabled = actualPage <= 1;

  const changePage = (direction: string) => {
    const currentPage = actualPage;

    if (direction === "next" && currentPage < pageCount) {
      params.set("page", `${currentPage + 1}`);
      replace(`${pathname}?${params.toString()}`);
    } else if (direction === "previous" && currentPage > 1) {
      params.set("page", `${currentPage - 1}`);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="table-pagination">
      <p
        onClick={() => !isPreviousDisabled && changePage("previous")}
        className={`pagination-button ${isPreviousDisabled ? "disabled" : ""}`}
      >
        {"<<"}
      </p>
      <p>{`${actualPage} de ${pageCount}`}</p>
      <p
        onClick={() => !isNextDisabled && changePage("next")}
        className={`pagination-button ${isNextDisabled ? "disabled" : ""}`}
      >
        {">>"}
      </p>
    </div>
  );
}

export default Pagination;
