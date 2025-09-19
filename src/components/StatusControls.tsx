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

const StatusControls: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(
    Math.floor(Date.now() / 1000) - 120
  ); // 2 minutes ago
  const [sortBy, setSortBy] = useState("running-longest");
  const [timeRange, setTimeRange] = useState("last-30-days");
  const [games, setGames] = useState<GameData[]>([]);
  const [allGames, setAllGames] = useState<GameData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const sortOptions: DropdownOption[] = [
    { value: "running-longest", label: "Running Longest" },
    { value: "oldest-first", label: "Oldest First" },
    { value: "newest-first", label: "Newest First" },
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
      const filteredNewGames = newGames.filter((game) =>
        game.gameName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setGames((prevGames) => [...prevGames, ...filteredNewGames]);
      setAllGames((prevGames) => [...prevGames, ...newGames]);
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
        setGames(initialGames);
        setAllGames(initialGames);
        setHasMore(await hasMoreGames(1));
      } catch (error) {
        console.error("Error loading initial games:", error);
      } finally {
        setIsFirstLoading(false);
      }
    };

    loadInitialGames();
  }, []);
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    if (query === "") {
      // Reset to original paginated games
      const loadFilteredGames = async () => {
        const initialGames = await fetchGamesPaginated(1);
        setGames(initialGames);
      };
      loadFilteredGames();
    } else {
      // Filter all loaded games
      const filtered = allGames.filter((game) =>
        game.gameName.toLowerCase().includes(query.toLowerCase())
      );
      setGames(filtered);
    }
  };

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
            onApply={(min, max) => {
              console.log("Applying token range filter:", { min, max });
              // Filter logic will be implemented here
            }}
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
