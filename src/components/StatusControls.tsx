import React, { useState, useEffect } from "react";
import CustomDropdown, { DropdownOption } from "./CustomDropdown";
import TokenRangeDropdown from "./TokenRangeDropdown";
import GameCard from "./GameCard";
import RecentGamesTable from "./RecentGamesTable";
import Header from "./Header";
import { formatTimeAgo } from "../utils/timeFormatter";
import { fetchGamesPaginated, hasMoreGames } from "../services/api";
import { GameData } from "../services/gameData";
import Footer from "../components/Footer";
import BeatLoader from 'react-spinners/BeatLoader';
import { parseISO, isAfter, subDays, startOfDay } from "date-fns";

const StatusControls: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(
    Math.floor(Date.now() / 1000) - 120
  ); // 2 minutes ago
  const [sortBy, setSortBy] = useState("newest-first");
  const [timeRange, setTimeRange] = useState("last-30-days");
  const [games, setGames] = useState<GameData[]>([]);
  const [allGames, setAllGames] = useState<GameData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenRange, setTokenRange] = useState({ min: 0, max: 5000 });

  const sortOptions: DropdownOption[] = [
    { value: "newest-first", label: "Newest First" },
    { value: "oldest-first", label: "Oldest First" },
    { value: "highest-tokens", label: "Highest Tokens" },
    { value: "lowest-tokens", label: "Lowest Tokens" },
  ];

  const timeRangeOptions: DropdownOption[] = [
    { value: "today", label: "Today", leftIcon: "/image/calendar.svg" },
    {
      value: "last-3-days",
      label: "Last 3 Days",
      leftIcon: "/image/calendar.svg",
    },
    {
      value: "last-7-days",
      label: "Last 7 Days",
      leftIcon: "/image/calendar.svg",
    },
    {
      value: "last-14-days",
      label: "Last 14 Days",
      leftIcon: "/image/calendar.svg",
    },
    {
      value: "last-30-days",
      label: "Last 30 Days",
      leftIcon: "/image/calendar.svg",
    },
    {
      value: "last-6-months",
      label: "Last 6 Months",
      leftIcon: "/image/calendar.svg",
    },
    { value: "all-time", label: "All Time", leftIcon: "/image/calendar.svg" },
  ];

  const tokenRangeOptions: DropdownOption[] = [
    { value: "all", label: "Token Range" },
  ];

  // Utility function to filter games by time range
  const filterGamesByTimeRange = (games: GameData[], range: string): GameData[] => {
    const now = new Date();
    let cutoffDate: Date;

    switch (range) {
      case "today":
        cutoffDate = startOfDay(now);
        break;
      case "last-3-days":
        cutoffDate = subDays(now, 3);
        break;
      case "last-7-days":
        cutoffDate = subDays(now, 7);
        break;
      case "last-14-days":
        cutoffDate = subDays(now, 14);
        break;
      case "last-30-days":
        cutoffDate = subDays(now, 30);
        break;
      case "last-6-months":
        cutoffDate = subDays(now, 180);
        break;
      case "all-time":
        return games; // No filtering needed
      default:
        return games;
    }

    return games.filter(game => {
      const gameDate = parseISO(game.date);
      return isAfter(gameDate, cutoffDate);
    });
  };

  // Utility function to filter games by token range
  const filterGamesByTokenRange = (games: GameData[], min: number, max: number): GameData[] => {
    return games.filter(game =>
      game.stakeAmount >= min && game.stakeAmount <= max
    );
  };

  // Utility function to sort games
  const sortGames = (games: GameData[], sortBy: string): GameData[] => {
    const sortedGames = [...games];
    
    switch (sortBy) {
      case "running-longest":
        // Sort by date (oldest first) to show games that have been running longest
        return sortedGames.sort((a, b) => {
          const dateA = parseISO(a.date);
          const dateB = parseISO(b.date);
          return dateA.getTime() - dateB.getTime();
        });
      case "oldest-first":
        return sortedGames.sort((a, b) => b.id - a.id);
      case "newest-first":
        return sortedGames.sort((a, b) => a.id - b.id);
      case "highest-tokens":
        return sortedGames.sort((a, b) => b.stakeAmount - a.stakeAmount);
      case "lowest-tokens":
        return sortedGames.sort((a, b) => a.stakeAmount - b.stakeAmount);
      default:
        return sortedGames;
    }
  };

  // Main filtering and sorting function
  const applyFiltersAndSorting = (gamesToFilter: GameData[]): GameData[] => {
    let filteredGames = [...gamesToFilter];
    
    // Apply time range filter
    filteredGames = filterGamesByTimeRange(filteredGames, timeRange);
    
    // Apply token range filter
    filteredGames = filterGamesByTokenRange(filteredGames, tokenRange.min, tokenRange.max);
    
    // Apply search filter
    if (searchQuery) {
      filteredGames = filteredGames.filter(game =>
        game.gameName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    filteredGames = sortGames(filteredGames, sortBy);
    
    return filteredGames;
  };

  const handleTokenRangeApply = (min: number, max: number) => {
    setTokenRange({ min, max });
  };

  const handleRefresh = () => {
    setLastUpdated(Math.floor(Date.now() / 1000));
    // Add actual refresh logic here later
    console.log("Refresh clicked");
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const newGames = await fetchGamesPaginated(nextPage);
      
      // Add new games to allGames
      const updatedAllGames = [...allGames, ...newGames];
      setAllGames(updatedAllGames);
      
      // Apply filters to the combined games
      const filteredGames = applyFiltersAndSorting(updatedAllGames);
      setGames(filteredGames);
      
      setCurrentPage(nextPage);
      setHasMore(await hasMoreGames(nextPage));
    } catch (error) {
      console.error("Error loading more games:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial games on component mount
  useEffect(() => {
    const loadInitialGames = async () => {
      setIsFirstLoading(true);
      try {
        const initialGames = await fetchGamesPaginated(1);
        setAllGames(initialGames);
        // Filters will be applied by the other useEffect
      } catch (error) {
        console.error("Error loading initial games:", error);
      } finally {
        setIsFirstLoading(false);
      }
    };

    loadInitialGames();
  }, [lastUpdated]);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Effect to apply filters when any filter criteria changes
  useEffect(() => {
    if (allGames.length > 0) {
      const filteredGames = applyFiltersAndSorting(allGames);
      setGames(filteredGames);
    }
  }, [sortBy, timeRange, tokenRange, searchQuery, allGames]);

  return (
    <div className="w-full">
      {/* Header with Search and User Info */}
      <Header
        showSearch={true}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search for Challenge"
      />

      {/* Controls Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-4 lg:gap-0">
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
            className="border border-opacity-50 border-[#90A2B9] rounded-md p-2 w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
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

          {/* Token Range Dropdown */}
          <TokenRangeDropdown
            onApply={handleTokenRangeApply}
            currentGames={allGames}
            timeRange={timeRange}
            sortBy={sortBy}
            searchQuery={searchQuery}
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
      <div className="flex gap-4 my-6 m-auto mt-6 w-max">
        {isFirstLoading == true &&
          <BeatLoader
            color={'#fff'}
            loading={isFirstLoading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 my-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            poolId={game.id}
            gameType={game.gameType}
            gameName={game.gameName}
            stakeAmount={game.stakeAmount}
            pickValue={game.pickValue}
            date={game.date}
            time={game.time}
            joinerPlayer={game.joinerPlayer}
            creatorAta={game.creatorAta}
            winner={game.winner}
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
            <img
              src="/image/big-shevron.svg"
              alt=""
              className="w-6 h-6 group-hover:invert"
            />
          </button>
        </div>
      )}

      {/* Recent Games Table */}
      <RecentGamesTable />
      <Footer />
    </div>
  );
};

export default StatusControls;
