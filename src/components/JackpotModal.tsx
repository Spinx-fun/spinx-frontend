import { useState, useEffect, SetStateAction } from 'react'
import { Asset, assets } from '../utils/constants'
import { useSocket } from "../context/SocketContext";
import { errorAlert, warningAlert } from "./ToastGroup";
import { enterGame, playGame } from "../context/solana/transaction";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
    NEXT_COOLDOWN,
} from "../config";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getTokenPrice, rot13 } from '../utils/util';

export default function JackpotModal(props: {
    referralCode: string | null,
    handleCloseModal: Function
}) {
    const [activeAsset, setActiveAsset] = useState(assets[0])
    const wallet = useWallet();
    const [isTokenSelectModalOpened, setIsTokenSelectModalOpened] = useState(false)
    const [betAmount, setBetAmount] = useState<number>();
    const { gameData, isStarting, users } = useSocket();
    const [isBetLoading, setIsBetLoading] = useState(false);
    const [tokenPrices, setTokenPrices] = useState<{ [address: string]: number }>({});

    const handleBetAmount = (value: number) => {
        if (value < 0) return;
        setBetAmount(value);
    };

    const user = users.find(user => user.user_name === rot13(props.referralCode));

    const referrer = user ? new PublicKey(user.user_address) : null;


    const handleBet = async () => {
        if (!betAmount) {
            errorAlert("Please enter the correct amount!");
            return;
        }
        try {
            let amount = 0;
            if (activeAsset.symbol === 'SOL' || activeAsset.symbol === 'JTO') {
                amount = betAmount * LAMPORTS_PER_SOL;
            } else if (activeAsset.decimals) {
                amount = betAmount * 10 ** activeAsset.decimals;
            }
            if (gameData && (gameData?.players ?? []).length !== 0) {
                console.log('join pool', activeAsset.address, amount)
                if (
                    gameData.endTimestamp !== 0 &&
                    gameData.endTimestamp - Date.now() < NEXT_COOLDOWN
                ) {
                    warningAlert(
                        "This transaction may fail. Please try on the next round."
                    );
                    return;
                }

                await enterGame(
                    wallet,
                    new PublicKey(activeAsset.address),
                    new PublicKey(gameData.pda),
                    amount,
                    referrer,
                    setIsBetLoading,
                    gameData.endTimestamp
                );
            } else {
                console.log('creating pool', activeAsset.address, amount)
                await playGame(wallet, new PublicKey(activeAsset.address), amount, referrer, setIsBetLoading);
            }
            props.handleCloseModal()
        } catch (error) {
            console.log(error);
        }
    };

    const closeDropdown = (symbol: string) => {
        setActiveAsset(assets.find(asset => asset.symbol === symbol) as SetStateAction<Asset>)
        setIsTokenSelectModalOpened(false)
    }

    useEffect(() => {
        const fetchTokenPrices = async () => {
            const uniqueAddresses = Array.from(new Set(assets.map((asset: any) => asset.address)));
            const prices = await Promise.all(uniqueAddresses.map(async (address) => {
                const price = await getTokenPrice(address);
                return { address, price };
            }));
            const pricesMap = prices.reduce((acc, { address, price }) => {
                acc[address] = price;
                return acc;
            }, {} as { [address: string]: number });
            setTokenPrices(pricesMap);
        };

        fetchTokenPrices();
    }, []);
    console.log(tokenPrices)
    return (
        <div
            className="fixed left-0 top-0 w-full h-[100vh] backdrop-blur-sm z-[40] flex-col bg-[#00000050] grid place-content-center"
        >
            <div className="flex flex-col m-6 bg-[#17161B] md:w-[600px] lg:w-[774px] rounded-[5px]">
                <div className="flex flex-row items-center justify-between py-4 px-6 border-b border-[#ffffff10]">
                    <span className="text-[12px] text-[#8B8A8D] font-[500]">Jackpot Deposit</span>
                    <button onClick={() => props.handleCloseModal()}>
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.382578 7L2.67458 3.688L0.502578 0.64H1.99058L3.53858 2.776L5.06258 0.64H6.50258L4.35458 3.64L6.62258 7H5.11058L3.49058 4.528L1.84658 7H0.382578Z" fill="#8B8A8D" />
                        </svg>
                    </button>
                </div>
                <div className='flex flex-col sm:flex-row justify-between border-b border-[#ffffff10] '>
                    <div className="px-6 pt-12 sm:py-12 flex flex-col gap-2 w-full sm:w-1/3">
                        <div className="flex flex-col">
                            <span className="text-[12px] text-[#8B8A8D]">Select Token</span>
                        </div>
                        <div className='relative'>
                            <span className='cursor-pointer' onMouseDown={() => setIsTokenSelectModalOpened(!isTokenSelectModalOpened)}>
                                <button
                                    className="flex flex-row items-center  p-3 bg-[#1E1E21] rounded-[4px] justify-between w-full"
                                >
                                    <div className="flex flex-row items-center gap-2">
                                        <img
                                            src={activeAsset.src}
                                            className="w-[29px] h-[29px]"
                                        />
                                        <span className="font-[600] text-[12px] text-white">
                                            ${activeAsset.symbol}
                                        </span>
                                    </div>
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M12 1.6L6 8L5.59506e-07 1.6L1.5 -4.41102e-07L6 4.8L10.5 3.45703e-07L12 1.6Z" fill="#868587" />
                                    </svg>
                                </button>
                            </span>
                            {isTokenSelectModalOpened && (
                                <ul
                                    className="w-[180px] focus:outline-none bg-[#1E1E21] absolute z-50 mt-1 overflow-auto rounded-[5px] shadow"
                                    aria-labelledby="headlessui-listbox-button-:r193:" aria-orientation="vertical"
                                    id="headlessui-listbox-options-:r1c0:" role="listbox" tabIndex={0} data-headlessui-state="open"
                                    aria-activedescendant="headlessui-listbox-option-:r1c1:"
                                >
                                    {
                                        assets.map((asset, id) => {
                                            return (
                                                <li className="cursor-pointer px-5 py-2" key={id} role="option" aria-selected="false" data-headlessui-state="" onMouseDown={() => closeDropdown(asset.symbol)} onMouseOver={(e) => { e.currentTarget.className += ' bg-[#3b3c3630]' }} onMouseLeave={(e) => { e.currentTarget.className = 'cursor-pointer bg-opacity-100 px-5 py-2' }}>
                                                    <div className="flex items-center">
                                                        <img
                                                            src={asset.src}
                                                            alt={asset.symbol}
                                                            className="h-[29px]"
                                                        />
                                                        <div className="ml-2 flex flex-col">
                                                            <p className="font-bold text-[12px] text-white">
                                                                {asset.symbol}
                                                            </p>
                                                            <p className="text-xs text-[11px] text-[#8B8A8D]">{asset.name}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="px-6 pb-12 pt-6 sm:py-12 flex flex-col gap-2 w-full sm:w-2/3">
                        <span className="text-[12px] text-[#8B8A8D]">Amount</span>
                        <input
                            className='bg-[#1E1E21] rounded-[4px] text-[12px] text-[#8B8A8D] h-[56px] p-6 focus:outline-none'
                            placeholder='Type bet amount here...'
                            value={betAmount}
                            onChange={(e) =>
                                handleBetAmount(e.target.value as unknown as number)
                            }
                        />
                        <span className="text-[12px] text-[#8B8A8D]">Current Exchange Rate: 1 ${activeAsset.symbol} = ${tokenPrices[activeAsset.address]}</span>
                    </div>
                </div>
                <div className="flex justify-end p-6">
                    {/* <button className="bg-[#F7B831] text-[#17161B] text-[12px] font-[500] px-5 py-2 rounded-[4px] "
                        onClick={() => props.handleCloseModal()}
                    >
                        Place Bet
                    </button> */}
                    {(gameData?.players ?? []).length > 0 ? (
                        <>
                            {wallet.publicKey ? (
                                <button
                                    className="bg-[#F7B831] text-[#17161B] text-[12px] font-[500] px-5 py-2 rounded-[4px]"
                                    onClick={handleBet}
                                    disabled={isBetLoading}
                                >
                                    {isBetLoading ? (
                                        <>Waiting...</>
                                    ) : (
                                        <>Place Bet</>
                                    )}
                                </button>
                            ) : (
                                <div className="bg-[#F7B831] text-[#17161B] text-[12px] font-[500] rounded-[4px]">
                                    <WalletMultiButton />
                                </div>
                            )}
                        </>
                    ) : isStarting !== 0 ? (
                        <>
                            {wallet.publicKey ? (
                                <button
                                    className="bg-[#F7B831] text-[#17161B] text-[12px] font-[500] px-5 py-2 rounded-[4px]"
                                    onClick={handleBet}
                                    disabled={isBetLoading}
                                >
                                    {isBetLoading ? (
                                        <>Waiting...</>
                                    ) : (
                                        <>Place Bet</>
                                    )}
                                </button>
                            ) : (
                                <div className="bg-[#F7B831] text-[#17161B] text-[12px] font-[500] rounded-[4px]">
                                    <WalletMultiButton />
                                </div>
                            )}
                        </>
                    ) : (
                        <button
                            className="bg-[#F7B831] text-[#17161B] text-[12px] font-[500] px-5 py-2 rounded-[4px]"
                            disabled
                        >
                            Waiting...
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
