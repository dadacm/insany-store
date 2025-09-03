import Image from 'next/image';
import { SearchContainer, SearchIcon, SearchInput } from './SearchInput.styles';

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
}

export default function SearchInputComponent({
  className,
  placeholder,
  value,
  onChange,
  onKeyDown,
  onSearch,
}: SearchInputProps) {
  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
      />
      <SearchIcon onClick={onSearch}>
        <Image src="/search-icon.svg" alt="Buscar" width={24} height={24} />
      </SearchIcon>
    </SearchContainer>
  );
}
