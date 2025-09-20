import React, { useState, useRef, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface HeaderProps {
  showSearch?: boolean;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  useMobileLayoutBelowXl?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showSearch = true,
  onSearchChange,
  searchPlaceholder = "Search for Challenge",
  useMobileLayoutBelowXl = false,
}) => {
  const mobileBreakpoint = useMobileLayoutBelowXl ? "xl" : "lg";
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { connected, publicKey, disconnect } = useWallet();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 2)}...${address.slice(-4)}`;
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(publicKey?.toBase58() || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    closeUserMenu();
  };

  const goToWallet = () => {
    router.push("/history");
    closeUserMenu();
  };

  const handleLogout = async () => {
    await disconnect();
    closeUserMenu();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        closeUserMenu();
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <div className="w-full pt-4 pb-4">
      {/* Mobile Top Bar */}
      <div
        className={`${mobileBreakpoint}:hidden flex items-center justify-between mb-4 `}
      >
        {/* Mobile Logo - Left Aligned */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="SpinX Logo"
            className="w-[78px] h-[32px]"
          />
        </div>

        {/* User Info and Menu - Right Aligned */}
        <div className="flex items-center gap-3">
          {connected ? (
            <div
              className="relative flex items-center gap-2 cursor-pointer"
              onClick={toggleUserMenu}
            >
              <img src="/image/user.svg" alt="User" className="w-8 h-8" />
              <span className="font-inter font-normal text-[14px] leading-[114%] text-white">
                {formatAddress(publicKey?.toBase58() || "")}
              </span>
              <img
                src="/image/wallet-shevron.svg"
                alt="Wallet"
                className="w-4 h-4"
              />
              {isUserMenuOpen && (
                <div
                  ref={userMenuRef}
                  className="absolute top-full right-0 mt-2 border border-[#2a2a2a] rounded-[10px] w-[261px]
                           shadow-[0_4px_24px_0_rgba(255,255,255,0.06)] bg-[#020617] z-50"
                >
                  {/* Account Row */}
                  <div className="border-b border-[#2a2a2a] p-3 bg-[#020617] hover:bg-[#1a1a2a] transition-colors">
                    <div className="font-inter font-medium text-[14px] leading-[114%] text-white mb-2">
                      Account:
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-inter font-medium italic text-[12px] leading-[133%] text-[#90a2b9]">
                        {copied ? "Copied!" : formatAddress(publicKey?.toBase58() || "")}
                      </span>
                      <button
                        onClick={copyToClipboard}
                        className="flex-shrink-0"
                      >
                        <img
                          src="/image/copy.svg"
                          alt="Copy"
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Wallet Row */}
                  <div className="border-b border-[#2a2a2a] p-3 bg-[#020617] hover:bg-[#1a1a2a] transition-colors">
                    <button
                      onClick={goToWallet}
                      className="flex items-center gap-2 w-full text-left"
                    >
                      <img
                        src="/image/wallet.svg"
                        alt="Wallet"
                        className="w-5 h-5"
                      />
                      <span className="font-inter font-medium text-[14px] leading-[114%] text-white">
                        Wallet
                      </span>
                    </button>
                  </div>

                  {/* Logout Row */}
                  <div className="p-3 bg-[#020617] hover:bg-[#1a1a2a] transition-colors">
                    <button
                      className="flex items-center gap-2 w-full text-left"
                      onClick={handleLogout}
                    >
                      <img
                        src="/image/logout.svg"
                        alt="Logout"
                        className="w-5 h-5"
                      />
                      <span className="font-inter font-medium text-[14px] leading-[114%] text-[#ff1a00]">
                        Logout
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <WalletMultiButton
              style={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "2px 8px",
                color: "#000",
                fontSize: "12px",
                padding: "10px 9px",
                height: "36px",
                fontWeight: "500",
                fontFamily: "Inter, sans-serif",
              }}
            />
          )}

          {/* Mobile Menu Button */}
          <MobileMenu useXlBreakpoint={useMobileLayoutBelowXl} />
        </div>
      </div>

      {/* Search and User Info Row */}
      <div
        className={`flex flex-col ${mobileBreakpoint}:flex-row ${mobileBreakpoint}:items-center ${mobileBreakpoint}:justify-between w-full gap-4`}
      >
        {/* Search Field - Always visible on desktop, below logo on mobile */}
        {showSearch && (
          <div
            className={`flex items-center relative max-w-[400px] w-full ${mobileBreakpoint}:w-auto order-2 ${mobileBreakpoint}:order-1`}
          >
            <img
              src="/image/search.svg"
              alt="Search"
              className="w-4 h-4 absolute left-3"
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full border border-[#324158] rounded-[5px] py-2 pl-10 pr-3 h-9
                       font-inter font-normal text-[12px] leading-[167%] text-[#324158]
                       bg-transparent focus:outline-none focus:border-[#90A2B9]"
              style={{ maxWidth: "400px" }}
            />
          </div>
        )}

        {/* User Info - Right Aligned (visible on desktop) */}
        <div
          className={`hidden lg:flex items-center gap-2 ml-auto order-1 ${mobileBreakpoint}:order-2`}
        >
          {connected ? (
            <div
              className="relative flex items-center gap-2 cursor-pointer"
              onClick={toggleUserMenu}
            >
              <img src="/image/user.svg" alt="User" className="w-8 h-8" />
              <span className="font-inter font-normal text-[14px] leading-[114%] text-white">
                {formatAddress(publicKey?.toBase58() || "")}
              </span>
              <img
                src="/image/wallet-shevron.svg"
                alt="Wallet"
                className="w-4 h-4"
              />
              {isUserMenuOpen && (
                <div
                  ref={userMenuRef}
                  className="absolute top-full right-0 mt-2 border border-[#2a2a2a] rounded-[10px] w-[261px]
                           shadow-[0_4px_24px_0_rgba(255,255,255,0.06)] bg-[#020617] z-50"
                >
                  {/* Account Row */}
                  <div className="border-b border-[#2a2a2a] p-3 bg-[#020617] hover:bg-[#1a1a2a] transition-colors">
                    <div className="font-inter font-medium text-[14px] leading-[114%] text-white mb-2">
                      Account:
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-inter font-medium italic text-[12px] leading-[133%] text-[#90a2b9]">
                        {copied ? "Copied!" : formatAddress(publicKey?.toBase58() || "")}
                      </span>
                      <button
                        onClick={copyToClipboard}
                        className="flex-shrink-0"
                      >
                        <img
                          src="/image/copy.svg"
                          alt="Copy"
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Wallet Row */}
                  <div className="border-b border-[#2a2a2a] p-3 bg-[#020617] hover:bg-[#1a1a2a] transition-colors">
                    <button
                      onClick={goToWallet}
                      className="flex items-center gap-2 w-full text-left"
                    >
                      <img
                        src="/image/wallet.svg"
                        alt="Wallet"
                        className="w-5 h-5"
                      />
                      <span className="font-inter font-medium text-[14px] leading-[114%] text-white">
                        Wallet
                      </span>
                    </button>
                  </div>

                  {/* Logout Row */}
                  <div className="p-3 bg-[#020617] hover:bg-[#1a1a2a] transition-colors">
                    <button
                      className="flex items-center gap-2 w-full text-left"
                      onClick={handleLogout}
                    >
                      <img
                        src="/image/logout.svg"
                        alt="Logout"
                        className="w-5 h-5"
                      />
                      <span className="font-inter font-medium text-[14px] leading-[114%] text-[#ff1a00]">
                        Logout
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <WalletMultiButton
                style={{
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "2px 8px",
                  color: "#000",
                  fontSize: "12px",
                  padding: "10px 9px",
                  height: "36px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;