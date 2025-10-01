/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import NeedMoreHelp from "../components/NeedMoreHelp";
import Header from "../components/Header";

interface PrincipleCardProps {
  number: string;
  title: string;
  description: React.ReactNode;
  icon: string;
}

const PrincipleCard: React.FC<PrincipleCardProps> = ({ number, title, description, icon }) => {
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
        {description}
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

export default function ResponsibleGaming() {
  const principles = [
    {
      number: "1",
      title: "Play Within Limits",
      description: (
        <ul className="space-y-2">
          <BulletPoint text="Only stake what you can afford to lose." />
          <BulletPoint text="Do not chase losses." />
        </ul>
      ),
      icon: "/image/dollar.svg"
    },
    {
      number: "2",
      title: "Personal Responsibility",
      description: (
        <ul className="space-y-2">
          <BulletPoint text="You are solely responsible for your gaming decisions." />
          <BulletPoint text="Wallet connections and transactions cannot be reversed." />
        </ul>
      ),
      icon: "/image/user.svg"
    },
    {
      number: "3",
      title: "Age Restrictions",
      description: (
        <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
          Use of Spinx is prohibited for individuals under the legal gambling age in their jurisdiction.
        </p>
      ),
      icon: "/image/calendar.svg"
    },
    {
      number: "4",
      title: "Self-Control",
      description: (
        <ul className="space-y-2">
          <BulletPoint text="Take breaks and set personal limits." />
          <BulletPoint text="Seek professional advice if gambling interferes with your daily life." />
        </ul>
      ),
      icon: "/image/clock.svg"
    },
    {
      number: "5",
      title: "Disclaimer",
      description: (
        <ul className="space-y-2">
          <BulletPoint text="Spinx does not accept responsibility for irresponsible use of the Platform." />
          <BulletPoint text="Users must exercise caution and judgment." />
        </ul>
      ),
      icon: "/image/offline.svg"
    }
  ];

  return (
    <>
      <Head>
        <title>Responsible Gaming | SpinX</title>
        <meta
          name="description"
          content="Responsible gaming guidelines for SpinX - play within limits, maintain self-control, and gamble responsibly on our decentralized platform."
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
                Responsible Gaming Guidelines
              </h1>
              <p className="font-inter font-normal text-lg text-[#90a2b9]">
                Last Updated: 30.09.2025
              </p>
            </div>

            {/* Introduction */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                Spinx is a decentralized gaming platform. While designed to be transparent and fair, participation involves risks. Please follow these responsible gaming principles:
              </p>
            </div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {principles.map((principle, index) => (
                <PrincipleCard
                  key={index}
                  number={principle.number}
                  title={principle.title}
                  description={principle.description}
                  icon={principle.icon}
                />
              ))}
            </div>

            {/* Support Resources */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Need Help?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://t.me/spinxfun"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#F7B831] hover:text-[#F7B831]/80 transition-colors"
                >
                  <img src="/image/support.svg" alt="Support" className="w-5 h-5" />
                  <span>Contact our support team</span>
                </a>
                <Link href="/faq">
                  <a className="flex items-center gap-2 text-[#F7B831] hover:text-[#F7B831]/80 transition-colors">
                    <img src="/image/documentation.svg" alt="FAQ" className="w-5 h-5" />
                    <span>Visit our FAQ for more information</span>
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