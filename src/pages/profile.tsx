/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Chat from "../components/Chat";
import { useSocket } from "../context/SocketContext";
import axios from 'axios';
import Head from "next/head";
import {
  API_URL
} from "../config";
import { errorAlert, warningAlert, successAlert } from "../components/ToastGroup";
import { useRouter } from "next/router";

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
        <title>Profile | SpinX</title>
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
          <ProfileSettings />
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

const ProfileSettings = () => {
  const wallet = useWallet();
  const router = useRouter();
  const { user, userWagered } = useSocket();
  const address = wallet.publicKey?.toBase58()
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setPreview(user.avatar);
      setName(user.user_name);
    } else {
      setPreview(null);
      setName('');
    }
  }, [user, address])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set canvas dimensions
          const maxWidth = 256; // Adjust as needed
          const maxHeight = 256; // Adjust as needed
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;

          // Draw the image on the canvas
          ctx?.drawImage(img, 0, 0, width, height);

          // Get the compressed image data URL
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // Adjust the quality as needed

          // Update the avatar and preview state
          setAvatar(compressedDataUrl);
          setPreview(compressedDataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    try {
      const response = await axios.post(`${API_URL}checkUsername/`, { user_name: value });
      if (response.status === 200) {
        setUsernameError(null);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setUsernameError('Username already exists');
      } else {
        setUsernameError('Error checking username');
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (wallet.publicKey === null) return;
    if (name === undefined && avatar === null) {
      errorAlert(
        'Upload avatar or input name!'
      )
      return;
    }
  
    // Construct the payload with only defined fields
    const payload: any = { user_address: wallet.publicKey.toBase58() };
    if (name) {
      payload.user_name = name;
    }
    if (avatar) {
      payload.avatar = avatar;
    }
  
    try {
      const res = await axios.post(`${API_URL}addOrUpdateUser/`, payload);
  
      if (res.status) {
        successAlert("Updated successfully!")
      }
  
      console.log('=========>>>>>', res.data, res.status);
      
    } catch (error) {
      console.error('Error uploading avatar', error);
    }
  };

  const reconnectWallet = () => {
    wallet.disconnect();
    router.push('/jackpot')
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <form onSubmit={handleFormSubmit} className="w-full sm:px-24">
        <div className="flex flex-col items-center">
          <div className="relative w-[102px] sm:w-[174px] h-[102px] sm:h-[174px] mb-4">
            {preview ? (
              <img
                src={preview}
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
            <label htmlFor="avatar-upload" className="absolute top-0 sm:top-2 right-0 sm:right-2">
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <div className="bg-[#17161B] text-white p-2 rounded-full cursor-pointer">
                <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 1.66667H12.3583L10.8333 0H5.83333L4.30833 1.66667H1.66667C1.22464 1.66667 0.800716 1.84226 0.488155 2.15482C0.175595 2.46738 0 2.89131 0 3.33333V13.3333C0 13.7754 0.175595 14.1993 0.488155 14.5118C0.800716 14.8244 1.22464 15 1.66667 15H15C15.442 15 15.8659 14.8244 16.1785 14.5118C16.4911 14.1993 16.6667 13.7754 16.6667 13.3333V3.33333C16.6667 2.89131 16.4911 2.46738 16.1785 2.15482C15.8659 1.84226 15.442 1.66667 15 1.66667ZM15 13.3333H1.66667V3.33333H5.04167L6.56667 1.66667H10.1L11.625 3.33333H15V13.3333ZM8.33333 4.16667C7.22826 4.16667 6.16846 4.60565 5.38705 5.38705C4.60565 6.16846 4.16667 7.22826 4.16667 8.33333C4.16667 9.4384 4.60565 10.4982 5.38705 11.2796C6.16846 12.061 7.22826 12.5 8.33333 12.5C9.4384 12.5 10.4982 12.061 11.2796 11.2796C12.061 10.4982 12.5 9.4384 12.5 8.33333C12.5 7.22826 12.061 6.16846 11.2796 5.38705C10.4982 4.60565 9.4384 4.16667 8.33333 4.16667ZM8.33333 10.8333C7.67029 10.8333 7.03441 10.5699 6.56557 10.1011C6.09672 9.63226 5.83333 8.99637 5.83333 8.33333C5.83333 7.67029 6.09672 7.03441 6.56557 6.56557C7.03441 6.09672 7.67029 5.83333 8.33333 5.83333C8.99637 5.83333 9.63226 6.09672 10.1011 6.56557C10.5699 7.03441 10.8333 7.67029 10.8333 8.33333C10.8333 8.99637 10.5699 9.63226 10.1011 10.1011C9.63226 10.5699 8.99637 10.8333 8.33333 10.8333Z" fill="#8B8A8D"/>
                </svg>
              </div>
            </label>
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
              <div className="flex text-white text-[12px] sm:text-[16px] font-[500] items-center gap-2 px-4 py-6 cursor-pointer">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.2851 7.5C13.2851 7.3275 13.2774 7.1625 13.2619 6.99L14.6966 5.9325C15.0052 5.7075 15.09 5.2875 14.8972 4.9575L13.4548 2.535C13.3623 2.37614 13.2127 2.25611 13.0347 2.19796C12.8568 2.13982 12.663 2.14767 12.4906 2.22L10.8322 2.9025C10.5468 2.7075 10.246 2.535 9.92973 2.3925L9.70604 0.66C9.65976 0.285 9.32808 0 8.94241 0H6.0653C5.67192 0 5.34024 0.285 5.29396 0.66L5.07027 2.3925C4.75402 2.535 4.45319 2.7075 4.1678 2.9025L2.50941 2.22C2.15459 2.07 1.73807 2.205 1.54523 2.535L0.102818 4.965C-0.0900173 5.295 -0.00516959 5.7075 0.303368 5.94L1.73807 6.9975C1.70609 7.33428 1.70609 7.67322 1.73807 8.01L0.303368 9.0675C-0.00516959 9.2925 -0.0900173 9.7125 0.102818 10.0425L1.54523 12.465C1.73807 12.795 2.15459 12.93 2.50941 12.78L4.1678 12.0975C4.45319 12.2925 4.75402 12.465 5.07027 12.6075L5.29396 14.34C5.34024 14.715 5.67192 15 6.05759 15H8.9347C9.32037 15 9.65205 14.715 9.69833 14.34L9.92202 12.6075C10.2383 12.465 10.5391 12.2925 10.8245 12.0975L12.4829 12.78C12.8377 12.93 13.2542 12.795 13.4471 12.465L14.8895 10.0425C15.0823 9.7125 14.9975 9.3 14.6889 9.0675L13.2542 8.01C13.2774 7.8375 13.2851 7.6725 13.2851 7.5ZM7.53085 10.125C6.04216 10.125 4.83115 8.9475 4.83115 7.5C4.83115 6.0525 6.04216 4.875 7.53085 4.875C9.01955 4.875 10.2306 6.0525 10.2306 7.5C10.2306 8.9475 9.01955 10.125 7.53085 10.125Z" fill="#F7B831"/>
                </svg>
                Settings
              </div>
            </Link>
            <Link href={'/affiliates'}>
              <div className="flex text-[#515054] text-[12px] sm:text-[16px] font-[500] items-center gap-2 px-4 py-6 cursor-pointer">
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.38429 10.1062L3.9774 8.19947C3.65037 8.53259 3.23456 8.7589 2.78238 8.84986C2.3302 8.94082 1.8619 8.89237 1.43652 8.71061C1.01113 8.52885 0.647711 8.22192 0.392067 7.82852C0.136422 7.43512 0 6.97285 0 6.5C0 6.02715 0.136422 5.56488 0.392067 5.17148C0.647711 4.77808 1.01113 4.47115 1.43652 4.28939C1.8619 4.10763 2.3302 4.05918 2.78238 4.15014C3.23456 4.2411 3.65037 4.46741 3.9774 4.80053L7.38429 2.89375C7.26744 2.33119 7.35184 1.74426 7.62203 1.24029C7.89223 0.736332 8.33018 0.349014 8.85578 0.149171C9.38139 -0.0506734 9.95954 -0.0496891 10.4845 0.151943C11.0095 0.353576 11.4461 0.742382 11.7147 1.24726C11.9833 1.75214 12.0658 2.33936 11.9471 2.90152C11.8284 3.46369 11.5166 3.96324 11.0685 4.30882C10.6204 4.6544 10.0661 4.82292 9.50684 4.78356C8.94763 4.7442 8.42091 4.49959 8.023 4.09447L4.61611 6.00124C4.68397 6.32987 4.68397 6.66945 4.61611 6.99807L8.023 8.90553C8.42091 8.50041 8.94763 8.2558 9.50684 8.21644C10.0661 8.17708 10.6204 8.3456 11.0685 8.69118C11.5166 9.03676 11.8284 9.53631 11.9471 10.0985C12.0658 10.6606 11.9833 11.2479 11.7147 11.7527C11.4461 12.2576 11.0095 12.6464 10.4845 12.8481C9.95954 13.0497 9.38139 13.0507 8.85578 12.8508C8.33018 12.651 7.89223 12.2637 7.62203 11.7597C7.35184 11.2557 7.26744 10.6688 7.38429 10.1062Z" fill="#515054"/>
                </svg>
                Affiliates
              </div>
            </Link>
            <Link href={'/history'}>
              <div className="flex text-[#515054] text-[12px] sm:text-[16px] font-[500] items-center gap-2 px-4 py-6 cursor-pointer">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.2456 0.975C8.32176 -0.675 4.72316 -0.15 2.3241 2.1V0.75C2.3241 0.3 2.02421 0 1.57439 0C1.12456 0 0.824679 0.3 0.824679 0.75V4.125C0.824679 4.575 1.12456 4.875 1.57439 4.875H4.94807C5.3979 4.875 5.69778 4.575 5.69778 4.125C5.69778 3.675 5.3979 3.375 4.94807 3.375H3.14877C4.27334 2.175 5.84772 1.5 7.49708 1.5C10.7958 1.5 13.4947 4.2 13.4947 7.5C13.4947 10.8 10.7958 13.5 7.49708 13.5C4.19837 13.5 1.49942 10.8 1.49942 7.5C1.49942 7.05 1.19953 6.75 0.749708 6.75C0.299883 6.75 0 7.05 0 7.5C0 11.625 3.37369 15 7.49708 15C10.196 15 12.6701 13.575 14.0195 11.25C16.0438 7.65 14.8442 3.075 11.2456 0.975ZM7.49708 4.5C7.04726 4.5 6.74737 4.8 6.74737 5.25V7.5C6.74737 7.95 7.04726 8.25 7.49708 8.25H8.9965C9.44632 8.25 9.74621 7.95 9.74621 7.5C9.74621 7.05 9.44632 6.75 8.9965 6.75H8.24679V5.25C8.24679 4.8 7.94691 4.5 7.49708 4.5Z" fill="#515054"/>
                </svg>
                History
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-8">
          <div className="flex flex-col gap-2">
            <span className="text-[16px] text-[#515054] font-[600] justify-start">Username</span>
            <div className="flex gap-2 items-center w-full">
              <input
                type="text"
                placeholder="Name"
                value={name ? name : ''}
                onChange={handleUsernameChange}
                className="p-2 bg-[#17161B] rounded-[6px] focus:outline-none text-white text-[10px] sm:text-[15px] h-[40px] sm:h-[48px] max-w-[393px] grow"
              />
              <button
                type="submit"
                className="bg-[#F7B831] hover:opacity-90 text-[#0D0C0F] text-[10px] sm:text-[15px] font-[500] h-[40px] sm:h-[48px] px-4 sm:px-12 rounded-[6px]"
              >
                Save
              </button>
            </div>
            {usernameError && <p className="text-sm text-red-600">{usernameError}</p>}
          </div>    
          <div className="flex flex-col gap-2">
            <span className="text-[16px] text-[#515054] font-[600] justify-start">Wallet Connected</span>
            <div className="flex gap-2 items-center w-full">
              <input
                type="text"
                value={address}
                className="p-2 bg-[#17161B] rounded-[6px] focus:outline-none text-[#515054] text-[10px] sm:text-[15px] h-[40px] sm:h-[48px] max-w-[393px] grow"
              />
              <div
                onClick={reconnectWallet}
                className="bg-[#F7B831] hover:opacity-90 py-3 cursor-pointer text-[#0D0C0F] text-[10px] sm:text-[15px] font-[500] h-[40px] sm:h-[48px] px-4 sm:px-12 rounded-[6px]"
              >
                Reconnect Wallet
              </div>
            </div>
          </div>  
        </div>      
      </form>
    </div>
  );
};
