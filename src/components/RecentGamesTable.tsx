import React, { useState, useMemo, useEffect } from 'react';
import { GameData } from '../services/gameData';
import { fetchRecentGames, getTotalGamesCount } from '../services/api';
import { add } from 'date-fns';
import { solacc } from '../utils/constants';

interface RecentGamesTableProps {
}

const RecentGamesTable: React.FC<RecentGamesTableProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'stake'>('date');
  const [sortAscending, setSortAscending] = useState(true);
  const [games, setGames] = useState<GameData[]>([]);
  const [totalGames, setTotalGames] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // Load games for the current page
  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);
      try {
        const gamesData = await fetchRecentGames(currentPage, itemsPerPage);
        setGames(gamesData);
        setTotalGames(await getTotalGamesCount());
      } catch (error) {
        console.error('Error loading recent games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, [currentPage]);

  // Sort games based on current sort criteria
  const sortedGames = useMemo(() => {
    return [...games].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return sortAscending ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      } else {
        return sortAscending ? b.stakeAmount - a.stakeAmount : a.stakeAmount - b.stakeAmount;
      }
    });
  }, [games, sortBy, sortAscending]);

  // Pagination
  const totalPages = Math.ceil(totalGames / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGames = sortedGames;

  const handleDateSortToggle = () => {
    if (sortBy === 'date') {
      setSortAscending(!sortAscending);
    } else {
      setSortBy('date');
      setSortAscending(true);
    }
  };

  const handleStakeSortToggle = () => {
    if (sortBy === 'stake') {
      setSortAscending(!sortAscending);
    } else {
      setSortBy('stake');
      setSortAscending(true);
    }
  };

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
    <div className="w-full mt-8">
      {/* Table Title */}
      <h2 className="font-oswald font-bold text-[20px] leading-[160%] text-white mb-4">
        Recent Games
      </h2>

      {/* Mobile Sort Bar (visible only on mobile) */}
      <div className="sm:hidden flex items-center gap-3 mb-4">
        <span className="font-inter font-normal text-[12px] leading-[167%] text-[#324158]">Sort by:</span>
        <button
          onClick={handleDateSortToggle}
          className={`flex items-center gap-1 px-3 py-1 rounded-md border ${sortBy === 'date' ? 'border-[#90A2B9]' : 'border-[#324158]'
            }`}
        >
          <span className="font-inter font-normal text-[12px] leading-[167%] text-white">Date</span>
          <img
            src="/image/sort.svg"
            alt="Sort"
            className="w-3 h-3"
            style={{ transform: sortBy === 'date' && sortAscending ? 'rotate(0deg)' : sortBy === 'date' ? 'rotate(180deg)' : 'rotate(0deg)', opacity: sortBy === 'date' ? 1 : 0.5 }}
          />
        </button>
        <button
          onClick={handleStakeSortToggle}
          className={`flex items-center gap-1 px-3 py-1 rounded-md border ${sortBy === 'stake' ? 'border-[#90A2B9]' : 'border-[#324158]'
            }`}
        >
          <span className="font-inter font-normal text-[12px] leading-[167%] text-white">Stake</span>
          <img
            src="/image/sort.svg"
            alt="Sort"
            className="w-3 h-3"
            style={{ transform: sortBy === 'stake' && sortAscending ? 'rotate(0deg)' : sortBy === 'stake' ? 'rotate(180deg)' : 'rotate(0deg)', opacity: sortBy === 'stake' ? 1 : 0.5 }}
          />
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block w-full border-collapse">
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
            <span className="font-inter font-bold text-[16px] leading-[100%] text-white">Challenge</span>
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
              width: '140px',
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
              style={{ transform: sortBy === 'stake' && sortAscending ? 'rotate(0deg)' : sortBy === 'stake' ? 'rotate(180deg)' : 'rotate(0deg)', opacity: sortBy === 'stake' ? 1 : 0.5 }}
            />
          </div>

          {/* Result Header Cell */}
          <div
            className="flex items-center flex-shrink-0"
            style={{
              borderBottom: '1px solid #324158',
              borderTop: '1px solid #324158',
              borderLeft: '1px solid #324158',
              paddingBlock: '4px',
              paddingInline: '16px',
              width: '140px',
              height: '48px',
              background: 'transparent'
            }}
          >
            <span className="font-inter font-bold text-[16px] leading-[100%] text-white">Result</span>
          </div>

          <div
            className="flex items-center flex-shrink-0"
            style={{
              borderBottom: '1px solid #324158',
              borderRight: '1px solid #324158',
              borderTop: '1px solid #324158',
              borderLeft: '1px solid #324158',
              borderRadius: '0 10px 0 0',
              paddingBlock: '4px',
              paddingInline: '16px',
              width: '140px',
              height: '48px',
              background: 'transparent'
            }}
          >
            <span className="font-inter font-bold text-[16px] leading-[100%] text-white">Game Link</span>
          </div>
        </div>

        {/* Table Rows */}
        {paginatedGames.map((game, index) => (
          <div
            key={game.id}
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
                {game.date}
              </div>
              <div className="flex items-center gap-1 mt-1 whitespace-nowrap">
                <img src="/image/clock.svg" alt="Clock" className="w-4 h-4" />
                <span className="font-inter font-normal text-[12px] leading-[133%] text-[#bbbbbd]">
                  {formatTime(game.time)}
                </span>
              </div>
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
              <a href={`${solacc}/${game.gameName}?cluster=devnet`} target='blank' className={(game.winner == game.gameName && game.winner != null) ? "font-inter italic font-medium text-[14px] leading-[133%] text-[#f9c752]" : "font-inter font-normal text-[14px] leading-[114%] text-white whitespace-nowrap"}>
                {formatAddress(game.gameName)}
              </a>
              <span className="text-[#545454]">&nbsp;Vs&nbsp;</span>
              <a href={`${solacc}/${game.joinerPlayer}?cluster=devnet`} target='blank' className={(game.winner == game.joinerPlayer && game.winner != null) ? "font-inter italic font-medium text-[14px] leading-[133%] text-[#f9c752]" : "font-inter font-normal text-[14px] leading-[114%] text-white whitespace-nowrap"}>
                {
                  game.joinerPlayer != null
                    ?
                    formatAddress(game.joinerPlayer)
                    : "Not joined"
                }
              </a>
            </div>

            {/* Stake Cell */}
            < div
              className="flex items-center flex-shrink-0"
              style={{
                borderBottom: '1px solid #324158',
                borderLeft: '1px solid #324158',
                paddingBlock: '18px',
                paddingInline: '16px',
                width: '140px',
                height: '52px',
                background: 'transparent'
              }}
            >
              <span className="font-inter font-bold text-[14px] leading-[114%] text-[#f9c752] whitespace-nowrap">
                {game.stakeAmount}
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
                width: '140px',
                height: '52px',
                background: 'transparent'
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  border: '1px solid',
                  borderColor: typeof game.pickValue === 'string' && game.pickValue.includes('HEAD') && game.gameName == game.winner
                    ? '#d45bf8'
                    : game.gameName != game.winner && game.pickValue.includes('HEAD')
                      ? '#117af7'
                      : game.gameName != game.winner && game.pickValue.includes('TAIL')
                        ? '#d45bf8'
                        : '#117af7',
                  borderRadius: '30px',
                  paddingBlock: '5px',
                  paddingInline: '10px',
                  width: '56px',
                  height: '26px',

                  background: typeof game.pickValue === 'string' && game.pickValue.includes('HEAD') && game.gameName == game.winner
                    ? '#231829'
                    : game.gameName != game.winner && game.pickValue.includes('HEAD')
                      ? '#0f1c29'
                      : game.gameName != game.winner && game.pickValue.includes('TAIL')
                        ? '#231829'
                        : '#0f1c29',
                }}
              >
                <span className="font-inter font-normal text-[14px] leading-[114%]">
                  {typeof game.pickValue === 'string' && game.pickValue.includes('HEAD') && game.gameName == game.winner ? (
                    <span className="text-[#d45bf8]">Head</span>
                  ) : game.gameName != game.winner && game.pickValue.includes('HEAD') ? (
                    <span className="text-[#117af7]">Tail</span>
                  ) : game.gameName != game.winner && game.pickValue.includes('TAIL') ? (
                    <span className="text-[#d45bf8]">Head</span>
                  ) : (
                    <span className="text-[#117af7]">Tail</span>
                  )}
                </span>
              </div>
            </div>
            <div
              className="flex items-center flex-shrink-0"
              style={{
                borderBottom: '1px solid #324158',
                borderLeft: '1px solid #324158',
                borderRight: '1px solid #324158',
                paddingBlock: '18px',
                paddingInline: '16px',
                width: '140px',
                height: '52px',
                background: 'transparent'
              }}
            >
              {game.random != null
                ? <a href={`${solacc}/${game.random}?cluster=devnet`} target='blank' className="underline font-inter font-bold text-[14px] leading-[114%] text-[#a8d8f9] whitespace-nowrap">
                  View
                </a >
                : <span className="font-inter font-bold text-[14px] leading-[114%] text-[#fff] whitespace-nowrap">Not Joined</span>}

            </div>
          </div>
        ))
        }

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
            {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalGames)} of {totalGames}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center disabled:opacity-50 ml-4"
          >
            <img src="/image/table-right-arrow.svg" alt="Next" className="w-4 h-4" />
          </button>
        </div>
      </div >

      {/* Mobile Card View */}
      < div className="sm:hidden space-y-2" >
        {
          paginatedGames.map((game, index) => (
            <div
              key={game.id}
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
                    {game.date} {formatTime(game.time)}
                  </span>
                </div>
                <div
                  className="flex items-center justify-center"
                  style={{
                    border: '1px solid',
                    borderColor: typeof game.pickValue === 'string' && game.pickValue.includes('HEAD') ? '#d45bf8' : '#117af7',
                    borderRadius: '30px',
                    paddingBlock: '5px',
                    paddingInline: '10px',
                    width: '56px',
                    height: '26px',
                    background: typeof game.pickValue === 'string' && game.pickValue.includes('HEAD') ? '#231829' : '#0f1c29'
                  }}
                >
                  <span className="font-inter font-normal text-[14px] leading-[114%]">
                    {typeof game.pickValue === 'string' && game.pickValue.includes('HEAD') ? (
                      <span className="text-[#d45bf8]">Head</span>
                    ) : (
                      <span className="text-[#117af7]">Tail</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Challenge */}
              <div className="mb-3">
                <a href={`${solacc}/${game.gameName}?cluster=devnet`} target='blank' className={(game.winner == game.gameName && game.winner != null) ? "font-inter italic font-medium text-[14px] leading-[133%] text-[#f9c752]" : "font-inter font-normal text-[14px] leading-[114%] text-white whitespace-nowrap"}>
                  {formatAddress(game.gameName)}
                </a>
                <span className="text-[#545454]">&nbsp;Vs&nbsp;</span>
                <a href={`${solacc}/${game.joinerPlayer}?cluster=devnet`} target='blank' className={(game.winner == game.joinerPlayer && game.winner != null) ? "font-inter italic font-medium text-[14px] leading-[133%] text-[#f9c752]" : "font-inter font-normal text-[14px] leading-[114%] text-white whitespace-nowrap"}>
                  {
                    game.joinerPlayer != null
                      ?
                      formatAddress(game.joinerPlayer)
                      : "Not joined"
                  }
                </a>
              </div>

              {/* Stake */}
              <div className="flex items-center justify-between mb-1">
                <span className="font-inter font-bold text-[14px] leading-[114%] text-[#f9c752]">
                  Stake: {game.stakeAmount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-inter font-normal text-[14px] leading-[114%] text-white">Game Link</span>
                {game.random != null
                  ? <a href={`${solacc}/${game.random}?cluster=devnet`} target='blank' className="underline font-inter font-bold text-[14px] leading-[114%] text-[#a8d8f9] whitespace-nowrap">
                    View
                  </a >
                  : <span className="font-inter font-bold text-[14px] leading-[114%] text-[#fff] whitespace-nowrap">Not Joined</span>}
              </div>
            </div>
          ))
        }

        {/* Mobile Pagination */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#324158] text-white disabled:opacity-50"
          >
            <img src="/image/table-left-arrow.svg" alt="Previous" className="w-4 h-4" />
            <span className="font-inter font-normal text-[12px]">Previous</span>
          </button>

          <span className="font-inter font-medium text-[12px] text-[#929294]">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#324158] text-white disabled:opacity-50"
          >
            <span className="font-inter font-normal text-[12px]">Next</span>
            <img src="/image/table-right-arrow.svg" alt="Next" className="w-4 h-4" />
          </button>
        </div>
      </div >
    </div >
  );
};

export default RecentGamesTable;