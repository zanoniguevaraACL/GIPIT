"use client";
import "./searchBar.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface StatusOption {
  value: string;
  label: string;
}

interface SearchBarProps {
  buttonLink?: string;
  buttonText?: string;
  statusOptions?: StatusOption[];
  defaultStatus?: string;
  yearOptions?: StatusOption[];
  defaultYear?: string;
  noSearch?: boolean;
}

export default function SearchBar({ 
  buttonLink, 
  buttonText, 
  statusOptions, 
  defaultStatus,
  yearOptions,
  defaultYear 
}: SearchBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleYearChange = (year: string) => {
    const params = new URLSearchParams(searchParams);
    if (year) {
      params.set('year', year);
    } else {
      params.delete('year');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="search-and-filter-container">
      <div className="search-filters-group">
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
          className="search-input"
        />
        {statusOptions && (
          <select
            onChange={(e) => handleStatusChange(e.target.value)}
            defaultValue={searchParams.get('status')?.toString() || defaultStatus}
            className="status-select"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        {yearOptions && (
          <select
            onChange={(e) => handleYearChange(e.target.value)}
            defaultValue={searchParams.get('year')?.toString() || defaultYear}
            className="status-select"
          >
            {yearOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
      {buttonLink && buttonText && (
        <Link href={buttonLink} className="new-invoice-button">
          {buttonText}
        </Link>
      )}
    </div>
  );
}
