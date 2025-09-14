import React, { useState, useEffect } from 'react';
import CustomDropdown, { DropdownOption } from './CustomDropdown';
import GameCard from './GameCard';
import RecentGamesTable from './RecentGamesTable';
import { formatTimeAgo } from '../utils/timeFormatter';
import { fetchGamesPaginated, hasMoreGames } from '../services/api';
import { GameData } from '../services/gameData';

const StatusControls: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Math.floor(Date.now() / 1000) - 120); // 2 minutes ago
  const [sortBy, setSortBy] = useState('running-longest');
  const [timeRange, setTimeRange] = useState('last-30-days');
  const [games, setGames] = useState<GameData[]>([]);
  const [allGames, setAllGames] = useState<GameData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sortOptions: DropdownOption[] = [
    { value: 'running-longest', label: 'Running Longest' },
    { value: 'oldest-first', label: 'Oldest First' },
    { value: 'newest-first', label: 'Newest First' },
    { value: 'highest-tokens', label: 'Highest Tokens' },
    { value: 'lowest-tokens', label: 'Lowest Tokens' },
  ];

  const timeRangeOptions: DropdownOption[] = [
    { value: 'today', label: 'Today', leftIcon: '/image/calendar.svg' },
    { value: 'last-3-days', label: 'Last 3 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-7-days', label: 'Last 7 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-14-days', label: 'Last 14 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-30-days', label: 'Last 30 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-6-months', label: 'Last 6 Months', leftIcon: '/image/calendar.svg' },
    { value: 'all-time', label: 'All Time', leftIcon: '/image/calendar.svg' },
  ];

  const tokenRangeOptions: DropdownOption[] = [
    { value: 'all', label: 'Token Range' }
  ];

  const handleRefresh = () => {
    setLastUpdated(Math.floor(Date.now() / 1000));
    // Add actual refresh logic here later
    console.log('Refresh clicked');
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newGames = await fetchGamesPaginated(nextPage);
      const filteredNewGames = newGames.filter(game =>
        game.gameName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setGames(prevGames => [...prevGames, ...filteredNewGames]);
      setAllGames(prevGames => [...prevGames, ...newGames]);
      setCurrentPage(nextPage);
      setHasMore(hasMoreGames(nextPage));
    } catch (error) {
      console.error('Error loading more games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial games on component mount
  useEffect(() => {
    const loadInitialGames = async () => {
      setIsLoading(true);
      try {
        const initialGames = await fetchGamesPaginated(1);
        setGames(initialGames);
        setAllGames(initialGames);
        setHasMore(hasMoreGames(1));
      } catch (error) {
        console.error('Error loading initial games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialGames();
  }, []);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query === '') {
      // Reset to original paginated games
      const loadFilteredGames = async () => {
        const initialGames = await fetchGamesPaginated(1);
        setGames(initialGames);
      };
      loadFilteredGames();
    } else {
      // Filter all loaded games
      const filtered = allGames.filter(game =>
        game.gameName.toLowerCase().includes(query.toLowerCase())
      );
      setGames(filtered);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 2)}...${address.slice(-4)}`;
  };

  return (
    <div className="w-full">
      {/* Search Bar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6 gap-4">
        {/* Search Field - Left Aligned */}
        <div className="flex items-center relative max-w-[400px]">
          <img src="/image/search.svg" alt="Search" className="w-4 h-4 absolute left-3" />
          <input
            type="text"
            placeholder="Search for Challange"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full border border-[#324158] rounded-[5px] py-2 pl-10 pr-3 h-9
                     font-inter font-normal text-[12px] leading-[167%] text-[#324158]
                     bg-transparent focus:outline-none focus:border-[#90A2B9]"
            style={{ maxWidth: '400px' }}
          />
        </div>

        {/* User Info - Right Aligned */}
        <div className="flex items-center gap-2 sm:ml-auto">
          <img src="/image/user.svg" alt="User" className="w-8 h-8" />
          <span className="font-inter font-normal text-[14px] leading-[114%] text-white hidden sm:block">
            {formatAddress('DD320512345678')}
          </span>
          <img src="/image/wallet-shevron.svg" alt="Wallet" className="w-4 h-4" />
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full mb-6 gap-4 lg:gap-0">
        {/* Status Section - Left Aligned */}
        <div className="flex items-center gap-3 flex-wrap">
          <img
            src={isOnline ? "/image/online.svg" : "/image/offline.svg"}
            alt={isOnline ? "Online" : "Offline"}
            className="w-3.5 h-3.5"
          />
          <span className="font-oswald font-bold text-xl leading-[160%] text-white">
            Live Listening
          </span>
          <span className="font-inter font-normal text-xs leading-[200%] text-[#929294]">
            (Updated {formatTimeAgo(lastUpdated)})
          </span>
        </div>

        {/* Controls Section - Right Aligned */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="border border-opacity-50 border-[#90A2B9] rounded-md p-2 w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
            title="Refresh data"
          >
            <img src="/image/refresh.svg" alt="Refresh" className="w-4 h-4" />
          </button>

          {/* Sort Dropdown */}
          <CustomDropdown
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="lg:ml-2"
          />

          {/* Token Range Dropdown (disabled for now) */}
          <CustomDropdown
            options={tokenRangeOptions}
            value="all"
            onChange={() => {}}
            disabled={true}
            className="lg:ml-2"
          />

          {/* Time Range Dropdown */}
          <CustomDropdown
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            leftIcon="/image/calendar.svg"
            className="lg:ml-2"
          />
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 mb-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            gameType={game.gameType}
            gameName={game.gameName}
            stakeAmount={game.stakeAmount}
            pickValue={game.pickValue}
            date={game.date}
            time={game.time}
          />
        ))}
      </div>

      {/* Show More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="
              group border border-white rounded-[2px_8px] py-2 px-4 h-10
              flex items-center justify-center gap-2
              font-oswald font-medium text-sm leading-[150%] uppercase text-white
              hover:bg-white hover:text-[#1b2235] transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            SHOW MORE
            <img src="/image/big-shevron.svg" alt="" className="w-6 h-6 group-hover:invert" />
          </button>
        </div>
      )}

      {/* Recent Games Table */}
      <RecentGamesTable />
    </div>
  );
};

export default StatusControls;