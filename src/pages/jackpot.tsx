/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Chat from "../components/Chat";
import { useSocket } from "../context/SocketContext";
import Head from "next/head";
import {
  API_URL
} from "../config";
import JackpotModal from "../components/JackpotModal";
import PieChart from "../components/Piechart";
import { base58ToGradient } from "../utils/util";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getDecimals, getSymbol } from "../utils/constants";

export default function Rooms() {
  const wallet = useWallet();
  const { gameData, users } = useSocket();

  const [isWonWindow, setIsWonWindow] = useState(false);
  const [wonValue, setWonValue] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [force, setForce] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {  

    if (typeof window !== 'undefined') {
      const refCode = localStorage.getItem('referralCode');
      if (refCode) {
        setReferralCode(refCode)
      }
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(async () => {
      // console.log("heartbeat");
      setForce(!force);
    }, 1000);
    // Clear interval if the component unmounts or when dependencies change.
    return () => clearInterval(intervalId);
  }, []);

  const handleEndGame = () => {
    setIsWonWindow(false);
  };

  const players = useMemo(() => {
    let piesList: {
      name: string,
      avatar: string,
      tokens: string,
      color: string,
      chance: number,
      total: number
    }[] = [];
    if (gameData && gameData?.players) {
      const sumBets = gameData?.players.reduce((sum: number, item: any) => sum + item.amountUsd, 0);
      gameData?.players?.map((item: any) => {
        const user = users.find(user => user.user_address === item.player);
        piesList.push({
          name: user ? user.user_name ? user.user_name : item.player : item.player,
          avatar: user ? user.avatar ? user.avatar : '/img/default.png' : '/img/default.png',
          color: base58ToGradient(item.player).color,
          chance: (item.amountUsd / sumBets) * 100,
          tokens: `${item.amount / 10 ** getDecimals(item.mint)} $${getSymbol(item.mint)}`,
          total: item.amountUsd / LAMPORTS_PER_SOL
        })
      })
    }
    return piesList.reverse(); // Reverse the order of the pies
  }, [gameData])

  const info = useMemo(() => {
    let gameInfo = {
      potValue: 0,
      chance: 0,
      deposit: 0
    }
    if (gameData && gameData?.players) {
      gameInfo.potValue = gameData?.players.reduce((sum: number, item: any) => sum + item.amountUsd, 0);
      gameData?.players?.map((item: any) => {
        if (item.player === wallet.publicKey?.toBase58()) {
          gameInfo.chance = item.amountUsd / gameInfo.potValue * 100;
          gameInfo.deposit = item.amountUsd;
        }
      })
    }
    return gameInfo
  }, [gameData])

  return (
    <>
      <Head>
        <title>Jackpot | SpinX</title>
        <meta
          name="description"
          content="SpinX | Best Crypto PvP Gambling Website"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`mt-[80px] flex flex-row justify-end gap-2 xl:gap-6 px-3 lg:px-12 py-12 bg-cover bg-no-repeat w-full flex-wrap bg-[#0D0C0F]`}
      >
        <div className="flex flex-col shriknk grow items-center gap-2">
          <PieChart
            setIsWonWindow={setIsWonWindow}
            setWonValue={setWonValue}
          />
          <div className="flex flex-col items-center">
            <span className="text-[#8B8A8D] text-[16px]">Pot Value</span>
            <div className="flex text-white text-[28px]"><span className="text-[#F7B831]">$</span>{(info.potValue / LAMPORTS_PER_SOL).toLocaleString()}</div>
          </div>
          <button
            className="mt-3 bg-[#F7B831] rounded-[4px] h-[42px] py-[8px] px-[35px] text-[#0D0C0F] text-[12px] font-[700] hover:opacity-90"
            onClick={handleOpenModal}
          >
            Deposit
          </button>
          <div className="mt-5 flex flex-col sm:flex-row gap-3 w-full sm:w-fit">
            <div className="bg-[#17161B] rounded-[5px] px-12 py-6 flex flex-col items-center">
              <span className="text-[#F7B831] text-[20px] font-[600]">
                {info.chance.toLocaleString()}%
              </span>
              <span className="text-[#8B8A8D] text-[11px] font-[500]">Your Odds</span>
            </div>
            <div className="bg-[#17161B] rounded-[5px] px-12 py-6 flex flex-col items-center">
              <span className="text-[#F7B831] text-[20px] font-[600]">
                ${(info.deposit / LAMPORTS_PER_SOL).toLocaleString()}
              </span>
              <span className="text-[#8B8A8D] text-[11px] font-[500]">Deposited</span>
            </div>
          </div>
        </div>

        <div className="lg:max-h-[85vh] overflow-y-auto w-full lg:max-w-[585px] mx-auto">
          <div className="table border-separate border-spacing-x-0 border-spacing-y-1 rounded-3xl table-auto w-full text-[#8b8a8d] text-[11px]">
            <div className='table-header-group sticky top-0'>
              <div className='table-row bg-[#17161B]'>
                <div className="table-cell text-left px-4 sm:px-8 py-4 rounded-l-[5px]">Players</div>
                <div className="table-cell text-left px-4 sm:px-8 py-4">Tokens</div>
                <div className='table-cell text-left px-4 sm:px-8 py-4'>Chance</div>
                <div className='table-cell text-left px-4 sm:px-8 py-4 rounded-r-[5px]'>Total</div>
              </div>
            </div>
            <div className='gap-2 table-row-group'>
              {(!players || players.length === 0) && (
                <div className='table-row bg-[#17161B]'>
                  <td className="table-cell px-8 py-4 text-center rounded-[5px]" colSpan={4}>No Data</td>
                </div>
              )}
              {players && players.map((player, index: number) => (
                <div key={index} className='table-row bg-[#17161B] rounded-[5px]'>
                  <div className="table-cell px-4 sm:px-8 py-4 rounded-l-[5px] text-left text-white font-[500]">
                    <div className="flex items-center gap-2">
                      <img
                        src={player.avatar}
                        alt="Avatar Preview"
                        className="w-[29px] h-[29px]"
                      />
                      <span className="text-[8px] sm:text-[12px]" style={{ overflowWrap: 'anywhere' }}>
                        {player.name.length > 10 ? player.name.slice(0, 3) + "..." + player.name.slice(-3) : player.name}
                      </span>
                    </div>
                  </div>
                  <div className="table-cell text-[8px] sm:text-[12px] align-middle px-4 sm:px-8 py-4 font-semibold">
                    {player.tokens}</div>
                  <div className="table-cell text-[8px] sm:text-[12px] align-middle px-4 sm:px-8 py-4">{player.chance.toFixed(2)}%</div>
                  <div className="table-cell text-[8px] sm:text-[12px] align-middle px-4 sm:px-8 py-4 text-[#F7B831] font-[500] rounded-r-[5px]">
                    <div className="flex items-center justify-between">
                      <span>${player.total.toLocaleString()} </span>
                      <div className={`ml-8 rounded-full w-[15px] h-[15px]`} style={{ background: `${player.color}` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden xl:flex flex-col gap-4 h-[85vh] w-1/6">
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
        </div>

      </div>
      {isWonWindow && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#1f1f13a8] backdrop-blur-lg flex items-center justify-center z-50">
          <div className="text-center">
            <h1 className="text-[#fff] text-[32px] font-bold">You Won!</h1>
            <p className="text-[#fff] text-[24px]">
              ${wonValue.toLocaleString()}
            </p>
            <button
              className="border rounded-md px-5 py-1 text-[#fff] mt-2 text-sm"
              onClick={() => handleEndGame()}
            >
              Back
            </button>
          </div>
        </div>
      )}
      {isOpen && <JackpotModal handleCloseModal={handleCloseModal} referralCode={referralCode} />}
    </>
  );
}
