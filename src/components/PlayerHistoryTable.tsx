import React, { useState } from 'react';
import { PlayerHistory } from '../services/gameData';
import { solacc } from '../utils/constants';

interface PlayerHistoryTableProps {
  data: PlayerHistory[];
}

const PlayerHistoryTable: React.FC<PlayerHistoryTableProps> = ({ data }) => {
  const [sortBy, setSortBy] = useState<'date' | 'stakeAmount' | 'result'>('date');
  const [sortAscending, setSortAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDateSortToggle = () => {
    if (sortBy === 'date') {
      setSortAscending(!sortAscending);
    } else {
      setSortBy('date');
      setSortAscending(true);
    }
  };

  const handleStakeSortToggle = () => {
    if (sortBy === 'stakeAmount') {
      setSortAscending(!sortAscending);
    } else {
      setSortBy('stakeAmount');
      setSortAscending(true);
    }
  };

  const handleResultSortToggle = () => {
    if (sortBy === 'result') {
      setSortAscending(!sortAscending);
    } else {
      setSortBy('result');
      setSortAscending(true);
    }
  };

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = [...data].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return sortAscending ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    } else if (sortBy === 'stakeAmount') {
      return sortAscending ? b.stakeAmount - a.stakeAmount : a.stakeAmount - b.stakeAmount;
    } else {
      // For result, we'll sort alphabetically
      return sortAscending ? b.result.localeCompare(a.result) : a.result.localeCompare(b.result);
    }
  });

  const formatAddress = (address: string) => {
    return `${address.slice(0, 3)}...${address.slice(-4)}`;
  };

  const formatTime = (time: string) => {
    const [hours, minutes, seconds] = time.split(':');
    const hourNum = parseInt(hours);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour}:${minutes}:${seconds} ${ampm}`;
  };
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden xl:block w-full border-collapse">
        {/* Table Header */}
        <div className="flex w-full">
          {/* Date Header Cell */}
          <div
            className="flex items-center justify-between cursor-pointer flex-shrink-0"
            style={{
              borderBottom: '1px solid #324158',
              borderLeft: '1px solid #324158',
              borderRight: '1px solid #324158',
              borderTop: '1px solid #324158',
              borderRadius: '10px 0 0 0',
              paddingBlock: '4px',
              paddingInline: '16px',
              width: '121px',
              height: '48px',
              background: 'transparent'
            }}
            onClick={handleDateSortToggle}
          >
            <span className="font-inter font-bold text-[16px] leading-[100%] text-white">Date</span>
            <img
              src="/image/sort.svg"
              alt="Sort"
              className="w-4 h-4"
              style={{ transform: sortBy === 'date' && sortAscending ? 'rotate(0deg)' : sortBy === 'date' ? 'rotate(180deg)' : 'rotate(0deg)', opacity: sortBy === 'date' ? 1 : 0.5 }}
            />
          </div>

          {/* Game Header Cell */}
          <div
            className="flex items-center flex-shrink-0"
            style={{
              borderBottom: '1px solid #324158',
              borderTop: '1px solid #324158',
              borderRight: '1px solid #324158',
              paddingBlock: '4px',
              paddingInline: '16px',
              width: '90px',
              height: '48px',
              background: 'transparent'
            }}
          >
            <span className="font-inter font-bold text-[16px] leading-[100%] text-white">Game</span>
          </div>

          {/* Challenge Header Cell */}
          <div
            className="flex items-center flex-grow"
            style={{
              borderBottom: '1px solid #324158',
              borderTop: '1px solid #324158',
              paddingBlock: '4px',
              paddingInline: '16px',
              height: '48px',
              background: 'transparent'
            }}
          >
            <span className="font-inter font-bold text-[16px] leading-[100%] text-white">Challenger</span>
          </div>

          <div
            className="flex items-center flex-shrink-0 cursor-pointer"
            style={{
              borderBottom: '1px solid #324158',
              borderTop: '1px solid #324158',
              borderLeft: '1px solid #324158',
              paddingBlock: '4px',
              paddingInline: '16px',
              width: '320px',
              height: '48px',
              background: 'transparent'
            }}
          >
            <span className="font-inter font-bold text-[16px] leading-[100%] text-white mr-auto">Details</span>
          </div>
          {/* Stake Header Cell */}
          <div
            className="flex items-center flex-shrink-0 cursor-pointer"
            style={{
              borderBottom: '1px solid #324158',
              borderTop: '1px solid #324158',
              borderLeft: '1px solid #324158',
              paddingBlock: '4px',
              paddingInline: '16px',
              width: '110px',
              height: '48px',
              background: 'transparent'
            }}
            onClick={handleStakeSortToggle}
          >
            <span className="font-inter font-bold text-[16px] leading-[100%] text-white mr-auto">Stake</span>
            <img
              src="/image/sort.svg"
              alt="Sort"
              className="w-4 h-4"
              style={{ transform: sortBy === 'stakeAmount' && sortAscending ? 'rotate(0deg)' : sortBy === 'stakeAmount' ? 'rotate(180deg)' : 'rotate(0deg)', opacity: sortBy === 'stakeAmount' ? 1 : 0.5 }}
            />
          </div>

          {/* Result Header Cell */}
          <div
            className="flex items-center flex-shrink-0 cursor-pointer"
            style={{
              borderBottom: '1px solid #324158',
              borderTop: '1px solid #324158',
              borderLeft: '1px solid #324158',
              paddingBlock: '4px',
              paddingInline: '16px',
              width: '110px',
              height: '48px',
              background: 'transparent'
            }}
            onClick={handleResultSortToggle}
          >
            <span className="font-inter font-bold text-[16px] leading-[100%] text-white">Result</span>
            <img
              src="/image/sort.svg"
              alt="Sort"
              className="w-4 h-4 ml-1"
              style={{ transform: sortBy === 'result' && sortAscending ? 'rotate(0deg)' : sortBy === 'result' ? 'rotate(180deg)' : 'rotate(0deg)', opacity: sortBy === 'result' ? 1 : 0.5 }}
            />
          </div>

          <div
            className="flex items-center flex-shrink-0 cursor-pointer"
            style={{
              borderBottom: '1px solid #324158',
              borderRight: '1px solid #324158',
              borderTop: '1px solid #324158',
              borderLeft: '1px solid #324158',
              borderRadius: '0 10px 0 0',
              paddingBlock: '4px',
              paddingInline: '16px',
              width: '120px',
              height: '48px',
              background: 'transparent'
            }}
          >
            <span className="font-inter font-bold text-[16px] leading-[100%] text-white">Game Link</span>
          </div>
        </div>

        {/* Table Rows */}
        {paginatedData.slice(startIndex, startIndex + itemsPerPage).map((item, index) => (
          <div
            key={item.id}
            className="flex w-full"
            style={{
              background: index % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* Date Cell */}
            <div
              className="flex flex-col justify-center flex-shrink-0"
              style={{
                borderBottom: '1px solid #324158',
                borderLeft: '1px solid #324158',
                borderRight: '1px solid #324158',
                paddingBlock: '18px',
                paddingInline: '16px',
                width: '121px',
                height: '52px'
              }}
            >
              <div className="font-inter font-normal text-[13px] leading-[123%] text-white whitespace-nowrap">
                {item.date}
              </div>
              <div className="flex items-center gap-1 mt-1 whitespace-nowrap">
                <img src="/image/clock.svg" alt="Clock" className="w-4 h-4" />
                <span className="font-inter font-normal text-[12px] leading-[133%] text-[#bbbbbd]">
                  {formatTime(item.time)}
                </span>
              </div>
            </div>

            {/* Game Cell */}
            <div
              className="flex items-center flex-shrink-0"
              style={{
                borderBottom: '1px solid #324158',
                borderRight: '1px solid #324158',
                paddingBlock: '18px',
                paddingInline: '16px',
                width: '90px',
                height: '52px',
                background: 'transparent'
              }}
            >
              <span className="font-inter font-bold text-[14px] leading-[114%] text-white whitespace-nowrap">
                {item.game}
              </span>
            </div>

            {/* Challenge Cell */}
            <div
              className="flex items-center flex-grow"
              style={{
                borderBottom: '1px solid #324158',
                paddingBlock: '18px',
                paddingInline: '16px',
                height: '52px',
                background: 'transparent'
              }}
            >
              <span className="font-inter font-normal text-[14px] leading-[114%] text-white whitespace-nowrap">
                <a href={`${solacc}/${item.challenge}`} target='blank' >{formatAddress(item.challenge.split('Vs')[0]?.trim())} </a><span className="text-[#545454]">Vs</span> {item?.joinerPlayer != null ? <a href={`${solacc}/${item.joinerPlayer}`} target='blank' >{formatAddress(item.joinerPlayer.split('Vs')[0]?.trim())} </a> : "Not Joined"}
              </span>
            </div>

            <div
              className="flex items-center flex-shrink-0"
              style={{
                borderBottom: '1px solid #324158',
                borderRight: '1px solid #324158',
                borderLeft: '1px solid #324158',
                paddingBlock: '18px',
                paddingInline: '16px',
                width: '320px',
                height: '52px',
                background: 'transparent',
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <span className="font-inter font-bold text-[14px] leading-[114%] text-[#fff] whitespace-nowrap">Game Result: {item.result == "Win" ? item.pickValue == "HEADS" ? "TAILS" : "HEADS" : item.pickValue}</span>
              {
                item.result !== "Pending" ?
                <span className="font-inter font-bold text-[14px] leading-[114%] text-[#fff] whitespace-nowrap">Your Value: {item.result == "Win" ? item.pickValue : item.pickValue == "HEADS" ? "TAILS" : "HEADS"}</span>
                :
                <></>
              }

            </div>

            {/* Stake Cell */}
            <div
              className="flex items-center flex-shrink-0"
              style={{
                borderBottom: '1px solid #324158',
                borderLeft: '1px solid #324158',
                paddingBlock: '18px',
                paddingInline: '16px',
                width: '110px',
                height: '52px',
                background: 'transparent'
              }}
            >
              <span className="font-inter font-bold text-[14px] leading-[114%] text-[#f9c752] whitespace-nowrap">
                {item.stakeAmount.toLocaleString()}
              </span>
            </div>

            {/* Result Cell */}
            <div
              className="flex items-center flex-shrink-0"
              style={{
                borderBottom: '1px solid #324158',
                borderLeft: '1px solid #324158',
                paddingBlock: '18px',
                paddingInline: '16px',
                width: '110px',
                height: '52px',
                background: 'transparent'
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  border: '1px solid',
                  borderColor: item.result === 'Win' ? '#1be088' : item.result === 'Pending' ? '#e0b415' : '#ff4757',
                  borderRadius: '30px',
                  paddingBlock: '5px',
                  paddingInline: '10px',
                  width: '75px',
                  height: '26px',
                  background: item.result === 'Win' ? '#112520' : item.result === 'Pending' ? '#b5970d24' : '#281213'
                }}
              >
                <span className="font-inter font-normal text-[14px] leading-[114%]">
                  {item.result === 'Win' ? (
                    <span className="text-[#1be088]">Win</span>
                  ) : item.result === 'Pending' ? (
                    <span className="text-[#fff347]">Pending</span>
                  ) : (
                    <span className="text-[#ff4757]">Loss</span>
                  )}
                </span>
              </div>
            </div>

            <div
              className="flex items-center flex-shrink-0"
              style={{
                borderBottom: '1px solid #324158',
                borderRight: '1px solid #324158',
                borderLeft: '1px solid #324158',
                paddingBlock: '18px',
                paddingInline: '16px',
                width: '120px',
                height: '52px',
                background: 'transparent'
              }}
            >
              {item.creatorAta != null
                ?
                <a href={`${solacc}/${item.creatorAta}`} target='blank' className="underline font-inter font-bold text-[14px] leading-[114%] text-[#a8d8f9] whitespace-nowrap">
                  View
                </a >
                : <span className="font-inter font-bold text-[14px] leading-[114%] text-[#fff] whitespace-nowrap">Not Joined</span>}
            </div>
          </div>
        ))}

        {/* Pagination Footer */}
        <div
          className="flex items-center w-full"
          style={{
            borderBottom: '1px solid #324158',
            borderLeft: '1px solid #324158',
            borderRight: '1px solid #324158',
            borderRadius: '0 0 10px 10px',
            paddingBlock: '12px',
            paddingInline: '16px',
            height: '48px',
            background: 'transparent'
          }}
        >
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center disabled:opacity-50 mr-4"
          >
            <img src="/image/table-left-arrow.svg" alt="Previous" className="w-4 h-4" />
          </button>

          <span className="font-inter font-medium text-[12px] leading-[133%] text-[#929294]">
            {startIndex + 1}-{Math.min(startIndex + itemsPerPage, data.length)} of {data.length}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center disabled:opacity-50 ml-4"
          >
            <img src="/image/table-right-arrow.svg" alt="Next" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="xl:hidden space-y-2">
        {paginatedData.slice(startIndex, startIndex + itemsPerPage).map((item, index) => (
          <div
            key={item.id}
            className="p-4"
            style={{
              background: index % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* Date and Time */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src="/image/clock.svg" alt="Clock" className="w-4 h-4" />
                <span className="font-inter font-normal text-[14px] leading-[114%] text-white">
                  {item.date} {formatTime(item.time)}
                </span>
              </div>

              <div
                className="flex items-center justify-center"
                style={{
                  border: '1px solid',
                  borderColor: item.result === 'Win' ? '#1be088' : item.result === 'Pending' ? '#e0b415' : '#ff4757',
                  borderRadius: '30px',
                  paddingBlock: '5px',
                  paddingInline: '10px',
                  width: '75px',
                  height: '26px',
                  background: item.result === 'Win' ? '#112520' : item.result === 'Pending' ? '#b5970d24' : '#281213'
                }}
              >
                <span className="font-inter font-normal text-[14px] leading-[114%]">
                  {item.result === 'Win' ? (
                    <span className="text-[#1be088]">Win</span>
                  ) : item.result === 'Pending' ? (
                    <span className="text-[#fff347]">Pending</span>
                  ) : (
                    <span className="text-[#ff4757]">Loss</span>
                  )}
                </span>
              </div>
            </div>

            {/* Game and Challenge */}
            <div className="mb-3">
              <div className="font-inter font-bold text-[14px] leading-[114%] text-white mb-1">
                {item.game}
              </div>
              <span className="font-inter font-normal text-[14px] leading-[114%] text-white whitespace-nowrap">
                <a href={`${solacc}/${item.challenge}`} target='blank' >{formatAddress(item.challenge.split('Vs')[0]?.trim())} </a><span className="text-[#545454]">Vs</span> {item?.joinerPlayer != null ? <a href={`${solacc}/${item.joinerPlayer}`} target='blank' >{formatAddress(item.joinerPlayer.split('Vs')[0]?.trim())} </a> : "Not Joined"}
              </span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="font-inter font-bold text-[14px] leading-[114%] text-[#f9c752] whitespace-nowrap">
                <b>Details: &nbsp; &nbsp;</b> 
                <span className="font-inter font-bold text-[14px] leading-[114%] text-[#fff] whitespace-nowrap">Game Result: {item.result == "Win" ? item.pickValue == "HEADS" ? "TAILS" : "HEADS" : item.pickValue}</span>
                &nbsp; &nbsp; &nbsp;
              {
                item.result !== "Pending" ?
                <span className="font-inter font-bold text-[14px] leading-[114%] text-[#fff] whitespace-nowrap">Your Value: {item.result == "Win" ? item.pickValue : item.pickValue == "HEADS" ? "TAILS" : "HEADS"}</span>
                :
                <></>
              }
              </span>
            </div>
            {/* Stake */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-inter font-bold text-[14px] leading-[114%] text-[#f9c752] whitespace-nowrap">
                <b>Stake:</b> {item.stakeAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-inter font-bold text-[14px] leading-[114%] text-[#a8d8f9] whitespace-nowrap">
                Game Link:
              </span>
              {item.creatorAta != null
                ? <a href={`${solacc}/${item.creatorAta}`} target='blank' className="underline font-inter font-bold text-[14px] leading-[114%] text-[#a8d8f9] whitespace-nowrap">
                  View
                </a >
                : <span className="font-inter font-bold text-[14px] leading-[114%] text-[#fff] whitespace-nowrap">Not Joined</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerHistoryTable;