/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import getConfig from "next/config";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  ChatType,
  ClientToServerEvents,
  Coinflip,
  ModalData,
  Player,
  ServerToClientEvents,
  UserHistoryType,
  UserReferralInfoType,
  UserType,
  UserWageredType,
} from "../utils/type";
import {
  API_URL,
  CLEAR_COOLDOWN,
  SOCKET_URL,
} from "../config";
import { useRouter } from "next/router";
import { successAlert } from "../components/ToastGroup";

const { publicRuntimeConfig } = getConfig();
export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

interface Context {
  socket?: SocketType;
  gameData?: {
    players: Player[];
    pda: string;
    endTimestamp: number;
    gameStarted: boolean;
  };
  coinflipData: Coinflip[],
  gameEnded?: boolean;
  winner?: {
    winner: string;
    referrer: string;
    resultHeight: number;
    bet: number;
    payout: number;
  };
  coinflipWinner?: string;
  resultHeight?: number;
  getFirstGameData?: Function;
  setClearGame?: Function;
  started?: boolean;
  setStarted?: Function;
  messages?: ChatType[];
  onlined?: number;
  isStarting?: number;
  recentWinners?: any[];
  user?: UserType;
  userWagered?: UserWageredType,
  userReferralInfo?: UserReferralInfoType,
  userHistory?: UserHistoryType,
  users: UserType[];
  modalData: ModalData;
  setClearCoinflip: Function;
}

const context = createContext<Context>({} as any);

export const useSocket = () => useContext(context);

const SocketProvider = (props: { children: any }) => {
  const wallet = useWallet();
  const [socket, setSocket] = useState<SocketType>();
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<ChatType[]>();
  const [coinflipData, setCoinflipData] = useState<Coinflip[]>([]);
  const [user, setUser] = useState<UserType>();
  const [userWagered, setUserWagered] = useState<UserWageredType>();
  const [userReferralInfo, setUserReferralInfo] = useState<UserReferralInfoType>();
  const [userHistory, setUserHistory] = useState<UserHistoryType>();
  const [users, setUsers] = useState<UserType[]>([]);
  const [onlined, setOnlined] = useState(0);
  const [isStarting, setGameStarting] = useState<number>(1);
  const [gameData, setGameData] = useState<{
    players: Player[];
    endTimestamp: number;
    pda: string;
    gameStarted: boolean;
  }>();
  const [modalData, setModalData] = useState<ModalData>({
    pda: "",
    player: "",
    number: 0,
    mint: "",
    amount: 0
  });

  const router = useRouter();

  const [recentWinners, setRecentWinner] = useState();
  const [coinflipWinner, setCoinflipWinner] = useState('');

  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState({
    bet: 0,
    payout: 0,
    winner: "",
    referrer: "",
    resultHeight: 0,
  });
  const [resultHeight, setResultHeight] = useState(0);

  const setClearGame = () => {
    setGameData({
      players: [],
      endTimestamp: 0,
      pda: "",
      gameStarted: false,
    });
    if (gameEnded) {
      setGameStarting(1);
      setWinner({
        bet: 0,
        payout: 0,
        winner: "",
        referrer: "",
        resultHeight: 0,
      });
      setStarted(false);
    }
  };

  const setClearCoinflip = () => {
    setModalData({
        pda: "",
        player: "",
        number: 0,
        mint: "",
        amount: 0
    });
    setCoinflipWinner("");
  }

  const getFirstGameData = async () => {
    try {
      const response = await fetch(`${API_URL}getRecentGame`);
      const data = await response.json();
      if (data?.pda && data?.pda !== "") {
        setGameData({
          players: data.players,
          endTimestamp: data.endTimestamp,
          pda: data.pda,
          gameStarted: true,
        });
      }
    } catch (error) {
      console.log("getFirstGameData", error);
      setGameData(undefined);
    }
  };

  useEffect(() => {
    if (wallet.publicKey) {
      getUser();
      getUserWageredAndProfit();
      getUserReferralInfo();
      getUserHistory();
    }
    getUsers();
  }, [wallet]);

  useEffect(() => {
    getFirstGameData();
  }, [gameData?.endTimestamp]);

  const getFirstMessages = async () => {
    try {
      const response = await fetch(`${API_URL}getMessage`);
      const data = await response.json();
      if (data) {
        setMessages(data);
      }
    } catch (error) {
      console.log("getFirstMessages", error);
      setGameData(undefined);
    }
  };

  const getCoinflipData = async () => {
    try {
      const response = await fetch(`${API_URL}getCoinflipPools`);
      const data = await response.json();
      if (data) {
        setCoinflipData(data);
      }
    } catch (error) {
      console.log("getCoinflipData", error);
      setGameData(undefined);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${API_URL}getUser?user_address=${wallet.publicKey?.toBase58()}`);
      const data = await response.json();
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.log("getUser", error);
      setGameData(undefined);
    }
  };

  const getUserWageredAndProfit = async () => {
    try {
      const response = await fetch(`${API_URL}getTotalBetAmountAndPayout?user_address=${wallet.publicKey?.toBase58()}`);
      const data = await response.json();
      if (data) {
        setUserWagered(data);
      }
    } catch (error) {
      console.log("getUserWageredAndProfit", error);
      setGameData(undefined);
    }
  };

  const getUserReferralInfo = async () => {
    try {
      const response = await fetch(`${API_URL}getUserReferralInfo?user_address=${wallet.publicKey?.toBase58()}`);
      const data = await response.json();
      if (data) {
        setUserReferralInfo(data);
      }
    } catch (error) {
      console.log("getUserReferralInfo", error);
      setGameData(undefined);
    }
  };

  const getUserHistory = async () => {
    try {
      const response = await fetch(`${API_URL}getUserHistory?user_address=${wallet.publicKey?.toBase58()}`);
      const data = await response.json();
      if (data) {
        setUserHistory(data);
      }
    } catch (error) {
      console.log("getUserHistory", error);
      setGameData(undefined);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(`${API_URL}getUsers`);
      const data = await response.json();
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.log("getUsers", error);
      setGameData(undefined);
    }
  };

  // init socket client object
  useEffect(() => {
    const socket = io(API_URL);
    socket.on("connect", async () => {
      console.log(" --@ connected to backend", socket.id);
      await getFirstGameData();
      await getFirstMessages();
      await getCoinflipData();
    });
    socket.on("disconnect", () => {
      console.log(" --@ disconnected from backend", socket.id);
    });
    setSocket(socket);
    return () => {
      gameData;
      socket.off("connect");
      socket.off("disconnect");
      setSocket(undefined);
    };
  }, []);

  useEffect(() => {
    socket?.on("endTimeUpdated", async (pda, last_ts, players) => {
      console.log(" --@ endTimeUpdated:", pda, last_ts, players);
      setGameData({
        pda: pda,
        endTimestamp: last_ts,
        players: players,
        gameStarted: true,
      });
    });

    socket?.on("connectionUpdated", async (counter) => {
      //   console.log(" --@ connectionUpdated:", counter);
      setOnlined(counter);
    });

    socket?.on("coinflip", async (pools) => {
      console.log(" --@ coinflip:", pools);
      setCoinflipData(pools);
    });

    socket?.on("joinedCoinflip", async (pools, winner) => {
      console.log(" --@ joinedCoinflip:", pools, winner);
      setCoinflipData(pools);
      setCoinflipWinner(winner);
    });

    socket?.on("joiningCoinflip", async (pda, player, number, mint, amount) => {
      console.log(" --@ joiningCoinflip:", pda, player, number, mint, amount);
      setModalData({
        pda: pda,
        player: player,
        number: number,
        mint: mint,
        amount: amount
      });
    });

    socket?.on("startGame", async (pda, endTimestamp, players) => {
      console.log(" --@ startGame:", pda, endTimestamp, players);
      setGameData({
        pda: pda,
        endTimestamp,
        players,
        gameStarted: true,
      });
      setWinner({
        bet: 0,
        payout: 0,
        winner: "",
        referrer: "",
        resultHeight: 0,
      });
      setResultHeight(0);
    });

    socket?.on("gameEnded", async (winner) => {
      console.log(" --@ gameEnded:", new Date().toLocaleTimeString(), winner);
      setWinner(winner);
    });

    // TODO: need to check if this fresh round is working
    socket?.on("newGameReady", async (time, players) => {
      console.log(
        " --@ newGameReady:",
        new Date().toLocaleTimeString(),
        time,
        players
      );
      setTimeout(() => {
        setGameEnded(true);
        // setClearGame();
        // if (isStarting)
        setGameData({
          players: players,
          endTimestamp: time,
          pda: "",
          gameStarted: false,
        });
        //   // reset game starting
        // setGameStarting(1);
        setWinner({
          payout: 0,
          bet: 0,
          winner: "",
          referrer: "",
          resultHeight: 0,
        });
        // setStarted(false);
      }, CLEAR_COOLDOWN);
    });

    socket?.on("gameStarting", async (started) => {
      console.log(" --@ gameStarting:", started);
      // set game starting flag to prevent conflict
      setGameStarting(started);
      setGameEnded(false);
    });

    socket?.on("chatUpdated", async ([...msgs]: ChatType[]) => {
      console.log('chatUpdated')
      setMessages(msgs);
    });

    socket?.on("userUpdated", async (user: UserType, users: UserType[]) => {
      if (wallet.publicKey?.toBase58() === user.user_address)
        setUser(user);
      setUsers(users);
    });

    return () => {
      socket?.off("connectionUpdated");
      socket?.off("startGame");
      socket?.off("coinflip");
      socket?.off("joiningCoinflip");
      socket?.off("joinedCoinflip");
      socket?.off("endTimeUpdated");
      socket?.off("chatUpdated");
      socket?.off("userUpdated");
      socket?.off("gameEnded");
      socket?.off("newGameReady");
      socket?.off("gameStarting");
    };
  }, [socket]);

  return (
    <context.Provider
      value={{
        socket,
        gameData,
        coinflipData,
        gameEnded,
        winner,
        resultHeight,
        setClearGame,
        isStarting,
        started,
        setStarted,
        messages,
        user,
        userWagered,
        userReferralInfo,
        userHistory,
        users,
        recentWinners,
        onlined,
        modalData,
        setClearCoinflip,
        coinflipWinner
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default SocketProvider;
