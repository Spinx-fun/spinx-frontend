import { GameData, sampleGames } from './gameData';

// Mock API calls
export const fetchAllGames = async (): Promise<GameData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Filter to only coin-flip games for consistency
  return sampleGames.filter((game: GameData) => game.gameType === 'coin-flip');
};

export const fetchGamesPaginated = async (page: number, pageSize: number = 6): Promise<GameData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  // Filter to only coin-flip games for consistency
  const coinFlipGames = sampleGames.filter((game: GameData) => game.gameType === 'coin-flip');
  return coinFlipGames.slice(startIndex, endIndex);
};

export const fetchRecentGames = async (page: number, pageSize: number = 10): Promise<GameData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  // Filter to only coin-flip games for consistency
  const coinFlipGames = sampleGames.filter((game: GameData) => game.gameType === 'coin-flip');
  return coinFlipGames.slice(startIndex, endIndex);
};

export const hasMoreGames = (currentPage: number, pageSize: number = 6): boolean => {
  const startIndex = currentPage * pageSize;
  const coinFlipGames = sampleGames.filter((game: GameData) => game.gameType === 'coin-flip');
  return startIndex < coinFlipGames.length;
};

export const getTotalGamesCount = (): number => {
  const coinFlipGames = sampleGames.filter((game: GameData) => game.gameType === 'coin-flip');
  return coinFlipGames.length;
};

// User data API functions
export interface UserData {
  account: string;
  balance: number;
  trend: number;
}

export const fetchUserData = async (): Promise<UserData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    account: 'DD320512345678',
    balance: 42.69,
    trend: -2.5
  };
};

export const fetchUserBalance = async (): Promise<number> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return 42.69;
};

export const fetchUserTrend = async (): Promise<number> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return -2.5;
};

// Token range API functions
export interface TokenRange {
  min: number;
  max: number;
}

export const fetchMaxStake = async (): Promise<number> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Calculate max stake from sample games
  const coinFlipGames = sampleGames.filter((game: GameData) => game.gameType === 'coin-flip');
  const maxStake = Math.max(...coinFlipGames.map(game => game.stakeAmount), 0);
  
  return maxStake > 0 ? maxStake : 5000; // Default to 5000 if no games
};

export const fetchTokenRangeData = async (): Promise<TokenRange> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const coinFlipGames = sampleGames.filter((game: GameData) => game.gameType === 'coin-flip');
  const stakes = coinFlipGames.map(game => game.stakeAmount);
  
  return {
    min: Math.min(...stakes, 0),
    max: Math.max(...stakes, 5000)
  };
};