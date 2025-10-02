/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] hover:border-[#324158] transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <img src={icon} alt={title} className="w-8 h-8" />
        <h3 className="font-oswald font-medium text-xl text-white">{title}</h3>
      </div>
      <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
        {description}
      </p>
    </div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F7B831] flex items-center justify-center font-oswald font-bold text-[#0D0C0F]">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-oswald font-medium text-lg text-white mb-2">{title}</h4>
        <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function About() {
  const features = [
    {
      title: "Non-Custodial",
      description: "Funds are never held by Spinx. Tokens are locked in program-derived vaults until settlement or cancellation.",
      icon: "/image/wallet.svg"
    },
    {
      title: "Provably Fair",
      description: "Outcomes are based solely on ORAO VRF. Randomness and results are publicly verifiable on-chain.",
      icon: "/image/coin.svg"
    },
    {
      title: "Transparent",
      description: "All state and results can be inspected with standard Solana explorers. Every game is independently verifiable.",
      icon: "/image/search.svg"
    },
    {
      title: "Automatic Settlement",
      description: "The program pays the winner directly without human intervention. Settlement runs once per game deterministically.",
      icon: "/image/refresh.svg"
    }
  ];

  const howItWorksSteps = [
    {
      title: "Create a Challenge",
      description: "A user creates a coin flip challenge by staking SPX tokens. Tokens are moved into a program-derived vault account (PDA). A protocol fee of 0.005 SOL is charged at creation."
    },
    {
      title: "Accept a Challenge",
      description: "Another user joins by staking an equal amount of SPX tokens. A protocol fee of 0.005 SOL is charged at acceptance. The program submits a request to ORAO VRF."
    },
    {
      title: "Settlement (Verifiable Randomness)",
      description: "ORAO VRF fulfills the request and writes randomness to a request account. The Spinx program computes the outcome deterministically: randomness % 2 → 0 = Heads, 1 = Tails."
    },
    {
      title: "Automatic Payout",
      description: "The vault balance is automatically transferred to the winner's wallet. The outcome is recorded on-chain for verification."
    }
  ];

  const verificationItems = [
    "Game Account (PDA): On-chain record of participants, stakes, status, and VRF request reference",
    "Vault Account (PDA): Escrow holding the staked SPX tokens while the game is active",
    "VRF Request Account: Owned by the ORAO VRF program, contains the randomness used"
  ];

  const fees = [
    { action: "Challenge Creation", fee: "0.005 SOL" },
    { action: "Challenge Acceptance", fee: "0.005 SOL" },
    { action: "Network Transaction", fee: "Standard Solana fees" },
    { action: "VRF Request", fee: "ORAO VRF cost" }
  ];

  return (
    <>
      <Head>
        <title>About | SpinX</title>
        <meta
          name="description"
          content="Learn about SpinX - a decentralized peer-to-peer casino platform on Solana. Discover our non-custodial, provably fair gaming system."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        {/* Sidebar - Hidden on mobile and tablet (below lg) */}
        <div className="hidden lg:block">
          <Sidebar activeItem="about" />
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
                About SpinX
              </h1>
              <p className="font-inter font-normal text-lg text-[#90a2b9]">
                SpinX is a decentralized peer-to-peer (PvP) casino platform on the Solana blockchain.
                Our first game is Coin Flip, where two users stake SPX tokens and a winner is chosen
                using verifiable randomness (VRF) provided by the official ORAO VRF program.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>

            {/* SPX-Only Participation */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                SPX-Only Participation & SOL Requirement
              </h2>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-4">
                Challenges on Spinx can only be created and joined with SPX tokens. Users must also hold
                a small amount of SOL to pay network transaction fees and the VRF request cost.
              </p>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                This design concentrates platform utility into SPX: if demand for the platform grows,
                participation requires SPX, aligning utility with token holders. No outcomes or returns are guaranteed.
                SPX is a utility token, not investment advice.
              </p>
            </div>

            {/* How It Works */}
            <div className="mb-12">
              <h2 className="font-oswald font-medium text-2xl text-white mb-6">
                How SpinX Works
              </h2>
              <div className="space-y-6">
                {howItWorksSteps.map((step, index) => (
                  <StepCard
                    key={index}
                    number={index + 1}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
            </div>

            {/* Cancellation */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Cancellation
              </h2>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                If no opponent joins, the creator can cancel and withdraw their SPX tokens from the vault.
                This ensures that users never lose their staked tokens due to inactivity.
              </p>
            </div>

            {/* Verification Section */}
            <div className="mb-12">
              <h2 className="font-oswald font-medium text-2xl text-white mb-6">
                Verification (On-Chain Proofs)
              </h2>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-6">
                Every game can be independently verified by anyone through these accounts:
              </p>
              <div className="space-y-3">
                {verificationItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1be088] mt-1 flex-shrink-0"></div>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mt-4">
                SpinX provides direct explorer links to these accounts so users can confirm staking,
                randomness, and settlement independently.
              </p>
            </div>

            {/* User Experience */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                User Experience
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-oswald font-medium text-lg text-white mb-2">Active Listings</h3>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    Shows open challenges. Each listing displays the creator&apos;s wallet and a link to the
                    vault PDA so users can confirm tokens are staked.
                  </p>
                </div>
                <div>
                  <h3 className="font-oswald font-medium text-lg text-white mb-2">Completed Challenges</h3>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    Available via filters. Each entry includes links to the Game PDA, Vault PDA, and
                    VRF request (randomness proof).
                  </p>
                </div>
                <div>
                  <h3 className="font-oswald font-medium text-lg text-white mb-2">Profile Dashboard</h3>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    Shows SPX and SOL balances, displays live challenges created by the user (with cancel option),
                    and provides history of created/joined challenges with win/loss results and verification links.
                  </p>
                </div>
              </div>
            </div>

            {/* Fee Structure */}
            <div className="mb-12">
              <h2 className="font-oswald font-medium text-2xl text-white mb-6">
                Fee Structure
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fees.map((fee, index) => (
                  <div key={index} className="flex justify-between items-center border border-[#2a2a2a] rounded-lg p-4 bg-[#17161B]">
                    <span className="font-inter font-medium text-white">{fee.action}</span>
                    <span className="font-oswald font-medium text-[#F7B831]">{fee.fee}</span>
                  </div>
                ))}
              </div>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mt-4">
                Users must also pay normal Solana network fees and the VRF request cost in SOL.
                Keep a small amount of SOL in your wallet at all times.
              </p>
            </div>

            {/* Security Model */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Security Model
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1be088] mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-oswald font-medium text-lg text-white mb-1">Non-Custodial</h3>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      Spinx never controls user private keys or wallets.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1be088] mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-oswald font-medium text-lg text-white mb-1">Escrow System</h3>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      SPX tokens are locked in vault PDAs; payouts are executed by the program.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1be088] mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-oswald font-medium text-lg text-white mb-1">Randomness Integrity</h3>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      Only the official ORAO VRF program can fulfill randomness requests.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1be088] mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-oswald font-medium text-lg text-white mb-1">Determinism</h3>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      Settlement runs once per game and uses a simple, auditable rule.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1be088] mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-oswald font-medium text-lg text-white mb-1">Transparency</h3>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      All state is on-chain and can be reconstructed from accounts and logs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div className="mb-12">
              <h2 className="font-oswald font-medium text-2xl text-white mb-6">
                Getting Started
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-[#2a2a2a] rounded-xl p-4 bg-[#17161B] text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F7B831] flex items-center justify-center mx-auto mb-3">
                    <span className="font-oswald font-bold text-xl text-[#0D0C0F]">1</span>
                  </div>
                  <h3 className="font-oswald font-medium text-lg text-white mb-2">Connect Wallet</h3>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    Connect a compatible Solana wallet (e.g., Phantom, Solflare)
                  </p>
                </div>
                <div className="border border-[#2a2a2a] rounded-xl p-4 bg-[#17161B] text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F7B831] flex items-center justify-center mx-auto mb-3">
                    <span className="font-oswald font-bold text-xl text-[#0D0C0F]">2</span>
                  </div>
                  <h3 className="font-oswald font-medium text-lg text-white mb-2">Get Tokens</h3>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    Ensure you have SPX tokens and a small amount of SOL for fees
                  </p>
                </div>
                <div className="border border-[#2a2a2a] rounded-xl p-4 bg-[#17161B] text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F7B831] flex items-center justify-center mx-auto mb-3">
                    <span className="font-oswald font-bold text-xl text-[#0D0C0F]">3</span>
                  </div>
                  <h3 className="font-oswald font-medium text-lg text-white mb-2">Play & Verify</h3>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    Create a challenge or join one from Active Listings, then verify fairness
                  </p>
                </div>
              </div>
            </div>

            {/* Open Source */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Open Source & Verification
              </h2>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-4">
                SpinX smart contracts are open-sourced. The <a href="https://github.com/Spinx-fun/spinx-contract" target="_blank" rel="noreferrer" className="underline text-[#fff]">Github</a> repository contains source code,
                documentation, and build artifacts.
              </p>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                Anyone can review the code and verify deployed binaries by rebuilding and comparing
                hashes with the on-chain program.
              </p>
            </div>

            {/* Disclaimers */}
            <div className="border border-[#ff4444] rounded-xl p-6 bg-[#020617] mb-8">
              <h2 className="font-oswald font-medium text-2xl text-[#ff4444] mb-4">
                Important Disclaimers
              </h2>
              <div className="space-y-3">
                <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                  <strong className="text-white">Decentralized Application:</strong> Spinx is a decentralized application.
                  Users are responsible for complying with local laws and age restrictions.
                </p>
                <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                  <strong className="text-white">Financial Risk:</strong> Gambling carries financial risk — only stake
                  what you can afford to lose.
                </p>
                <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                  <strong className="text-white">Utility Token:</strong> SPX is a utility token used for platform
                  participation. No outcomes, profits, or returns are guaranteed.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}