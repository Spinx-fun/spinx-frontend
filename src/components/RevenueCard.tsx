import React from 'react';

interface RevenueCardProps {
  revenue: number;
  trend: number;
}

const RevenueCard: React.FC<RevenueCardProps> = ({ revenue, trend }) => {
  const displayRevenue = revenue !== null && revenue !== undefined ? revenue : 0;
  const isPositive = trend >= 0;
  const trendIcon = isPositive ? "/image/upward-trend.svg" : "/image/downward-trend.svg";
  const trendColor = isPositive ? "text-[#1be088]" : "text-red-500";

  return (
    <div className="border border-[#2a2a2a] rounded-[10px] p-4 bg-[#020617] h-full flex flex-col">
      {/* Header with Title and Icon */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-oswald font-bold text-[20px] leading-[160%] text-white">
          Revenue
        </h3>
        <img src="/image/dollar.svg" alt="Revenue" className="w-8 h-8" />
      </div>

      {/* Revenue Subbox */}
      <div className="rounded-[10px] p-3 bg-[#0e172b] flex-1 flex flex-col justify-center">
        {/* Revenue Amount with SPX Tokens */}
        <div className="flex items-end gap-2 mb-2">
          <span className="font-oswald font-medium text-[36px] leading-[117%] text-[#f9c752]">
            {displayRevenue}
          </span>
          <span className="font-inter font-medium text-[14px] leading-[186%] text-white self-end">
            SPX Tokens
          </span>
        </div>

        {/* Trend Info */}
        {/* <div className="flex items-center gap-1">
          <img src={trendIcon} alt="Trend" className="w-4 h-4" />
          <span className={`font-inter font-normal text-[20px] leading-[160%] ${trendColor}`}>
            {isPositive ? '+' : ''}{trend.toFixed(1)}%
          </span>
        </div>

        <p className="font-inter font-medium italic text-[12px] leading-[133%] text-[#929294] mt-1">
          From last month
        </p> */}
      </div>
    </div>
  );
};

export default RevenueCard;