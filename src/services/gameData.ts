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
  },
  // Additional games for pagination testing
  {
    id: 16,
    gameType: 'coin-flip',
    gameName: 'Gamer_505',
    stakeAmount: 4200,
    pickValue: 'HEADS',
    date: '2025-09-05',
    time: '09:15:22'
  },
  {
    id: 17,
    gameType: 'coin-flip',
    gameName: 'Player_606',
    stakeAmount: 3800,
    pickValue: 'TAILS',
    date: '2025-09-05',
    time: '10:30:45'
  },
  {
    id: 18,
    gameType: 'slot-machine',
    gameName: 'Slot_008',
    stakeAmount: 1500,
    pickValue: 250,
    date: '2025-09-05',
    time: '11:45:18'
  },
  {
    id: 19,
    gameType: 'coin-flip',
    gameName: 'Gamer_707',
    stakeAmount: 3200,
    pickValue: 'HEADS',
    date: '2025-09-05',
    time: '13:20:33'
  },
  {
    id: 20,
    gameType: 'slot-machine',
    gameName: 'Slot_009',
    stakeAmount: 2800,
    pickValue: 190,
    date: '2025-09-05',
    time: '14:35:47'
  },
  {
    id: 21,
    gameType: 'coin-flip',
    gameName: 'Player_808',
    stakeAmount: 4500,
    pickValue: 'TAILS',
    date: '2025-09-06',
    time: '15:50:12'
  },
  {
    id: 22,
    gameType: 'coin-flip',
    gameName: 'Gamer_909',
    stakeAmount: 3700,
    pickValue: 'HEADS',
    date: '2025-09-06',
    time: '17:05:28'
  },
  {
    id: 23,
    gameType: 'slot-machine',
    gameName: 'Slot_010',
    stakeAmount: 2200,
    pickValue: 210,
    date: '2025-09-06',
    time: '18:20:42'
  },
  {
    id: 24,
    gameType: 'coin-flip',
    gameName: 'Player_1010',
    stakeAmount: 3900,
    pickValue: 'TAILS',
    date: '2025-09-06',
    time: '19:35:57'
  },
  {
    id: 25,
    gameType: 'coin-flip',
    gameName: 'Gamer_1111',
    stakeAmount: 4100,
    pickValue: 'HEADS',
    date: '2025-09-07',
    time: '20:50:22'
  },
  {
    id: 26,
    gameType: 'slot-machine',
    gameName: 'Slot_011',
    stakeAmount: 1800,
    pickValue: 230,
    date: '2025-09-07',
    time: '21:05:38'
  },
  {
    id: 27,
    gameType: 'coin-flip',
    gameName: 'Player_1212',
    stakeAmount: 3300,
    pickValue: 'TAILS',
    date: '2025-09-07',
    time: '22:20:53'
  },
  {
    id: 28,
    gameType: 'coin-flip',
    gameName: 'Gamer_1313',
    stakeAmount: 4600,
    pickValue: 'HEADS',
    date: '2025-09-08',
    time: '23:35:18'
  },
  {
    id: 29,
    gameType: 'slot-machine',
    gameName: 'Slot_012',
    stakeAmount: 2700,
    pickValue: 195,
    date: '2025-09-08',
    time: '00:50:33'
  },
  {
    id: 30,
    gameType: 'coin-flip',
    gameName: 'Player_1414',
    stakeAmount: 3400,
    pickValue: 'TAILS',
    date: '2025-09-08',
    time: '02:05:48'
  },
  {
    id: 31,
    gameType: 'coin-flip',
    gameName: 'Gamer_1515',
    stakeAmount: 4800,
    pickValue: 'HEADS',
    date: '2025-09-09',
    time: '03:20:03'
  },
  {
    id: 32,
    gameType: 'slot-machine',
    gameName: 'Slot_013',
    stakeAmount: 2100,
    pickValue: 220,
    date: '2025-09-09',
    time: '04:35:18'
  },
  {
    id: 33,
    gameType: 'coin-flip',
    gameName: 'Player_1616',
    stakeAmount: 3600,
    pickValue: 'TAILS',
    date: '2025-09-09',
    time: '05:50:33'
  },
  {
    id: 34,
    gameType: 'coin-flip',
    gameName: 'Gamer_1717',
    stakeAmount: 4900,
    pickValue: 'HEADS',
    date: '2025-09-10',
    time: '06:05:48'
  },
  {
    id: 35,
    gameType: 'slot-machine',
    gameName: 'Slot_014',
    stakeAmount: 2400,
    pickValue: 205,
    date: '2025-09-10',
    time: '07:20:03'
  },
  // Additional games for pagination testing (continuing from id 36)
  {
    id: 36,
    gameType: 'coin-flip',
    gameName: 'Player_1818',
    stakeAmount: 5200,
    pickValue: 'TAILS',
    date: '2025-09-10',
    time: '08:35:18'
  },
  {
    id: 37,
    gameType: 'slot-machine',
    gameName: 'Slot_015',
    stakeAmount: 1900,
    pickValue: 215,
    date: '2025-09-10',
    time: '09:50:33'
  },
  {
    id: 38,
    gameType: 'coin-flip',
    gameName: 'Gamer_1919',
    stakeAmount: 4300,
    pickValue: 'HEADS',
    date: '2025-09-11',
    time: '10:05:48'
  },
  {
    id: 39,
    gameType: 'coin-flip',
    gameName: 'Player_2020',
    stakeAmount: 3800,
    pickValue: 'TAILS',
    date: '2025-09-11',
    time: '11:20:03'
  },
  {
    id: 40,
    gameType: 'slot-machine',
    gameName: 'Slot_016',
    stakeAmount: 2600,
    pickValue: 195,
    date: '2025-09-11',
    time: '12:35:18'
  },
  {
    id: 41,
    gameType: 'coin-flip',
    gameName: 'Gamer_2121',
    stakeAmount: 4700,
    pickValue: 'HEADS',
    date: '2025-09-12',
    time: '13:50:33'
  },
  {
    id: 42,
    gameType: 'coin-flip',
    gameName: 'Player_2222',
    stakeAmount: 3400,
    pickValue: 'TAILS',
    date: '2025-09-12',
    time: '14:05:48'
  },
  {
    id: 43,
    gameType: 'slot-machine',
    gameName: 'Slot_017',
    stakeAmount: 2300,
    pickValue: 225,
    date: '2025-09-12',
    time: '15:20:03'
  },
  {
    id: 44,
    gameType: 'coin-flip',
    gameName: 'Gamer_2323',
    stakeAmount: 5100,
    pickValue: 'HEADS',
    date: '2025-09-13',
    time: '16:35:18'
  },
  {
    id: 45,
    gameType: 'coin-flip',
    gameName: 'Player_2424',
    stakeAmount: 3700,
    pickValue: 'TAILS',
    date: '2025-09-13',
    time: '17:50:33'
  },
  {
    id: 46,
    gameType: 'slot-machine',
    gameName: 'Slot_018',
    stakeAmount: 2900,
    pickValue: 205,
    date: '2025-09-13',
    time: '18:05:48'
  },
  {
    id: 47,
    gameType: 'coin-flip',
    gameName: 'Gamer_2525',
    stakeAmount: 5400,
    pickValue: 'HEADS',
    date: '2025-09-14',
    time: '19:20:03'
  },
  {
    id: 48,
    gameType: 'coin-flip',
    gameName: 'Player_2626',
    stakeAmount: 4000,
    pickValue: 'TAILS',
    date: '2025-09-14',
    time: '20:35:18'
  },
  {
    id: 49,
    gameType: 'slot-machine',
    gameName: 'Slot_019',
    stakeAmount: 2700,
    pickValue: 235,
    date: '2025-09-14',
    time: '21:50:33'
  },
  {
    id: 50,
    gameType: 'coin-flip',
    gameName: 'Gamer_2727',
    stakeAmount: 5600,
    pickValue: 'HEADS',
    date: '2025-09-15',
    time: '22:05:48'
  },
  {
    id: 51,
    gameType: 'coin-flip',
    gameName: 'Player_2828',
    stakeAmount: 4200,
    pickValue: 'TAILS',
    date: '2025-09-15',
    time: '23:20:03'
  },
  {
    id: 52,
    gameType: 'slot-machine',
    gameName: 'Slot_020',
    stakeAmount: 3100,
    pickValue: 195,
    date: '2025-09-15',
    time: '00:35:18'
  },
  {
    id: 53,
    gameType: 'coin-flip',
    gameName: 'Gamer_2929',
    stakeAmount: 5800,
    pickValue: 'HEADS',
    date: '2025-09-16',
    time: '01:50:33'
  },
  {
    id: 54,
    gameType: 'coin-flip',
    gameName: 'Player_3030',
    stakeAmount: 4400,
    pickValue: 'TAILS',
    date: '2025-09-16',
    time: '02:05:48'
  },
  {
    id: 55,
    gameType: 'slot-machine',
    gameName: 'Slot_021',
    stakeAmount: 3300,
    pickValue: 245,
    date: '2025-09-16',
    time: '03:20:03'
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
    time: '17:05:42',
    game: 'Coin Flip',
    challenge: 'Alice_567',
    stakeAmount: 2500,
    result: 'Win'
  },
  {
    id: 4,
    date: '2025-09-12',
    time: '19:45:30',
    game: 'Coin Flip',
    challenge: 'Bob_789',
    stakeAmount: 3500,
    result: 'Win'
  },
  {
    id: 5,
    date: '2025-09-11',
    time: '10:15:22',
    game: 'Coin Flip',
    challenge: 'Charlie_101',
    stakeAmount: 2200,
    result: 'Loss'
  },
  {
    id: 6,
    date: '2025-09-10',
    time: '12:45:18',
    game: 'Coin Flip',
    challenge: 'Diana_202',
    stakeAmount: 3100,
    result: 'Win'
  },
  {
    id: 7,
    date: '2025-09-10',
    time: '14:20:33',
    game: 'Coin Flip',
    challenge: 'Eve_303',
    stakeAmount: 1900,
    result: 'Loss'
  },
  // Additional player history for pagination testing
  {
    id: 11,
    date: '2025-09-09',
    time: '15:45:30',
    game: 'Coin Flip',
    challenge: 'Frank_404',
    stakeAmount: 2800,
    result: 'Win'
  },
  {
    id: 12,
    date: '2025-09-09',
    time: '16:20:18',
    game: 'Slot Machine',
    challenge: 'Slot_007',
    stakeAmount: 1100,
    result: 'Loss'
  },
  {
    id: 13,
    date: '2025-09-08',
    time: '17:05:42',
    game: 'Coin Flip',
    challenge: 'Eve_303',
    stakeAmount: 2200,
    result: 'Win'
  },
  {
    id: 14,
    date: '2025-09-08',
    time: '18:30:15',
    game: 'Slot Machine',
    challenge: 'Slot_006',
    stakeAmount: 800,
    result: 'Loss'
  },
  {
    id: 15,
    date: '2025-09-07',
    time: '19:45:30',
    game: 'Coin Flip',
    challenge: 'Diana_202',
    stakeAmount: 3500,
    result: 'Win'
  },
  {
    id: 16,
    date: '2025-09-07',
    time: '20:15:22',
    game: 'Coin Flip',
    challenge: 'Charlie_101',
    stakeAmount: 1800,
    result: 'Loss'
  },
  {
    id: 17,
    date: '2025-09-06',
    time: '21:30:45',
    game: 'Slot Machine',
    challenge: 'Slot_005',
    stakeAmount: 900,
    result: 'Win'
  },
  {
    id: 18,
    date: '2025-09-06',
    time: '22:45:18',
    game: 'Coin Flip',
    challenge: 'Bob_789',
    stakeAmount: 2500,
    result: 'Win'
  },
  {
    id: 19,
    date: '2025-09-05',
    time: '23:20:33',
    game: 'Slot Machine',
    challenge: 'Slot_004',
    stakeAmount: 1200,
    result: 'Loss'
  },
  {
    id: 20,
    date: '2025-09-05',
    time: '00:35:47',
    game: 'Coin Flip',
    challenge: 'Alice_567',
    stakeAmount: 3000,
    result: 'Win'
  },
  {
    id: 21,
    date: '2025-09-04',
    time: '01:50:12',
    game: 'Coin Flip',
    challenge: 'John_1234',
    stakeAmount: 1500,
    result: 'Loss'
  },
  {
    id: 22,
    date: '2025-09-04',
    time: '02:05:28',
    game: 'Slot Machine',
    challenge: 'Slot_003',
    stakeAmount: 1000,
    result: 'Win'
  },
  {
    id: 23,
    date: '2025-09-03',
    time: '03:20:42',
    game: 'Coin Flip',
    challenge: 'Duu__2411',
    stakeAmount: 2000,
    result: 'Win'
  },
  {
    id: 24,
    date: '2025-09-03',
    time: '04:35:57',
    game: 'Slot Machine',
    challenge: 'Slot_002',
    stakeAmount: 750,
    result: 'Loss'
  },
  {
    id: 25,
    date: '2025-09-02',
    time: '05:50:22',
    game: 'Coin Flip',
    challenge: 'Gamer_505',
    stakeAmount: 4200,
    result: 'Win'
  },
  // Additional player history for pagination testing (continuing from id 26)
  {
    id: 26,
    date: '2025-09-02',
    time: '06:05:28',
    game: 'Slot Machine',
    challenge: 'Slot_008',
    stakeAmount: 1500,
    result: 'Win'
  },
  {
    id: 27,
    date: '2025-09-02',
    time: '07:20:42',
    game: 'Coin Flip',
    challenge: 'Gamer_707',
    stakeAmount: 3200,
    result: 'Loss'
  },
  {
    id: 28,
    date: '2025-09-01',
    time: '08:35:57',
    game: 'Slot Machine',
    challenge: 'Slot_009',
    stakeAmount: 2800,
    result: 'Win'
  },
  {
    id: 29,
    date: '2025-09-01',
    time: '09:50:22',
    game: 'Coin Flip',
    challenge: 'Player_808',
    stakeAmount: 4500,
    result: 'Loss'
  },
  {
    id: 30,
    date: '2025-08-31',
    time: '10:05:38',
    game: 'Coin Flip',
    challenge: 'Gamer_909',
    stakeAmount: 3700,
    result: 'Win'
  },
  {
    id: 31,
    date: '2025-08-31',
    time: '11:20:53',
    game: 'Slot Machine',
    challenge: 'Slot_010',
    stakeAmount: 2200,
    result: 'Loss'
  },
  {
    id: 32,
    date: '2025-08-30',
    time: '12:35:18',
    game: 'Coin Flip',
    challenge: 'Player_1010',
    stakeAmount: 3900,
    result: 'Win'
  },
  {
    id: 33,
    date: '2025-08-30',
    time: '13:50:33',
    game: 'Coin Flip',
    challenge: 'Gamer_1111',
    stakeAmount: 4100,
    result: 'Loss'
  },
  {
    id: 34,
    date: '2025-08-29',
    time: '14:05:48',
    game: 'Slot Machine',
    challenge: 'Slot_011',
    stakeAmount: 1800,
    result: 'Win'
  },
  {
    id: 35,
    date: '2025-08-29',
    time: '15:20:03',
    game: 'Coin Flip',
    challenge: 'Player_1212',
    stakeAmount: 3300,
    result: 'Loss'
  },
  {
    id: 36,
    date: '2025-08-28',
    time: '16:35:18',
    game: 'Coin Flip',
    challenge: 'Gamer_1313',
    stakeAmount: 4600,
    result: 'Win'
  },
  {
    id: 37,
    date: '2025-08-28',
    time: '17:50:33',
    game: 'Slot Machine',
    challenge: 'Slot_012',
    stakeAmount: 2700,
    result: 'Loss'
  },
  {
    id: 38,
    date: '2025-08-27',
    time: '18:05:48',
    game: 'Coin Flip',
    challenge: 'Player_1414',
    stakeAmount: 3400,
    result: 'Win'
  },
  {
    id: 39,
    date: '2025-08-27',
    time: '19:20:03',
    game: 'Coin Flip',
    challenge: 'Gamer_1515',
    stakeAmount: 4800,
    result: 'Loss'
  },
  {
    id: 40,
    date: '2025-08-26',
    time: '20:35:18',
    game: 'Slot Machine',
    challenge: 'Slot_013',
    stakeAmount: 2100,
    result: 'Win'
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