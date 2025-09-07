import Image from 'next/image';
import {
  SearchContainer,
  SearchIcon,
  SearchInput,
  LoadingSpinner,
} from './SearchInput.styles';

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  isLoading?: boolean;
}

export default function SearchInputComponent({
  className,
  placeholder,
  value,
  onChange,
  onKeyDown,
  onSearch,
  isLoading = false,
}: SearchInputProps) {
  const handleSearch = () => {
    if (onSearch && !isLoading) {
      onSearch();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch();
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <SearchContainer className={className}>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <SearchIcon onClick={handleSearch} disabled={isLoading}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Image src="/search-icon.svg" alt="Buscar" width={24} height={24} />
        )}
      </SearchIcon>
    </SearchContainer>
  );
}
