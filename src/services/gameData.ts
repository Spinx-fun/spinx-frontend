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
  winner: string;
}

// Player History interface
export interface PlayerHistory {
  [x: string]: any;
  id: number;
  date: string;
  time: string;
  game: string;
  challenge: any;
  stakeAmount: number;
  result: string;
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
      if (Number(accountData.creatorSetNumber) == 0) {
        pickValues = "HEADS"
      } else {
        pickValues = "TAILS"
      }
      let timestamp = Number(accountData.startTs) * 1000;
      let date = new Date(timestamp);
      let formattedDate = ''
      let formattedTimes = ''
      if (date) {
        formattedDate = format(date, 'yyyy-MM-dd')
        formattedTimes = format(date, 'HH:mm:ss')
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
        creatorAta: accountData.creatorAta.toBase58(),
        winner: accountData.winner.toBase58()
      }
      newDatas.push(gameData)
    }
  }
  newDatas.sort((a, b) => b.id - a.id)
  return newDatas;
};