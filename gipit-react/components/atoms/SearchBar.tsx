// searchBar.tsx

"use client";
import "./searchBar.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface StatusOption {
  value: string;
  label: string;
}

interface CompanyOption {
  value: number;
  label: string;
}

interface SearchBarProps {
  buttonLink?: string;
  buttonText?: string;
  statusOptions?: StatusOption[];
  defaultStatus?: string;
  yearOptions?: StatusOption[];
  defaultYear?: string;
  companyOptions?: CompanyOption[];
  defaultCompany?: number;
  noSearch?: boolean;
  onSearch?: (term: string) => void;
  onStatusChange?: (status: string) => void;
  onCompanyChange?: (companyId: number) => void;
  companyFilter?: boolean;
}

export default function SearchBar({ 
  buttonLink, 
  buttonText, 
  statusOptions, 
  defaultStatus,
  companyOptions,
  defaultCompany,
  onSearch,
  onStatusChange,
  onCompanyChange,
  companyFilter = true
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
    if (onSearch) onSearch(term);
  };

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    router.replace(`${pathname}?${params.toString()}`);
    if (onStatusChange) onStatusChange(status);
  };

  const handleCompanyChange = (companyId: number) => {
    const params = new URLSearchParams(searchParams);
    if (companyId) {
      params.set('companyId', companyId.toString());
    } else {
      params.delete('companyId');
    }
    router.replace(`${pathname}?${params.toString()}`);
    if (onCompanyChange) onCompanyChange(companyId);
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
        {companyFilter && companyOptions && (
          <select
            onChange={(e) => handleCompanyChange(parseInt(e.target.value))}
            defaultValue={searchParams.get('companyId')?.toString() || defaultCompany?.toString()}
            className="status-select"
          >
            <option key={0} value={0}>Todas las compañías</option>
            {companyOptions.map((option) => (
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