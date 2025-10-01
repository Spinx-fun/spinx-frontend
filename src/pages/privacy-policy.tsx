/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import NeedMoreHelp from "../components/NeedMoreHelp";
import Header from "../components/Header";

interface PrivacySectionProps {
  number: string;
  title: string;
  content: React.ReactNode;
  icon: string;
}

const PrivacySection: React.FC<PrivacySectionProps> = ({ number, title, content, icon }) => {
  return (
    <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] hover:border-[#324158] transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#F7B831] flex items-center justify-center font-oswald font-bold text-[#0D0C0F] text-lg">
          {number}
        </div>
        <img src={icon} alt={title} className="w-6 h-6" />
        <h3 className="font-oswald font-medium text-xl text-white">{title}</h3>
      </div>
      <div className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
        {content}
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

export default function PrivacyPolicy() {
  const privacySections = [
    {
      number: "1",
      title: "No Personal Data Collected",
      content: (
        <ul className="space-y-2">
          <BulletPoint text="Spinx does not collect names, addresses, phone numbers, email addresses, or government IDs." />
          <BulletPoint text="No Know-Your-Customer (KYC) procedures are performed." />
        </ul>
      ),
      icon: "/image/user.svg"
    },
    {
      number: "2",
      title: "Wallet Connections",
      content: (
        <ul className="space-y-2">
          <BulletPoint text="Users connect to the Platform using a compatible Solana wallet." />
          <BulletPoint text="Wallet addresses are pseudonymous and under the user's control." />
        </ul>
      ),
      icon: "/image/wallet.svg"
    },
    {
      number: "3",
      title: "On-Chain Activity",
      content: (
        <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
          All transactions, balances, and game outcomes are recorded on the Solana blockchain, which is public and outside of Spinx&apos;s control.
        </p>
      ),
      icon: "/image/refresh.svg"
    },
    {
      number: "4",
      title: "Third-Party Services",
      content: (
        <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
          The Platform may integrate with Solana RPC providers or randomness oracles (e.g., ORAO VRF). These services have their own privacy policies.
        </p>
      ),
      icon: "/image/search.svg"
    },
    {
      number: "5",
      title: "Children's Use",
      content: (
        <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
          Spinx is not intended for individuals under the legal gambling age in their jurisdiction.
        </p>
      ),
      icon: "/image/calendar.svg"
    },
    {
      number: "6",
      title: "Policy Changes",
      content: (
        <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
          Updates will be published on this page. Continued use of the Platform indicates acceptance.
        </p>
      ),
      icon: "/image/clock.svg"
    }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy | SpinX</title>
        <meta
          name="description"
          content="Privacy Policy for SpinX - the decentralized gaming platform. Learn about our no personal data collection policy, wallet connections, and on-chain activity."
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
                Privacy Policy
              </h1>
              <p className="font-inter font-normal text-lg text-[#90a2b9]">
                Last Updated: 30.09.2025
              </p>
            </div>

            {/* Introduction */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                Spinx (&quot;the Platform&quot;) respects your privacy. This policy explains what information is and is not collected when using our decentralized application.
              </p>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-6 mb-12">
              {privacySections.map((section, index) => (
                <PrivacySection
                  key={index}
                  number={section.number}
                  title={section.title}
                  content={section.content}
                  icon={section.icon}
                />
              ))}
            </div>

            {/* Additional Resources */}
            <div className="mb-8">
              <NeedMoreHelp
                title="Privacy Questions?"
                description="If you have questions about privacy or data handling, we're here to help."
              />
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}