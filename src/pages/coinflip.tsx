/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useMemo } from "react";
import { UnknownUserIcon } from "../components/Svglist";
import { useWallet } from "@solana/wallet-adapter-react";
import Chat from "../components/Chat";
import StatusControls from "../components/StatusControls";
import Sidebar from "../components/Sidebar";
import { PublicKey } from "@solana/web3.js";
import Head from "next/head";
import {
  API_URL
} from "../config";
import { useRouter } from "next/router";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import CreateCoinflipModal from "../components/CreateCoinflipModal";
import JoinCoinflipModal from "../components/JoinCoinflipModal";
import CoinflipModal from "../components/CoinflipModal";
import { claimCoinflip } from "../context/solana/transaction";
import { useSocket } from "../context/SocketContext";
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

  const { coinflipData, modalData, users } = useSocket();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {  

    if (typeof window !== 'undefined') {
      const refCode = localStorage.getItem('referralCode');
      if (refCode) {
        setReferralCode(refCode)
      }
    }
  }, [])

  useEffect(() => {
    if (modalData?.pda !== "") {
      let game = coinflipData.find(game => game.pda === modalData.pda);
      if (game) {
        const user = users.find(user => user.user_address === modalData.player);
        game.joiner_player = modalData.player;
        game.joiner_amount = modalData.amount;
        game.joiner_mint = modalData.mint;
        game.joiner_number = modalData.number;
        game.joiner = user ? user.avatar ? user.avatar : '/img/default.png' : '/img/default.png';
        game.joiner_name = user ? user.user_name ? user.user_name : modalData.player.slice(0, 3) + "..." + modalData.player.slice(-3) : modalData.player.slice(0, 3) + "..." + modalData.player.slice(-3);

        setSelectedGame(game);
        setIsDrawing(true);
        setIsOpenRoundModal(true);
      }
    }
  }, [modalData])

  coinflipData.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.pool_amount - b.pool_amount;
    } else {
      return b.pool_amount - a.pool_amount;
    }
  })

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = async () => {
    setIsOpen(false);
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

  const handleClaim = async (pda: string, mintA: string, mintB: string) => {
    await claimCoinflip(wallet, new PublicKey(pda), new PublicKey(mintA), new PublicKey(mintB), setIsClaimingLoading);
  }

  useEffect(() => {
    const intervalId = setInterval(async () => {
      // console.log("heartbeat");
      setForce(!force);
    }, 1000);
    // Clear interval if the component unmounts or when dependencies change.
    return () => clearInterval(intervalId);
  }, []);

  console.log(coinflipData)

  const joinable = coinflipData.filter(game => game.winner === '11111111111111111111111111111111').length;

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
          className={`flex flex-row justify-end gap-2 xl:gap-6 px-3 lg:px-12 pb-12 pt-6 bg-cover bg-no-repeat flex-1 flex-wrap bg-[#0a101e] lg:ml-[248px]`}
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
                  Low To Hight
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
                <span className="text-[#ffffff7f] text-[8px] md:text-[12px] font-[600] pr-3 md:pr-6 lg:px-6 py-1">{coinflipData.length} Active Coinflips</span>
                <span className="text-[#F7B831] text-[8px] md:text-[12px] font-[600] pl-3 md:pl-6 py-1">{joinable} Joinable Coinflips</span>
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
            <div className='gap-2 table-row-group'>
              {(!coinflipData || coinflipData.length === 0) && (
                <div className='table-row bg-[#17161B]'>
                  <td className="table-cell px-8 py-4 text-center rounded-[5px]" colSpan={4}>No Data</td>
                </div>
              )}
              {coinflipData && coinflipData.map((game) => (
                <>
                  <div key={game.pda} className={`hidden sm:table-row bg-[#17161B] rounded-[5px]`}>
                    <div className="table-cell px-8 py-4 rounded-l-[5px] text-left align-middle">
                      <div className="flex items-center gap-3">
                        <img src={game.creator} className="w-[49px] h-[49px]" />
                        <span className="font-[500] text-[12px] text-[#ffffff7f]">vs</span>
                        {game.winner === '11111111111111111111111111111111'
                          ? <UnknownUserIcon size="49" />
                          : <img src={game.joiner} className="w-[49px] h-[49px]" />}
                      </div>
                    </div>
                    <div className="table-cell px-8 py-4 font-semibold gap-3 align-middle">
                      <div className="flex items-center gap-2">
                        <img src={getTokenLogo(game.creator_mint)} className="h-[41px] w-[41px]" />
                        {(game.creator_mint !== game.joiner_mint && game.winner !== '11111111111111111111111111111111') &&
                          <img src={getTokenLogo(game.joiner_mint)} className="h-[41px] w-[41px]" />
                        }
                      </div>
                    </div>
                    <div className="table-cell align-middle px-8 py-4">${(game.pool_amount / LAMPORTS_PER_SOL).toLocaleString()}</div>
                    <div className="table-cell px-8 py-4 text-[#F7B831] font-[500] rounded-r-[5px] align-middle">
                      <div className="flex items-center gap-4 justify-end">
                        <button
                          className="bg-[#28272B] hover:opacity-90 rounded-[4px] px-[8px] md:px-[35px] py-[8px] h-[31px] md:h-[42px] text-white text-[8px] md:text-[12px] font-[600]"
                          onClick={() => handleOpenRoundModal(game)}
                        >
                          View
                        </button>
                        {game.winner !== '11111111111111111111111111111111'
                          ?
                          <>
                            {game.winner === wallet.publicKey?.toBase58() &&
                              <button
                                className="bg-[#21211E] hover:opacity-90 rounded-[4px] px-[8px] md:px-[35px] py-[8px] h-[31px] md:h-[42px] text-[#F7B831] text-[8px] md:text-[12px] font-[600]"
                                onClick={() => handleClaim(game.pda, game.creator_mint, game.joiner_mint)}
                                disabled={isClaimingLoading}
                              >
                                {isClaimingLoading ? (
                                  <>Waiting...</>
                                ) : (
                                  <>Claim</>
                                )}
                              </button>}
                            <img src={game.winner === game.creator_player ? game.creator : game.joiner} className="w-[49px] h-[49px]" />
                          </>
                          :
                          (game.creator_player !== wallet.publicKey?.toBase58() && <button
                            className="bg-[#F7B831] hover:opacity-90 rounded-[4px] px-[8px] md:px-[35px] py-[8px] h-[31px] md:h-[42px] text-[#0D0C0F] text-[8px] md:text-[12px] font-[600]"
                            onClick={() => handleOpenJoinModal(game.pda, game.pool_amount, game.creator_number)}
                          >
                            Join
                          </button>)
                        }
                      </div>
                    </div>
                  </div>
                  <div key={`mobile-${game.pda}`} className="bg-[#17161B] rounded-[7px] p-3 flex flex-col gap-2 sm:hidden mt-2">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col items-center gap-3">
                        <div className='relative'>
                          <img src={game.creator} className="w-[90px] h-[90px]" />
                          {game.creator_number === 1
                            ? <img src='/img/head.png' className='w-[30px] h-[30px] absolute bottom-[-10px] right-[-10px]' />
                            : <img src='/img/tail.png' className='w-[30px] h-[30px] absolute bottom-[-10px] right-[-10px]' />
                          }
                        </div>
                        <img src={getTokenLogo(game.creator_mint)} className="h-[41px] w-[41px]" />
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex justify-between gap-2">
                          <button
                            className="bg-[#28272B] rounded-[4px] px-[15px] py-[8px] h-[31px] text-white text-[10px] font-[600]"
                            onClick={() => handleOpenRoundModal(game)}
                          >
                            View
                          </button>
                          <button
                            className="bg-[#F7B831] rounded-[4px] px-[15px] py-[8px] h-[31px] text-[#0D0C0F] text-[10px] font-[600]"
                            onClick={() => handleOpenJoinModal(game.pda, game.pool_amount, game.creator_number)}
                          >
                            Join
                          </button>
                        </div>
                        <span className="font-[500] text-[10px] text-[#FFFFFF7F]">${(game.pool_amount / LAMPORTS_PER_SOL).toLocaleString()}</span>
                        {/* <img src='/img/tail.png' className="h-[58px] w-[58px]"/> */}
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <div className='relative'>
                          {game.winner === '11111111111111111111111111111111'
                            ? <UnknownUserIcon size="90" />
                            : <img src={game.joiner} className="w-[90px] h-[90px]" />}
                          {game.creator_number === 1
                            ? <img src='/img/tail.png' className='w-[30px] h-[30px] absolute bottom-[-10px] left-[-10px]' />
                            : <img src='/img/head.png' className='w-[30px] h-[30px] absolute bottom-[-10px] left-[-10px]' />
                          }
                        </div>
                        {game.winner !== '11111111111111111111111111111111' &&
                          <img src={getTokenLogo(game.joiner_mint)} className="h-[41px] w-[41px]" />
                        }
                      </div>
                    </div>
                    {game.winner === wallet.publicKey?.toBase58() &&
                      <button
                        className="border border-[#F7B8311A] bg-[#21211E] h-[29px] rounded-[4px] text-[#F7B831] text-[10px] font-[600]"
                        onClick={() => handleClaim(game.pda, game.creator_mint, game.joiner_mint)}
                        disabled={isClaimingLoading}
                      >
                        {isClaimingLoading ? (
                          <>Waiting...</>
                        ) : (
                          <>Claim</>
                        )}
                      </button>
                    }
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        {/*<div className="hidden xl:flex flex-col gap-4 h-[85vh] w-1/6">
          <Chat className="gap-3 flex-col flex" />
          <div className="flex flex-col items-center gap-2 bg-[#17161B] rounded-[7px] p-4">
            <img src="/img/solana.png" className="h-[82px] w-[82px]" />
            <button className="px-[35px] py-[8px] bg-[#28272B] rounded-[4px] w-full text-[#8B8A8D] text-[12px]">
              SOL Token GIVEWAY <span className="text-[#F7B831] font-[600]">$50.00</span>
            </button>
            <button className="px-[35px] py-[8px] bg-[#F7B831] rounded-[4px] w-full text-[12px]">
              <span className="font-[600]">Enter Ends in</span> 5:09:54
            </button>
          </div>
        </div>*/}
      </div>
    </div>
      {isOpen && <CreateCoinflipModal referralCode={referralCode} handleCloseModal={handleCloseModal} />}
      {isOpenJoinModal && <JoinCoinflipModal referralCode={referralCode} pda={selectedPda} poolAmount={selectedPoolAmount} setNumber={selectedSetNumber} handleCloseModal={handleCloseJoinModal} />}
      {isOpenRoundModal && <CoinflipModal game={selectedGame} isDrawing={isDrawing} setIsDrawing={setIsDrawing} handleCloseModal={handleCloseRoundModal} handleOpenJoinModal={handleOpenJoinModal} />}
    </>
  );
}
