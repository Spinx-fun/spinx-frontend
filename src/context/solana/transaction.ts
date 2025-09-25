import { web3 } from "@project-serum/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { associatedAddress, TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress
} from "@solana/spl-token"
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import axios from "axios";
import { IDL, SpinX } from "./coinflip";
import {
  PublicKey,
  SystemProgram,
  ComputeBudgetProgram,
  sendAndConfirmTransaction,
  Transaction,
  Keypair,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { networkStateAccountAddress, Orao, randomnessAccountAddress } from "@orao-network/solana-vrf";

import {
  GamePool,
  GAME_SEED,
  COINFLIP_PROGRAM_ID,
  VAULT_SEED,
  GLOBAL_AUTHORITY_SEED,
  SPL_ESCROW_SEED,
  REFERRAL_SEED,
  JUP_FEED,
  USDC_FEED,
  WIF_FEED,
  JTO_FEED,
  SOL_FEED,
  SOL,
  JUP,
  USDC,
  WIF,
  JTO,
  COINFLIP_SEED,
} from "./types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { API_URL, RPC_URL } from "../../config";
import { errorAlert, successAlert } from "../../components/ToastGroup";


export const solConnection = new web3.Connection(RPC_URL);

export const getPriceFeed = (mint: PublicKey) => {
  switch (mint.toBase58()) {
    case "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN":
      return JUP_FEED

    case "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v":
      return USDC_FEED

    case "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm":
      return WIF_FEED

    case "jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL":
      return JTO_FEED

    default:
      return SOL_FEED
  }
}

export const createPlayGameTx = async (
  userAddress: PublicKey,
  mint: PublicKey,
  amount: number,
  referrer: PublicKey | null,
  program: anchor.Program,
) => {
  let now = new Date();
  let ts = Math.floor(now.getTime() / 1000);

  const [solVault] = await PublicKey.findProgramAddress(
    [Buffer.from(VAULT_SEED)],
    program.programId
  );

  const [gamePool] = await PublicKey.findProgramAddress(
    [
      Buffer.from(GAME_SEED),
      userAddress.toBuffer(),
      new anchor.BN(ts).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  const [globalData] = await PublicKey.findProgramAddress(
    [
      Buffer.from(GLOBAL_AUTHORITY_SEED)
    ],
    program.programId
  );

  let tokenAccount, splEscrow

  if (mint.toBase58() === SOL.toBase58()) {
    tokenAccount = await associatedAddress({ mint: JUP, owner: userAddress });
    [splEscrow] = await PublicKey.findProgramAddress(
      [Buffer.from(SPL_ESCROW_SEED), JUP.toBuffer()],
      program.programId
    );
  } else {
    tokenAccount = await associatedAddress({ mint, owner: userAddress });

    [splEscrow] = await PublicKey.findProgramAddress(
      [Buffer.from(SPL_ESCROW_SEED), mint.toBuffer()],
      program.programId
    );
  }

  const [referralData] = await PublicKey.findProgramAddress(
    [Buffer.from(REFERRAL_SEED)],
    program.programId
  );

  console.log("Input Data for PlayGame: ",
    userAddress.toBase58(),
    globalData.toBase58(),
    gamePool.toBase58(),
    solVault.toBase58(),
    tokenAccount.toBase58(),
    mint.toBase58(),
    splEscrow.toBase58(),
    referralData.toBase58(),
    getPriceFeed(mint).toBase58(),
  );

  const tx = new Transaction();
  const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 2000000,
  });
  tx.add(computePriceIx);

  const tokenAAccount = await associatedAddress({ mint: JUP, owner: userAddress });
  const tokenBAccount = await associatedAddress({ mint: USDC, owner: userAddress });
  const tokenCAccount = await associatedAddress({ mint: WIF, owner: userAddress });
  const tokenDAccount = await associatedAddress({ mint: JTO, owner: userAddress });

  const accountAInfo = await program.provider.connection.getAccountInfo(tokenAAccount, "confirmed");
  const accountBInfo = await program.provider.connection.getAccountInfo(tokenBAccount, "confirmed");
  const accountCInfo = await program.provider.connection.getAccountInfo(tokenCAccount, "confirmed");
  const accountDInfo = await program.provider.connection.getAccountInfo(tokenDAccount, "confirmed");
  if (!accountAInfo) {
    // create the token account if it doesn't exist
    tx.add(
      createAssociatedTokenAccountInstruction(
        userAddress,
        tokenAAccount,
        userAddress,
        JUP
      )
    )
  }
  if (!accountBInfo) {
    // create the token account if it doesn't exist
    tx.add(
      createAssociatedTokenAccountInstruction(
        userAddress,
        tokenBAccount,
        userAddress,
        USDC
      )
    )
  }
  if (!accountCInfo) {
    // create the token account if it doesn't exist
    tx.add(
      createAssociatedTokenAccountInstruction(
        userAddress,
        tokenCAccount,
        userAddress,
        WIF
      )
    )
  }
  if (!accountDInfo) {
    // create the token account if it doesn't exist
    tx.add(
      createAssociatedTokenAccountInstruction(
        userAddress,
        tokenDAccount,
        userAddress,
        JTO
      )
    )
  }

  if (referrer) {
    const tokenAAccount = await associatedAddress({ mint: JUP, owner: referrer });
    const tokenBAccount = await associatedAddress({ mint: USDC, owner: referrer });
    const tokenCAccount = await associatedAddress({ mint: WIF, owner: referrer });
    const tokenDAccount = await associatedAddress({ mint: JTO, owner: referrer });

    const accountAInfo = await program.provider.connection.getAccountInfo(tokenAAccount, "confirmed");
    const accountBInfo = await program.provider.connection.getAccountInfo(tokenBAccount, "confirmed");
    const accountCInfo = await program.provider.connection.getAccountInfo(tokenCAccount, "confirmed");
    const accountDInfo = await program.provider.connection.getAccountInfo(tokenDAccount, "confirmed");
    if (!accountAInfo) {
      // create the token account if it doesn't exist
      tx.add(
        createAssociatedTokenAccountInstruction(
          userAddress,
          tokenAAccount,
          referrer,
          JUP
        )
      )
    }
    if (!accountBInfo) {
      // create the token account if it doesn't exist
      tx.add(
        createAssociatedTokenAccountInstruction(
          userAddress,
          tokenBAccount,
          referrer,
          USDC
        )
      )
    }
    if (!accountCInfo) {
      // create the token account if it doesn't exist
      tx.add(
        createAssociatedTokenAccountInstruction(
          userAddress,
          tokenCAccount,
          referrer,
          WIF
        )
      )
    }
    if (!accountDInfo) {
      // create the token account if it doesn't exist
      tx.add(
        createAssociatedTokenAccountInstruction(
          userAddress,
          tokenDAccount,
          referrer,
          JTO
        )
      )
    }
  }

  tx.add(
    program.instruction.playGame(
      new anchor.BN(ts),
      new anchor.BN(amount),
      referrer ? referrer : userAddress,
      {
        accounts: {
          admin: userAddress,
          globalData,
          gamePool,
          solVault,
          tokenAccount,
          mint,
          splEscrow,
          referralData,
          priceFeed: getPriceFeed(mint),
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID
        },
        instructions: [],
        signers: [],
      }
    )
  );

  return tx;
};

export const createEnterGameTx = async (
  userAddress: PublicKey,
  mint: PublicKey,
  gamePool: PublicKey,
  amount: number,
  referrer: PublicKey | null,
  program: anchor.Program,
) => {
  const [solVault, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(VAULT_SEED)],
    program.programId
  );
  console.log(solVault.toBase58());

  const [globalData] = await PublicKey.findProgramAddress(
    [
      Buffer.from(GLOBAL_AUTHORITY_SEED)
    ],
    program.programId
  );

  let tokenAccount, splEscrow

  if (mint.toBase58() === SOL.toBase58()) {
    tokenAccount = await associatedAddress({ mint: JUP, owner: userAddress });
    [splEscrow] = await PublicKey.findProgramAddress(
      [Buffer.from(SPL_ESCROW_SEED), JUP.toBuffer()],
      program.programId
    );
  } else {
    tokenAccount = await associatedAddress({ mint, owner: userAddress });

    [splEscrow] = await PublicKey.findProgramAddress(
      [Buffer.from(SPL_ESCROW_SEED), mint.toBuffer()],
      program.programId
    );
  }

  const [referralData] = await PublicKey.findProgramAddress(
    [Buffer.from(REFERRAL_SEED)],
    program.programId
  );

  const tx = new Transaction();
  const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 2000000,
  });
  tx.add(computePriceIx);

  const tokenAAccount = await associatedAddress({ mint: JUP, owner: userAddress });
  const tokenBAccount = await associatedAddress({ mint: USDC, owner: userAddress });
  const tokenCAccount = await associatedAddress({ mint: WIF, owner: userAddress });
  const tokenDAccount = await associatedAddress({ mint: JTO, owner: userAddress });

  const accountAInfo = await program.provider.connection.getAccountInfo(tokenAAccount, "confirmed");
  const accountBInfo = await program.provider.connection.getAccountInfo(tokenBAccount, "confirmed");
  const accountCInfo = await program.provider.connection.getAccountInfo(tokenCAccount, "confirmed");
  const accountDInfo = await program.provider.connection.getAccountInfo(tokenDAccount, "confirmed");
  if (!accountAInfo) {
    // create the token account if it doesn't exist
    tx.add(
      createAssociatedTokenAccountInstruction(
        userAddress,
        tokenAAccount,
        userAddress,
        JUP
      )
    )
  }
  if (!accountBInfo) {
    // create the token account if it doesn't exist
    tx.add(
      createAssociatedTokenAccountInstruction(
        userAddress,
        tokenBAccount,
        userAddress,
        USDC
      )
    )
  }
  if (!accountCInfo) {
    // create the token account if it doesn't exist
    tx.add(
      createAssociatedTokenAccountInstruction(
        userAddress,
        tokenCAccount,
        userAddress,
        WIF
      )
    )
  }
  if (!accountDInfo) {
    // create the token account if it doesn't exist
    tx.add(
      createAssociatedTokenAccountInstruction(
        userAddress,
        tokenDAccount,
        userAddress,
        JTO
      )
    )
  }

  if (referrer) {
    const tokenAAccount = await associatedAddress({ mint: JUP, owner: referrer });
    const tokenBAccount = await associatedAddress({ mint: USDC, owner: referrer });
    const tokenCAccount = await associatedAddress({ mint: WIF, owner: referrer });
    const tokenDAccount = await associatedAddress({ mint: JTO, owner: referrer });

    const accountAInfo = await program.provider.connection.getAccountInfo(tokenAAccount, "confirmed");
    const accountBInfo = await program.provider.connection.getAccountInfo(tokenBAccount, "confirmed");
    const accountCInfo = await program.provider.connection.getAccountInfo(tokenCAccount, "confirmed");
    const accountDInfo = await program.provider.connection.getAccountInfo(tokenDAccount, "confirmed");
    if (!accountAInfo) {
      // create the token account if it doesn't exist
      tx.add(
        createAssociatedTokenAccountInstruction(
          userAddress,
          tokenAAccount,
          referrer,
          JUP
        )
      )
    }
    if (!accountBInfo) {
      // create the token account if it doesn't exist
      tx.add(
        createAssociatedTokenAccountInstruction(
          userAddress,
          tokenBAccount,
          referrer,
          USDC
        )
      )
    }
    if (!accountCInfo) {
      // create the token account if it doesn't exist
      tx.add(
        createAssociatedTokenAccountInstruction(
          userAddress,
          tokenCAccount,
          referrer,
          WIF
        )
      )
    }
    if (!accountDInfo) {
      // create the token account if it doesn't exist
      tx.add(
        createAssociatedTokenAccountInstruction(
          userAddress,
          tokenDAccount,
          referrer,
          JTO
        )
      )
    }
  }

  tx.add(
    program.instruction.enterGame(
      new anchor.BN(amount),
      referrer ? referrer : userAddress, {
      accounts: {
        admin: userAddress,
        globalData,
        gamePool,
        solVault,
        tokenAccount,
        mint,
        splEscrow,
        referralData,
        priceFeed: getPriceFeed(mint),
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

async function getPriorityFeeEstimate(transaction: any) {
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "1",
      method: "getPriorityFeeEstimate",
      params: [
        {
          transaction: bs58.encode(transaction.serialize()), // Pass the serialized transaction in Base58
          options: { "priority_level": "HIGH" },
        },
      ],
    }),
  });
  const data = await response.json();
  return data.result;
}

export const createCoinflip = async (
  wallet: WalletContextState,
  setNumber: number,
  mint: PublicKey,
  amount: number,
  setLoading: Function,
) => {
  if (wallet.publicKey === null) return;

  const cloneWindow: any = window;
  const userAddress = wallet.publicKey;
  const provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new Program(
    IDL as anchor.Idl,
    provider
  );
  try {
    setLoading(true);
    const globalState = await getGlobalStateByKey(program);
    let next_pool_id = new anchor.BN(Number(globalState));
    const tx = await createCoinflipTx(userAddress, setNumber, mint, amount, next_pool_id, program);
    const { blockhash } = await solConnection.getLatestBlockhash();
    tx.feePayer = userAddress;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(tx);
      // const encodedTx = Buffer.from(signedTx.serialize()).toString("base64");
      const txId = await provider.connection.sendRawTransaction(
        signedTx.serialize(),
        {
          skipPreflight: true,
          maxRetries: 3,
          preflightCommitment: "confirmed",
        }
      );
      await solConnection.confirmTransaction(txId, "confirmed");

      const response = await axios.post(`${API_URL}create-coinflip/`, {
        poolId: Number(next_pool_id),
        creatorTx: txId
      })

      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false);
          successAlert('Bet successfully');
        }, 3000)
      }
    }
  } catch (error) {
    console.log(" --> createCoinflip:", error);
    errorAlert("Something went wrong. Please try again!");
    setLoading(false);
  }

}

export const createCoinflipTx = async (
  userAddress: PublicKey,
  setNumber: number,
  mint: PublicKey,
  amount: number,
  next_pool_id: anchor.BN,
  program: anchor.Program,
) => {
  let now = new Date();
  let ts = Math.floor(now.getTime() / 1000);

  const [solVault] = await PublicKey.findProgramAddress(
    [Buffer.from(VAULT_SEED)],
    program.programId
  );

  const [globalData] = await PublicKey.findProgramAddress(
    [
      Buffer.from(GLOBAL_AUTHORITY_SEED)
    ],
    program.programId
  );

  const [coinflipPool] = await PublicKey.findProgramAddress(
    [
      Buffer.from(COINFLIP_SEED),
      new anchor.BN(next_pool_id).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  let tokenAccount, splEscrow

  tokenAccount = await getAssociatedTokenAddress(mint, userAddress);

  splEscrow = await getAssociatedTokenAddress(
    mint,
    coinflipPool,
    true
  );

  console.log("Input Data for Coinflip: ",
    userAddress.toBase58(),
    globalData.toBase58(),
    coinflipPool.toBase58(),
    solVault.toBase58(),
    tokenAccount.toBase58(),
    mint.toBase58(),
    splEscrow.toBase58(),
    getPriceFeed(mint).toBase58(),
  );

  const tx = new Transaction();
  const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 2000000,
  });
  tx.add(computePriceIx);
  tx.add(
    program.instruction.createCoinflip(
      new anchor.BN(setNumber),
      new anchor.BN(amount),
      {
        accounts: {
          creator: userAddress.toBase58(),
          globalData,
          creatorAta: tokenAccount,
          spinxMint: mint,
          coinflipPool,
          solVault,
          tokenAccount,
          splEscrow,
          associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID
        },
        instructions: [],
        signers: [],
      }
    )
  );

  return tx;
};

export const joinCoinflip = async (
  wallet: WalletContextState,
  setNumber: number,
  mint: PublicKey,
  amount: number,
  creatorAta: PublicKey,
  poolId: number,
  setLoading: Function,
) => {
  if (wallet.publicKey === null) return;

  let programId = new anchor.web3.PublicKey(COINFLIP_PROGRAM_ID);

  const cloneWindow: any = window;
  const userAddress = wallet.publicKey;
  const provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(
    IDL as unknown as anchor.Idl,
    provider
  );
  try {
    setLoading(true);
    const vrf = new Orao(provider);
    let force = Keypair.generate().publicKey;
    const random = randomnessAccountAddress(force.toBuffer(), vrf.programId);
    const tx = await joinCoinflipTx(userAddress, setNumber, mint, amount, program, creatorAta, poolId, vrf, random, force, provider);
    const { blockhash } = await solConnection.getLatestBlockhash();
    tx.feePayer = userAddress;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(tx);
      // const encodedTx = Buffer.from(signedTx.serialize()).toString("base64");
      const txId = await provider.connection.sendRawTransaction(
        signedTx.serialize(),
        {
          skipPreflight: true,
          maxRetries: 3,
          preflightCommitment: "confirmed",
        }
      );
      await solConnection.confirmTransaction(txId, "confirmed");

      const joinResponse = await axios.post(`${API_URL}join-coinflip/`, {
        poolId: poolId,
        joinerTx: txId,
        random: random.toBase58()
      })

      if (joinResponse.status === 200) {
        console.log('joinResponse', joinResponse)
      }

      let winner;
      const response = await axios.post(`${API_URL}result-game/`, {
        poolId: poolId,
      })
      if (response.status === 200) {
        winner = response.data.winner;
        console.log("Signature:", txId);
        setLoading(false);
        successAlert('Bet successfully!');
        return winner;
      }
    }
  } catch (error) {
    console.log(" --> joinCoinflip:", error);
    errorAlert("Something went wrong. Please try again!");
    setLoading(false);
  }
}

export const joinCoinflipTx = async (
  userAddress: PublicKey,
  setNumber: number,
  mint: PublicKey,
  amount: number,
  program: anchor.Program,
  creatorAta: PublicKey,
  poolId: number,
  vrf: any,
  random: PublicKey,
  force: PublicKey,
  provider: any
) => {
  const [solVault] = await PublicKey.findProgramAddress(
    [Buffer.from(VAULT_SEED)],
    program.programId
  );

  const [globalData] = await PublicKey.findProgramAddress(
    [
      Buffer.from(GLOBAL_AUTHORITY_SEED)
    ],
    program.programId
  );

  const [coinflipPool] = await PublicKey.findProgramAddress(
    [
      Buffer.from(COINFLIP_SEED),
      new anchor.BN(poolId).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  let tokenAccount, splEscrow
  tokenAccount = await getAssociatedTokenAddress(mint, userAddress);
  splEscrow = await getAssociatedTokenAddress(
    mint,
    coinflipPool,
    true
  );

  const tx = new Transaction();
  const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 2000000,
  });


  tx.add(computePriceIx);
  tx.add(
    program.instruction.joinCoinflip(
      new anchor.BN(poolId),
      [...force.toBuffer()],
      new anchor.BN(setNumber),
      new anchor.BN(amount),
      {
        accounts: {
          joiner: userAddress,
          globalData,
          joinerAta: tokenAccount,
          spinxMint: mint,
          coinflipPool,
          creator: creatorAta,
          solVault,
          splEscrow,
          vrf: vrf.programId,
          config: networkStateAccountAddress(),
          treasury: new PublicKey("9ZTHWWZDpB36UFe1vszf2KEpt83vwi27jDqtHQ7NSXyR"),
          random,
          associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID
        },
        instructions: [],
        signers: [],
      }
    )
  );

  return tx;
};

export const closeCoinflip = async (
  wallet: WalletContextState,
  poolId: number,
  mint: PublicKey,
  setLoading: Function
) => {
  if (wallet.publicKey === null) return;

  const cloneWindow: any = window;
  const userAddress = wallet.publicKey;
  const provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(
    IDL as anchor.Idl,
    provider
  );
  try {
    setLoading(true);
    const tx = await closeCoinflipTx(userAddress, poolId, mint, program);
    const { blockhash } = await solConnection.getLatestBlockhash();
    tx.feePayer = userAddress;
    tx.recentBlockhash = blockhash;
    if (wallet.signTransaction) {
      const signedTx = await wallet.signTransaction(tx);
      // const encodedTx = Buffer.from(signedTx.serialize()).toString("base64");
      const txId = await provider.connection.sendRawTransaction(
        signedTx.serialize(),
        {
          skipPreflight: true,
          maxRetries: 3,
          preflightCommitment: "confirmed",
        }
      );
      await solConnection.confirmTransaction(txId, "confirmed");
      const response = await axios.post(`${API_URL}close-coinflip/`, {
        poolId: Number(poolId),
      })

      if (response.status === 200) {
        setTimeout(() => {
          console.log("Signature:", txId);
          setLoading(false);
          successAlert('Closed successfully!')
        }, 3000)
      }

    }
  } catch (error) {
    console.log(" --> claimCoinflip:", error);
    errorAlert("Something went wrong. Please try again!");
    setLoading(false);
  }

}

export const closeCoinflipTx = async (
  userAddress: PublicKey,
  poolId: number,
  mint: PublicKey,
  program: anchor.Program,
) => {
  const [coinflipPool] = await PublicKey.findProgramAddress(
    [
      Buffer.from(COINFLIP_SEED),
      new anchor.BN(poolId).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  let tokenAccount, splEscrow

  tokenAccount = await getAssociatedTokenAddress(mint, userAddress);

  splEscrow = await getAssociatedTokenAddress(
    mint,
    coinflipPool,
    true
  );

  const tx = new Transaction();
  const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 2000000,
  });
  tx.add(computePriceIx);

  tx.add(
    program.instruction.closeCoinflip(
      new anchor.BN(poolId),
      {
        accounts: {
          signer: userAddress,
          coinflipPool,
          splEscrow,
          spinxMint: mint,
          creatorAta: tokenAccount,
          associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID
        },
        instructions: [],
        signers: [],
      }
    )
  );
  return tx;
};


interface GlobalData {
  nextPoolId: anchor.BN;
}

interface PoolData {
  poolId: anchor.BN;
  startTs: anchor.BN;
  winner: PublicKey;
  poolAmount: anchor.BN;
  creatorPlayer: PublicKey;
  creatorAmount: anchor.BN;
  creatorSetNumber: anchor.BN;
  joinerPlayer: PublicKey;
  joinerAmount: anchor.BN
  joinerSetNumber: anchor.BN;
}

interface AccountBalance {
  solBalance: number;
  tokenBalances: number;
}


const getGlobalStateByKey = async (
  program: anchor.Program
): Promise<GlobalData> => {
  const allAccounts = await solConnection.getProgramAccounts(program.programId);
  const globalAccounts = [];
  const accountsCoder = program.coder.accounts;
  for (const { pubkey, account } of allAccounts) {
    try {
      const decoded = accountsCoder.decode('globalData', account.data);
      globalAccounts.push({
        publicKey: pubkey,
        account: decoded
      });
    } catch (error) {
      // Skip accounts that can't be decoded
      continue;
    }
  }
  let globalDataAccount = globalAccounts[0].account.nextPoolId
  return globalDataAccount as GlobalData;
};

export const getAccountTokenBlanace = async (
  tokenAddress: string,
  userAddress: string,
  decimals: number
): Promise<AccountBalance> => {
  let tokenBalances
  tokenBalances = await solConnection.getParsedTokenAccountsByOwner(new PublicKey(userAddress), { mint: new PublicKey(tokenAddress) }, "processed")
  const tokenBalance = tokenBalances.value[0]?.account.data.parsed.info.tokenAmount.amount / 10 ** (decimals);

  const creatorBalance = await solConnection.getBalance(new PublicKey(userAddress));
  const solBalance = creatorBalance / LAMPORTS_PER_SOL;
  let balances = [];
  balances.push({
    solBalance,
    tokenBalance
  })
  return balances as unknown as AccountBalance;
};

export const getAllChallenges = async (
): Promise<PoolData> => {
  // const cloneWindow: any = window;
  // const provider = new anchor.AnchorProvider(
  //   solConnection,
  //   cloneWindow["solana"],
  //   anchor.AnchorProvider.defaultOptions()
  // );
  // const program = new Program(
  //   IDL as anchor.Idl,
  //   provider
  // );
  // const allAccounts = await solConnection.getProgramAccounts(program.programId);
  // const coinflipAccounts = [];
  // const accountsCoder = program.coder.accounts;

  // for (const { pubkey, account } of allAccounts) {
  //   try {
  //     // Try to decode - if it fails, the account is invalid
  //     const decoded = accountsCoder.decode('coinflipPool', account.data);
  //     coinflipAccounts.push({
  //       publicKey: pubkey,
  //       account: decoded
  //     });
  //   } catch (error) {
  //     // Skip accounts that can't be decoded
  //     continue;
  //   }
  // }

  const response = await fetch(`${API_URL}getCoinflipData`);
  const data = await response.json();
  let coinflipData= data.data
  return coinflipData as unknown as PoolData;
};

