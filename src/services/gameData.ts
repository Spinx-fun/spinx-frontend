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
  winnerTx: string;
  random: string;
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
  gameType: string;
  stakeAmount: number;
  pickValue: string | number;
  date: string;
  time: string;
  creatorAta: any;
  status: any;

}

// Fetch active challenges for a user
export const fetchActiveChallenges = async (walletAddress: string): Promise<ActiveChallenge[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  let datas = await getAllChallenges()
  let activeAsset = assets[0]
  let newDatas = [];
  if (datas && activeAsset.decimals) {
    for (let i = 0; i < (datas as any).length; i++) {
      let accountData = (datas as any)[i].account;
      let pdaKey = (datas as any)[i].publicKey;
      let pickValues;
      if (Number(accountData.creatorNumber) == 0) {
        pickValues = "HEADS"
      } else {
        pickValues = "TAILS"
      }
      let timestamp = Number(accountData.start_ts) * 1000;
      let date = new Date(timestamp);
      let formattedDate = ''
      let formattedTimes = ''
      if (date) {
        formattedDate = format(date, 'yyyy-MM-dd')
        formattedTimes = format(date, 'HH:mm:ss')
      }
      let gameData;
      if (accountData.winner == null && walletAddress == accountData.creator && !accountData.status.closed) {
        gameData = {
          id: Number(accountData.poolId),
          gameType: 'coin-flip',
          stakeAmount: parseInt("0x" + accountData.poolAmount) / (10 ** activeAsset.decimals),
          pickValue: pickValues,
          date: formattedDate,
          time: formattedTimes,
          creatorAta: pdaKey,
          status: 'active'
        }
        newDatas.push(gameData)
      }
    }

    newDatas.sort((a, b) => b.id - a.id);
  }
  return newDatas;
};

export const fetchAllChallenges = async (): Promise<GameData[]> => {
  let datas = await getAllChallenges()
  let activeAsset = assets[0]
  let newDatas = [];
  if (datas && activeAsset.decimals) {
    for (let i = 0; i < (datas as any).length; i++) {
      let accountData = (datas as any)[i].account
      let pdaKey = (datas as any)[i].publicKey;
      let pickValues;
      if (Number(accountData.creatorNumber) == 0) {
        pickValues = "HEADS"
      } else {
        pickValues = "TAILS"
      }
      let timestamp = Number(accountData.start_ts) * 1000;
      let date = new Date(timestamp);
      let formattedDate = ''
      let formattedTimes = ''
      if (date) {
        formattedDate = format(date, 'yyyy-MM-dd')
        formattedTimes = format(date, 'HH:mm:ss')
      }
      if (!accountData.status.closed) {
        const gameData = {
          id: Number(accountData.poolId),
          gameType: 'coin-flip',
          gameName: accountData.creator,
          stakeAmount: parseInt("0x" + accountData.poolAmount) / (10 ** activeAsset.decimals),
          pickValue: pickValues,
          date: formattedDate,
          time: formattedTimes,
          joinerPlayer: accountData.joiner,
          creatorAta: pdaKey,
          winner: accountData.winner,
          winnerTx: accountData.winner_tx,
          random: accountData.joiner != null ? accountData.random : ''
        }
        newDatas.push(gameData)
      }
    }
  }
  console.log('debug->newDatas', newDatas)
  newDatas.sort((a, b) => b.id - a.id);
  return newDatas;
};
