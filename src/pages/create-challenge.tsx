import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import RecentGamesTable from "../components/RecentGamesTable";
import ActiveChallengesPanel from "../components/ActiveChallengesPanel";
import { fetchUserData, UserData } from "../services/api";
import { fetchActiveChallenges, ActiveChallenge, fetchAllChallenges, GameData, PlayerHistory } from "../services/gameData";
import Footer from "../components/Footer";
import { useWallet } from "@solana/wallet-adapter-react";
import { createCoinflip } from "../context/solana/transaction";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Asset, assets } from '../utils/constants'
import BeatLoader from 'react-spinners/BeatLoader';
import { errorAlert } from "../components/ToastGroup";
import { solConnection } from "../context/solana/transaction";
import PlayerHistoryTable from '../components/PlayerHistoryTable';
import CustomDropdown, { DropdownOption } from "../components/CustomDropdown";

interface AccountCardProps {
  title: string;
  value: string;
  icon: string;
  trendIcon?: string;
  trendValue?: string;
}

interface AmountButtonProps {
  amount: string;
  isSelected: boolean;
  onClick: () => void;
}

interface AccountConnectedProps { }

interface BalanceCardProps {
  solBalance: number;
  tokenBalance: number;
}

const AccountConnected: React.FC<AccountConnectedProps> = ({
}) => {
  const [copied, setCopied] = useState(false);
  const { connected, publicKey, wallet } = useWallet();
  const publicAddress = publicKey?.toBase58().toString();
  const displayName = wallet?.adapter.name;
  const copyToClipboard = () => {
    if (publicAddress) {
      navigator.clipboard.writeText(publicAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!connected) {
    return (
      <div className="border border-[#2a2a2a] rounded-[10px] p-4 bg-[#020617] overflow-x-hidden">
        <h3 className="font-oswald font-bold text-[20px] leading-[160%] text-white mb-4">
          Account Not Connected
        </h3>
        <div className="rounded-[10px] p-6 bg-[#0e172b]">
          <p className="font-inter font-medium text-[14px] leading-[114%] text-red-500">
            Wallet not connected
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[#2a2a2a] rounded-[10px] p-4 bg-[#020617] overflow-x-hidden">
      <h3 className="font-oswald font-bold text-[20px] leading-[160%] text-white mb-4">
        Account Connected
      </h3>

      <div className="rounded-[10px] p-3 bg-[#0e172b]">
        {/* Wallet Info */}
        <div className="flex items-center gap-2 mb-3">
          <img src="/image/wallet.svg" alt="Wallet" className="w-5 h-5" />
          <span className="font-inter font-medium text-[14px] leading-[114%] text-white">
            Wallet
          </span>
        </div>

        {/* Address with Copy Button */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[12px] text-white break-all flex-1 mr-2">
            {copied ? "Copied!" : publicAddress}
          </span>
          <button onClick={copyToClipboard} className="flex-shrink-0">
            <img src="/image/copy.svg" alt="Copy" className="w-5 h-5" />
          </button>
        </div>

        {/* Connection Status */}
        <p className="font-inter font-medium text-[12px] leading-[133%] text-[#1be088]">
          Connected as {displayName}
        </p>
      </div>
    </div>
  );
};

const BalanceCard: React.FC<BalanceCardProps> = ({ solBalance, tokenBalance }) => {
  const solBalances =
    solBalance !== null && solBalance !== undefined ? solBalance : 0;

  const tokenBalances =
    tokenBalance !== null && tokenBalance !== undefined ? tokenBalance : 0;
  // const isPositive = trend >= 0;
  // const trendIcon = isPositive
  //   ? "/image/upward-trend.svg"
  //   : "/image/downward-trend.svg";
  // const trendColor = isPositive ? "text-[#1be088]" : "text-red-500";
  return (
    <div className="border border-[#2a2a2a] rounded-[10px] p-4 bg-[#020617] h-full flex flex-col">
      <h3 className="font-oswald font-bold text-[20px] leading-[160%] text-white mb-4">
        Balance
      </h3>

      <div className="rounded-[10px] p-3 bg-[#0e172b] flex-1 flex items-center justify-center">
        <div className="flex items-center justify-between w-full lg:flex-row">
          {/* Balance Amount with SPX Tokens */}
          <div className="flex items-end gap-2">
            <span className="font-oswald font-medium text-[36px] leading-[117%] text-[#f9c752]">
              {solBalances > 0 ? solBalances.toFixed(3) : '0'}
            </span>
            <span className="font-inter font-medium text-[14px] leading-[186%] text-white self-end">
              Sol Balance
            </span>
          </div>

          {/* Trend Info */}
          <div className="text-right">
            <div className="flex items-center justify-between w-full">
              {/* <img src={trendIcon} alt="Trend" className="w-4 h-4" /> */}
              <span className="font-oswald font-medium text-[36px] leading-[117%] text-[#f9c752]">
                {tokenBalances}
              </span>
              &nbsp;
              <span className="font-inter font-medium text-[14px] leading-[186%] text-white self-end">
                SPX Tokens
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AmountButton: React.FC<AmountButtonProps> = ({
  amount,
  isSelected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`border border-white rounded-[2px_8px] py-2 px-4 h-10 font-oswald font-medium text-[14px] leading-[150%] uppercase ${isSelected ? "bg-[#1be088] text-black" : "bg-transparent text-white"
      }`}
  >
    {amount}
  </button>
);

export default function CreateChallenge() {
  const wallet = useWallet();
  const [activeAsset] = useState(assets[0])
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"flip" | "slot">("flip");
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [selectedCoin, setSelectedCoin] = useState<"head" | "tail" | null>(
    "head"
  );
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [solBalance, setSolBalance] = useState(0);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [playerHistory, setPlayerHistory] = useState<GameData[]>([]);
  let [newDatas, setNewDatas] = useState<PlayerHistory[]>();
  const [timeRange, setTimeRange] = useState('last-30-days');
  const walletAddress = wallet.publicKey?.toBase58();
  const amountOptions = [
    "10'000",
    "50'000",
    "100'000",
    "200'000",
    "500'000",
    "1'000'000",
    "2'000'000",
    "5'000'000",
    "ALL IN",
  ];
  const [activeChallenges, setActiveChallenges] = useState<ActiveChallenge[]>(
    []
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userDataResponse, historyResponse, challengesResponse] = await Promise.all([
          fetchUserData(wallet),
          fetchAllChallenges(),
          fetchActiveChallenges(wallet.publicKey?.toBase58() || ""),
        ]);
        setUserData(userDataResponse);
        setActiveChallenges(challengesResponse);
        setPlayerHistory(historyResponse);

        let counts = 0;
        let result;
        let newDataArray = [];
        for (let i = 0; i < historyResponse.length; i++) {
          if (historyResponse[i].gameName == walletAddress || historyResponse[i].joinerPlayer == walletAddress) {
            counts++
            if (historyResponse[i].winner == walletAddress) {
              result = "Win";
            } else if (historyResponse[i].winner == null) {
              result = "Pending"
            } else {
              result = "Loss"
            }
            let newData = {
              challenge: historyResponse[i].gameName,
              joinerPlayer: historyResponse[i].joinerPlayer,
              date: historyResponse[i].date,
              game: 'Coin Flip',
              id: historyResponse[i].id,
              result: result,
              stakeAmount: historyResponse[i].stakeAmount,
              time: historyResponse[i].time,
              winnerTx: historyResponse[i].winnerTx,
              creatorAta: historyResponse[i].creatorAta
            }
            newDataArray.push(newData);
          }
        }
        setNewDatas(newDataArray);
        let balance;
        if (wallet.publicKey) {
          balance = await solConnection.getAccountInfo(wallet.publicKey);
          if (balance)
            setSolBalance(balance.lamports / LAMPORTS_PER_SOL)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setPlayerHistory([]);
        setActiveChallenges([]);
      } finally {
        setLoading(false);
        setHistoryLoading(false);
      }
    };
    if (wallet.publicKey)
      loadData();
  }, [wallet, isLoading]);

  // Filter player history based on selected time range
  const filteredPlayerHistory = useMemo(() => {
    if (newDatas) {
      if (!newDatas.length) return [];

      const now = new Date();
      return newDatas.filter(item => {
        const itemDate = new Date(`${item.date}T${item.time}`);
        const diffTime = Math.abs(now.getTime() - itemDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (timeRange) {
          case 'today':
            return diffDays <= 1;
          case 'last-3-days':
            return diffDays <= 3;
          case 'last-7-days':
            return diffDays <= 7;
          case 'last-14-days':
            return diffDays <= 14;
          case 'last-30-days':
            return diffDays <= 30;
          case 'last-6-months':
            return diffDays <= 180;
          case 'all-time':
            return true;
          default:
            return diffDays <= 30;
        }
      });
    }
  }, [newDatas, timeRange]);

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    if (amount === "ALL IN" && userData) {
      setStakeAmount(userData.tokenBalance.toString());
    } else {
      amount = amount.replace(/[^a-zA-Z0-9\s]/g, '');
      setStakeAmount(amount);
    }
  };

  const handleCoinSelect = (coin: "head" | "tail") => {
    setSelectedCoin(coin);
    setError("");
  };

  const handleStakeChange = (amount: string) => {
    setStakeAmount(amount);
    setError("");

    // Deselect button if custom amount doesn't match any preset
    if (!amountOptions.includes(amount)) {
      setSelectedAmount("");
    }
  };

  const timeRangeOptions: DropdownOption[] = [
    { value: 'today', label: 'Today', leftIcon: '/image/calendar.svg' },
    { value: 'last-3-days', label: 'Last 3 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-7-days', label: 'Last 7 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-14-days', label: 'Last 14 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-30-days', label: 'Last 30 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-6-months', label: 'Last 6 Months', leftIcon: '/image/calendar.svg' },
    { value: 'all-time', label: 'All Time', leftIcon: '/image/calendar.svg' },
  ];

  const handleCreateChallenge = async () => {
    try {
      setIsLoading(true);
      if (!stakeAmount || !selectedCoin || Number(stakeAmount) == 0) {
        setIsLoading(false);
        setError("Please enter stake amount and make a pick Head or Tail");
        return;
      }
      if (Number(stakeAmount) > Number(userData?.tokenBalance)) {
        setIsLoading(false);
        errorAlert("You have no enough token on your wallet");
        return;
      }
      if (Number(solBalance) == 0) {
        setIsLoading(false);
        errorAlert("You have no enough SOL on your wallet");
        return;
      }
      setError("");
      let coinId;
      if (selectedCoin == "head") {
        coinId = 0;
      } else {
        coinId = 1;
      }
      // Handle challenge creation logic here
      let amount;
      let betAmount = Number(stakeAmount);
      amount = betAmount * 10 ** (activeAsset.decimals ?? 9);
      await createCoinflip(wallet, coinId, new PublicKey(activeAsset.address), amount, setIsLoading)
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Create Challenge | SpinX</title>
        <meta
          name="description"
          content="Create a new challenge on SpinX - Best Crypto PvP Gambling Website"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex-col">
        {/* Sidebar - Hidden on mobile and tablet (below xl) - Special rule for create-challenge */}
        <div className="hidden xl:block">
          <Sidebar activeItem="create" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 bg-[#0a101e] xl:ml-[248px] min-h-screen">
          {/* Header - Special rule: mobile header below xl resolution */}
          <div className="px-3 xl:px-12 pt-6">
            <Header showSearch={false} />
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col gap-6 px-3 lg:px-5 pb-12 pt-6 flex-1">
            {/* Account Connected and Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AccountConnected />
              <BalanceCard
                solBalance={userData?.solBalance || 0}
                tokenBalance={userData?.tokenBalance || 0}
              />
            </div>
          </div>

          {/* Main Content Grid - Challenge Creation and Active Challenges */}
          <div className="flex flex-col lg:flex-row gap-6 px-3 lg:px-5 pb-8 pt-6 flex-1">
            {/* Left Column - Challenge Creation and Recent Games */}
            <div className="flex-1 space-y-6 order-1 lg:order-1">
              {/* Challenge Creation Interface */}
              <div className="lg:flex grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 my-6">
                <div className="border border-[#2a2a2a] rounded-[10px] p-4 bg-[#020617] w-[100%] mb-2">
                  <h2 className="font-oswald font-bold text-[20px] leading-[160%] text-white mb-4">
                    Create Challenge
                  </h2>

                  {/* Tabs */}
                  <div className="flex mb-0">
                    <button
                      onClick={() => setActiveTab("flip")}
                      className={`px-4 py-2 h-10 font-oswald font-bold text-[16px] leading-[150%] relative ${activeTab === "flip"
                        ? "bg-[#0e172b] text-white rounded-tl-[10px]"
                        : "bg-[rgba(14,23,43,0.5)] text-white/50 rounded-tr-[10px]"
                        }`}
                    >
                      Flip a coin
                      {activeTab === "flip" && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#1be088] shadow-[0_1px_4px_0_rgba(27,224,136,0.75)]" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab("slot")}
                      className={`px-4 py-2 h-10 font-oswald font-bold text-[16px] leading-[150%] relative ${activeTab === "slot"
                        ? "bg-[#0e172b] text-white rounded-tr-[10px]"
                        : "bg-[rgba(14,23,43,0.5)] text-white/50 rounded-tr-[10px]"
                        }`}
                    >
                      Slot Machine
                      {activeTab === "slot" && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#1be088] shadow-[0_1px_4px_0_rgba(27,224,136,0.75)]" />
                      )}
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="rounded-tr-[10px] rounded-b-[10px] p-5 bg-[#0e172b] min-h-[540px]">
                    {activeTab === "flip" && (
                      <div className="space-y-6">
                        {/* Coin Icon */}
                        <div className="flex justify-center">
                          <img
                            src={
                              selectedCoin === "tail"
                                ? "/image/sfx-coin-tail.svg"
                                : "/image/sfx-coin.svg"
                            }
                            alt="Coin"
                            className="w-[150px] h-[150px]"
                          />
                        </div>

                        {/* Stake and Pick Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Stake Column */}
                          <div>
                            <h3 className="font-oswald font-bold text-[20px] leading-[160%] text-white mb-3">
                              Stake
                            </h3>
                            <input
                              type="text"
                              value={stakeAmount}
                              onChange={(e) =>
                                handleStakeChange(e.target.value)
                              }
                              placeholder="Place your stake here"
                              className="w-full border border-[#324158] rounded-[5px] py-2 px-3 h-10
                                       font-inter font-normal text-[12px] leading-[167%] text-white
                                       bg-transparent placeholder:text-[#324158] focus:outline-none focus:border-[#90A2B9]"
                            />

                            {/* Amount Buttons Grid */}
                            <div className="grid grid-cols-3 gap-2 mt-3">
                              {amountOptions.map((amount) => (
                                <AmountButton
                                  key={amount}
                                  amount={amount}
                                  isSelected={selectedAmount === amount}
                                  onClick={() => handleAmountSelect(amount)}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Your Pick Column */}
                          <div>
                            <h3 className="font-oswald font-bold text-[20px] leading-[160%] text-white mb-3">
                              Your Pick
                            </h3>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleCoinSelect("head")}
                                className={`border border-white rounded-[2px_8px] py-2 px-4 w-[108px] h-10 font-oswald font-medium text-[14px] leading-[150%] uppercase ${selectedCoin === "head"
                                  ? "bg-[#1be088] text-black"
                                  : "bg-white text-black"
                                  }`}
                              >
                                HEAD
                              </button>
                              <button
                                onClick={() => handleCoinSelect("tail")}
                                className={`border border-white rounded-[2px_8px] py-2 px-4 w-[108px] h-10 font-oswald font-medium text-[14px] leading-[150%] uppercase ${selectedCoin === "tail"
                                  ? "bg-[#1be088] text-black"
                                  : "bg-white text-black"
                                  }`}
                              >
                                TAIL
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Create Button and Error Message */}
                        <div className="space-y-2">
                          <button
                            onClick={handleCreateChallenge}
                            className="bg-[#1be088] rounded-[2px_8px] py-2 px-4 h-[37px] font-oswald font-medium text-[14px] leading-[150%] uppercase text-black"
                          >
                            {isLoading ?
                              <BeatLoader
                                color={'#000'}
                                loading={isLoading}
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              /> :
                              "Create Flip Challenge"
                            }
                          </button>
                          {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === "slot" && (
                      <div className="flex items-center justify-center h-[480px]">
                        <p className="font-oswald font-bold text-[24px] leading-[160%] text-white/50">
                          Coming Soon
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="hidden xl:block lg:w-[456px] order-2 lg:order-2">
                  <ActiveChallengesPanel challenges={activeChallenges} setIsLoading={setIsLoading} />
                </div>
                {/* Active Challenges on mobile (comes after Create Challenge) */}
                <div className="lg:hidden">
                  <ActiveChallengesPanel challenges={activeChallenges} setIsLoading={setIsLoading} />
                </div>
              </div>
              {/* Recent Games in the same column as Create Challenge */}
              <div className="w-full p-2">
                <div className="flex justify-between pb-3">
                  <h2 className="font-oswald font-bold text-[20px] leading-[160%] text-white">
                    Player History
                  </h2>
                  {/* Refresh Button */}
                  <div className="flex">
                    {/* Time Range Dropdown */}
                    <CustomDropdown
                      options={timeRangeOptions}
                      value={timeRange}
                      onChange={setTimeRange}
                      leftIcon="/image/calendar.svg"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-center">

                  {historyLoading ? (
                    <div className="text-center py-8 text-[#929294]">
                      Loading player history...
                    </div>
                  ) : playerHistory.length === 0 ? (
                    <div className="text-center py-8 text-[#929294]">
                      No player history found
                    </div>
                  ) : (
                    filteredPlayerHistory &&
                    <PlayerHistoryTable data={filteredPlayerHistory} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="px-2">
            <Footer />
          </div>
        </div>

      </div>


    </>
  );
}
