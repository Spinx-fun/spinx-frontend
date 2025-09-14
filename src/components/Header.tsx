import React, { useState } from 'react';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  showSearch?: boolean;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  showSearch = true, 
  onSearchChange,
  searchPlaceholder = "Search for Challenge" 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 2)}...${address.slice(-4)}`;
  };

  return (
    <div className="w-full pt-4 pb-4">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        {/* Mobile Logo - Left Aligned */}
        <div className="flex items-center">
          <img
            src="/image/spinx-78x32.svg"
            alt="SpinX Logo"
            className="w-[78px] h-[32px]"
          />
        </div>
        
        {/* User Info and Menu - Right Aligned */}
        <div className="flex items-center gap-3">
          {/* User Info - Show on mobile */}
          <div className="flex items-center gap-2">
            <img src="/image/user.svg" alt="User" className="w-8 h-8" />
            <span className="font-inter font-normal text-[14px] leading-[114%] text-white">
              {formatAddress('DD320512345678')}
            </span>
            <img src="/image/wallet-shevron.svg" alt="Wallet" className="w-4 h-4" />
          </div>
          
          {/* Mobile Menu Button */}
          <MobileMenu />
        </div>
      </div>

      {/* Search and User Info Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-4">
        {/* Search Field - Always visible on desktop, below logo on mobile */}
        {showSearch && (
          <div className="flex items-center relative max-w-[400px] w-full lg:w-auto order-2 lg:order-1">
            <img src="/image/search.svg" alt="Search" className="w-4 h-4 absolute left-3" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full border border-[#324158] rounded-[5px] py-2 pl-10 pr-3 h-9
                       font-inter font-normal text-[12px] leading-[167%] text-[#324158]
                       bg-transparent focus:outline-none focus:border-[#90A2B9]"
              style={{ maxWidth: '400px' }}
            />
          </div>
        )}

        {/* User Info - Right Aligned (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-2 lg:ml-auto order-1 lg:order-2">
          <img src="/image/user.svg" alt="User" className="w-8 h-8" />
          <span className="font-inter font-normal text-[14px] leading-[114%] text-white">
            {formatAddress('DD320512345678')}
          </span>
          <img src="/image/wallet-shevron.svg" alt="Wallet" className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Header;
