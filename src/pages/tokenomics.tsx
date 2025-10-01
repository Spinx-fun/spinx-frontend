/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface DistributionCardProps {
  percentage: string;
  title: string;
  description: string[];
  color: string;
}

const DistributionCard: React.FC<DistributionCardProps> = ({ percentage, title, description, color }) => {
  return (
    <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] hover:border-[#324158] transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
          <span className="font-oswald font-bold text-lg text-[#0D0C0F]">{percentage}</span>
        </div>
        <h3 className="font-oswald font-medium text-xl text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        {description.map((item, index) => (
          <p key={index} className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

interface UtilityCardProps {
  icon: string;
  title: string;
  description: string;
}

const UtilityCard: React.FC<UtilityCardProps> = ({ icon, title, description }) => {
  return (
    <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] hover:border-[#324158] transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <img src={icon} alt={title} className="w-8 h-8" />
        <h3 className="font-oswald font-medium text-xl text-white">{title}</h3>
      </div>
      <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
        {description}
      </p>
    </div>
  );
};

interface SupplyBreakdownProps {
  label: string;
  percentage: string;
  amount: string;
  color: string;
}

const SupplyBreakdown: React.FC<SupplyBreakdownProps> = ({ label, percentage, amount, color }) => {
  return (
    <div className="flex items-center justify-between border border-[#2a2a2a] rounded-lg p-4 bg-[#17161B]">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span className="font-inter font-medium text-white">{label}</span>
      </div>
      <div className="text-right">
        <div className="font-oswald font-bold text-lg text-white">{percentage}</div>
        <div className="font-inter text-sm text-[#90a2b9]">{amount}</div>
      </div>
    </div>
  );
};

export default function Tokenomics() {
  const distributionData = [
    {
      percentage: "85%",
      title: "Fair Launch (Pump.Fun)",
      description: [
        "Majority of supply available to the community from day one",
        "No presale, no private investors, no hidden allocations",
        "Ensures decentralized distribution and community ownership"
      ],
      color: "bg-[#1be088]"
    },
    {
      percentage: "15%",
      title: "Team Allocation",
      description: [
        "Acquired by the Spinx team at launch",
        "12-month linear vesting with monthly unlocks",
        "Ensures the team is invested in long-term growth"
      ],
      color: "bg-[#F7B831]"
    }
  ];

  const utilityData = [
    {
      icon: "/image/coin.svg",
      title: "Challenge Participation",
      description: "Only token for creating and joining challenges on the platform"
    },
    {
      icon: "/image/wallet.svg",
      title: "Jackpot Vault Creation",
      description: "Required to stake and create jackpot vaults for PvP games"
    },
    {
      icon: "/image/dollar.svg",
      title: "Platform Demand",
      description: "Directly tied to platform demand and usage as the primary utility token"
    },
    {
      icon: "/image/home.svg",
      title: "Future Governance",
      description: "Governance participation in future DAO decisions and protocol upgrades"
    }
  ];

  const supplyBreakdown = [
    {
      label: "Fair Launch (Pump.Fun)",
      percentage: "85%",
      amount: "850,000,000 SPX",
      color: "bg-[#1be088]"
    },
    {
      label: "Team Allocation",
      percentage: "15%",
      amount: "150,000,000 SPX",
      color: "bg-[#F7B831]"
    }
  ];

  return (
    <>
      <Head>
        <title>Tokenomics | SpinX</title>
        <meta
          name="description"
          content="Learn about SPX tokenomics - fair launch distribution, utility, and token economics of the SpinX gaming platform."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        {/* Sidebar - Hidden on mobile and tablet (below lg) */}
        <div className="hidden lg:block">
          <Sidebar activeItem="tokenomics" />
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
                SPX Tokenomics
              </h1>
              <p className="font-inter font-normal text-lg text-[#90a2b9]">
                Fair launch for players, vested commitment from the team, and real utility built into every game
              </p>
            </div>

            {/* Total Supply Overview */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Total Supply: 1,000,000,000 SPX
              </h2>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-6">
                SPX has a fixed total supply with no inflation mechanism. The token distribution 
                ensures community ownership while aligning team incentives with long-term success.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supplyBreakdown.map((item, index) => (
                  <SupplyBreakdown
                    key={index}
                    label={item.label}
                    percentage={item.percentage}
                    amount={item.amount}
                    color={item.color}
                  />
                ))}
              </div>
            </div>

            {/* Distribution Section */}
            <div className="mb-12">
              <h2 className="font-oswald font-medium text-2xl text-white mb-6">
                Token Distribution
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {distributionData.map((item, index) => (
                  <DistributionCard
                    key={index}
                    percentage={item.percentage}
                    title={item.title}
                    description={item.description}
                    color={item.color}
                  />
                ))}
              </div>
            </div>

            {/* Supply Visualization */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-6">
                Supply Breakdown
              </h2>
              <div className="relative">
                {/* Visual Supply Bar */}
                <div className="w-full h-8 rounded-full bg-[#17161B] overflow-hidden mb-4">
                  <div className="h-full bg-gradient-to-r from-[#1be088] to-[#1be088] rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-inter text-[#90a2b9]">Fair Launch: 85%</span>
                  <span className="font-inter text-[#90a2b9]">Team: 15%</span>
                </div>
              </div>
            </div>

            {/* Utility Section */}
            <div className="mb-12">
              <h2 className="font-oswald font-medium text-2xl text-white mb-6">
                SPX Utility
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {utilityData.map((item, index) => (
                  <UtilityCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </div>

            {/* Key Principles */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Key Principles
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1be088] mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-oswald font-medium text-lg text-white mb-1">Fair Launch</h3>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      No presale, no private investors, no hidden allocations. The community gets 
                      access to the majority of supply from day one.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#F7B831] mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-oswald font-medium text-lg text-white mb-1">Team Vesting</h3>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      Team allocation follows 12-month linear vesting with monthly unlocks, 
                      ensuring long-term commitment to platform growth.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#324158] mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-oswald font-medium text-lg text-white mb-1">Real Utility</h3>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      Every SPX token has direct utility within the platform, creating organic 
                      demand through gameplay and platform participation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Economic Model */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Economic Model
              </h2>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-4">
                SPX tokens are essential for all platform activities. As platform usage grows, 
                demand for SPX increases, creating a direct correlation between platform success 
                and token value.
              </p>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                The fixed supply model ensures scarcity while the utility-driven demand provides 
                sustainable token economics aligned with platform growth.
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