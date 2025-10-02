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

export default function Support() {
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
                <title>Support | SpinX</title>
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
                    <Sidebar activeItem="support" />
                </div>

                {/* Main Content */}
                <div className="flex flex-col flex-1 min-h-screen bg-[#0a101e] lg:ml-[248px]">
                    {/* Header Space - Matching other pages */}
                    <div className="px-3 xl:px-12 pt-6">
                        <Header showSearch={false} />
                    </div>
                    <div className="pt-6 px-3 lg:px-12 min-h-[63vh]">
                        <div className="mb-8">
                            <h1 className="font-oswald font-bold text-4xl text-white mb-4">
                                Support
                            </h1>
                            <h2 className="font-oswald font-normal text-2xl text-[#fff] mt-8 mb-4">
                                Need Help?
                            </h2>

                            <p className="font-inter font-normal text-lg text-[#90a2b9]">
                                For any questions, technical issues, or concerns, please contact our support team at:
                            </p>
                        </div>

                        {/* SPX-Only Participation */}
                        <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617] mb-12">
                            <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
                                📧 support@spinx.fun
                            </h2>
                            <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-4">
                                We’ll get back to you as quickly as possible.
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