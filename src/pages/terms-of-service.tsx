/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface TermSectionProps {
  number: string;
  title: string;
  content: React.ReactNode;
  icon: string;
}

const TermSection: React.FC<TermSectionProps> = ({ number, title, content, icon }) => {
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

export default function TermsOfService() {
  const terms = [
    {
      number: "1",
      title: "Acceptance of Terms",
      content: (
        <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
          By using Spinx, you agree to these Terms. If you do not agree, do not use the Platform.
        </p>
      ),
      icon: "/image/create.svg"
    },
    {
      number: "2",
      title: "Decentralized Nature",
      content: (
        <ul className="space-y-2">
          <BulletPoint text="Spinx is a smart-contract-based application deployed on Solana." />
          <BulletPoint text="The Platform is non-custodial; funds are locked in program-derived accounts." />
        </ul>
      ),
      icon: "/image/refresh.svg"
    },
    {
      number: "3",
      title: "No Guarantees",
      content: (
        <ul className="space-y-2">
          <BulletPoint text="Spinx does not guarantee uninterrupted access, absence of bugs, or future availability." />
          <BulletPoint text="All outcomes are determined by verifiable randomness; no refunds or reversals are possible." />
        </ul>
      ),
      icon: "/image/offline.svg"
    },
    {
      number: "4",
      title: "User Responsibility",
      content: (
        <ul className="space-y-2">
          <BulletPoint text="You are solely responsible for securing your wallet, private keys, and seed phrases." />
          <BulletPoint text="You are responsible for compliance with local laws, including age and gambling restrictions." />
        </ul>
      ),
      icon: "/image/user.svg"
    },
    {
      number: "5",
      title: "Limitation of Liability",
      content: (
        <ul className="space-y-2">
          <BulletPoint text="Spinx and its contributors disclaim all liability for losses, damages, or misuse of the Platform." />
          <BulletPoint text="Use of the Platform is entirely at your own risk." />
        </ul>
      ),
      icon: "/image/wallet.svg"
    },
    {
      number: "6",
      title: "Jurisdiction Disclaimer",
      content: (
        <ul className="space-y-2">
          <BulletPoint text="Accessing or using Spinx where it is prohibited by law is not permitted." />
          <BulletPoint text="Users are responsible for ensuring legality in their jurisdiction." />
        </ul>
      ),
      icon: "/image/search.svg"
    }
  ];

  return (
    <>
      <Head>
        <title>Terms of Service | SpinX</title>
        <meta
          name="description"
          content="Terms of Service for SpinX - the decentralized gaming platform on Solana. Read our terms regarding platform use, user responsibilities, and liability limitations."
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
                Terms of Service
              </h1>
              <p className="font-inter font-normal text-lg text-[#90a2b9]">
                Last Updated: 30.09.2025
              </p>
            </div>

            {/* Introduction */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                Please read these Terms of Service carefully before using the SpinX platform. By accessing or using our services, you agree to be bound by these terms.
              </p>
            </div>

            {/* Terms Sections */}
            <div className="space-y-6 mb-12">
              {terms.map((term, index) => (
                <TermSection
                  key={index}
                  number={term.number}
                  title={term.title}
                  content={term.content}
                  icon={term.icon}
                />
              ))}
            </div>

            {/* Important Notice */}
            <div className="border border-[#F7B831]/30 rounded-xl p-6 bg-[#F7B831]/10 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="font-oswald font-medium text-2xl text-[#F7B831]">
                  Important Legal Notice
                </h2>
              </div>
              <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9]">
                These terms constitute a legally binding agreement between you and SpinX. Your use of the platform indicates your acceptance of all terms and conditions outlined herein.
              </p>
            </div>

            {/* Additional Resources */}
            <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-8">
              <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                Additional Resources
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/responsible-gaming">
                  <a className="flex items-center gap-2 text-[#F7B831] hover:text-[#F7B831]/80 transition-colors">
                    <img src="/image/documentation.svg" alt="Responsible Gaming" className="w-5 h-5" />
                    <span>Responsible Gaming Guidelines</span>
                  </a>
                </Link>
                <Link href="/privacy-policy">
                  <a className="flex items-center gap-2 text-[#F7B831] hover:text-[#F7B831]/80 transition-colors">
                    <img src="/image/documentation.svg" alt="Privacy Policy" className="w-5 h-5" />
                    <span>Privacy Policy</span>
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