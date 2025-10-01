import { useState, useEffect, SetStateAction } from 'react'
import { Asset, assets } from '../utils/constants'
import { joinCoinflip } from "../context/solana/transaction";
import { useWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import AnimatedResultText from "./AnimatedResultText";

// Utility function to detect Safari browser
const isSafari = (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!(window.navigator.vendor &&
        window.navigator.vendor.indexOf('Apple') > -1 &&
        window.navigator.userAgent &&
        window.navigator.userAgent.indexOf('CriOS') == -1 &&
        window.navigator.userAgent.indexOf('FxiOS') == -1);
};

export default function JoinCoinflipModal(props: {
    coinId: number,
    amount: number,
    creatorAta: string,
    poolId: number,
    pickValue: string | number,
    handleCloseModal: Function
}) {
    const [activeAsset, setActiveAsset] = useState(assets[0])
    const wallet = useWallet();
    const [isTokenSelectModalOpened, setIsTokenSelectModalOpened] = useState(false);
    const [isBetLoading, setIsBetLoading] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [isSafariBrowser, setIsSafariBrowser] = useState<boolean>(false);

    // Preload the appropriate coin animation based on browser
    useEffect(() => {
        const safari = isSafari();
        setIsSafariBrowser(safari);

        // Preload the animation for current platform
        const preloadImage = new Image();
        preloadImage.src = safari ? "/image/coin.gif" : "/image/coin.webm";
    }, []);

    const handleDeposit = async () => {
        try {
            let result = await joinCoinflip(wallet, props.coinId, new PublicKey(activeAsset.address), props.amount, new PublicKey(props.creatorAta), props.poolId, setIsBetLoading)
            setWinner(result);
        } catch (error) {
            setIsBetLoading(false)
            console.log(error);
        }
    };

    const closeDropdown = (symbol: string) => {
        setActiveAsset(assets.find(asset => asset.symbol === symbol) as SetStateAction<Asset>)
        setIsTokenSelectModalOpened(false)
    }
    // Determine which coin image to show based on winner
    const getCoinImage = () => {
        if (!winner && props.pickValue == "HEADS") return "/image/sfx-coin-tail.svg"; // Default to heads before transaction
        if (!winner && props.pickValue == "TAILS") return "/image/sfx-coin.svg"; // Default to heads before transaction
        return winner === wallet.publicKey?.toBase58() && props.pickValue == "HEADS"
            ? "/image/sfx-coin-tail.svg"  // Heads if current user won
            : winner === wallet.publicKey?.toBase58() && props.pickValue == "TAILS"
                ? "/image/sfx-coin.svg"
                : winner !== wallet.publicKey?.toBase58() && props.pickValue == "HEADS"
                    ? "/image/sfx-coin.svg"
                    : "/image/sfx-coin-tail.svg"; // Tails if current user lost
    };

    return (
        <div
            className="fixed left-0 top-0 w-full h-[100vh] backdrop-blur-sm z-[40] flex-col bg-[#00000050] grid place-content-center overflow-visible"
        >
            <div className="flex flex-col m-6 bg-[#10152b] w-[380px] rounded-[5px] relative overflow-visible">
                <div className="flex flex-row items-center justify-between py-4 px-6 border-b border-[#ffffff10]">
                    <span className="text-[14px] text-[#8B8A8D] font-[500]">Join Coinflip</span>
                    <button onClick={() => props.handleCloseModal()}>
                        <svg width="12" height="12" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.382578 7L2.67458 3.688L0.502578 0.64H1.99058L3.53858 2.776L5.06258 0.64H6.50258L4.35458 3.64L6.62258 7H5.11058L3.49058 4.528L1.84658 7H0.382578Z" fill="#8B8A8D" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-row items-center justify-between py-4 px-6 border-b border-[#ffffff10]">
                    <span className="text-[16] text-[#8B8A8D] font-[500]">You : {props.pickValue == "HEADS" ? "Tails" : "Heads"}</span>
                    <span className="text-[16] text-[#8B8A8D] font-[500]">Oponent : {props.pickValue == "HEADS" ? "Heads" : "Tails"}</span>
                </div>

                {/* Coin Display Area - Fixed height to prevent layout shifts */}
                <div className="flex justify-center items-center h-[168px] px-6 pt-4">
                    {isBetLoading ? (
                        // Show animation during transaction
                        isSafariBrowser ? (
                            <img
                                src="/image/coin.gif"
                                alt="Coin Animation"
                                className="w-[168px] h-[168px]"
                            />
                        ) : (
                            <video
                                src="/image/coin.webm"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-[168px] h-[168px]"
                            />
                        )
                    ) : (
                        // Show static coin image
                        <img
                            src={getCoinImage()}
                            alt="Coin"
                            className="w-[150px] h-[150px] mt-[18px]"
                        />
                    )}
                </div>

                {/* Enhanced Win/Loss Animation */}
                <div className="result-animation-container">
                    <AnimatedResultText
                        isWin={winner === wallet.publicKey?.toBase58()}
                        show={!!winner}
                    />
                </div>
                <div className="flex justify-center p-6 gap-4">
                    {wallet.publicKey ? (
                        <button
                            className="rounded-[2px_8px] py-2 px-4 w-[160px] h-[37px] mb-4 shadow-[0_4px_14px_0_rgba(27,224,136,0.45)] bg-[#1be088] flex items-center justify-center"
                            onClick={handleDeposit}
                            disabled={isBetLoading || !!winner}
                        >
                            {isBetLoading ? (
                                <>Waiting...</>
                            ) : (
                                <>Join</>
                            )}
                        </button>
                    ) : (
                        <div className="bg-[#F7B831] hover:opacity-90 text-[#17161B] text-[12px] font-[500] rounded-[4px]">
                            <WalletMultiButton />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
