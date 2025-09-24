import React, { useState, useEffect } from "react";
import CustomDropdown, { DropdownOption } from "./CustomDropdown";
import TokenRangeDropdown from "./TokenRangeDropdown";
import GameCard from "./GameCard";
import RecentGamesTable from "./RecentGamesTable";
import Header from "./Header";
import { formatTimeAgo } from "../utils/timeFormatter";
import { fetchGamesPaginated, hasMoreGames, getTotalGamesCount } from "../services/api";
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
  const [activeBy, setActiveBy] = useState("active");
  const [timeRange, setTimeRange] = useState("last-30-days");
  const [games, setGames] = useState<GameData[]>([]);
  const [allGames, setAllGames] = useState<GameData[]>([]);
  const [displayPage, setDisplayPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenRange, setTokenRange] = useState({ min: 0, max: 5000 });
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [displayGames, setDisplayGames] = useState<GameData[]>([]);
  const DISPLAY_PAGE_SIZE = 6;
  const sortOptions: DropdownOption[] = [
    { value: "newest-first", label: "Newest First" },
    { value: "oldest-first", label: "Oldest First" },
    { value: "running-longest", label: "Running Longest" },
    { value: "highest-tokens", label: "Highest Tokens" },
    { value: "lowest-tokens", label: "Lowest Tokens" },
  ];

  const activeOptions: DropdownOption[] = [
    { value: "active", label: "Active List" },
    { value: "completed", label: "Completed List" },
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
      return gameDate.getTime() >= cutoffDate.getTime(); // Include games from the cutoff date onwards
    });
  };

  // Utility function to filter games by token range
  const filterGamesByTokenRange = (games: GameData[], min: number, max: number): GameData[] => {
    return games.filter(game =>
      game.stakeAmount >= min && game.stakeAmount <= max
    );
  };

  const sortByActivateGames = (games: GameData[], sortByActivate: string): GameData[] => {
    switch (sortByActivate) {
      case "active":
        return games.filter(game =>
          game.joinerPlayer === null
        );
      case "completed":
        return games.filter(game =>
          game.joinerPlayer !== null
        );
      default:
        return games.filter(game =>
          game.joinerPlayer === null
        );;
    }
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
        return sortedGames.sort((a, b) => a.id - b.id);
      case "newest-first":
        return sortedGames.sort((a, b) => b.id - a.id);
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
    filteredGames = sortByActivateGames(filteredGames, activeBy);
    return filteredGames;
  };

  // Function to get paginated display of filtered games (accumulates all pages)
  const getDisplayGames = (filteredGames: GameData[], page: number): GameData[] => {
    const endIndex = page * DISPLAY_PAGE_SIZE;
    return filteredGames.slice(0, endIndex);
  };

  const handleTokenRangeApply = (min: number, max: number) => {
    setTokenRange({ min, max });
  };

  // Function to load all games for complete sorting
  const loadAllGames = async () => {
    setIsLoadingAll(true);
    try {
      const pageSize = 50; // Load in batches to avoid overwhelming the system
      let allLoadedGames: GameData[] = [];
      let currentLoadPage = 1;
      let hasMoreData = true;

      while (hasMoreData) {
        const batchGames = await fetchGamesPaginated(currentLoadPage, pageSize);
        allLoadedGames = [...allLoadedGames, ...batchGames];

        if (batchGames.length < pageSize) {
          hasMoreData = false;
        } else {
          currentLoadPage++;
        }

        // Small delay to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setAllGames(allLoadedGames);
      setHasMore(false); // No more loading needed since we have all data
      setIsFirstLoading(false); // Set first loading to false after initial load
    } catch (error) {
      console.error("Error loading all games:", error);
    } finally {
      setIsLoadingAll(false);
      setIsFirstLoading(false);
    }
  };

  const handleRefresh = () => {
    setLastUpdated(Math.floor(Date.now() / 1000));
    // Load all games on refresh for complete sorting
    loadAllGames();
  };

  const handleLoadMore = () => {
    // Increment display page to show more games
    setDisplayPage(prevPage => prevPage + 1);
  };

  const handleResetPagination = () => {
    // Reset to first page when filters change
    setDisplayPage(1);
  };

  // Load all games on component mount for complete sorting
  useEffect(() => {
    loadAllGames();
  }, [lastUpdated]);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Effect to apply filters when any filter criteria changes
  useEffect(() => {
    if (allGames.length > 0) {
      const filteredGames = applyFiltersAndSorting(allGames);
      setGames(filteredGames);
      // Reset pagination when filters change
      handleResetPagination();
    }
  }, [sortBy, timeRange, tokenRange, searchQuery, allGames, activeBy]);

  // Effect to update display games when filtered games or display page changes
  useEffect(() => {
    if (games.length > 0) {
      const paginatedGames = getDisplayGames(games, displayPage);
      setDisplayGames(paginatedGames);
    } else {
      setDisplayGames([])
    }
  }, [games, displayPage]);

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
            Live
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
            options={activeOptions}
            value={activeBy}
            onChange={setActiveBy}
            className="lg:ml-2"
          />

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
        {(isFirstLoading || isLoadingAll) &&
          <BeatLoader
            color={'#fff'}
            loading={isFirstLoading || isLoadingAll}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 my-6">
        {displayGames.map((game) => (
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
            random={game.random}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-4 my-6">
        {displayGames.length == 0 &&
          <span className="font-oswald font-bold text-xl leading-[160%] text-white m-auto">No Datas</span>}
      </div>

      {/* Show More Button - Display when there are more games to show */}
      {games.length > displayGames.length && !isFirstLoading && !isLoadingAll && (
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
