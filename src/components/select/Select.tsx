'use client';

import React from 'react';
import {
  SelectContainer,
  SelectField,
  SelectArrow,
  SelectOption,
} from './Select.styles';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function Select({
  options,
  value,
  placeholder = 'Selecione uma opção',
  onChange,
  disabled = false,
  className,
}: SelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <SelectContainer className={className}>
      <SelectField
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
      >
        <SelectOption value="" disabled>
          {placeholder}
        </SelectOption>
        {options.map(option => (
          <SelectOption key={option.value} value={option.value}>
            {option.label}
          </SelectOption>
        ))}
      </SelectField>
      <SelectArrow>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectArrow>
    </SelectContainer>
  );
}
