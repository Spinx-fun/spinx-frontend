/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface VerificationStepProps {
  title: string;
  description: string;
  icon: string;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ title, description, icon }) => {
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

interface VerificationItemProps {
  number: string;
  title: string;
  description: string;
}

const VerificationItem: React.FC<VerificationItemProps> = ({ number, title, description }) => {
  return (
    <div className="flex items-start gap-2">
      <div className="w-6 h-6 rounded-full bg-[#F7B831] flex items-center justify-center font-oswald font-bold text-[#0D0C0F] text-sm flex-shrink-0">
        {number}
      </div>
      <div>
        <h3 className="font-oswald font-medium text-lg text-white mb-1 -mt-1">{title}</h3>
        <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function HowItWorks() {
  const verificationSteps = [
    {
      title: "Game Account (PDA)",
      description: "The on-chain record of the flip. It shows who created the challenge, who joined, how much was staked, and the linked VRF request.",
      icon: "/image/gamepad.svg"
    },
    {
      title: "Vault Account (PDA)",
      description: "The escrow account that holds the staked tokens. You can confirm that the tokens were locked before the game and released only after settlement.",
      icon: "/image/wallet.svg"
    },
    {
      title: "Randomness Proof (VRF)",
      description: "A request handled by the official ORAO VRF program. When fulfilled, it contains the random number used to decide the flip.",
      icon: "/image/refresh.svg"
    }
  ];

  const vrfChecks = [
    {
      check: "You can check that the account is owned by the ORAO VRF program (so no one else could have generated it).",
      icon: "/image/search.svg"
    },
    {
      check: "The random value stored here is the one our contract used.",
      icon: "/image/coin.svg"
    },
    {
      check: "Rule: randomness % 2 → 0 = Heads, 1 = Tails.",
      icon: "/image/sort.svg"
    }
  ];

  const finalConfirmations = [
    {
      number: "1",
      title: "Tokens were really staked.",
      description: "Verify that SPX tokens were locked in the vault before the game started."
    },
    {
      number: "2",
      title: "The result was decided by ORAO's verifiable randomness.",
      description: "Confirm that the outcome was determined by the official ORAO VRF program."
    },
    {
      number: "3",
      title: "The winner was paid out automatically by the contract.",
      description: "Ensure that the winning player received their payout through the smart contract."
    }
  ];

  return (
    <>
      <Head>
        <title>How It Works | SpinX</title>
        <meta
          name="description"
          content="Learn how every coin flip on SpinX is provably fair and can be verified directly on the Solana blockchain through Game Accounts, Vault Accounts, and VRF proofs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        {/* Sidebar - Hidden on mobile and tablet (below lg) */}
        <div className="hidden lg:block">
          <Sidebar activeItem="documentation" />
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
                How It Works
              </h1>
              <p className="font-inter font-normal text-lg text-[#90a2b9]">
                Every coin flip on Spinx is provably fair and can be verified directly on the Solana blockchain.
              </p>
            </div>

            {/* Introduction */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Provably Fair Gaming
              </h2>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                Every aspect of our coin flip games can be independently verified through on-chain data. 
                No trust in Spinx or any operator is required—only in the cryptographic guarantees of VRF 
                and Solana&apos;s consensus mechanism.
              </p>
            </div>

            {/* Verification Components */}
            <div className="mb-12">
              <h2 className="font-oswald font-medium text-2xl text-white mb-6">
                Verification Components
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {verificationSteps.map((step, index) => (
                  <VerificationStep
                    key={index}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                  />
                ))}
              </div>
            </div>

            {/* Randomness Proof Details */}
            <Section title="Randomness Proof (VRF)">
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-4">
                The Randomness Proof is a request handled by the official ORAO VRF program. When fulfilled, 
                it contains the random number used to decide the flip.
              </p>
              <div className="space-y-3">
                {vrfChecks.map((check, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <img src={check.icon} alt="Check" className="w-5 h-5 -mt-0.5 flex-shrink-0" />
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      {check.check}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* What You Can Confirm */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-6">
                Together, these three links let anyone confirm:
              </h2>
              <div className="space-y-4">
                {finalConfirmations.map((item, index) => (
                  <VerificationItem
                    key={index}
                    number={item.number}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </div>

            {/* Verification Process */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Complete Verification Process
              </h2>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                By examining the Game Account, Vault Account, and VRF Proof together, you can independently 
                verify that every game was conducted fairly according to the rules programmed into the smart contract.
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

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
      <h2 className="font-oswald font-medium text-2xl text-white mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}