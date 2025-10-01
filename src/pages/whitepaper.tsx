/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  number?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, number }) => {
  return (
    <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
      <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
        {number && <span className="text-[#1be088] mr-2">{number}</span>}
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

interface ListItemProps {
  number: string;
  title: string;
  description: string;
}

const NumberedListItem: React.FC<ListItemProps> = ({ number, title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F7B831] flex items-center justify-center font-oswald font-bold text-[#0D0C0F] text-sm">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="font-oswald font-medium text-lg text-white mb-2">{title}</h3>
        <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
          {description}
        </p>
      </div>
    </div>
  );
};

interface StepProps {
  step: string;
  title: string;
  items: string[];
}

const ProcessStep: React.FC<StepProps> = ({ step, title, items }) => {
  return (
    <div className="border-l-2 border-[#324158] pl-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-inter font-medium text-sm text-[#F7B831]">{step}</span>
      </div>
      <h3 className="font-oswald font-medium text-lg text-white mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <p key={index} className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default function Whitepaper() {
  const conventionalFlaws = [
    {
      number: "1",
      title: "Custody of funds",
      description: "Players must deposit into centralized wallets, exposing them to theft, insolvency, or frozen accounts."
    },
    {
      number: "2",
      title: "Opaque randomness",
      description: "The process of deciding outcomes is hidden, allowing potential manipulation."
    },
    {
      number: "3",
      title: "Unverifiable execution",
      description: "Players cannot independently confirm that games are executed as promised."
    }
  ];

  const systemProperties = [
    "Non-custodial: Tokens are locked in program-derived accounts (vaults)",
    "Verifiable randomness: Game outcomes are based solely on ORAO's VRF, which produces randomness that is publicly verifiable on-chain",
    "Automatic settlement: Payouts are executed directly by the smart contract",
    "Public verifiability: All game states, vault balances, and randomness proofs are stored on-chain and visible via standard Solana explorers"
  ];

  const coinFlipSteps = [
    {
      step: "1. Challenge Creation",
      title: "A user initializes a CoinFlip account",
      items: [
        "A user escrows tokens into a vault account derived by program seeds",
        "The game remains open until an opponent joins"
      ]
    },
    {
      step: "2. Challenge Acceptance",
      title: "A second user joins by escrowing an equal amount of tokens",
      items: [
        "A second user joins by escrowing an equal amount of tokens",
        "The program then issues a randomness request to ORAO VRF"
      ]
    },
    {
      step: "3. Randomness and Settlement",
      title: "ORAO VRF writes randomness into the VRF account",
      items: [
        "Upon fulfillment, ORAO VRF writes randomness into the VRF account",
        "The Spinx program consumes the randomness, applying randomness % 2 to determine the winner",
        "The vault pays the winning player automatically"
      ]
    },
    {
      step: "4. Cancellation",
      title: "If no opponent joins, the creator can withdraw their tokens",
      items: [
        "If no opponent joins, the creator can withdraw their tokens"
      ]
    }
  ];

  const verificationItems = [
    "Game Account (PDA): Stores creator, opponent, stakes, and VRF reference",
    "Vault Account (PDA): Confirms tokens were locked during the game",
    "VRF Request Account: Owned by the ORAO VRF program, containing the randomness value used",
    "Deterministic Rule: Outcome = randomness % 2"
  ];

  const securityConsiderations = [
    {
      icon: "/image/wallet.svg",
      title: "Custody",
      description: "Users never deposit to Spinx-controlled wallets; all funds are escrowed in PDAs derived by the program."
    },
    {
      icon: "/image/refresh.svg",
      title: "Randomness integrity",
      description: "Only ORAO's VRF program can fulfill randomness requests; settlement validates the VRF account ownership and fulfillment status."
    },
    {
      icon: "/image/coin.svg",
      title: "Fair execution",
      description: "Settlement logic is deterministic and idempotent, preventing double execution."
    },
    {
      icon: "/image/search.svg",
      title: "Transparency",
      description: "Users can reconstruct full game history from logs and accounts on-chain."
    }
  ];

  return (
    <>
      <Head>
        <title>Technical Whitepaper | SpinX</title>
        <meta
          name="description"
          content="Technical whitepaper for SpinX - A Decentralized, Provably Fair Casino on Solana. Learn about our decentralized architecture, VRF integration, and security model."
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
                SpinX: A Decentralized, Provably Fair Casino on Solana
              </h1>
              <p className="font-inter font-normal text-lg text-[#90a2b9]">
                Technical whitepaper outlining the architecture and mechanics of our decentralized PvP casino platform
              </p>
            </div>

            {/* Abstract */}
            <Section title="Abstract">
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                Online gambling today relies on centralized platforms that require players to trust custodians for
                fund safety and fair outcomes. Such systems are opaque, subject to manipulation, and vulnerable
                to custodial risk. Spinx proposes a fully decentralized PvP casino built on Solana, where outcomes
                are determined by verifiable randomness (VRF) and funds are held in program-owned vaults. This
                ensures that results are provably fair, transparent, and non-custodial.
              </p>
            </Section>

            {/* Introduction */}
            <Section title="Introduction" number="1">
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-4">
                Conventional online casinos suffer from three critical flaws:
              </p>
              <div className="space-y-4 mb-6">
                {conventionalFlaws.map((flaw, index) => (
                  <NumberedListItem
                    key={index}
                    number={flaw.number}
                    title={flaw.title}
                    description={flaw.description}
                  />
                ))}
              </div>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                Spinx eliminates these flaws by decentralizing custody, randomness, and settlement.
              </p>
            </Section>

            {/* System Overview */}
            <Section title="System Overview" number="2">
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-4">
                Spinx is deployed as a Solana program with the following properties:
              </p>
              <div className="space-y-3">
                {systemProperties.map((property, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1be088] mt-1 flex-shrink-0"></div>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      {property}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Coin Flip Game Mechanics */}
            <Section title="Coin Flip Game Mechanics" number="3">
              <div className="space-y-6">
                {coinFlipSteps.map((step, index) => (
                  <ProcessStep
                    key={index}
                    step={step.step}
                    title={step.title}
                    items={step.items}
                  />
                ))}
              </div>
            </Section>

            {/* Verification Model */}
            <Section title="Verification Model" number="4">
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-4">
                Each completed game can be independently verified by any user:
              </p>
              <div className="space-y-3 mb-4">
                {verificationItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#F7B831] mt-1 flex-shrink-0"></div>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                Verification requires no trust in Spinx or any operator—only in the cryptographic guarantees of VRF
                and Solana&apos;s consensus.
              </p>
            </Section>

            {/* Security Considerations */}
            <Section title="Security Considerations" number="5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {securityConsiderations.map((security, index) => (
                  <div key={index} className="border border-[#2a2a2a] rounded-xl p-4 bg-[#17161B]">
                    <div className="flex items-center gap-2 mb-3">
                      <img src={security.icon} alt={security.title} className="w-6 h-6" />
                      <h3 className="font-oswald font-medium text-lg text-white">{security.title}</h3>
                    </div>
                    <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                      {security.description}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Conclusion */}
            <Section title="Conclusion" number="6">
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                Spinx demonstrates that online gambling can operate without custodians, opaque logic, or
                unverifiable randomness. By combining Solana&apos;s high-throughput blockchain with verifiable
                randomness, Spinx establishes a transparent, provably fair system for decentralized gaming.
              </p>
            </Section>

            {/* Technical References */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Technical References
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#324158] mt-1 flex-shrink-0"></div>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    <strong className="text-white">ORAO VRF:</strong> Verifiable Random Function implementation providing cryptographically secure randomness
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#324158] mt-1 flex-shrink-0"></div>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    <strong className="text-white">Solana Program Derived Addresses (PDAs):</strong> Deterministic account addresses derived from program seeds
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#324158] mt-1 flex-shrink-0"></div>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    <strong className="text-white">On-chain Verification:</strong> All game data stored transparently on Solana blockchain
                  </p>
                </div>
              </div>
            </div>

            {/* Key Innovations */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Key Innovations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1be088] flex items-center justify-center mx-auto mb-3">
                    <img src="/image/wallet.svg" alt="Non-custodial" className="w-6 h-6 invert" />
                  </div>
                  <h3 className="font-oswald font-medium text-lg text-white mb-2">Non-Custodial</h3>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    Funds never leave user control, eliminating custodial risk
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F7B831] flex items-center justify-center mx-auto mb-3">
                    <img src="/image/refresh.svg" alt="Provably Fair" className="w-6 h-6 invert" />
                  </div>
                  <h3 className="font-oswald font-medium text-lg text-white mb-2">Provably Fair</h3>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    VRF-based randomness ensures verifiable fairness
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#324158] flex items-center justify-center mx-auto mb-3">
                    <img src="/image/search.svg" alt="Transparent" className="w-6 h-6" />
                  </div>
                  <h3 className="font-oswald font-medium text-lg text-white mb-2">Fully Transparent</h3>
                  <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                    All operations visible on-chain via standard explorers
                  </p>
                </div>
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