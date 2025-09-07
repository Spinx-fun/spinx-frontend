/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSocket } from "../context/SocketContext";
import Chat from "../components/Chat";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  API_URL
} from "../config";
import { rot13 } from "../utils/util";
import CopyToClipboardButton from "../components/CopyToClipboardButton";

export default function Rooms() {
  const [force, setForce] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      // console.log("heartbeat");
      setForce(!force);
    }, 1000);
    // Clear interval if the component unmounts or when dependencies change.
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Head>
        <title>Affiliates | SpinX</title>
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

        <div className="xl:h-[85vh] overflow-y-auto grow mx-auto">
          <Affiliates />
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
    </>
  );
}

const Affiliates = () => {
  const wallet = useWallet();
  const router = useRouter();
  const { user, userWagered, userReferralInfo } = useSocket();
  const address = wallet.publicKey?.toBase58();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full sm:px-24">
        <div className="flex flex-col items-center">
          <div className="relative w-[102px] sm:w-[174px] h-[102px] sm:h-[174px] mb-4">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="Avatar Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                <img
                  src='/img/default.png'
                  alt="Avatar Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
          </div>
          <span className="text-[23px] font-[600] text-white mb-6">{user ? user.user_name : wallet.publicKey?.toBase58().slice(0, 3) + "..." + wallet.publicKey?.toBase58().slice(-3)}</span>
          <div className="flex flex-row gap-4 max-w-[550px] sm:mb-6">
            <div className="sm:w-1/2 w-full py-4 px-12 sm:px-16 flex flex-col items-center bg-[#17161B] rounded-[6px]">
              <span className="text-[#8B8A8D80] text-[10px] sm:text-[12px] font-[500]">
                Wagered
              </span>
              <span className="flex text-white text-[11px] sm:text-[16px]"><span className="font-[600] text-[#F7B831]">$</span>{userWagered?.totalBetAmount.toLocaleString()}</span>
            </div>
            <div className="sm:w-1/2 w-full py-4 px-12 sm:px-16 flex flex-col items-center bg-[#21211E] rounded-[6px]">
              <span className="text-[#F7B831] text-[10px] sm:text-[12px] font-[500]">
                Profit
              </span>
              <span className="flex text-white text-[11px] sm:text-[16px]"><span className="font-[600] text-[#F7B831]">$</span>{userWagered?.totalPayout.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-row border-b border-[#FFFFFF1A] w-full justify-between sm:justify-start gap-2 mb-12">
            <Link href={'/profile'}>
              <div className="flex text-[#515054] text-[12px] sm:text-[16px] font-[500] items-center gap-2 px-4 py-6 cursor-pointer">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.2851 7.5C13.2851 7.3275 13.2774 7.1625 13.2619 6.99L14.6966 5.9325C15.0052 5.7075 15.09 5.2875 14.8972 4.9575L13.4548 2.535C13.3623 2.37614 13.2127 2.25611 13.0347 2.19796C12.8568 2.13982 12.663 2.14767 12.4906 2.22L10.8322 2.9025C10.5468 2.7075 10.246 2.535 9.92973 2.3925L9.70604 0.66C9.65976 0.285 9.32808 0 8.94241 0H6.0653C5.67192 0 5.34024 0.285 5.29396 0.66L5.07027 2.3925C4.75402 2.535 4.45319 2.7075 4.1678 2.9025L2.50941 2.22C2.15459 2.07 1.73807 2.205 1.54523 2.535L0.102818 4.965C-0.0900173 5.295 -0.00516959 5.7075 0.303368 5.94L1.73807 6.9975C1.70609 7.33428 1.70609 7.67322 1.73807 8.01L0.303368 9.0675C-0.00516959 9.2925 -0.0900173 9.7125 0.102818 10.0425L1.54523 12.465C1.73807 12.795 2.15459 12.93 2.50941 12.78L4.1678 12.0975C4.45319 12.2925 4.75402 12.465 5.07027 12.6075L5.29396 14.34C5.34024 14.715 5.67192 15 6.05759 15H8.9347C9.32037 15 9.65205 14.715 9.69833 14.34L9.92202 12.6075C10.2383 12.465 10.5391 12.2925 10.8245 12.0975L12.4829 12.78C12.8377 12.93 13.2542 12.795 13.4471 12.465L14.8895 10.0425C15.0823 9.7125 14.9975 9.3 14.6889 9.0675L13.2542 8.01C13.2774 7.8375 13.2851 7.6725 13.2851 7.5ZM7.53085 10.125C6.04216 10.125 4.83115 8.9475 4.83115 7.5C4.83115 6.0525 6.04216 4.875 7.53085 4.875C9.01955 4.875 10.2306 6.0525 10.2306 7.5C10.2306 8.9475 9.01955 10.125 7.53085 10.125Z" fill="#515054" />
                </svg>
                Settings
              </div>
            </Link>
            <Link href={'/affiliates'}>
              <div className="flex text-white text-[12px] sm:text-[16px] font-[500] items-center gap-2 px-4 py-6 cursor-pointer">
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.38429 10.1062L3.9774 8.19947C3.65037 8.53259 3.23456 8.7589 2.78238 8.84986C2.3302 8.94082 1.8619 8.89237 1.43652 8.71061C1.01113 8.52885 0.647711 8.22192 0.392067 7.82852C0.136422 7.43512 0 6.97285 0 6.5C0 6.02715 0.136422 5.56488 0.392067 5.17148C0.647711 4.77808 1.01113 4.47115 1.43652 4.28939C1.8619 4.10763 2.3302 4.05918 2.78238 4.15014C3.23456 4.2411 3.65037 4.46741 3.9774 4.80053L7.38429 2.89375C7.26744 2.33119 7.35184 1.74426 7.62203 1.24029C7.89223 0.736332 8.33018 0.349014 8.85578 0.149171C9.38139 -0.0506734 9.95954 -0.0496891 10.4845 0.151943C11.0095 0.353576 11.4461 0.742382 11.7147 1.24726C11.9833 1.75214 12.0658 2.33936 11.9471 2.90152C11.8284 3.46369 11.5166 3.96324 11.0685 4.30882C10.6204 4.6544 10.0661 4.82292 9.50684 4.78356C8.94763 4.7442 8.42091 4.49959 8.023 4.09447L4.61611 6.00124C4.68397 6.32987 4.68397 6.66945 4.61611 6.99807L8.023 8.90553C8.42091 8.50041 8.94763 8.2558 9.50684 8.21644C10.0661 8.17708 10.6204 8.3456 11.0685 8.69118C11.5166 9.03676 11.8284 9.53631 11.9471 10.0985C12.0658 10.6606 11.9833 11.2479 11.7147 11.7527C11.4461 12.2576 11.0095 12.6464 10.4845 12.8481C9.95954 13.0497 9.38139 13.0507 8.85578 12.8508C8.33018 12.651 7.89223 12.2637 7.62203 11.7597C7.35184 11.2557 7.26744 10.6688 7.38429 10.1062Z" fill="#F7B831" />
                </svg>
                Affiliates
              </div>
            </Link>
            <Link href={'/history'}>
              <div className="flex text-[#515054] text-[12px] sm:text-[16px] font-[500] items-center gap-2 px-4 py-6 cursor-pointer">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.2456 0.975C8.32176 -0.675 4.72316 -0.15 2.3241 2.1V0.75C2.3241 0.3 2.02421 0 1.57439 0C1.12456 0 0.824679 0.3 0.824679 0.75V4.125C0.824679 4.575 1.12456 4.875 1.57439 4.875H4.94807C5.3979 4.875 5.69778 4.575 5.69778 4.125C5.69778 3.675 5.3979 3.375 4.94807 3.375H3.14877C4.27334 2.175 5.84772 1.5 7.49708 1.5C10.7958 1.5 13.4947 4.2 13.4947 7.5C13.4947 10.8 10.7958 13.5 7.49708 13.5C4.19837 13.5 1.49942 10.8 1.49942 7.5C1.49942 7.05 1.19953 6.75 0.749708 6.75C0.299883 6.75 0 7.05 0 7.5C0 11.625 3.37369 15 7.49708 15C10.196 15 12.6701 13.575 14.0195 11.25C16.0438 7.65 14.8442 3.075 11.2456 0.975ZM7.49708 4.5C7.04726 4.5 6.74737 4.8 6.74737 5.25V7.5C6.74737 7.95 7.04726 8.25 7.49708 8.25H8.9965C9.44632 8.25 9.74621 7.95 9.74621 7.5C9.74621 7.05 9.44632 6.75 8.9965 6.75H8.24679V5.25C8.24679 4.8 7.94691 4.5 7.49708 4.5Z" fill="#515054" />
                </svg>
                History
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row px-8 gap-8">
          <div className="flex flex-col gap-2 w-full sm:w-1/3 text-[12px] sm:text-[13px]">
            <span className="text-[#F7B831]">Affiliate Code</span>
            {user?.user_name ?
              <>
                <div className="bg-[#17161B] rounded-[6px] px-3 py-4 text-white font-[500] text-[10px] sm:text-[13px]">{rot13(user?.user_name)}</div>
                <div className="flex items-center bg-[#17161B] rounded-[6px] px-3 py-4 justify-between">
                  <span className="text-white font-[500] text-[10px] sm:text-[13px]">SpinX.fun/r/{rot13(user.user_name)}</span>
                  <CopyToClipboardButton content={`https://valhalla.fun/r/${rot13(user.user_name)}`} />
                </div>
              </>
              :
              <div className="bg-[#17161B] rounded-[6px] px-3 py-4 text-white font-[500] text-[10px] sm:text-[13px]">Set Username to get affiliate code!</div>
            }
            <div className="bg-bg1 py-4 flex flex-col items-center rounded-[6px]">
              <span className="text-[#515054] text-[10px] sm:text-[12px] font-[500]">Total Earnings</span>
              <div className="flex text-white text-[20px] sm:text-[24px] font-[600]"><span className="text-[#F7B831]">$</span>{userReferralInfo?.totalEarnings.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-2/3">
            <span className="text-[#F7B831] text-[12px] sm:text-[13px]">Overview</span>
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex flex-row px-12 py-6 bg-[#17161B] rounded-[6px] gap-3 w-full items-center">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.7913 25.3374C26.9074 25.4917 26.9782 25.6753 26.9957 25.8675C27.0132 26.0597 26.9768 26.2531 26.8905 26.4258C26.8042 26.5984 26.6715 26.7437 26.5072 26.8451C26.343 26.9465 26.1537 27.0002 25.9606 27H1.03842C0.845577 27 0.656539 26.9463 0.492493 26.8449C0.328447 26.7436 0.195874 26.5985 0.10963 26.426C0.0233856 26.2536 -0.0131224 26.0605 0.00419645 25.8685C0.0215153 25.6764 0.0919767 25.493 0.207685 25.3387C1.12728 24.1062 2.35342 23.1357 3.76429 22.5237C2.99089 21.8179 2.44899 20.8948 2.2097 19.8756C1.97041 18.8563 2.04493 17.7886 2.42346 16.8124C2.802 15.8363 3.46686 14.9974 4.33079 14.4058C5.19472 13.8143 6.21734 13.4977 7.26442 13.4977C8.31151 13.4977 9.33413 13.8143 10.1981 14.4058C11.062 14.9974 11.7269 15.8363 12.1054 16.8124C12.4839 17.7886 12.5584 18.8563 12.3191 19.8756C12.0799 20.8948 11.538 21.8179 10.7646 22.5237C11.7825 22.9636 12.7076 23.593 13.4904 24.3783C14.2733 23.593 15.1983 22.9636 16.2163 22.5237C15.4429 21.8179 14.901 20.8948 14.6617 19.8756C14.4224 18.8563 14.4969 17.7886 14.8755 16.8124C15.254 15.8363 15.9189 14.9974 16.7828 14.4058C17.6467 13.8143 18.6693 13.4977 19.7164 13.4977C20.7635 13.4977 21.7861 13.8143 22.6501 14.4058C23.514 14.9974 24.1789 15.8363 24.5574 16.8124C24.9359 17.7886 25.0104 18.8563 24.7712 19.8756C24.5319 20.8948 23.99 21.8179 23.2166 22.5237C24.6341 23.1324 25.8668 24.1027 26.7913 25.3374ZM0.41537 13.2946C0.524464 13.3764 0.648606 13.4359 0.780708 13.4698C0.912809 13.5036 1.05028 13.5111 1.18528 13.4918C1.32028 13.4725 1.45015 13.4269 1.56749 13.3574C1.68484 13.2879 1.78734 13.196 1.86916 13.0869C2.49788 12.2488 3.31315 11.5684 4.25039 11.0999C5.18763 10.6313 6.2211 10.3874 7.26897 10.3874C8.31684 10.3874 9.35031 10.6313 10.2875 11.0999C11.2248 11.5684 12.0401 12.2488 12.6688 13.0869C12.7655 13.2159 12.8909 13.3205 13.0351 13.3926C13.1793 13.4647 13.3383 13.5023 13.4995 13.5023C13.6607 13.5023 13.8197 13.4647 13.9639 13.3926C14.1081 13.3205 14.2335 13.2159 14.3303 13.0869C14.959 12.2488 15.7742 11.5684 16.7115 11.0999C17.6487 10.6313 18.6822 10.3874 19.7301 10.3874C20.7779 10.3874 21.8114 10.6313 22.7486 11.0999C23.6859 11.5684 24.5011 12.2488 25.1299 13.0869C25.2118 13.196 25.3144 13.2879 25.4318 13.3573C25.5492 13.4268 25.6791 13.4724 25.8142 13.4916C25.9493 13.5108 26.0868 13.5033 26.2189 13.4694C26.3511 13.4354 26.4752 13.3758 26.5843 13.2939C26.6934 13.212 26.7853 13.1095 26.8547 12.9921C26.9242 12.8747 26.9698 12.7447 26.989 12.6097C27.0083 12.4747 27.0007 12.3371 26.9668 12.205C26.9329 12.0729 26.8732 11.9488 26.7913 11.8397C25.8718 10.6074 24.6456 9.63733 23.2347 9.02593C24.0081 8.32016 24.55 7.39707 24.7893 6.37782C25.0286 5.35858 24.9541 4.29081 24.5756 3.31467C24.197 2.33853 23.5322 1.49963 22.6682 0.908089C21.8043 0.316546 20.7817 0 19.7346 0C18.6875 0 17.6649 0.316546 16.801 0.908089C15.937 1.49963 15.2722 2.33853 14.8936 3.31467C14.5151 4.29081 14.4406 5.35858 14.6799 6.37782C14.9192 7.39707 15.4611 8.32016 16.2345 9.02593C15.2165 9.46582 14.2914 10.0952 13.5086 10.8806C12.7258 10.0952 11.8007 9.46582 10.7827 9.02593C11.5561 8.32016 12.098 7.39707 12.3373 6.37782C12.5766 5.35858 12.5021 4.29081 12.1236 3.31467C11.745 2.33853 11.0802 1.49963 10.2162 0.908089C9.3523 0.316546 8.32968 0 7.2826 0C6.23551 0 5.21289 0.316546 4.34896 0.908089C3.48504 1.49963 2.82017 2.33853 2.44164 3.31467C2.0631 4.29081 1.98859 5.35858 2.22787 6.37782C2.46716 7.39707 3.00906 8.32016 3.78246 9.02593C2.36497 9.63525 1.1323 10.6059 0.207685 11.841C0.125865 11.9501 0.0663327 12.0742 0.0324888 12.2063C-0.00135504 12.3384 -0.00884813 12.4758 0.0104372 12.6108C0.0297225 12.7458 0.0754087 12.8756 0.144887 12.993C0.214366 13.1103 0.306276 13.2128 0.41537 13.2946Z" fill="#F7B831" />
                </svg>
                <div className="flex flex-row sm:flex-col text-white text-[12px] font-[600] justify-between w-full">
                  <span className="text-[#8B8A8D80] font-[500]">Total Referrals</span>
                    {userReferralInfo?.totalReferrals.toLocaleString()}
                </div>
              </div>
              <div className="flex flex-row px-12 py-6 bg-[#17161B] rounded-[6px] gap-3 w-full items-center">
                <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.0676 0H12.9324C11.7637 0 10.79 5.81684e-08 10.0178 0.104096C9.2014 0.213398 8.4643 0.455422 7.8728 1.04747C7.28 1.64082 7.0382 2.3786 6.929 3.19446C6.8549 3.75007 6.8328 5.076 6.8276 6.21325C4.199 6.30043 2.6195 6.60752 1.5236 7.70573C-1.54972e-07 9.22945 0 11.6835 0 16.5904C0 21.4972 -1.54972e-07 23.9513 1.5236 25.475C3.0459 27 5.4977 27 10.4 27H15.6C20.5023 27 22.9541 27 24.4764 25.475C26 23.9513 26 21.4972 26 16.5904C26 11.6835 26 9.22945 24.4764 7.70573C23.3805 6.60752 21.801 6.30043 19.1724 6.21455C19.1672 5.076 19.1464 3.75007 19.071 3.19576C18.9618 2.3786 18.72 1.64082 18.1272 1.04877C17.5357 0.455422 16.7986 0.213398 15.9822 0.104096C15.21 5.81684e-08 14.235 0 13.0676 0ZM17.2224 6.18332C17.2159 5.0812 17.1977 3.89581 17.1392 3.4547C17.0573 2.85484 16.9182 2.5972 16.7492 2.42805C16.5802 2.25889 16.3228 2.11966 15.7222 2.03769C15.0956 1.95441 14.2532 1.95181 13 1.95181C11.7468 1.95181 10.9044 1.95441 10.2765 2.03899C9.6772 2.11966 9.4198 2.25889 9.2508 2.42935C9.0818 2.59851 8.9427 2.85484 8.8608 3.4547C8.8023 3.89711 8.7828 5.0812 8.7776 6.18332C9.2859 6.18072 9.828 6.18072 10.4 6.18072H15.6C16.1733 6.18072 16.7141 6.18072 17.2224 6.18332ZM13 10.4096C13.2586 10.4096 13.5066 10.5125 13.6894 10.6955C13.8723 10.8785 13.975 11.1267 13.975 11.3855V11.3986C15.3907 11.7551 16.575 12.8728 16.575 14.4213C16.575 14.6801 16.4723 14.9283 16.2894 15.1113C16.1066 15.2943 15.8586 15.3972 15.6 15.3972C15.3414 15.3972 15.0934 15.2943 14.9106 15.1113C14.7277 14.9283 14.625 14.6801 14.625 14.4213C14.625 13.9216 14.0712 13.2293 13 13.2293C11.9288 13.2293 11.375 13.9216 11.375 14.4213C11.375 14.9209 11.9288 15.6145 13 15.6145C14.8005 15.6145 16.575 16.8636 16.575 18.7595C16.575 20.3079 15.3907 21.4243 13.975 21.7822V21.7952C13.975 22.054 13.8723 22.3022 13.6894 22.4852C13.5066 22.6683 13.2586 22.7711 13 22.7711C12.7414 22.7711 12.4934 22.6683 12.3106 22.4852C12.1277 22.3022 12.025 22.054 12.025 21.7952V21.7822C10.6093 21.4256 9.425 20.3079 9.425 18.7595C9.425 18.5006 9.52772 18.2524 9.71057 18.0694C9.89342 17.8864 10.1414 17.7836 10.4 17.7836C10.6586 17.7836 10.9066 17.8864 11.0894 18.0694C11.2723 18.2524 11.375 18.5006 11.375 18.7595C11.375 19.2591 11.9288 19.9514 13 19.9514C14.0712 19.9514 14.625 19.2591 14.625 18.7595C14.625 18.2598 14.0712 17.5663 13 17.5663C11.1995 17.5663 9.425 16.3171 9.425 14.4213C9.425 12.8728 10.6093 11.7551 12.025 11.3986V11.3855C12.025 11.1267 12.1277 10.8785 12.3106 10.6955C12.4934 10.5125 12.7414 10.4096 13 10.4096Z" fill="#F7B831" />
                </svg>
                <div className="flex flex-row sm:flex-col text-white text-[12px] font-[600] justify-between w-full">
                  <span className="text-[#8B8A8D80] font-[500]">Total Wagered</span>
                  <div className="flex text-[#F7B831]">$<span className="text-white">{userReferralInfo?.totalWagered.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
