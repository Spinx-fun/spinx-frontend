import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { assets } from '../utils/constants';
import { errorAlert } from './ToastGroup';
import JoinCoinflipModal from "../components/JoinCoinflipModal";
import { fetchUserData, UserData } from '../services/api';
import { solConnection } from '../context/solana/transaction';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { solacc } from '../utils/constants';

export interface GameCardProps {
  poolId: number;
  gameType: string;
  gameName: string;
  stakeAmount: number;
  pickValue: string | number;
  date: string;
  time: string;
  joinerPlayer: string;
  creatorAta: string;
  winner: string;
  random: string;
}

const GameCard: React.FC<GameCardProps> = ({
  poolId,
  gameType,
  gameName,
  stakeAmount,
  pickValue,
  date,
  time,
  joinerPlayer,
  creatorAta,
  winner,
  random
}) => {

  const [isOpenJoinModal, setIsOpenJoinModal] = useState(false);
  const [error, setError] = useState<string>("");
  const [amounts, setAmounts] = useState(0);
  const wallet = useWallet();
  const [coinId, setCoinId] = useState(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [solBalance, setSolBalance] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {

        let balance;
        if (wallet.publicKey) {
          balance = await solConnection.getAccountInfo(wallet.publicKey);
          if (balance)
            setSolBalance(balance.lamports / LAMPORTS_PER_SOL)

          const [userDataResponse] = await Promise.all([
            fetchUserData(wallet)
          ]);
          setUserData(userDataResponse);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
      }
    };
    if (wallet)
      loadData();
  }, [wallet]);

  const handleOpenJoinModal = () => {
    if (wallet.publicKey?.toBase58() == gameName) {
      errorAlert("You are creator of this pool already");
      return;
    }
    if (!wallet?.connected) {
      errorAlert("Please connect wallet first");
      return;
    }

    if (Number(solBalance) == 0) {
      errorAlert("You have no enough SOL on your wallet");
      return;
    }

    if (Number(stakeAmount) > Number(userData?.tokenBalance) || Number.isNaN(userData?.tokenBalance)) {
      errorAlert("You have no enough token on your wallet");
      return;
    }

    const activeAsset = assets[0];
    if (pickValue == "HEADS") {
      setCoinId(1)
    } else {
      setCoinId(0)
    }
    let amount;
    let betAmount = Number(stakeAmount);
    amount = betAmount * 10 ** (activeAsset.decimals ?? 9);
    setAmounts(amount);
    setIsOpenJoinModal(true);
  };

  const handleCloseJoinModal = () => {
    setIsOpenJoinModal(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 2)}...${address.slice(-4)}`;
  };

  return (
    <>
      <div className="border border-[#2a2a2a] rounded-xl p-4 bg-[#020617]">
        {/* Badge */}
        <div className={`
        border rounded-[50px] py-[5px] px-[10px] h-[26px] inline-flex items-center gap-2 mb-4
        ${gameType === 'coin-flip'
            ? 'border-[rgba(249,199,82,0.3)] bg-[rgba(255,215,0,0.2)]'
            : 'border-[rgba(255,100,100,0.3)] bg-[rgba(255,100,100,0.2)]'
          }
      `}>
          <img
            src={gameType === 'coin-flip' ? "/image/coin.svg" : "/image/slotmachine.svg"}
            alt={gameType === 'coin-flip' ? "Coin" : "Slot Machine"}
            className="w-4 h-4"
          />
          <span className={`
          font-inter italic font-medium text-xs leading-[133%]
          ${gameType === 'coin-flip' ? 'text-[#f9c752]' : 'text-[#ff6464]'}
        `}>
            {gameType === 'coin-flip' ? 'Coin Flip Game' : 'Slot Machine'}
          </span>
        </div>

        {/* Game Name */}
        <div className="flex justify-between font-oswald font-medium text-lg leading-[111%] text-white mb-4">
          {joinerPlayer == null
            ?
            <a href={`${solacc}/${gameName}?cluster=devnet`} target='blank' className='font-oswald font-medium text-lg leading-[111%]'>{formatAddress(gameName)}</a>
            :
            gameName == winner ?
              <div className='flex'>
                <a href={`${solacc}/${gameName}?cluster=devnet`} target='blank' className='text-[#f9c752] font-oswald font-medium text-lg leading-[111%]'>{formatAddress(gameName)}</a> &nbsp; &nbsp;<h3 className='font-oswald font-medium'>VS</h3>&nbsp; &nbsp;<a href={`${solacc}/${joinerPlayer}?cluster=devnet`} target='blank' className='font-oswald font-medium text-lg leading-[111%] text-white'>{formatAddress(joinerPlayer)}</a>
              </div>
              :
              <div className='flex'>
                <a href={`${solacc}/${gameName}?cluster=devnet`} target='blank' className='font-oswald font-medium text-lg leading-[111%] text-white'>{formatAddress(gameName)}</a> &nbsp; &nbsp;<h3 className='font-oswald font-medium'>VS</h3>&nbsp; &nbsp;<a href={`${solacc}/${joinerPlayer}?cluster=devnet`} target='blank' className='font-oswald font-medium text-lg leading-[111%] text-[#f9c752]'>{formatAddress(joinerPlayer)}</a>
              </div>
          }
          <a href={`${solacc}/${creatorAta}?cluster=devnet`} target='blank' className='font-oswald font-medium text-lg leading-[111%]'>PDA : {formatAddress(creatorAta)}</a>
        </div>

        {/* Stake and Pick Columns */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 mb-4">
          {/* Stake Column */}
          <div className="flex-1">
            <div className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-1">
              Stake
            </div>
            <div className="font-oswald font-medium text-[24px] leading-[133%] text-[#f9c752]">
              {stakeAmount} SPX
            </div>
          </div>

          {/* Pick Column */}
          <div className="flex-1">
            <div className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-1">
              Pick
            </div>
            <div className="font-oswald font-medium text-[24px] leading-[133%] text-white">
              {pickValue}
            </div>
          </div>
          {joinerPlayer != null &&
            <>
              <div className="flex-1">
                <div className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-1">
                  Winner Pick
                </div>
                <div className="font-oswald font-medium text-[24px] leading-[133%] text-white">
                  {joinerPlayer == null
                    ? pickValue
                    : gameName != winner && pickValue == "HEADS"
                      ? "TAILS"
                      : gameName != winner && pickValue == "TAILS"
                        ? "HEADS" :
                        gameName == winner && pickValue == "HEADS"
                          ? "HEADS"
                          : "TAILS"
                  }
                </div>
              </div>

              <div className="flex-1">
                <div className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-1">
                  VRF
                </div>
                <a href={`${solacc}/${random}?cluster=devnet`} target='blank' className='font-oswald font-medium text-[24px] leading-[133%] text-white'>{formatAddress(random)}</a>
              </div>
            </>
          }
        </div>

        {/* Action Button */}
        {joinerPlayer == null ?
          <button className={`
                  rounded-[2px_8px] py-2 px-4 w-[160px] h-[37px] mb-4
                  shadow-[0_4px_14px_0_rgba(27,224,136,0.45)] bg-[#1be088]
                  flex items-center justify-center
                `}
            // onClick={handleJoin}
            onClick={() => handleOpenJoinModal()}
          >
            <span className="font-oswald font-medium text-sm leading-[150%] uppercase text-[#1b2235]">
              {gameType === 'coin-flip' ? 'TAKE CHALLENGE' : 'PLAY GAME'}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </span>
          </button>
          :
          <button className={`
            rounded-[2px_8px] py-2 px-4 w-[160px] h-[37px] mb-4
            shadow-[0_4px_14px_0_rgba(27,224,136,0.45)] bg-[#1be088]
            flex items-center justify-center
          `}
            disabled>
            <span className="font-oswald font-medium text-sm leading-[150%] uppercase text-[#1b2235]">
              Completed
            </span>
          </button>
        }

        {/* Date and Time */}
        <div className="flex items-center gap-4 text-[#90a2b9] text-sm">
          <div className="flex items-center gap-1">
            <img src="/image/calendar.svg" alt="Calendar" className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <img src="/image/clock.svg" alt="Clock" className="w-3.5 h-3.5" />
            <span>{time}</span>
          </div>
        </div>
      </div>
      {isOpenJoinModal && <JoinCoinflipModal coinId={coinId} amount={amounts} creatorAta={creatorAta} poolId={poolId} pickValue={pickValue} handleCloseModal={handleCloseJoinModal} />}
    </>
  );
};

export default GameCard;