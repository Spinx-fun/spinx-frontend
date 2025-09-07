/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import Sound from "react-sound";
import { FIRST_COOLDOWN } from "../config";

export default function CountdownBar(props: {
  className?: string;
}) {
  const { className } = props;
  const { gameData, setStarted } = useSocket();
  const [timeRemaining, setTimeRemaining] = useState<any>(
    calculateTimeRemaining()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [gameData]);

  useEffect(() => {
    let timeoutId: NodeJS.Timer;
    if (gameData) {
      console.log("countdown: ", Math.floor((gameData?.endTimestamp - new Date().getTime()) / 1000))
      if (
        Math.floor((gameData?.endTimestamp - new Date().getTime()) / 1000) === 0
      ) {
        if (setStarted) {
          setStarted(true);
        }
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeRemaining]);

  useEffect(() => {
    if (gameData && setStarted && gameData.players) {
      if (!gameData.players.length || gameData.players.length < 2) {
        setStarted(false);
      }
    }
  }, [gameData]);

  function calculateTimeRemaining() {
    if (
      gameData?.endTimestamp &&
      gameData?.endTimestamp >= new Date().getTime()
    ) {
      return (
        <div
          className="absolute bg-[#4c49cc] h-2 rounded-3xl"
          style={{
            width: `${((FIRST_COOLDOWN - (gameData?.endTimestamp - new Date().getTime())) /
              FIRST_COOLDOWN) *
              100
              }%`,
          }}
        >
        </div>
      );
    }
  }

  return (
    <div
      className={`${className ? className : ""
        } w-[calc(100%-60px)] mx-[30px] mt-[150px] absolute text-center`}
    >
      <p className="text-white font-semibold ">Countdown</p>
      <div className="absolute w-full bg-[#050d36] h-2 rounded-3xl mt-4">
        {timeRemaining}
        {/* {gameData && (gameData.endTimestamp <= 0 || gameData.endTimestamp < new Date().getTime()) &&
                    <div className="absolute bg-blue-600 h-2 rounded-3xl"></div>
                } */}
      </div>
      {/* <Sound
        url="/sound/bet.mp3"
        debug={false}
        playStatus={isBetSound ? "PLAYING" : "STOPPED"}
      /> */}
    </div>
  );
}
