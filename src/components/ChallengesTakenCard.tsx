import React from 'react';

interface ChallengesTakenCardProps {
  challengesCount: number;
}

const ChallengesTakenCard: React.FC<ChallengesTakenCardProps> = ({ 
  challengesCount, 
}) => {
  const displayCount = challengesCount !== null && challengesCount !== undefined ? challengesCount : 0;

  return (
    <div className="border border-[#2a2a2a] rounded-[10px] p-4 bg-[#020617] h-full flex flex-col md:col-span-2">
      {/* Header with Title and Icon */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-oswald font-bold text-[20px] leading-[160%] text-white">
          Challenges Taken
        </h3>
        <img src="/image/gamepad.svg" alt="Challenges" className="w-8 h-8" />
      </div>

      {/* Challenges Subbox */}
      <div className="rounded-[10px] p-3 bg-[#0e172b] flex-1 flex flex-col justify-center">
        {/* Challenges Count with Label */}
        <div className="flex items-end gap-2 mb-2">
          <span className="font-oswald font-medium text-[36px] leading-[117%] text-[#f9c752]">
            {displayCount}
          </span>
          <span className="font-inter font-medium text-[14px] leading-[186%] text-white self-end">
            Challenges
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChallengesTakenCard;