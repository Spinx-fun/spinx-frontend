export interface Asset {
    symbol: string
    src: string
    name: string
    address: string
    decimals?: number
}

export const assets = [
    {
        symbol: 'SpinX',
        src: '/image/sfx-coin.svg',
        name: 'SpinX',
        address: 'EY4wsByMUEudm4FRC2nTFfmiWFCMdhJx5j69ZTfQ8mz6',
        decimals: 9,
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

export const solacc = 'https://solscan.io/account'
export const solTx = 'https://solscan.io/tx'