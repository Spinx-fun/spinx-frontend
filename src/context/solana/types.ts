import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export const GLOBAL_AUTHORITY_SEED = "global-authority";
export const VAULT_SEED = "vault-authority";
export const GAME_SEED = "game-authority";
export const COINFLIP_SEED = "coinflip-authority";
export const SPL_ESCROW_SEED = "spl-escrow";
export const REFERRAL_SEED = "referral";
export const RANDOM_SEED = "random-seed";

export const COINFLIP_PROGRAM_ID = new PublicKey(
  "51vHCxjNc4Dd3jXqvZb6PZ3XugjqJjtBVCHnEFHFU3vc"
);

export const FEE_WALLET = new PublicKey(
  "Hsz6954x56Ufk9BDYhXhdMMmWXu9Fwmqvd87XB9nk2Hd"
);

export const SOL_FEED = new PublicKey(
  "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG"
);

export const JUP_FEED = new PublicKey(
  "g6eRCbboSwK4tSWngn773RCMexr1APQr4uA9bGZBYfo"
);
export const USDC_FEED = new PublicKey(
  "Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD"
);

export const WIF_FEED = new PublicKey(
  "6ABgrEZk8urs6kJ1JNdC1sspH5zKXRqxy8sg3ZG2cQps"
);

export const JTO_FEED = new PublicKey(
  "D8UUgr8a3aR3yUeHLu7v8FWK7E8Y5sSU7qrYBXUJXBQ5"
);

export const SOL = new PublicKey(
  "So11111111111111111111111111111111111111112"
);

export const JUP = new PublicKey(
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"
);

export const USDC = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

export const WIF = new PublicKey(
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm"
);

export const JTO = new PublicKey(
  "jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL"
);

export interface GamePool {
  startTs: anchor.BN;
  rand: anchor.BN;
  totalDeposit: anchor.BN;
  claimed: anchor.BN;
  winner: PublicKey;
  entrants: PublicKey[];
  depositAmounts: anchor.BN[];
}
