/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useMemo } from "react";
import { UnknownUserIcon } from "../components/Svglist";
import { useWallet } from "@solana/wallet-adapter-react";
import StatusControls from "../components/StatusControls";
import Sidebar from "../components/Sidebar";
import { PublicKey } from "@solana/web3.js";
import Head from "next/head";
import {
    API_URL
} from "../config";
import { useRouter } from "next/router";
import { Coinflip } from "../utils/type";

export const getTokenLogo = (address: string) => {
    switch (address) {
        case 'So11111111111111111111111111111111111111112':
            return '/img/sol.png'
        case 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN':
            return '/img/jup.png'
        case 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v':
            return '/img/usdc.png'
        case 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm':
            return '/img/wif.png'
        case 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL':
            return '/img/jto.png'
        default:
            break;
    }
}

export default function Rooms() {
    const router = useRouter();
    const wallet = useWallet();

    const goHistory = () => {
        router.push('/history');
    }

    const [isClaimingLoading, setIsClaimingLoading] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenJoinModal, setIsOpenJoinModal] = useState(false);
    const [isOpenRoundModal, setIsOpenRoundModal] = useState(false);
    const [force, setForce] = useState(false);

    const [selectedPda, setSelectedPda] = useState('');
    const [selectedPoolAmount, setSelectedPoolAmount] = useState(0);
    const [selectedSetNumber, setSelectedSetNumber] = useState(0);
    const [selectedGame, setSelectedGame] = useState<Coinflip>();
    const [sortOrder, setSortOrder] = useState('asc');
    const [referralCode, setReferralCode] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const refCode = localStorage.getItem('referralCode');
            if (refCode) {
                setReferralCode(refCode)
            }
        }
    }, [])

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleOpenJoinModal = (pda: string, poolAmount: number, setNumber: number) => {
        setSelectedPda(pda);
        setSelectedPoolAmount(poolAmount);
        setSelectedSetNumber(setNumber);
        setIsOpenJoinModal(true);
    };

    const handleCloseJoinModal = () => {
        setIsOpenJoinModal(false);
    };

    const handleOpenRoundModal = (game: any) => {
        setSelectedGame(game);
        setIsOpenRoundModal(true);
    };

    const handleCloseRoundModal = () => {
        setIsOpenRoundModal(false);
    };
    useEffect(() => {
        const intervalId = setInterval(async () => {
            setForce(!force);
        }, 1000);
        // Clear interval if the component unmounts or when dependencies change.
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Head>
                <title>Coinflip | SpinX</title>
                <meta
                    name="description"
                    content="SpinX | Best Crypto PvP Gambling Website"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex">
                {/* Sidebar - Hidden on mobile and tablet (below lg) */}
                <div className="hidden lg:block">
                    <Sidebar activeItem="home" />
                </div>

                {/* Main Content */}
                <div
                    className={`flex flex-row justify-end gap-2 xl:gap-6 px-3 lg:px-12 pb-12 pt-6 bg-cover bg-no-repeat flex-1 flex-wrap bg-[#0a101e] lg:ml-[248px] min-h-screen`}
                >
                    <div className="overflow-y-auto grow mx-auto">
                        <StatusControls />
                    </div>

                    <div className="overflow-y-auto grow mx-auto hidden">
                        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-4">
                            <div className="flex flex-row w-full lg:w-fit grow justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-[#ffffff7f] text-[8px] md:text-[12px] font-[500] mr-2">Sort by:</span>
                                    <button
                                        className={`${sortOrder === 'asc' ? 'bg-[#F7B831] text-[#0D0C0F]' : 'bg-[#17161B] text-white'} hover:opacity-90 rounded-[4px] px-[8px] md:px-[35px] py-[8px] h-[31px] md:h-[42px] text-[8px] md:text-[12px] font-[600]`}
                                        onClick={() => setSortOrder('asc')}
                                    >
                                        Low To High
                                    </button>
                                    <button
                                        className={`${sortOrder === 'desc' ? 'bg-[#F7B831] text-[#0D0C0F]' : 'bg-[#17161B] text-white'} hover:opacity-90 rounded-[4px] px-[8px] md:px-[35px] py-[8px] h-[31px] md:h-[42px] text-[8px] md:text-[12px] font-[600]`}
                                        onClick={() => setSortOrder('desc')}
                                    >
                                        High To Low
                                    </button>
                                </div>
                                <button
                                    className="bg-[#17161B] hover:opacity-90 rounded-[4px] px-[35px] py-[8px] h-[42px] text-white text-[10px] md:text-[12px] font-[600]"
                                    onClick={goHistory}
                                >
                                    History
                                </button>
                            </div>
                            <div className="flex flex-row w-full lg:w-fit justify-between items-center gap-3 md:gap-6">
                                <div className="flex flex-row divide-x divide-[#ffffff16]">
                                </div>
                                <button
                                    className="bg-[#F7B831] hover:opacity-90 rounded-[4px] px-[35px] py-[8px] h-[42px] text-[#0D0C0F] text-[10px] md:text-[12px] font-[600]"
                                    onClick={handleOpenModal}
                                >
                                    Create Coinflip
                                </button>
                            </div>
                        </div>
                        <div className="pt-6 table border-separate border-spacing-x-0 border-spacing-y-1 rounded-3xl table-auto w-full text-[#8b8a8d] text-[11px]">
                            <div className='sm:table-header-group sticky top-0 hidden'>
                                <div className='table-row bg-[#17161B]'>
                                    <div className="table-cell text-left px-8 py-4 rounded-l-[5px]">Players</div>
                                    <div className="table-cell text-left px-8 py-4">Tokens</div>
                                    <div className='table-cell text-left px-8 py-4'>Total</div>
                                    <div className='table-cell text-left px-8 py-4 rounded-r-[5px]'></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
