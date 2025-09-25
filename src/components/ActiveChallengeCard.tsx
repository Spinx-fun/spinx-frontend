import React, { useState } from 'react';
import { ActiveChallenge } from '../services/gameData';
import { useWallet } from "@solana/wallet-adapter-react";
import { closeCoinflip } from "../context/solana/transaction";
import { assets } from '../utils/constants';
import { PublicKey } from '@solana/web3.js';
import { BeatLoader } from 'react-spinners';

interface ActiveChallengeCardProps {
  challenge: ActiveChallenge;
  setLoading: Function;
}

const ActiveChallengeCard: React.FC<ActiveChallengeCardProps> = ({ challenge, setLoading }) => {
  const wallet = useWallet();
  const [activeAsset] = useState(assets[0])
  const [isLoading, setIsLoading] = useState(false);
  const handleWithdraw = async () => {
    try {
      setIsLoading(true);
      await closeCoinflip(wallet, challenge.id, new PublicKey(activeAsset.address), setLoading)

    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };
  return (
    <div className="border border-[#2a2a2a] rounded-xl p-4 bg-[#020617]">
      {/* Badge */}
      <div className={`
        border rounded-[50px] py-[5px] px-[10px] h-[26px] inline-flex items-center gap-2 mb-4
        ${challenge.gameType === 'coin-flip'
          ? 'border-[rgba(249,199,82,0.3)] bg-[rgba(255,215,0,0.2)]'
          : 'border-[rgba(255,100,100,0.3)] bg-[rgba(255,100,100,0.2)]'
        }
      `}>
        <img
          src={challenge.gameType === 'coin-flip' ? "/image/coin.svg" : "/image/slotmachine.svg"}
          alt={challenge.gameType === 'coin-flip' ? "Coin" : "Slot Machine"}
          className="w-4 h-4"
        />
        <span className={`
          font-inter italic font-medium text-xs leading-[133%]
          ${challenge.gameType === 'coin-flip' ? 'text-[#f9c752]' : 'text-[#ff6464]'}
        `}>
          {challenge.gameType === 'coin-flip' ? 'Coin Flip Game' : 'Slot Machine'}
        </span>
      </div>

      {/* Date and Time */}
      <div className="flex items-center gap-4 text-[#90a2b9] text-sm mb-4">
        <div className="flex items-center gap-1">
          <img src="/image/calendar.svg" alt="Calendar" className="w-3.5 h-3.5" />
          <span>{challenge.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src="/image/clock.svg" alt="Clock" className="w-3.5 h-3.5" />
          <span>{challenge.time}</span>
        </div>
      </div>

      {/* Stake and Pick Columns */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 mb-4">
        {/* Stake Column */}
        <div className="flex-1">
          <div className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-1">
            Stake
          </div>
          <div className="flex items-end gap-1">
            <span className="font-oswald font-medium text-[32px] leading-[133%] text-[#f9c752]">
              {challenge.stakeAmount}
            </span>
            <span className="font-inter font-medium text-[14px] leading-[100%] text-white mb-[6px] mr-8">
              SPX&nbsp;Tokens
            </span>
          </div>
        </div>

        {/* Pick Column */}
        <div className="flex-1">
          <div className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-1">
            Pick
          </div>
          <div className="font-oswald font-medium text-[24px] leading-[133%] text-white mt-[12px]">
            {challenge.pickValue}
          </div>
        </div>
      </div>

      {/* Withdraw Button */}
      <button className="
        border border-[#ff1a00] rounded-[2px_8px] py-2 px-4 w-[140px] h-[37px]
        font-oswald font-medium text-sm leading-[150%] uppercase text-[#ff1a00]
        bg-transparent hover:bg-[#ff1a00] hover:text-white transition-colors
      "
        onClick={handleWithdraw}>
        {isLoading ?
          <BeatLoader
            color={'#fff'}
            loading={isLoading}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> :
          "Withdraw"
        }
      </button>
    </div>
  );
};

export default ActiveChallengeCard;