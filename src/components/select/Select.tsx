'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  SelectContainer,
  SelectField,
  SelectArrow,
  SelectDropdown,
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === selectedValue);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (onChange) {
      onChange(optionValue);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedValue(value || '');
  }, [value]);

  return (
    <SelectContainer ref={selectRef} className={className}>
      <SelectField onClick={handleToggle} $disabled={disabled}>
        {selectedOption ? selectedOption.label : placeholder}
        <SelectArrow $isOpen={isOpen}>
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
      </SelectField>

      {isOpen && (
        <SelectDropdown>
          {options.map(option => (
            <SelectOption
              key={option.value}
              onClick={() => handleSelect(option.value)}
              $isSelected={option.value === selectedValue}
            >
              {option.label}
            </SelectOption>
          ))}
        </SelectDropdown>
      )}
    </SelectContainer>
  );
}
