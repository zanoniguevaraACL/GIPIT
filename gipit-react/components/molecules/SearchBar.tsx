"use client";
import "./searchBar.css";
import { useRef, useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import { IconSearch } from "@tabler/icons-react";
import { useDebounce } from "@/app/lib/hooks/useDebounce";

const SearchBar = ({
  buttonLink,
  buttonText,
  noSearch = false,
}: {
  buttonLink: string;
  buttonText: string;
  noSearch?: boolean;
}) => {
  const searchParams = useSearchParams();
  const iconRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("query")?.toString() || ""
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Espera 500ms antes de aplicar el cambio

  // Actualiza la URL solo cuando el valor debounced cambia
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set("query", debouncedSearchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm, searchParams, pathname, replace]);

  return (
    <div className={`search-container ${noSearch && "no-search"}`}>
      {!noSearch && (
        <>
          <div ref={iconRef} className="icon-search">
            <IconSearch />
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado local
          />
        </>
      )}
      <Button href={buttonLink} text={buttonText} type="tertiary" />
    </div>
  );
};

export default SearchBar;