import { getAllChallenges } from "../context/solana/transaction";
import { assets } from '../utils/constants'
import { format } from 'date-fns';

export interface GameData {
  id: number;
  gameType: string;
  gameName: any;
  stakeAmount: number;
  pickValue: string;
  date: string;
  time: string;
  joinerPlayer: string;
  creatorAta: string;
}


// Simulate API call to fetch games with pagination
export const fetchGames = async (page: number, pageSize: number = 6): Promise<GameData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  let data = await fetchAllChallenges();
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return data.slice(startIndex, endIndex);
};

// Check if there are more games to load
export const hasMoreGames = async (currentPage: number, pageSize: number = 6) => {
  const startIndex = currentPage * pageSize;
  let datas = await fetchAllChallenges();
  return startIndex < datas.length;
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

export const fetchAllChallenges = async (): Promise<GameData[]> => {
  let datas = await getAllChallenges()
  let activeAsset = assets[0]
  let newDatas = [];
  console.log('debug->datas', datas)
  if (datas && activeAsset.decimals) {
    for (let i = 0; i < (datas as any).length; i++) {
      let accountData = (datas as any)[i].account
      let pickValues;
      if (Number(accountData.creatorSetNumber) == 1) {
        pickValues = "HEADS"
      } else {
        pickValues = "TAILS"
      }
      let timestamp = Number(accountData.startTs) * 1000;
      let date = new Date(timestamp);
      let formattedDate = ''
      let formattedTimes = ''
      if(date){
        formattedDate = format(date, 'yyyy-MM-dd')
        formattedTimes = format(date, 'hh:mm:ss')
      }
      const gameData = {
        id: Number(accountData.poolId),
        gameType: 'coin-flip',
        gameName: accountData.creatorPlayer.toBase58(),
        stakeAmount: Number(accountData.poolAmount) / (10 ** activeAsset.decimals),
        pickValue: pickValues,
        date: formattedDate,
        time: formattedTimes,
        joinerPlayer: accountData.joinerPlayer.toBase58(),
        creatorAta: accountData.creatorAta.toBase58()
      }
      newDatas.push(gameData)
    }
  }
  newDatas.sort((a, b) => b.id - a.id)
  return newDatas;
};

// Fetch player history for a user
export const fetchPlayerHistory = async (walletAddress: string): Promise<PlayerHistory[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return samplePlayerHistory;
};