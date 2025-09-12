import React, { useState } from 'react';
import CustomDropdown, { DropdownOption } from './CustomDropdown';
import GameCard from './GameCard';
import { formatTimeAgo } from '../utils/timeFormatter';

const StatusControls: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Math.floor(Date.now() / 1000) - 120); // 2 minutes ago
  const [sortBy, setSortBy] = useState('running-longest');
  const [timeRange, setTimeRange] = useState('last-30-days');

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

  // Sample game data for demonstration
  const sampleGames = [
    {
      id: 1,
      gameType: 'coin-flip' as const,
      gameName: 'Duu__2411',
      stakeAmount: 2000,
      pickValue: 'HEADS',
      date: '2025-09-03',
      time: '14:30:34'
    },
    {
      id: 2,
      gameType: 'coin-flip' as const,
      gameName: 'John_1234',
      stakeAmount: 1500,
      pickValue: 'TAILS',
      date: '2025-09-03',
      time: '15:45:22'
    },
    {
      id: 3,
      gameType: 'slot-machine' as const,
      gameName: 'Slot_001',
      stakeAmount: 500,
      pickValue: 100,
      date: '2025-09-03',
      time: '16:20:18'
    },
    {
      id: 4,
      gameType: 'slot-machine' as const,
      gameName: 'Slot_002',
      stakeAmount: 750,
      pickValue: 200,
      date: '2025-09-03',
      time: '17:05:42'
    },
    {
      id: 5,
      gameType: 'coin-flip' as const,
      gameName: 'Alice_567',
      stakeAmount: 3000,
      pickValue: 'HEADS',
      date: '2025-09-03',
      time: '18:30:15'
    },
    {
      id: 6,
      gameType: 'slot-machine' as const,
      gameName: 'Slot_003',
      stakeAmount: 1000,
      pickValue: 150,
      date: '2025-09-03',
      time: '19:45:30'
    }
  ];

  return (
    <div className="w-full">
      {/* Controls Row */}
      <div className="flex items-center justify-between w-full mb-6">
        {/* Status Section - Left Aligned */}
        <div className="flex items-center gap-3">
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
        <div className="flex items-center gap-2">
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
            className="ml-2"
          />

          {/* Token Range Dropdown (disabled for now) */}
          <CustomDropdown
            options={tokenRangeOptions}
            value="all"
            onChange={() => {}}
            disabled={true}
            className="ml-2"
          />

          {/* Time Range Dropdown */}
          <CustomDropdown
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            leftIcon="/image/calendar.svg"
            className="ml-2"
          />
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        {sampleGames.map((game) => (
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
    </div>
  );
};

export default StatusControls;