import { useEffect, useState } from 'react'
import { getDecimals, getSymbol } from '../utils/constants'
import { UnknownUserIcon } from "../components/Svglist";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getTokenLogo } from '../pages/coinflip';
import { claimCoinflip } from '../context/solana/transaction';
import ReactPlayer from 'react-player';
import { useSocket } from '../context/SocketContext';

export default function CoinflipModal(props: {
    game: any
    isDrawing: boolean,
    setIsDrawing: Function,
    handleCloseModal: Function
    handleOpenJoinModal: Function
}) {
    const wallet = useWallet();
    const { coinflipWinner, setClearCoinflip } = useSocket();
    const [isClaimingLoading, setIsClaimingLoading] = useState(false);
    const [video, setVideo] = useState('');

    const handleAfterDrawing = () => {
        props.game.winner = coinflipWinner;
        props.setIsDrawing(false);
        setClearCoinflip();
    }

    useEffect(() => {
        if (coinflipWinner === props.game.creator_player) {
            props.game.creator_number === 1 ? setVideo('/videos/head.webm') : setVideo('/videos/tail.webm')
        } else if (coinflipWinner === props.game.joiner_player) {
            props.game.joiner_number === 1 ? setVideo('/videos/head.webm') : setVideo('/videos/tail.webm')
        }
    }, [coinflipWinner])

    const handleJoin = () => {
        props.handleCloseModal();
        props.handleOpenJoinModal(props.game.pda, props.game.pool_amount, props.game.creator_number);
    }

    const handleClaim = async (pda: string, mintA: string, mintB: string) => {
      await claimCoinflip(wallet, new PublicKey(pda), new PublicKey(mintA), new PublicKey(mintB), setIsClaimingLoading);
      props.handleCloseModal();
    }

    return (
        <div
            className="fixed left-0 top-0 w-full h-[100vh] backdrop-blur-sm z-[40] flex-col bg-[#00000050] grid place-content-center"
        >
            <div className="flex flex-col m-6 bg-[#17161B] w-[calc(100vw-30px)] md:w-fit rounded-[5px]">
                <div className="flex flex-row items-center justify-between py-4 px-6 border-b border-[#ffffff10]">
                    <span className="text-[12px] text-[#8B8A8D] font-[500]">Coinflip Round</span>
                    <button onClick={() => props.handleCloseModal()}>
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.382578 7L2.67458 3.688L0.502578 0.64H1.99058L3.53858 2.776L5.06258 0.64H6.50258L4.35458 3.64L6.62258 7H5.11058L3.49058 4.528L1.84658 7H0.382578Z" fill="#8B8A8D" />
                        </svg>
                    </button>
                </div>
                <div className='flex flex-col border-b border-[#ffffff10] px-4 py-8'>
                    <div className='hidden sm:flex flex-row justify-between items-center px-8 gap-6 sm:gap-12'>
                        <div className='relative'>
                            <img src={props.game.creator} className="w-[138px] h-[138px]" />
                            {props.game.creator_number === 1
                                ? <img src='/img/head.png' className='w-[44px] h-[44px] absolute bottom-[-12px] left-[-12px]' />
                                : <img src='/img/tail.png' className='w-[44px] h-[44px] absolute bottom-[-12px] left-[-12px]' />
                            }
                        </div>
                        {props.game.winner !== '11111111111111111111111111111111' ? 
                            props.game.winner === props.game.creator_player ?
                                props.game.creator_number === 1 ?
                                    <img src='/img/head.png' className='w-[138px] h-[138px]' />
                                    :
                                    <img src='/img/tail.png' className='w-[138px] h-[138px]' />
                                :
                                props.game.joiner_number === 1 ?
                                    <img src='/img/head.png' className='w-[138px] h-[138px]' />
                                    :
                                    <img src='/img/tail.png' className='w-[138px] h-[138px]' />
                            :
                            props.isDrawing && video !== '' ?
                                <ReactPlayer url={video} playing={true} loop={false} onEnded={handleAfterDrawing} width={138} height={138}/>
                                :
                                <div className='bg-[#0D0C0F] w-[138px] h-[138px] rounded-full'></div>
                        }
                        <div className='relative'>
                            {props.game.winner !== '11111111111111111111111111111111'
                                ? <img src={props.game.joiner} className="w-[138px] h-[138px]" />
                                : props.isDrawing ? <img src={props.game.joiner} className="w-[138px] h-[138px]" /> : <UnknownUserIcon size="138" />}
                                {props.game.creator_number === 1
                                    ? <img src='/img/tail.png' className='w-[44px] h-[44px] absolute bottom-[-12px] right-[-12px]' />
                                    : <img src='/img/head.png' className='w-[44px] h-[44px] absolute bottom-[-12px] right-[-12px]' />
                                }
                        </div>
                    </div>
                    <div className='flex sm:hidden flex-row items-center justify-between px-4'>
                        <div className='flex flex-col gap-2 items-center'>
                            <div className='relative'>
                                <img src={props.game.creator} className="w-[86px] h-[86px]" />
                                {props.game.creator_number === 1
                                    ? <img src='/img/head.png' className='w-[24px] h-[24px] absolute bottom-[-8px] left-[-8px]' />
                                    : <img src='/img/tail.png' className='w-[24px] h-[24px] absolute bottom-[-8px] left-[-8px]' />
                                }
                            </div>
                        </div>
                        {props.game.winner !== '11111111111111111111111111111111' ? 
                            props.game.winner === props.game.creator_player ?
                                props.game.creator_number === 1 ?
                                    <img src='/img/head.png' className='w-[58px] h-[58px]' />
                                    :
                                    <img src='/img/tail.png' className='w-[58px] h-[58px]' />
                                :
                                props.game.joiner_number === 1 ?
                                    <img src='/img/head.png' className='w-[58px] h-[58px]' />
                                    :
                                    <img src='/img/tail.png' className='w-[58px] h-[58px]' />
                            :
                            props.isDrawing && video !== '' ?
                                <ReactPlayer url={video} playing={true} loop={false} onEnded={handleAfterDrawing} width={58} height={58}/>
                                :
                                <div className='bg-[#0D0C0F] w-[58px] h-[58px] rounded-full'></div>
                        }
                        <div className='flex flex-col gap-2 items-center'>
                            <div className='relative'>
                                {props.game.winner !== '11111111111111111111111111111111'
                                    ? <img src={props.game.joiner} className="w-[86px] h-[86px]" />
                                    : props.isDrawing ? <img src={props.game.joiner} className="w-[86px] h-[86px]" /> : <UnknownUserIcon size="86" />}
                                {props.game.creator_number === 1
                                    ? <img src='/img/tail.png' className='w-[24px] h-[24px] absolute bottom-[-8px] right-[-8px]' />
                                    : <img src='/img/head.png' className='w-[24px] h-[24px] absolute bottom-[-8px] right-[-8px]' />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 bg-[#1E1E21] rounded-[4px] justify-center border border-[#ffffff0f] mt-8 px-2 py-4 items-center'>
                        <span className='text-center text-[11px] text-white font-[500]'>{props.game.creator_name}</span>
                        <span className='text-center text-[11px] text-[#8B8A8D] font-[500]'>vs</span>
                        <span className='text-center text-[11px] text-white font-[500]'>
                            {props.game.winner !== '11111111111111111111111111111111'
                                ? props.game.joiner_name
                                : props.isDrawing ? props.game.joiner_name : 'Waiting for Players...'}
                        </span>
                    </div>
                    <div className='flex flex-col sm:flex-row mt-3 gap-3'>
                        <div className='flex flex-col w-full sm:w-1/2 gap-2'>
                            <div className='flex justify-between bg-[#28272B] border border-[#ffffff0f] rounded-[4px] px-6 py-4 text-[11px] text-[#8B8A8D]'>
                                <span>${(props.game.pool_amount / LAMPORTS_PER_SOL).toLocaleString()}</span>
                                <span>1 Token</span>
                                <span>50%</span>
                            </div>
                            <div className='flex justify-between bg-[#1E1E21] border border-[#ffffff0f] rounded-[4px] px-6 py-4 items-center'>
                                <img src={getTokenLogo(props.game.creator_mint)} className='w-[41px] h-[41px]' />
                                <span className='text-white text-[12px] font-[600]'>${getSymbol(props.game.creator_mint)}</span>
                                <span className='text-[#F7B831] text-[12px] font-[500]'>{props.game.creator_amount / 10 ** getDecimals(props.game.creator_mint)}</span>
                            </div>
                        </div>
                        {props.game.winner !== '11111111111111111111111111111111' ?
                            <div className='flex flex-col w-full sm:w-1/2 gap-2'>
                                <div className='flex justify-between bg-[#28272B] border border-[#ffffff0f] rounded-[4px] px-6 py-4 text-[11px] text-[#8B8A8D]'>
                                    <span>${(props.game.pool_amount / LAMPORTS_PER_SOL).toLocaleString()}</span>
                                    <span>1 Token</span>
                                    <span>50%</span>
                                </div>
                                <div className='flex justify-between bg-[#1E1E21] border border-[#ffffff0f] rounded-[4px] px-6 py-4 items-center'>
                                    <img src={getTokenLogo(props.game.joiner_mint)} className='w-[41px] h-[41px]' />
                                    <span className='text-white text-[12px] font-[600]'>${getSymbol(props.game.joiner_mint)}</span>
                                    <span className='text-[#F7B831] text-[12px] font-[500]'>{props.game.joiner_amount / 10 ** getDecimals(props.game.joiner_mint)}</span>
                                </div>
                            </div>
                            :
                            props.isDrawing ?
                                <div className='flex flex-col w-full sm:w-1/2 gap-2'>
                                    <div className='flex justify-between bg-[#28272B] border border-[#ffffff0f] rounded-[4px] px-6 py-4 text-[11px] text-[#8B8A8D]'>
                                        <span>${(props.game.pool_amount / LAMPORTS_PER_SOL).toLocaleString()}</span>
                                        <span>1 Token</span>
                                        <span>50%</span>
                                    </div>
                                    <div className='flex justify-between bg-[#1E1E21] border border-[#ffffff0f] rounded-[4px] px-6 py-4 items-center'>
                                        <img src={getTokenLogo(props.game.joiner_mint)} className='w-[41px] h-[41px]' />
                                        <span className='text-white text-[12px] font-[600]'>${getSymbol(props.game.joiner_mint)}</span>
                                        <span className='text-[#F7B831] text-[12px] font-[500]'>{props.game.joiner_amount / 10 ** getDecimals(props.game.joiner_mint)}</span>
                                    </div>
                                </div>
                                :
                                (props.game.creator_player !== wallet.publicKey?.toBase58() && <button
                                    className='w-full sm:w-1/2 bg-[#F7B831] hover:opacity-90 rounded-[4px] px-[8px] md:px-[35px] py-[8px] h-[49px] text-[#0D0C0F] text-[12px] font-[600]'
                                    onClick={handleJoin}
                                >
                                    Join
                                </button>)
                        }
                    </div>
                </div>
                <div className="flex justify-end p-6 gap-4">
                    {props.game.winner === wallet.publicKey?.toBase58() && (wallet.publicKey ? (
                        <button
                            className="bg-[#21211E] hover:opacity-90 text-[#F7B831] text-[12px] font-[500] px-5 py-2 rounded-[4px]"
                            onClick={() => handleClaim(props.game.pda, props.game.creator_mint, props.game.joiner_mint)}
                            disabled={isClaimingLoading}
                        >
                            {isClaimingLoading ? (
                                <>Waiting...</>
                            ) : (
                                <>Claim</>
                            )}
                        </button>
                    ) : (
                        <div className="bg-[#21211E] hover:opacity-90 text-[#F7B831] text-[12px] font-[500] rounded-[4px]">
                            <WalletMultiButton />
                        </div>
                    ))}
                    <button
                        className='bg-[#1E1E21] text-[#8B8A8D] text-[12px] font-[500] px-5 py-2 rounded-[4px]'
                        onClick={() => props.handleCloseModal()}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
