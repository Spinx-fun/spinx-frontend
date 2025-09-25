import React from 'react';
import ActiveChallengeCard from './ActiveChallengeCard';
import { ActiveChallenge } from '../services/gameData';

interface ActiveChallengesPanelProps {
  challenges: ActiveChallenge[];
  setIsLoading: Function;
}

const ActiveChallengesPanel: React.FC<ActiveChallengesPanelProps> = ({ challenges, setIsLoading }) => {
  return (
    <div className="border border-[#2a2a2a] rounded-[10px] p-4 bg-[#020617] h-fit">
      <h2 className="font-oswald font-bold text-[20px] leading-[160%] text-white mb-4">
        Active Challenges
      </h2>
      
      <div className="rounded-[10px] p-4 bg-[#0e172b] max-h-[580px] overflow-auto">
        {challenges.length === 0 ? (
          <p className="font-inter font-medium text-[14px] leading-[114%] text-[#929294] text-center py-8">
            No active challenges
          </p>
        ) : (
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <ActiveChallengeCard key={challenge.id} challenge={challenge} setLoading={setIsLoading}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveChallengesPanel;