import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchMaxStake, fetchTokenRangeData } from '../services/api';

interface TokenRangeDropdownProps {
  onApply: (min: number, max: number) => void;
}

const TokenRangeDropdown: React.FC<TokenRangeDropdownProps> = ({ onApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5000);
  const [currentMax, setCurrentMax] = useState(5000);
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMaxStake = async () => {
      try {
        const maxStake = await fetchMaxStake();
        setCurrentMax(maxStake);
        setMaxValue(maxStake);
      } catch (error) {
        console.error('Error loading max stake:', error);
      }
    };

    loadMaxStake();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleApply = () => {
    onApply(minValue, maxValue);
    setIsOpen(false);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(Number(e.target.value), maxValue));
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(minValue, Math.min(Number(e.target.value), currentMax));
    setMaxValue(value);
  };

  const handleSliderMouseDown = (e: React.MouseEvent, handle: 'min' | 'max') => {
    e.preventDefault();
    setDragging(handle);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || !sliderRef.current) return;

    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const value = Math.round(percentage * currentMax);

    if (dragging === 'min') {
      setMinValue(Math.min(value, maxValue));
    } else {
      setMaxValue(Math.max(value, minValue));
    }
  }, [dragging, minValue, maxValue, currentMax]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="
          w-[153px] border border-opacity-50 border-[#90A2B9] rounded-md 
          py-2 px-3 flex items-center justify-between transition-all duration-200
          cursor-pointer hover:border-opacity-70 bg-transparent text-white
        "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">Token Range</span>
        <img 
          src="/image/shevron.svg" 
          alt="Dropdown arrow" 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 invert' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 border border-[#2a2a2a] rounded-[10px] p-[14px] w-[252px] 
                      shadow-[0_4px_24px_0_rgba(255,255,255,0.06)] bg-[#020617] z-50">
          {/* Title */}
          <h3 className="font-oswald font-semibold text-[16px] leading-[120%] text-white mb-1">
            Price range
          </h3>
          
          {/* Subtitle */}
          <p className="font-inter font-normal text-[10px] leading-[120%] text-[#90a2b9] mb-4">
            Show challenges within your budget
          </p>

          {/* Slider Track */}
          <div 
            ref={sliderRef}
            className="w-full h-[3.6px] border-[3.6px] border-[#1B343C] rounded-full mb-4 relative cursor-pointer"
          >
            {/* Active Range */}
            <div 
              className="absolute h-[3.6px] border-[3.6px] border-[#35B3DC] rounded-full top-[-1.8px]"
              style={{
                left: `${(minValue / currentMax) * 100}%`,
                width: `${((maxValue - minValue) / currentMax) * 100}%`
              }}
            />
            
            {/* Slider Points */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-[13px] h-[13px] cursor-grab active:cursor-grabbing -ml-2"
              style={{ left: `${(minValue / currentMax) * 100}%` }}
              onMouseDown={(e) => handleSliderMouseDown(e, 'min')}
            >
              <img src="/image/slider-point.svg" alt="Min slider" className="w-full h-full" />
            </div>
            
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-[13px] h-[13px] cursor-grab active:cursor-grabbing -ml-2"
              style={{ left: `${(maxValue / currentMax) * 100}%` }}
              onMouseDown={(e) => handleSliderMouseDown(e, 'max')}
            >
              <img src="/image/slider-point.svg" alt="Max slider" className="w-full h-full" />
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* From Input */}
            <div>
              <label className="font-inter font-medium text-[10px] text-[#90a2b9] block mb-1">
                From
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={minValue}
                  onChange={handleMinChange}
                  className="w-full border border-[#222] border-[0.68px] rounded-[8px] py-[9px] px-3 h-[30px] 
                           font-inter font-medium text-[10px] text-white bg-transparent text-left pl-3 pr-8
                           focus:outline-none focus:border-[#35B3DC]"
                  min={0}
                  max={maxValue}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 
                               font-inter font-medium text-[10px] text-white/50">
                  SPX
                </span>
              </div>
            </div>

            {/* To Input */}
            <div>
              <label className="font-inter font-medium text-[10px] text-[#90a2b9] block mb-1">
                To
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={maxValue}
                  onChange={handleMaxChange}
                  className="w-full border border-[#222] border-[0.68px] rounded-[8px] py-[9px] px-3 h-[30px] 
                           font-inter font-medium text-[10px] text-white bg-transparent text-left pl-3 pr-8
                           focus:outline-none focus:border-[#35B3DC]"
                  min={minValue}
                  max={currentMax}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 
                               font-inter font-medium text-[10px] text-white/50">
                  SPX
                </span>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="w-full rounded-[2px_8px] py-[10px] px-[9px] h-[36px] bg-white 
                     font-inter font-medium text-[12px] text-[#141414] text-center
                     hover:opacity-90 transition-opacity"
          >
            See {Math.round((maxValue - minValue) / 100)} challenges
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenRangeDropdown;