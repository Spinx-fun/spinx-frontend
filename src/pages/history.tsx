import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import WalletBalanceCard from '../components/WalletBalanceCard';
import RevenueCard from '../components/RevenueCard';
import ChallengesTakenCard from '../components/ChallengesTakenCard';
import PlayerHistoryTable from '../components/PlayerHistoryTable';
import CustomDropdown, { DropdownOption } from '../components/CustomDropdown';
import { fetchUserData, UserData } from '../services/api';
import { fetchPlayerHistory, PlayerHistory } from '../services/gameData';
import Footer from '../components/Footer'
import { useWallet } from "@solana/wallet-adapter-react";

export default function History() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    revenue: 1250,
    revenueTrend: 8.3,
    challengesTaken: 42,
    challengesTrend: 12.5
  });
  const [playerHistory, setPlayerHistory] = useState<PlayerHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('last-30-days');

  const { connected, publicKey } = useWallet();
  const wallet = useWallet();
  const publicAddress = publicKey?.toBase58().toString();

  const timeRangeOptions: DropdownOption[] = [
    { value: 'today', label: 'Today', leftIcon: '/image/calendar.svg' },
    { value: 'last-3-days', label: 'Last 3 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-7-days', label: 'Last 7 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-14-days', label: 'Last 14 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-30-days', label: 'Last 30 Days', leftIcon: '/image/calendar.svg' },
    { value: 'last-6-months', label: 'Last 6 Months', leftIcon: '/image/calendar.svg' },
    { value: 'all-time', label: 'All Time', leftIcon: '/image/calendar.svg' },
  ];

  // Filter player history based on selected time range
  const filteredPlayerHistory = useMemo(() => {
    if (!playerHistory.length) return [];

    const now = new Date();
    return playerHistory.filter(item => {
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
  }, [playerHistory, timeRange]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData(wallet);
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Fallback to mock data
        setUserData({
          account: 'DD320512345678',
          balance: 42.69,
          trend: -2.5
        });
      } finally {
        setLoading(false);
      }
    };

    const loadAllData = async () => {
      try {
        const [userDataResponse, historyResponse] = await Promise.all([
          fetchUserData(wallet),
          fetchPlayerHistory(userData?.account || '')
        ]);

        setUserData(userDataResponse);
        setPlayerHistory(historyResponse);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Fallback to mock data
        setUserData({
          account: 'DD320512345678',
          balance: 42.69,
          trend: -2.5
        });
        setPlayerHistory([]);
      } finally {
        setLoading(false);
        setHistoryLoading(false);
      }
    };

    loadAllData();
  }, []);

  const [lastUpdated, setLastUpdated] = useState(Math.floor(Date.now() / 1000) - 120); // 2 minutes ago
  const handleRefresh = () => {
    setLastUpdated(Math.floor(Date.now() / 1000));
    // Add actual refresh logic here later
    console.log('Refresh clicked');
  };

  return (
    <>
      <Head>
        <title>Account History | SpinX</title>
        <meta
          name="description"
          content="View your account history on SpinX - Best Crypto PvP Gambling Website"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex overflow-x-hidden">
        {/* Sidebar - Hidden on mobile and tablet (below lg) */}
        <div className="hidden lg:block">
          <Sidebar activeItem="history" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 bg-[#0a101e] lg:ml-[248px] min-h-screen">
          {/* Header */}
          <div className="px-3 lg:px-12 pt-6">
            <Header showSearch={false} />
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col gap-6 px-3 lg:px-12 pb-12 pt-6 flex-1">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-oswald font-bold text-[20px] leading-[160%] text-white">
                  Account History
                </h1>
                <p className="font-inter italic font-medium text-[12px] leading-[133%] text-[#929294]">
                  View your wallet balance, revenue statistics, and transaction history
                </p>
              </div>

              {/* Controls - Refresh Button and Time Range Dropdown */}
              <div className="flex items-center gap-3">
                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  className="border border-opacity-50 border-[#90A2B9] rounded-md p-2 w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
                  title="Refresh data"
                >
                  <img src="/image/refresh.svg" alt="Refresh" className="w-4 h-4" />
                </button>

                {/* Time Range Dropdown */}
                <CustomDropdown
                  options={timeRangeOptions}
                  value={timeRange}
                  onChange={setTimeRange}
                  leftIcon="/image/calendar.svg"
                />
              </div>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="md:col-span-2">

                {!connected ?
                  <div className="border border-[#2a2a2a] rounded-[10px] p-4 bg-[#020617]">
                    <h3 className="font-oswald font-bold text-[20px] leading-[160%] text-white mb-4">
                      Account Disconnected
                    </h3>
                    <div className="rounded-[10px] p-3 bg-[#0e172b]">
                      <p className="font-inter font-medium text-[14px] leading-[114%] text-red-500">
                        Wallet not connected
                      </p>
                    </div>
                  </div> :
                  <WalletBalanceCard
                    walletAddress={publicAddress || ''}
                    balance={userData?.balance || 0}
                    trend={userData?.trend || 0}
                  />
                }
              </div>

              <RevenueCard
                revenue={statsData.revenue}
                trend={statsData.revenueTrend}
              />

              <ChallengesTakenCard
                challengesCount={statsData.challengesTaken}
                trend={statsData.challengesTrend}
              />
            </div>

            {/* Player History Table Title */}
            <h2 className="font-oswald font-bold text-[20px] leading-[160%] text-white">
              Player History
            </h2>

            {/* Player History Table */}
            {historyLoading ? (
              <div className="text-center py-8 text-[#929294]">
                Loading player history...
              </div>
            ) : playerHistory.length === 0 ? (
              <div className="text-center py-8 text-[#929294]">
                No player history found
              </div>
            ) : (
              <PlayerHistoryTable data={filteredPlayerHistory} />
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
