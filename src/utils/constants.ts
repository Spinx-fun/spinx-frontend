export interface Asset {
    symbol: string
    src: string
    name: string
    address: string
    decimals?: number
}

export const assets = [
    {
        symbol: 'SOL',
        src: '/img/sol.png',
        name: 'Solana',
        address: 'So11111111111111111111111111111111111111112'
    },
    {
        symbol: 'JUP',
        src: '/img/jup.png',
        name: 'Jupiter',
        address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
        decimals: 6
    },
    {
        symbol: 'USDC',
        src: '/img/usdc.png',
        name: 'USD Coin',
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        decimals: 6
    },
    {
        symbol: 'WIF',
        src: '/img/wif.png',
        name: 'dogwifhat',
        address: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
        decimals: 6
    },
    {
        symbol: 'JTO',
        src: '/img/jto.png',
        name: 'JITO',
        address: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL'
    },
] as Asset[]

export const getDecimals = (mint: string): number => {
    const asset = assets.find(asset => asset.address === mint);
    return asset ? asset.decimals ? asset.decimals : 9 : 0;
};

export const getSymbol = (mint: string): string => {
    const asset = assets.find(asset => asset.address === mint);
    return asset ? asset.symbol : 'SOL';
};