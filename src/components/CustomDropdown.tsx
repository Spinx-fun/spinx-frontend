import React, { useState } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  leftIcon?: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  leftIcon?: string;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  disabled = false,
  leftIcon,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`}>
      <button
        className={`
          w-[166px] border border-opacity-50 border-[#90A2B9] rounded-md 
          py-2 px-3 flex items-center justify-between transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-opacity-70'}
          ${isOpen ? 
            'border-3 border-opacity-50 border-[#90A2B9] bg-white text-black' : 
            'bg-transparent text-white'
          }
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center gap-2 truncate">
          {leftIcon && <img src={leftIcon} alt="" className="w-4 h-4" />}
          {selectedOption?.label || placeholder}
        </div>
        <img 
          src="/image/shevron.svg" 
          alt="Dropdown arrow" 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 invert' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 w-[252px] border border-[#2a2a2a] rounded-xl p-3.5 shadow-[0_4px_24px_0_rgba(255,255,255,0.06)] bg-[#020617] z-50">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-3 w-full h-10 rounded-xl hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-2 transition-colors duration-200"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.leftIcon && <img src={option.leftIcon} alt="" className="w-4 h-4" />}
              <span className="text-white text-sm">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;