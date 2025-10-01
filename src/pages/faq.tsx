/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import NeedMoreHelp from "../components/NeedMoreHelp";
import Header from "../components/Header";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] hover:border-[#324158] transition-colors">
      <h3 className="font-oswald font-medium text-xl text-[#F7B831] mb-3">
        {question}
      </h3>
      <div className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
        {answer}
      </div>
    </div>
  );
};

interface BulletPointProps {
  text: string;
}

const BulletPoint: React.FC<BulletPointProps> = ({ text }) => {
  return (
    <li className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-2">
      {text}
    </li>
  );
};

export default function FAQ() {
  const faqData = [
    {
      question: "What is Spinx?",
      answer: (
        <>
          <p className="mb-4">
            Spinx is a decentralized PvP casino on Solana. Players create or join coin flip challenges, and winners are decided by verifiable randomness (VRF). Funds are always held in smart contracts and payouts are automatic.
          </p>
          <div className="flex items-center gap-2">
            <img src="/image/coin.svg" alt="Coin" className="w-5 h-5" />
            <span className="text-white font-medium">Decentralized & Automatic</span>
          </div>
        </>
      )
    },
    {
      question: "How is Spinx different from traditional casinos?",
      answer: (
        <ul className="space-y-2">
          <BulletPoint text="No middlemen: All funds are locked in program-owned vaults." />
          <BulletPoint text="Provably fair: Outcomes come from ORAO's VRF, not from Spinx." />
          <BulletPoint text="On-chain transparency: Every game, vault, and randomness proof can be verified on Solana explorers." />
        </ul>
      )
    },
    {
      question: "How do I know the result wasn't manipulated?",
      answer: (
        <>
          <p className="mb-4">
            Each coin flip links to a Randomness Proof (VRF) account.
          </p>
          <ul className="space-y-2">
            <BulletPoint text="It is owned by the official ORAO VRF program." />
            <BulletPoint text="The stored randomness value decides the winner: randomness % 2 → Heads or Tails." />
            <BulletPoint text="You can check this directly on Solana Explorer or Solscan." />
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <img src="/image/refresh.svg" alt="VRF" className="w-5 h-5" />
            <span className="text-white font-medium">Verifiable Randomness</span>
          </div>
        </>
      )
    },
    {
      question: "Where are my tokens during a game?",
      answer: (
        <>
          <p className="mb-4">
            When you create or join a flip, your tokens are transferred into a vault account (PDA).
          </p>
          <ul className="space-y-2">
            <BulletPoint text="The vault is controlled only by the smart contract." />
            <BulletPoint text="Tokens are released automatically to the winner after settlement." />
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <img src="/image/wallet.svg" alt="Vault" className="w-5 h-5" />
            <span className="text-white font-medium">Smart Contract Controlled</span>
          </div>
        </>
      )
    },
    {
      question: "What fees are charged?",
      answer: (
        <>
          <p className="mb-4">
            Each accepted challenge includes a 0.005 SOL protocol fee that goes to the Spinx treasury. All other staked tokens go to the winner.
          </p>
          <div className="flex items-center gap-2">
            <img src="/image/dollar.svg" alt="Fees" className="w-5 h-5" />
            <span className="text-white font-medium">0.005 SOL per accepted challenge</span>
          </div>
        </>
      )
    },
    {
      question: "What tokens can I use?",
      answer: (
        <>
          <ul className="space-y-2">
            <BulletPoint text="You can only create challenges with SPX tokens." />
            <BulletPoint text="You must also hold a small amount of SOL to cover the transaction fee and the VRF request cost." />
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <img src="/image/coin.svg" alt="SPX" className="w-5 h-5" />
            <span className="text-white font-medium">SPX tokens only</span>
          </div>
        </>
      )
    },
    {
      question: "Can I cancel my challenge?",
      answer: (
        <>
          <p className="mb-4">
            Yes. If no one has joined yet, you can cancel/withdraw. Your tokens are returned from the vault to your wallet.
          </p>
          <div className="flex items-center gap-2">
            <img src="/image/table-left-arrow.svg" alt="Cancel" className="w-5 h-5" />
            <span className="text-white font-medium">Cancel anytime before opponent joins</span>
          </div>
        </>
      )
    },
    {
      question: "Where can I verify my past games?",
      answer: (
        <>
          <p className="mb-4">
            In your Profile dashboard you can view:
          </p>
          <ul className="space-y-2">
            <BulletPoint text="Games you created or joined" />
            <BulletPoint text="Results (Win/Loss)" />
            <BulletPoint text="Links to on-chain accounts: Game PDA, Vault, VRF Proof" />
          </ul>
          <div className="mt-4 flex items-center gap-2">
            <img src="/image/search.svg" alt="Verify" className="w-5 h-5" />
            <span className="text-white font-medium">Full transparency in Profile</span>
          </div>
        </>
      )
    }
  ];

  return (
    <>
      <Head>
        <title>FAQ | SpinX</title>
        <meta
          name="description"
          content="Frequently asked questions about SpinX - the decentralized PvP casino on Solana. Learn about gameplay, fees, verification, and more."
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
                Frequently Asked Questions
              </h1>
              <p className="font-inter font-normal text-lg text-[#90a2b9]">
                Everything you need to know about playing on SpinX
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-6 mb-12">
              {faqData.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>

            {/* Additional Help Section */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Need More Help?
              </h2>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-4">
                If you have additional questions or need support, you can:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://t.me/spinxfun" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#F7B831] hover:text-[#F7B831]/80 transition-colors"
                >
                  <img src="/image/support.svg" alt="Support" className="w-5 h-5" />
                  <span>Join our Telegram community</span>
                </a>
                <Link href="/how-it-works">
                  <a className="flex items-center gap-2 text-[#F7B831] hover:text-[#F7B831]/80 transition-colors">
                    <img src="/image/documentation.svg" alt="Docs" className="w-5 h-5" />
                    <span>Learn how verification works</span>
                  </a>
                </Link>
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