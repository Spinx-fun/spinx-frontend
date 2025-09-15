export interface GameData {
  id: number;
  gameType: 'coin-flip' | 'slot-machine';
  gameName: string;
  stakeAmount: number;
  pickValue: string | number;
  date: string;
  time: string;
}

// Sample game data with 15 items for demonstration
export const sampleGames: GameData[] = [
  {
    id: 1,
    gameType: 'coin-flip',
    gameName: 'Duu__2411',
    stakeAmount: 2000,
    pickValue: 'HEADS',
    date: '2025-09-03',
    time: '14:30:34'
  },
  {
    id: 2,
    gameType: 'coin-flip',
    gameName: 'John_1234',
    stakeAmount: 1500,
    pickValue: 'TAILS',
    date: '2025-09-03',
    time: '15:45:22'
  },
  {
    id: 3,
    gameType: 'slot-machine',
    gameName: 'Slot_001',
    stakeAmount: 500,
    pickValue: 100,
    date: '2025-09-03',
    time: '16:20:18'
  },
  {
    id: 4,
    gameType: 'slot-machine',
    gameName: 'Slot_002',
    stakeAmount: 750,
    pickValue: 200,
    date: '2025-09-03',
    time: '17:05:42'
  },
  {
    id: 5,
    gameType: 'coin-flip',
    gameName: 'Alice_567',
    stakeAmount: 3000,
    pickValue: 'HEADS',
    date: '2025-09-03',
    time: '18:30:15'
  },
  {
    id: 6,
    gameType: 'slot-machine',
    gameName: 'Slot_003',
    stakeAmount: 1000,
    pickValue: 150,
    date: '2025-09-03',
    time: '19:45:30'
  },
  {
    id: 7,
    gameType: 'coin-flip',
    gameName: 'Bob_789',
    stakeAmount: 2500,
    pickValue: 'TAILS',
    date: '2025-09-04',
    time: '10:15:22'
  },
  {
    id: 8,
    gameType: 'slot-machine',
    gameName: 'Slot_004',
    stakeAmount: 1200,
    pickValue: 180,
    date: '2025-09-04',
    time: '11:30:45'
  },
  {
    id: 9,
    gameType: 'coin-flip',
    gameName: 'Charlie_101',
    stakeAmount: 1800,
    pickValue: 'HEADS',
    date: '2025-09-04',
    time: '12:45:18'
  },
  {
    id: 10,
    gameType: 'slot-machine',
    gameName: 'Slot_005',
    stakeAmount: 900,
    pickValue: 220,
    date: '2025-09-04',
    time: '14:20:33'
  },
  {
    id: 11,
    gameType: 'coin-flip',
    gameName: 'Diana_202',
    stakeAmount: 3500,
    pickValue: 'TAILS',
    date: '2025-09-04',
    time: '15:35:47'
  },
  {
    id: 12,
    gameType: 'slot-machine',
    gameName: 'Slot_006',
    stakeAmount: 800,
    pickValue: 190,
    date: '2025-09-04',
    time: '16:50:12'
  },
  {
    id: 13,
    gameType: 'coin-flip',
    gameName: 'Eve_303',
    stakeAmount: 2200,
    pickValue: 'HEADS',
    date: '2025-09-04',
    time: '18:05:28'
  },
  {
    id: 14,
    gameType: 'slot-machine',
    gameName: 'Slot_007',
    stakeAmount: 1100,
    pickValue: 210,
    date: '2025-09-04',
    time: '19:20:42'
  },
  {
    id: 15,
    gameType: 'coin-flip',
    gameName: 'Frank_404',
    stakeAmount: 2800,
    pickValue: 'TAILS',
    date: '2025-09-04',
    time: '20:35:57'
  }
];

// Simulate API call to fetch games with pagination
export const fetchGames = async (page: number, pageSize: number = 6): Promise<GameData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return sampleGames.slice(startIndex, endIndex);
};

// Check if there are more games to load
export const hasMoreGames = (currentPage: number, pageSize: number = 6): boolean => {
  const startIndex = currentPage * pageSize;
  return startIndex < sampleGames.length;
};

// Active Challenge interface
export interface ActiveChallenge {
  id: number;
  gameType: 'coin-flip' | 'slot-machine';
  stakeAmount: number;
  pickValue: string | number;
  date: string;
  time: string;
  status: 'active' | 'completed' | 'withdrawn';
}

// Sample active challenges data
export const sampleActiveChallenges: ActiveChallenge[] = [
  {
    id: 1,
    gameType: 'coin-flip',
    stakeAmount: 2000,
    pickValue: 'HEADS',
    date: '2025-09-14',
    time: '14:30:34',
    status: 'active'
  },
  {
    id: 2,
    gameType: 'coin-flip',
    stakeAmount: 1500,
    pickValue: 'TAILS',
    date: '2025-09-14',
    time: '15:45:22',
    status: 'active'
  },
  {
    id: 3,
    gameType: 'slot-machine',
    stakeAmount: 3000,
    pickValue: 777,
    date: '2025-09-14',
    time: '16:20:18',
    status: 'active'
  }
];

// Player History interface
export interface PlayerHistory {
  id: number;
  date: string;
  time: string;
  game: 'Coin Flip' | 'Slot Machine';
  challenge: string;
  stakeAmount: number;
  result: 'Win' | 'Loss';
}

// Sample player history data
export const samplePlayerHistory: PlayerHistory[] = [
  {
    id: 1,
    date: '2025-09-14',
    time: '14:30:34',
    game: 'Coin Flip',
    challenge: 'Duu__2411',
    stakeAmount: 2000,
    result: 'Win'
  },
  {
    id: 2,
    date: '2025-09-14',
    time: '15:45:22',
    game: 'Coin Flip',
    challenge: 'John_1234',
    stakeAmount: 1500,
    result: 'Loss'
  },
  {
    id: 3,
    date: '2025-09-13',
    time: '16:20:18',
    game: 'Slot Machine',
    challenge: 'Slot_001',
    stakeAmount: 3000,
    result: 'Win'
  },
  {
    id: 4,
    date: '2025-09-13',
    time: '17:05:42',
    game: 'Coin Flip',
    challenge: 'Alice_567',
    stakeAmount: 2500,
    result: 'Win'
  },
  {
    id: 5,
    date: '2025-09-12',
    time: '18:30:15',
    game: 'Slot Machine',
    challenge: 'Slot_002',
    stakeAmount: 1800,
    result: 'Loss'
  },
  {
    id: 6,
    date: '2025-09-12',
    time: '19:45:30',
    game: 'Coin Flip',
    challenge: 'Bob_789',
    stakeAmount: 3500,
    result: 'Win'
  },
  {
    id: 7,
    date: '2025-09-11',
    time: '10:15:22',
    game: 'Coin Flip',
    challenge: 'Charlie_101',
    stakeAmount: 2200,
    result: 'Loss'
  },
  {
    id: 8,
    date: '2025-09-11',
    time: '11:30:45',
    game: 'Slot Machine',
    challenge: 'Slot_003',
    stakeAmount: 2800,
    result: 'Win'
  },
  {
    id: 9,
    date: '2025-09-10',
    time: '12:45:18',
    game: 'Coin Flip',
    challenge: 'Diana_202',
    stakeAmount: 3100,
    result: 'Win'
  },
  {
    id: 10,
    date: '2025-09-10',
    time: '14:20:33',
    game: 'Coin Flip',
    challenge: 'Eve_303',
    stakeAmount: 1900,
    result: 'Loss'
  }
];

// Fetch active challenges for a user
export const fetchActiveChallenges = async (walletAddress: string): Promise<ActiveChallenge[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return sampleActiveChallenges;
};

// Fetch player history for a user
export const fetchPlayerHistory = async (walletAddress: string): Promise<PlayerHistory[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return samplePlayerHistory;
};