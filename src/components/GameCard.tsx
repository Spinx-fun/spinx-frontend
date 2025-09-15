import React, { useState } from 'react';
import JoinCoinflipModal from "../components/JoinCoinflipModal";

export interface GameCardProps {
  gameType: 'coin-flip' | 'slot-machine';
  gameName: string;
  stakeAmount: number;
  pickValue: string | number;
  date: string;
  time: string;
}

const GameCard: React.FC<GameCardProps> = ({
  gameType,
  gameName,
  stakeAmount,
  pickValue,
  date,
  time
}) => {
  const [isOpenJoinModal, setIsOpenJoinModal] = useState(false);
  const handleCloseJoinModal = () => {
    setIsOpenJoinModal(false);
  };
  const handleOpenJoinModal = (pda: string, poolAmount: number, setNumber: number) => {
    // setSelectedPda(pda);
    // setSelectedPoolAmount(poolAmount);
    // setSelectedSetNumber(setNumber);
    setIsOpenJoinModal(true);
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
          {gameName}
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
        <button className={`
        rounded-[2px_8px] py-2 px-4 w-[160px] h-[37px] mb-4
        shadow-[0_4px_14px_0_rgba(27,224,136,0.45)] bg-[#1be088]
        flex items-center justify-center
      `}
          onClick={() => handleOpenJoinModal("game.pda", 0, 0)}>
          <span className="font-oswald font-medium text-sm leading-[150%] uppercase text-[#1b2235]">
            {gameType === 'coin-flip' ? 'TAKE CHALLENGE' : 'PLAY GAME'}
          </span>
        </button>

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