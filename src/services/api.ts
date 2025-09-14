import { GameData } from './gameData';

// Extended sample game data with more than 20 coin flip games
const sampleCoinFlipGames: GameData[] = [
  {
    id: 1,
    gameType: 'coin-flip',
    gameName: 'Duu__2411',
    stakeAmount: 2000,
    pickValue: 'HEADS',
    date: '2025-09-07',
    time: '14:30:34'
  },
  {
    id: 2,
    gameType: 'coin-flip',
    gameName: 'John_1234',
    stakeAmount: 1500,
    pickValue: 'TAILS',
    date: '2025-09-07',
    time: '15:45:22'
  },
  {
    id: 3,
    gameType: 'coin-flip',
    gameName: 'Alice_567',
    stakeAmount: 3000,
    pickValue: 'HEADS',
    date: '2025-09-07',
    time: '18:30:15'
  },
  {
    id: 4,
    gameType: 'coin-flip',
    gameName: 'Bob_789',
    stakeAmount: 2500,
    pickValue: 'TAILS',
    date: '2025-09-08',
    time: '10:15:22'
  },
  {
    id: 5,
    gameType: 'coin-flip',
    gameName: 'Charlie_101',
    stakeAmount: 1800,
    pickValue: 'HEADS',
    date: '2025-09-08',
    time: '12:45:18'
  },
  {
    id: 6,
    gameType: 'coin-flip',
    gameName: 'Diana_202',
    stakeAmount: 3500,
    pickValue: 'TAILS',
    date: '2025-09-08',
    time: '15:35:47'
  },
  {
    id: 7,
    gameType: 'coin-flip',
    gameName: 'Eve_303',
    stakeAmount: 2200,
    pickValue: 'HEADS',
    date: '2025-09-08',
    time: '18:05:28'
  },
  {
    id: 8,
    gameType: 'coin-flip',
    gameName: 'Frank_404',
    stakeAmount: 2800,
    pickValue: 'TAILS',
    date: '2025-09-08',
    time: '20:35:57'
  },
  {
    id: 9,
    gameType: 'coin-flip',
    gameName: 'Grace_505',
    stakeAmount: 4200,
    pickValue: 'HEADS',
    date: '2025-09-09',
    time: '09:20:11'
  },
  {
    id: 10,
    gameType: 'coin-flip',
    gameName: 'Henry_606',
    stakeAmount: 1900,
    pickValue: 'TAILS',
    date: '2025-09-09',
    time: '11:45:33'
  },
  {
    id: 11,
    gameType: 'coin-flip',
    gameName: 'Ivy_707',
    stakeAmount: 3100,
    pickValue: 'HEADS',
    date: '2025-09-09',
    time: '14:20:55'
  },
  {
    id: 12,
    gameType: 'coin-flip',
    gameName: 'Jack_808',
    stakeAmount: 2700,
    pickValue: 'TAILS',
    date: '2025-09-09',
    time: '16:45:17'
  },
  {
    id: 13,
    gameType: 'coin-flip',
    gameName: 'Kate_909',
    stakeAmount: 3300,
    pickValue: 'HEADS',
    date: '2025-09-09',
    time: '19:10:39'
  },
  {
    id: 14,
    gameType: 'coin-flip',
    gameName: 'Leo_1010',
    stakeAmount: 2100,
    pickValue: 'TAILS',
    date: '2025-09-10',
    time: '08:15:22'
  },
  {
    id: 15,
    gameType: 'coin-flip',
    gameName: 'Mia_1111',
    stakeAmount: 2900,
    pickValue: 'HEADS',
    date: '2025-09-10',
    time: '10:40:44'
  },
  {
    id: 16,
    gameType: 'coin-flip',
    gameName: 'Noah_1212',
    stakeAmount: 3700,
    pickValue: 'TAILS',
    date: '2025-09-10',
    time: '13:05:06'
  },
  {
    id: 17,
    gameType: 'coin-flip',
    gameName: 'Olivia_1313',
    stakeAmount: 2400,
    pickValue: 'HEADS',
    date: '2025-09-10',
    time: '15:30:28'
  },
  {
    id: 18,
    gameType: 'coin-flip',
    gameName: 'Paul_1414',
    stakeAmount: 3200,
    pickValue: 'TAILS',
    date: '2025-09-10',
    time: '17:55:50'
  },
  {
    id: 19,
    gameType: 'coin-flip',
    gameName: 'Quinn_1515',
    stakeAmount: 2600,
    pickValue: 'HEADS',
    date: '2025-09-10',
    time: '20:20:12'
  },
  {
    id: 20,
    gameType: 'coin-flip',
    gameName: 'Ryan_1616',
    stakeAmount: 3800,
    pickValue: 'TAILS',
    date: '2025-09-11',
    time: '09:45:34'
  },
  {
    id: 21,
    gameType: 'coin-flip',
    gameName: 'Sara_1717',
    stakeAmount: 2300,
    pickValue: 'HEADS',
    date: '2025-09-11',
    time: '12:10:56'
  },
  {
    id: 22,
    gameType: 'coin-flip',
    gameName: 'Tom_1818',
    stakeAmount: 3400,
    pickValue: 'TAILS',
    date: '2025-09-11',
    time: '14:35:18'
  },
  {
    id: 23,
    gameType: 'coin-flip',
    gameName: 'Uma_1919',
    stakeAmount: 4000,
    pickValue: 'HEADS',
    date: '2025-09-11',
    time: '17:00:40'
  },
  {
    id: 24,
    gameType: 'coin-flip',
    gameName: 'Victor_2020',
    stakeAmount: 2200,
    pickValue: 'TAILS',
    date: '2025-09-11',
    time: '19:25:02'
  }
];

// Mock API calls
export const fetchAllGames = async (): Promise<GameData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return sampleCoinFlipGames;
};

export const fetchGamesPaginated = async (page: number, pageSize: number = 6): Promise<GameData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return sampleCoinFlipGames.slice(startIndex, endIndex);
};

export const fetchRecentGames = async (page: number, pageSize: number = 10): Promise<GameData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return sampleCoinFlipGames.slice(startIndex, endIndex);
};

export const hasMoreGames = (currentPage: number, pageSize: number = 6): boolean => {
  const startIndex = currentPage * pageSize;
  return startIndex < sampleCoinFlipGames.length;
};

export const getTotalGamesCount = (): number => {
  return sampleCoinFlipGames.length;
};