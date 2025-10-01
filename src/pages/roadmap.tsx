/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string[];
  isCompleted?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, description, isCompleted = false }) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full flex-shrink-0 ${isCompleted ? 'bg-[#1be088]' : 'bg-[#F7B831]'}`}></div>
        <div className="w-0.5 h-full bg-[#324158] mt-1"></div>
      </div>
      <div className="flex-1 pb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-inter font-medium text-sm text-[#F7B831]">{date}</span>
          {isCompleted && <span className="bg-[#1be088] text-[#0D0C0F] px-2 py-1 rounded text-xs font-medium">Completed</span>}
        </div>
        <h3 className="font-oswald font-medium text-xl text-white mb-3">{title}</h3>
        <div className="space-y-2">
          {description.map((item, index) => (
            <p key={index} className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

interface PhaseCardProps {
  phase: string;
  title: string;
  items: Array<{
    date: string;
    title: string;
    description: string[];
  }>;
  color: string;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, title, items, color }) => {
  return (
    <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <h2 className="font-oswald font-medium text-2xl text-white">{phase} – {title}</h2>
      </div>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="border-l-2 border-[#324158] pl-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-inter font-medium text-sm text-[#F7B831]">{item.date}</span>
            </div>
            <h3 className="font-oswald font-medium text-lg text-white mb-2">{item.title}</h3>
            <div className="space-y-1">
              {item.description.map((desc, descIndex) => (
                <p key={descIndex} className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                  {desc}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Roadmap() {
  const phase1Items = [
    {
      date: "October 2025",
      title: "Coin Flip Launch",
      description: [
        "First PvP game on Spinx",
        "Two players stake SPX tokens, winner determined 100% by VRF",
        "No advantage for the creator; fair 50/50 odds",
        "Protocol fee: 0.005 SOL per transaction"
      ]
    },
    {
      date: "October 2025",
      title: "Slots Launch",
      description: [
        "PvP jackpot vault system",
        "Jackpot creators stake SPX into a vault; spin price = (Vault Stake ÷ 10)",
        "Player Return Rate (PTR): 93%",
        "Creators' Expected Return: ~7% (though short-term variance is possible if VRF hits)",
        "All results powered by ORAO VRF"
      ]
    }
  ];

  const phase2Items = [
    {
      date: "November 2025",
      title: "Dice PvP",
      description: [
        "Players bet against a creator's dice vault",
        "PTR: 93% | Creator Edge: ~7%",
        "Outcomes decided on-chain via VRF"
      ]
    },
    {
      date: "December 2025",
      title: "Roulette PvP",
      description: [
        "Decentralized VRF-powered roulette",
        "Players vs. a creator's vault",
        "PTR: 93% | Creator Edge: ~7%"
      ]
    }
  ];

  const phase3Items = [
    {
      date: "January 2026",
      title: "Leaderboards & Player Stats",
      description: [
        "Global stats for wins, losses, biggest jackpots, and challenge volume",
        "Community transparency features"
      ]
    },
    {
      date: "March 2026",
      title: "Referral System",
      description: [
        "Players invite others with referral codes",
        "Earn a share of protocol transaction fees from referred users"
      ]
    },
    {
      date: "May 2026",
      title: "Full Audit & Immutability",
      description: [
        "External audits of all deployed smart contracts",
        "Upgrade authority revoked → programs become immutable",
        "Full trustless decentralization"
      ]
    }
  ];

  const finalStateItems = [
    "Running multiple PvP games (Coin Flip, Slots, Dice, Roulette)",
    "Supporting jackpot vault creators with predictable long-term edge (7% vs. 93% PTR)",
    "Fully transparent, VRF-verified, and open-source"
  ];

  return (
    <>
      <Head>
        <title>Roadmap | SpinX</title>
        <meta
          name="description"
          content="Explore SpinX development roadmap from October 2025 to September 2026. Discover upcoming PvP games, ecosystem growth, and decentralization milestones."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        {/* Sidebar - Hidden on mobile and tablet (below lg) */}
        <div className="hidden lg:block">
          <Sidebar activeItem="roadmap" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-h-screen bg-[#0a101e] lg:ml-[248px]">
          {/* Header Space - Matching other pages */}
          <div className="px-3 xl:px-12 pt-6">
            <Header showSearch={false} />
          </div>
          <div className="pt-6 px-3 lg:px-12">
            <div className="mb-8">
              <h1 className="font-oswald font-bold text-4xl text-white mb-4">
                SpinX Roadmap
              </h1>
              <p className="font-inter font-normal text-lg text-[#90a2b9]">
                Our journey from October 2025 to September 2026: Building the future of decentralized PvP gaming on Solana
              </p>
            </div>

            {/* Phase 1: Core Launch - Current Phase (Green) */}
            <PhaseCard
              phase="Phase 1"
              title="Core Launch"
              items={phase1Items}
              color="bg-[#1be088]"
            />

            {/* Phase 2: Expanding PvP Games - Future Phase (Gray) */}
            <PhaseCard
              phase="Phase 2"
              title="Expanding PvP Games"
              items={phase2Items}
              color="bg-[#324158]"
            />

            {/* Phase 3: Ecosystem Growth - Future Phase (Gray) */}
            <PhaseCard
              phase="Phase 3"
              title="Ecosystem Growth"
              items={phase3Items}
              color="bg-[#324158]"
            />

            {/* Final State Vision */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                By May 2026, Spinx will be:
              </h2>
              <div className="space-y-3">
                {finalStateItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1be088] mt-1 flex-shrink-0"></div>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics & Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] text-center">
                <div className="w-12 h-12 rounded-full bg-[#F7B831] flex items-center justify-center mx-auto mb-4">
                  <img src="/image/coin.svg" alt="Games" className="w-6 h-6" />
                </div>
                <h3 className="font-oswald font-medium text-lg text-white mb-2">4 PvP Games</h3>
                <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                  Coin Flip, Slots, Dice, Roulette
                </p>
              </div>
              <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] text-center">
                <div className="w-12 h-12 rounded-full bg-[#1be088] flex items-center justify-center mx-auto mb-4">
                  <span className="font-oswald font-bold text-xl text-[#0D0C0F]">93%</span>
                </div>
                <h3 className="font-oswald font-medium text-lg text-white mb-2">Player Return Rate</h3>
                <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                  Consistent across all games
                </p>
              </div>
              <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] text-center">
                <div className="w-12 h-12 rounded-full bg-[#324158] flex items-center justify-center mx-auto mb-4">
                  <img src="/image/refresh.svg" alt="VRF" className="w-6 h-6" />
                </div>
                <h3 className="font-oswald font-medium text-lg text-white mb-2">100% VRF Verified</h3>
                <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                  All outcomes powered by ORAO VRF
                </p>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mb-12">
              <h2 className="font-oswald font-medium text-2xl text-white mb-6">
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Game Mechanics Sub-card */}
                <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617]">
                  <h3 className="font-oswald font-medium text-lg text-white mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#F7B831]"></div>
                    Game Mechanics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-inter text-sm text-[#90a2b9]">Player Return Rate:</span>
                      <span className="font-oswald font-medium text-[#F7B831]">93%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-inter text-sm text-[#90a2b9]">Creator Edge:</span>
                      <span className="font-oswald font-medium text-[#1be088]">~7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-inter text-sm text-[#90a2b9]">Protocol Fee:</span>
                      <span className="font-oswald font-medium text-white">0.005 SOL</span>
                    </div>
                  </div>
                </div>
                {/* Randomness Sub-card */}
                <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617]">
                  <h3 className="font-oswald font-medium text-lg text-white mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#1be088]"></div>
                    Randomness
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-inter text-sm text-[#90a2b9]">VRF Provider:</span>
                      <span className="font-oswald font-medium text-white">ORAO VRF</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-inter text-sm text-[#90a2b9]">Verification:</span>
                      <span className="font-oswald font-medium text-[#1be088]">On-chain</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-inter text-sm text-[#90a2b9]">Fairness:</span>
                      <span className="font-oswald font-medium text-white">100% Provable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Commitment to Transparency */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Commitment to Transparency
              </h2>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                Throughout this roadmap, Spinx maintains its core principles: non-custodial design,
                provably fair outcomes, and complete transparency. Every milestone brings us closer
                to a fully decentralized gaming ecosystem where players and creators can participate
                with confidence.
              </p>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}