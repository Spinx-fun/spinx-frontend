import React, { useState } from 'react';
import JoinCoinflipModal from "../components/JoinCoinflipModal";
import { useWallet } from '@solana/wallet-adapter-react';
import { joinCoinflip } from "../context/solana/transaction";
import { PublicKey } from '@solana/web3.js';
import { assets } from '../utils/constants';
import { errorAlert } from './ToastGroup';

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
  creatorAta
}) => {
  const [isOpenJoinModal, setIsOpenJoinModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const wallet = useWallet();
  const handleCloseJoinModal = () => {
    setIsOpenJoinModal(false);
  };
  console.log('debug->stakeAmount', stakeAmount)
  const handleJoin = async () => {
    try {
      setIsLoading(true);
      const activeAsset = assets[0];
      let coinId;
      if (pickValue == "HEADS") {
        coinId = 2;
      } else {
        coinId = 1;
      }
      if (wallet.publicKey?.toBase58() == gameName) {
        errorAlert("You are creator of this pool already");
        return;
      }
      let amount;
      let betAmount = Number(stakeAmount);
      amount = betAmount * 10 ** (activeAsset.decimals ?? 9);
      await joinCoinflip(wallet, coinId, new PublicKey(activeAsset.address), amount, new PublicKey(creatorAta), poolId, setIsLoading)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }

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
        <h3 className="font-oswald font-medium text-lg leading-[111%] text-white mb-4">
          {joinerPlayer == "11111111111111111111111111111111" ?
            gameName.slice(0, 5) + "... ..." + gameName.slice(-5) :
            gameName.slice(0, 5) + "... ..." + gameName.slice(-5) + " VS " + joinerPlayer.slice(0, 5) + "... ..." + joinerPlayer.slice(-5)
          }
        </h3>

        {/* Stake and Pick Columns */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 mb-4">
          {/* Stake Column */}
          <div className="flex-1">
            <div className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-1">
              Stake
            </div>
            <div className="font-oswald font-medium text-[24px] leading-[133%] text-[#f9c752]">
              {stakeAmount}
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
        </div>

        {/* Action Button */}
        {joinerPlayer == "11111111111111111111111111111111" ?
          <button className={`
                  rounded-[2px_8px] py-2 px-4 w-[160px] h-[37px] mb-4
                  shadow-[0_4px_14px_0_rgba(27,224,136,0.45)] bg-[#1be088]
                  flex items-center justify-center
                `}
            onClick={handleJoin}>
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
      {isOpenJoinModal && <JoinCoinflipModal referralCode={""} pda={""} poolAmount={0} setNumber={0} handleCloseModal={handleCloseJoinModal} />}
    </>
  );
};

export default GameCard;