'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  QuantitySelectContainer,
  QuantitySelectField,
  QuantitySelectArrow,
  QuantitySelectDropdown,
  QuantitySelectOption,
} from './QuantitySelect.styles';

export interface QuantitySelectProps {
  value: number;
  maxQuantity?: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
  className?: string;
}

export default function QuantitySelect({
  value,
  maxQuantity = 99,
  onChange,
  disabled = false,
  className,
}: QuantitySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const options = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (quantity: number) => {
    onChange(quantity);
    setIsOpen(false);
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

  return (
    <QuantitySelectContainer ref={selectRef} className={className}>
      <QuantitySelectField onClick={handleToggle} $disabled={disabled}>
        {value}
        <QuantitySelectArrow $isOpen={isOpen}>
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
        </QuantitySelectArrow>
      </QuantitySelectField>

      {isOpen && (
        <QuantitySelectDropdown>
          {options.map(quantity => (
            <QuantitySelectOption
              key={quantity}
              onClick={() => handleSelect(quantity)}
              $isSelected={quantity === value}
            >
              {quantity}
            </QuantitySelectOption>
          ))}
        </QuantitySelectDropdown>
      )}
    </QuantitySelectContainer>
  );
}
