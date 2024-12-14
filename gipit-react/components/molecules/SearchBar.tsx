"use client";
import "./searchBar.css";
import { useRef } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import { IconSearch } from "@tabler/icons-react";

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

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

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
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get("query")?.toString()}
          />
        </>
      )}
      <Button href={buttonLink} text={buttonText} type="tertiary" />
    </div>
  );
};

export default SearchBar;
