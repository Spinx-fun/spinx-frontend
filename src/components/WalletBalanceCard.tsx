import React, { useState } from 'react';

interface WalletBalanceCardProps {
  walletAddress: string;
  balance: number;
  trend: number;
}

const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({ 
  walletAddress, 
  balance, 
  trend 
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayBalance = balance !== null && balance !== undefined ? balance : 0;
  const isPositive = trend >= 0;
  const trendIcon = isPositive ? "/image/upward-trend.svg" : "/image/downward-trend.svg";
  const trendColor = isPositive ? "text-[#1be088]" : "text-red-500";

  return (
    <div className="border border-[#2a2a2a] rounded-[10px] p-4 bg-[#020617] h-full flex flex-col">
      <h3 className="font-oswald font-bold text-[20px] leading-[160%] text-white mb-4">
        Wallet Balance
      </h3>
      
      {/* Wallet Address Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src="/image/wallet.svg" alt="Wallet" className="w-5 h-5" />
          <span className="font-mono text-[12px] text-white break-all flex-1 mr-2">
            {copied ? 'Copied!' : walletAddress}
          </span>
        </div>
        <button onClick={copyToClipboard} className="flex-shrink-0">
          <img src="/image/copy.svg" alt="Copy" className="w-5 h-5" />
        </button>
      </div>

      {/* Balance Subbox */}
      <div className="rounded-[10px] p-3 bg-[#0e172b] flex-1 flex items-center justify-center">
        <div className="flex items-center justify-between w-full">
          {/* Balance Amount with SPX Tokens */}
          <div className="flex items-end gap-2">
            <span className="font-oswald font-medium text-[36px] leading-[117%] text-[#f9c752]">
              {displayBalance}
            </span>
            <span className="font-inter font-medium text-[14px] leading-[186%] text-white self-end">
              SPX Tokens
            </span>
          </div>

          {/* Trend Info */}
          <div className="text-right">
            {/* <div className="flex items-center justify-end gap-1">
              <img src={trendIcon} alt="Trend" className="w-4 h-4" />
              <span className={`font-inter font-normal text-[20px] leading-[160%] ${trendColor}`}>
                {isPositive ? '+' : ''}{trend.toFixed(1)}%
              </span>
            </div>
            <p className="font-inter font-medium italic text-[12px] leading-[133%] text-[#929294]">
              From last month
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceCard;