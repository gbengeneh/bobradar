"use client";
import React, { useEffect, useState } from "react";
import Navbar from '@/components/Navbar';
import Loader from "@/components/Loader";
import axios from "axios";


import { TokenDetails } from "../interfaces/token";
import { Tokennomics } from "../interfaces/tokennomics";
import { useRouter } from "next/navigation";

const totalSupply = 1000000000;

type Holder = {
    address: string;
    amount: number;
    uiAmount: number;
    decimals: number;
    uiAmountString: string;
}

export default function Page() {
    const router = useRouter();

    const searchparams = new URLSearchParams(window.location.search);
    const token = searchparams.get("token");


    const [tokenAddress, setTokenAddress] = useState(""); 

    const [loading, setLoading] = useState(false);
    const [tokennomics, setTokennomics] = useState<Tokennomics[] | null>(null);
    const [tokenData, setTokenData] = useState<TokenDetails | null>(null);
    const [holders, setHolders] = useState<Holder[]>([]);
    const [error, setError] = useState<boolean>(false);

    const handleSubmit = () => {
        router.push(`/scanner?token=${tokenAddress}`);
        fetchTokenData(); // Fetch data when the user submits the form
    }

    const fetchTokenData = async () => {
        if (!tokenAddress && !token) return;

        const data = {
            "jsonrpc": "2.0",
            "id": "helius-metadata",
            "method": "getAsset",
            "params": {
                "id": tokenAddress,
            }
        }
       const holdersRequestBody = {
            "jsonrpc": "2.0",
            "id": "holders",
            "method": "getTokenLargestAccounts",
            "params": [
                tokenAddress,
            ]
        }

        try {

            setLoading(true);
            const tokennomics = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);   

            const response = await axios.post(
                `https://mainnet.helius-rpc.com/?api-key=00b4067b-0ffe-428c-ae8a-4cd890291b34`, 
                data
            );

            const holders = await axios.post(
                `https://mainnet.helius-rpc.com/?api-key=00b4067b-0ffe-428c-ae8a-4cd890291b34`, 
                holdersRequestBody
            )

            setTokennomics(tokennomics.data.pairs);
            setTokenData(response?.data?.result);
            setHolders(holders?.data?.result?.value || []);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const formatAmount = (uiAmount: number) => {
        return (uiAmount / 1000000).toFixed(1) + 'M';
    };

    const calculatePercentage = (uiAmount: number) => {
        return ((uiAmount / totalSupply) * 100).toFixed(2) + '%';
    };

    const shortenAddress = (address: string) => {
        return address.slice(0, 4) + '...' + address.slice(-4);
    };

    function formatNumber(number: number): string {
        if (typeof number !== 'number' || isNaN(number)) return '0';

        const absNumber: number = Math.abs(number);
        const sign: string = number < 0 ? '-' : '';

        if (absNumber >= 1_000_000) {
            return `${sign}${(number / 1_000_000).toFixed(2)}M`;
        } else if (absNumber >= 1_000) {
            return `${sign}${(number / 1_000).toFixed(2)}k`;
        } else {
            return `${sign}${number.toFixed(2)}`;
        }
    }
    

    useEffect(()=> {
        if(token) {
            console.log("Token from URL:", token);
            setTokenAddress(token?.toString());
            fetchTokenData();  // Trigger fetch with the token address from URL
        }
    }, [token])


    return (
        <>
            { loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col min-h-screen">
                    <div className="min-h-screen bg-black text-white flex flex-col">
                        <div className="relative flex-1 pb-16 md:pb-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div>
                            <Navbar />
                            <main className="flex-1">
                                <section id="scanner" className="py-12 md:py-20 lg:py-32">
                                    <div className="container mx-auto px-4 sm:px-6">
                                        <div className="max-w-4xl mx-auto">
                                            <div className="text-center mb-8 md:mb-12">
                                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Token Scanner</h2>
                                                <p className="text-white/70 text-base md:text-lg px-4">Enter any Solana token address to get instant analytics</p>
                                            </div>
                                            <div className="mb-6 md:mb-8">
                                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                                <div className="flex-1 relative">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/50">
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <path d="m21 21-4.3-4.3"></path>
                                                    </svg>
                                                    <input
                                                        className="flex rounded-md border px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 sm:pl-12 h-12 sm:h-14 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 text-sm sm:text-lg w-full"
                                                        placeholder="Paste token address…"
                                                        type="text"
                                                        value={tokenAddress}
                                                        onChange={e => setTokenAddress(e.target.value)}
                                                        style={{ fontSize: '16px' }}
                                                    />
                                                </div>
                                                <button
                                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-2 h-12 sm:h-14 px-6 sm:px-8 bg-white text-black hover:bg-white/90 font-semibold transition-all duration-300 disabled:opacity-50 w-full sm:w-auto"
                                                    type="submit"
                                                    disabled={!tokenAddress.trim()}
                                                    onClick={handleSubmit}
                                                >
                                                    <span className="text-sm sm:text-base">Scan Token</span>
                                                </button>
                                                </div>
                                            </div>

                                            {tokenData && holders && tokennomics && (
                                                <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                                                    <div className="rounded-lg border text-card-foreground bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                                                        <div className="p-4 sm:p-6 md:p-8">
                                                        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                                            <img
                                                                alt="first internet runner"
                                                                loading="lazy"
                                                                width={64}
                                                                height={64}
                                                                decoding="async"
                                                                data-nimg="1"
                                                                className="w-full h-full object-cover"
                                                                src={
                                                                    tokenData?.content?.links?.image ||
                                                                    tokenData?.content?.files[0].uri
                                                                }
                                                                style={{ color: 'transparent' }}
                                                            />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-white truncate">
                                                                {tokenData?.content.metadata.name} ({tokenData?.content?.metadata?.symbol})
                                                            </h3>
                                                            <p className="text-white/70 mb-2 font-mono text-xs sm:text-sm truncate">
                                                                {tokenData?.id}
                                                            </p>
                                                            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                                                                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                                                                    ${tokennomics[0].priceUsd}
                                                                </span>
                                                                {tokennomics[0].priceChange.h24 > 0 ? (
                                                                    <div className="flex items-center gap-1 text-green-400">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-3 h-3 md:w-4 md:h-4">
                                                                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                                                            <polyline points="16 7 22 7 22 13"></polyline>
                                                                        </svg>
                                                                        <span className="font-semibold text-sm md:text-base">
                                                                            {tokennomics[0].priceChange.h24}%
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-1 text-red-400">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trending-down w-3 h-3 md:w-4 md:h-4">
                                                                            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                                                                            <polyline points="16 17 22 17 22 11"></polyline>
                                                                        </svg>
                                                                        <span className="font-semibold text-sm md:text-base">
                                                                            {tokennomics[0].priceChange.h24}%
                                                                        </span>
                                                                    </div>
                                                                )}

                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                                                            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign w-3 h-3 sm:w-4 sm:h-4 text-white/70">
                                                                <line x1="12" x2="12" y1="2" y2="22"></line>
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                                                </svg>
                                                                <span className="text-white/70 text-xs sm:text-sm">Market Cap</span>
                                                            </div>
                                                            <span className="text-sm sm:text-lg font-bold text-white">
                                                                ${formatNumber(tokennomics[0].marketCap)}
                                                            </span>
                                                            </div>
                                                            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-3 h-3 sm:w-4 sm:h-4 text-white/70">
                                                                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                                                <polyline points="16 7 22 7 22 13"></polyline>
                                                                </svg>
                                                                <span className="text-white/70 text-xs sm:text-sm">24h Volume</span>
                                                            </div>
                                                            <span className="text-sm sm:text-lg font-bold text-white">
                                                                ${formatNumber(tokennomics[0].volume.h24)}
                                                            </span>
                                                            </div>
                                                            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign w-3 h-3 sm:w-4 sm:h-4 text-white/70">
                                                                <line x1="12" x2="12" y1="2" y2="22"></line>
                                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                                                </svg>
                                                                <span className="text-white/70 text-xs sm:text-sm">Liquidity</span>
                                                            </div>
                                                            <span className="text-sm sm:text-lg font-bold text-white">
                                                                ${formatNumber(tokennomics[0].liquidity.usd)}
                                                            </span>
                                                            </div>
                                                            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-3 h-3 sm:w-4 sm:h-4 text-white/70">
                                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                                                <circle cx="9" cy="7" r="4"></circle>
                                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                                                </svg>
                                                                <span className="text-white/70 text-xs sm:text-sm">24h Txns</span>
                                                            </div>
                                                            <span className="text-sm sm:text-lg font-bold text-white">
                                                                {tokennomics[0].txns.h24.buys + tokennomics[0].txns.h24.sells} Txns
                                                            </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                                            <button 
                                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 border-white/20 text-white hover:bg-white hover:text-black bg-transparent text-xs sm:text-sm"
                                                                onClick={()=> window.open(`https://solscan.io/token/${tokenData.id}`, '_blank')}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link w-3 h-3 sm:w-4 sm:h-4 mr-2">
                                                                    <path d="M15 3h6v6"></path>
                                                                    <path d="M10 14 21 3"></path>
                                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                </svg>
                                                                View on Solscan
                                                            </button>
                                                            <button 
                                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 border-white/20 text-white hover:bg-white hover:text-black bg-transparent text-xs sm:text-sm"
                                                                onClick={() => window.open(`https://dexscreener.com/solana/${tokenData.id}`, '_blank')}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up w-3 h-3 sm:w-4 sm:h-4 mr-2">
                                                                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                                                    <polyline points="16 7 22 7 22 13"></polyline>
                                                                </svg>
                                                                Chart
                                                            </button>
                                                            <button 
                                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 border-white/20 text-white hover:bg-white hover:text-black bg-transparent text-xs sm:text-sm"
                                                                onClick={() => window.open(`https://x.com/search?q=${tokenData.id}`, '_blank')}
                                                            >
                                                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                                                </svg>
                                                                X
                                                            </button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {error && (
                                                <div className="mb-6 md:mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                                    <div className="flex items-start gap-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-alert w-5 h-5 flex-shrink-0 mt-0.5">
                                                            <circle cx="12" cy="12" r="10"></circle>
                                                            <line x1="12" x2="12" y1="8" y2="12"></line>
                                                            <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                                        </svg>
                                                        <div>
                                                            <div className="font-semibold mb-1">Invalid Token Address</div>
                                                            <div>No market data available for this token</div>
                                                            <div className="mt-2 text-red-300 text-xs">Example valid address: 4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>


                                {tokenData && holders && (
                                    <>
                                        <section className="py-8 sm:py-12 md:py-16">
                                            <div className="container mx-auto px-4 sm:px-6">
                                                <div className="max-w-6xl mx-auto">
                                                <div className="text-center mb-8 sm:mb-12">
                                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Bundle Visualization</h2>
                                                    <p className="text-white/70 text-base sm:text-lg px-4">Advanced bubble map analytics for AOLMAN distribution patterns</p>
                                                </div>
                                                <div className="rounded-lg border text-card-foreground bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl mb-6 sm:mb-8">
                                                    <div className="p-4 sm:p-6">
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
                                                        <div>
                                                        <div className="text-lg sm:text-2xl font-bold text-white">20</div>
                                                        <div className="text-white/70 text-xs sm:text-sm">Top Holders</div>
                                                        </div>
                                                        <div>
                                                        <div className="text-lg sm:text-2xl font-bold text-white">53.1%</div>
                                                        <div className="text-white/70 text-xs sm:text-sm">Buy Pressure</div>
                                                        </div>
                                                        <div>
                                                        <div className="text-lg sm:text-2xl font-bold text-white">29</div>
                                                        <div className="text-white/70 text-xs sm:text-sm">Liquidity Score</div>
                                                        </div>
                                                        <div>
                                                        <div className="text-lg sm:text-2xl font-bold text-white">72</div>
                                                        <div className="text-white/70 text-xs sm:text-sm">Activity Score</div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                                                    <div className="absolute inset-0">
                                                    <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
                                                        <line x1="200" y1="200" x2="400" y2="150" stroke="white" strokeWidth="2" opacity="0.15" className="animate-pulse" style={{ animationDelay: '1788.57ms' }}></line>
                                                        <line x1="200" y1="200" x2="150" y2="350" stroke="white" strokeWidth="2" opacity="0.15" className="animate-pulse" style={{ animationDelay: '736.396ms' }}></line>
                                                        <line x1="400" y1="150" x2="200" y2="200" stroke="white" strokeWidth="2" opacity="0.15" className="animate-pulse" style={{ animationDelay: '445.279ms' }}></line>
                                                        <line x1="400" y1="150" x2="550" y2="280" stroke="white" strokeWidth="2" opacity="0.15" className="animate-pulse" style={{ animationDelay: '1227.13ms' }}></line>
                                                        <line x1="550" y1="280" x2="400" y2="150" stroke="white" strokeWidth="2" opacity="0.15" className="animate-pulse" style={{ animationDelay: '1118.44ms' }}></line>
                                                        <line x1="150" y1="350" x2="200" y2="200" stroke="white" strokeWidth="2" opacity="0.15" className="animate-pulse" style={{ animationDelay: '943.943ms' }}></line>
                                                        <line x1="150" y1="350" x2="350" y2="380" stroke="white" strokeWidth="2" opacity="0.15" className="animate-pulse" style={{ animationDelay: '488.216ms' }}></line>
                                                        <line x1="350" y1="380" x2="150" y2="350" stroke="white" strokeWidth="2" opacity="0.15" className="animate-pulse" style={{ animationDelay: '77.6366ms' }}></line>
                                                        <g>
                                                        <circle cx="200" cy="200" r="60" fill="#ffffff" opacity="0.4" className="animate-pulse" style={{ animationDelay: '0ms' }}></circle>
                                                        <circle cx="200" cy="200" r="36" fill="#ffffff" opacity="0.27999999999999997" className="animate-pulse" style={{ animationDelay: '150ms' }}></circle>
                                                        <text x="200" y="195" textAnchor="middle" className="text-xs fill-white font-semibold" fontSize="11" opacity="0.8">15.2%</text>
                                                        <text x="200" y="208" textAnchor="middle" className="text-xs fill-white/60" fontSize="9">8 wallets</text>
                                                        <g>
                                                            <line x1="200" y1="200" x2="285.16493577313094" y2="200" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '0ms' }}></line>
                                                            <circle cx="285.16493577313094" cy="200" r="4.645131493143094" fill="white" opacity="0.22378718051149007" className="animate-pulse" style={{ animationDelay: '50ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="200" y1="200" x2="266.1185019776696" y2="266.1185019776696" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '100ms' }}></line>
                                                            <circle cx="266.1185019776696" cy="266.1185019776696" r="6.846300539284734" fill="white" opacity="0.29912637366763034" className="animate-pulse" style={{ animationDelay: '150ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="200" y1="200" x2="200" y2="291.92664403010076" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '200ms' }}></line>
                                                            <circle cx="200" cy="291.92664403010076" r="5.08793273558725" fill="white" opacity="0.22236562585964048" className="animate-pulse" style={{ animationDelay: '250ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="200" y1="200" x2="134.6522823890476" y2="265.34771761095243" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '300ms' }}></line>
                                                            <circle cx="134.6522823890476" cy="265.34771761095243" r="4.137617306465527" fill="white" opacity="0.23142389693155507" className="animate-pulse" style={{ animationDelay: '350ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="200" y1="200" x2="119.15920197787086" y2="200" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '400ms' }}></line>
                                                            <circle cx="119.15920197787086" cy="200" r="5.772344989352048" fill="white" opacity="0.27487144650940243" className="animate-pulse" style={{ animationDelay: '450ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="200" y1="200" x2="132.87528933328792" y2="132.87528933328792" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '500ms' }}></line>
                                                            <circle cx="132.87528933328792" cy="132.87528933328792" r="6.95784845531678" fill="white" opacity="0.2914648641150325" className="animate-pulse" style={{ animationDelay: '550ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="200" y1="200" x2="199.99999999999997" y2="115.75924449974781" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '600ms' }}></line>
                                                            <circle cx="199.99999999999997" cy="115.75924449974781" r="6.979549536521679" fill="white" opacity="0.2706705571522599" className="animate-pulse" style={{ animationDelay: '650ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="200" y1="200" x2="260.78002568234245" y2="139.21997431765752" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '700ms' }}></line>
                                                            <circle cx="260.78002568234245" cy="139.21997431765752" r="5.3446634913947895" fill="white" opacity="0.26505826346545114" className="animate-pulse" style={{ animationDelay: '750ms' }}></circle>
                                                        </g>
                                                        </g>
                                                        <g>
                                                        <circle cx="400" cy="150" r="45" fill="#ffffff" opacity="0.3" className="animate-pulse" style={{ animationDelay: '300ms' }}></circle>
                                                        <circle cx="400" cy="150" r="27" fill="#ffffff" opacity="0.21" className="animate-pulse" style={{ animationDelay: '450ms' }}></circle>
                                                        <text x="400" y="145" textAnchor="middle" className="text-xs fill-white font-semibold" fontSize="11" opacity="0.8">8.7%</text>
                                                        <text x="400" y="158" textAnchor="middle" className="text-xs fill-white/60" fontSize="9">5 wallets</text>
                                                        <g>
                                                            <line x1="400" y1="150" x2="467.3124306504894" y2="150" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '300ms' }}></line>
                                                            <circle cx="467.3124306504894" cy="150" r="4.316975452425551" fill="white" opacity="0.2879485471811999" className="animate-pulse" style={{ animationDelay: '350ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="400" y1="150" x2="420.1949777009312" y2="212.15375040377728" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '400ms' }}></line>
                                                            <circle cx="420.1949777009312" cy="212.15375040377728" r="5.3787185808197" fill="white" opacity="0.2899215767900204" className="animate-pulse" style={{ animationDelay: '450ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="400" y1="150" x2="339.0533684047066" y2="194.2803197926559" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '500ms' }}></line>
                                                            <circle cx="339.0533684047066" cy="194.2803197926559" r="6.672315489115414" fill="white" opacity="0.23341273078082395" className="animate-pulse" style={{ animationDelay: '550ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="400" y1="150" x2="337.3781819461408" y2="104.5025860028574" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '600ms' }}></line>
                                                            <circle cx="337.3781819461408" cy="104.5025860028574" r="6.815961288006314" fill="white" opacity="0.2317033582758207" className="animate-pulse" style={{ animationDelay: '650ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="400" y1="150" x2="423.3201972906958" y2="78.22781271474655" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '700ms' }}></line>
                                                            <circle cx="423.3201972906958" cy="78.22781271474655" r="5.9917098129014965" fill="white" opacity="0.268794639942158" className="animate-pulse" style={{ animationDelay: '750ms' }}></circle>
                                                        </g>
                                                        </g>
                                                        <g>
                                                        <circle cx="550" cy="280" r="35" fill="#ffffff" opacity="0.25" className="animate-pulse" style={{ animationDelay: '600ms' }}></circle>
                                                        <circle cx="550" cy="280" r="21" fill="#ffffff" opacity="0.175" className="animate-pulse" style={{ animationDelay: '750ms' }}></circle>
                                                        <text x="550" y="275" textAnchor="middle" className="text-xs fill-white font-semibold" fontSize="11" opacity="0.8">4.3%</text>
                                                        <text x="550" y="288" textAnchor="middle" className="text-xs fill-white/60" fontSize="9">3 wallets</text>
                                                        <g>
                                                            <line x1="550" y1="280" x2="607.59416319674" y2="280" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '600ms' }}></line>
                                                            <circle cx="607.59416319674" cy="280" r="6.521156774095052" fill="white" opacity="0.2263161864239905" className="animate-pulse" style={{ animationDelay: '650ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="550" y1="280" x2="517.9541661799623" y2="335.50501234721435" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '700ms' }}></line>
                                                            <circle cx="517.9541661799623" cy="335.50501234721435" r="6.218663229751618" fill="white" opacity="0.2848951689066285" className="animate-pulse" style={{ animationDelay: '750ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="550" y1="280" x2="520.176362839958" y2="228.3439451723081" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '800ms' }}></line>
                                                            <circle cx="520.176362839958" cy="228.3439451723081" r="4.87789304125108" fill="white" opacity="0.2165168307695975" className="animate-pulse" style={{ animationDelay: '850ms' }}></circle>
                                                        </g>
                                                        </g>
                                                        <g>
                                                        <circle cx="150" cy="350" r="40" fill="#ffffff" opacity="0.3" className="animate-pulse" style={{ animationDelay: '900ms' }}></circle>
                                                        <circle cx="150" cy="350" r="24" fill="#ffffff" opacity="0.21" className="animate-pulse" style={{ animationDelay: '1050ms' }}></circle>
                                                        <text x="150" y="345" textAnchor="middle" className="text-xs fill-white font-semibold" fontSize="11" opacity="0.8">6.1%</text>
                                                        <text x="150" y="358" textAnchor="middle" className="text-xs fill-white/60" fontSize="9">4 wallets</text>
                                                        <g>
                                                            <line x1="150" y1="350" x2="218.99016554799903" y2="350" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '900ms' }}></line>
                                                            <circle cx="218.99016554799903" cy="350" r="4.244732137446164" fill="white" opacity="0.2772625241556646" className="animate-pulse" style={{ animationDelay: '950ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="150" y1="350" x2="150" y2="420.8705790202288" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '1000ms' }}></line>
                                                            <circle cx="150" cy="420.8705790202288" r="4.877289490629354" fill="white" opacity="0.2137633539913485" className="animate-pulse" style={{ animationDelay: '1050ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="150" y1="350" x2="84.81790567567678" y2="350" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '1100ms' }}></line>
                                                            <circle cx="84.81790567567678" cy="350" r="4.2144069946421885" fill="white" opacity="0.2809344949685046" className="animate-pulse" style={{ animationDelay: '1150ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="150" y1="350" x2="150" y2="288.7996886040136" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '1200ms' }}></line>
                                                            <circle cx="150" cy="288.7996886040136" r="6.561736736476048" fill="white" opacity="0.2001840210805748" className="animate-pulse" style={{ animationDelay: '1250ms' }}></circle>
                                                        </g>
                                                        </g>
                                                        <g>
                                                        <circle cx="350" cy="380" r="25" fill="#ffffff" opacity="0.2" className="animate-pulse" style={{ animationDelay: '1200ms' }}></circle>
                                                        <circle cx="350" cy="380" r="15" fill="#ffffff" opacity="0.13999999999999999" className="animate-pulse" style={{ animationDelay: '1350ms' }}></circle>
                                                        <text x="350" y="375" textAnchor="middle" className="text-xs fill-white font-semibold" fontSize="11" opacity="0.8">2.8%</text>
                                                        <text x="350" y="388" textAnchor="middle" className="text-xs fill-white/60" fontSize="9">2 wallets</text>
                                                        <g>
                                                            <line x1="350" y1="380" x2="407.0297523007253" y2="380" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '1200ms' }}></line>
                                                            <circle cx="407.0297523007253" cy="380" r="5.166923886138923" fill="white" opacity="0.2064652650763218" className="animate-pulse" style={{ animationDelay: '1250ms' }}></circle>
                                                        </g>
                                                        <g>
                                                            <line x1="350" y1="380" x2="299.8084321558589" y2="380" stroke="white" strokeWidth="1" opacity="0.1" className="animate-pulse" style={{ animationDelay: '1300ms' }}></line>
                                                            <circle cx="299.8084321558589" cy="380" r="6.0933003351802615" fill="white" opacity="0.22061967695838347" className="animate-pulse" style={{ animationDelay: '1350ms' }}></circle>
                                                        </g>
                                                        </g>
                                                        <circle cx="632.8536570786075" cy="391.425355491996" r="12.567791192905931" fill="white" opacity="0.20649092101968852" className="animate-pulse" style={{ animationDelay: '1000ms' }}></circle>
                                                        <circle cx="136.34661588096085" cy="335.02035172313924" r="17.583658759418256" fill="white" opacity="0.2022471251744893" className="animate-pulse" style={{ animationDelay: '1150ms' }}></circle>
                                                        <circle cx="558.2548766448778" cy="369.68265628323627" r="10.834658767277904" fill="white" opacity="0.17388934915497778" className="animate-pulse" style={{ animationDelay: '1300ms' }}></circle>
                                                        <circle cx="498.1981975502816" cy="100.06156853686356" r="11.408618279020843" fill="white" opacity="0.18814009756428657" className="animate-pulse" style={{ animationDelay: '1450ms' }}></circle>
                                                        <circle cx="277.239818968769" cy="121.87220648677368" r="9.209728127253433" fill="white" opacity="0.2255498711344514" className="animate-pulse" style={{ animationDelay: '1600ms' }}></circle>
                                                        <circle cx="691.1461658594303" cy="360.3616674644071" r="11.345876783819755" fill="white" opacity="0.22959017321359212" className="animate-pulse" style={{ animationDelay: '1750ms' }}></circle>
                                                        <circle cx="289.09921931701206" cy="387.30036368766457" r="19.74366718005319" fill="white" opacity="0.2481543338850471" className="animate-pulse" style={{ animationDelay: '1900ms' }}></circle>
                                                        <circle cx="551.4363385484705" cy="293.3002098224291" r="16.050130098091103" fill="white" opacity="0.20634715918747668" className="animate-pulse" style={{ animationDelay: '2050ms' }}></circle>
                                                        <circle cx="159.59167465783844" cy="120.08282883630052" r="13.737244290303071" fill="white" opacity="0.21707533438153392" className="animate-pulse" style={{ animationDelay: '2200ms' }}></circle>
                                                        <circle cx="342.40072387772454" cy="119.22013266969874" r="17.883005592196206" fill="white" opacity="0.23121037944827416" className="animate-pulse" style={{ animationDelay: '2350ms' }}></circle>
                                                        <circle cx="321.15342160921324" cy="395.3920875222942" r="15.475356920815136" fill="white" opacity="0.24690869836463863" className="animate-pulse" style={{ animationDelay: '2500ms' }}></circle>
                                                        <circle cx="136.08753162206017" cy="361.05415211783503" r="17.603954955547582" fill="white" opacity="0.21282924297251493" className="animate-pulse" style={{ animationDelay: '2650ms' }}></circle>
                                                        <circle cx="126.95885643819165" cy="249.9707757517233" r="11.665691487462613" fill="white" opacity="0.20552750607034329" className="animate-pulse" style={{ animationDelay: '2800ms' }}></circle>
                                                        <circle cx="447.05531908073556" cy="113.75766045403279" r="9.409440765622396" fill="white" opacity="0.21846649143944025" className="animate-pulse" style={{ animationDelay: '2950ms' }}></circle>
                                                        <circle cx="524.5514330978725" cy="363.07485021533466" r="18.851597831683517" fill="white" opacity="0.22936021850229135" className="animate-pulse" style={{ animationDelay: '3100ms' }}></circle>
                                                        <circle cx="400" cy="250" r="200" fill="none" stroke="white" strokeWidth="1" opacity="0.05" className="animate-pulse" style={{ animationDuration: '4s' }}></circle>
                                                        <circle cx="400" cy="250" r="150" fill="none" stroke="white" strokeWidth="1" opacity="0.08" className="animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}></circle>
                                                    </svg>
                                                    </div>
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 backdrop-blur-sm"></div>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                    <button 
                                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md bg-white text-black hover:bg-white/90 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                                                        onClick={()=> router.push("/login")}
                                                    >Generate Bundles</button>
                                                    </div>
                                                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-white text-xs sm:text-sm font-mono">BUNDLE MAP - AOLMAN</div>
                                                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white text-xs sm:text-sm font-mono">SOLANA NETWORK</div>
                                                    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-white text-xs sm:text-sm font-mono">REAL-TIME DATA</div>
                                                </div>
                                                <div className="relative mt-6 sm:mt-8">
                                                    <div className="rounded-lg border text-card-foreground bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                                                    <div className="p-4 sm:p-6">
                                                        <h4 className="text-base sm:text-lg font-bold text-white mb-4">Bundle Analysis Summary</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-sm">
                                                        <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                                                            <div className="text-white font-semibold text-sm sm:text-base">Largest Bundle</div>
                                                            <div className="text-white/70 text-xs sm:text-sm">15.2% of supply across 8 wallets</div>
                                                        </div>
                                                        <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                                                            <div className="text-white font-semibold text-sm sm:text-base">Total Bundled</div>
                                                            <div className="text-white/70 text-xs sm:text-sm">37.1% of total supply</div>
                                                        </div>
                                                        <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                                                            <div className="text-white font-semibold text-sm sm:text-base">Risk Level</div>
                                                            <div className="text-orange-400 text-xs sm:text-sm">Medium - Multiple clusters detected</div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                                    <div className="text-center px-4">
                                                        <div className="text-white font-semibold mb-2 text-sm sm:text-base">Login Required</div>
                                                        <div className="text-white/70 text-xs sm:text-sm">Sign in to view detailed bundle analysis</div>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section className="py-8 sm:py-12 md:py-16">
                                            <div className="container mx-auto px-4 sm:px-6">
                                                <div className="max-w-4xl mx-auto">
                                                <div className="rounded-lg border text-card-foreground bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                                                    <div className="p-4 sm:p-6 md:p-8">
                                                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-4 h-4 sm:w-5 sm:h-5 text-white">
                                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="9" cy="7" r="4"></circle>
                                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                                        </svg>
                                                        <h4 className="text-lg sm:text-xl font-bold text-white">Top Holders</h4>
                                                    </div>
                                                    <div className="space-y-2 sm:space-y-3">
                                                        {holders.slice(0, 10).map((holder, index) => (
                                                            <div key={index} className="bg-white/5 rounded-lg p-3 sm:p-4">
                                                                <div className="flex items-start justify-between gap-3">
                                                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                                                    <span className="text-white/70 text-xs sm:text-sm font-mono bg-white/10 rounded px-2 py-1 flex-shrink-0">#{index + 1}</span>
                                                                    <div className="min-w-0 flex-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-mono text-xs sm:text-sm text-white truncate">{shortenAddress(holder.address)}</span>
                                                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-6 w-6 p-0 hover:bg-white/20 bg-white/10 text-white/80 hover:text-white flex-shrink-0 rounded">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy w-3 h-3">
                                                                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                                                                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                                                                        </svg>
                                                                        </button>
                                                                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-6 w-6 p-0 hover:bg-white/20 bg-white/10 text-white/80 hover:text-white flex-shrink-0 rounded">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link w-3 h-3">
                                                                            <path d="M15 3h6v6"></path>
                                                                            <path d="M10 14 21 3"></path>
                                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                        </svg>
                                                                        </button>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right flex-shrink-0">
                                                                    <div className="font-semibold text-white text-sm sm:text-base">{formatAmount(holder.uiAmount)}</div>
                                                                    <div className="text-white/70 text-xs sm:text-sm">{calculatePercentage(holder.uiAmount)}</div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                                                        <div>
                                                            <div className="text-lg sm:text-xl font-bold text-white">20</div>
                                                            <div className="text-white/70 text-xs sm:text-sm">Top Holders</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-lg sm:text-xl font-bold text-white">34.8%</div>
                                                            <div className="text-white/70 text-xs sm:text-sm">Top 10 Share</div>
                                                        </div>
                                                        <div className="col-span-2 sm:col-span-1">
                                                            <div className="text-lg sm:text-xl font-bold text-white">14.2%</div>
                                                            <div className="text-white/70 text-xs sm:text-sm">Largest Holder</div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </section>
                                    </>
                                )}

                            </main>
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 z-40 md:relative md:z-auto">
                            <footer className="border-t border-white/10 py-4 sm:py-6 md:py-8 bg-black/95 backdrop-blur-xl">
                                <div className="container mx-auto px-4 sm:px-6">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
                                    <p className="text-white/70 text-xs sm:text-sm font-medium text-center sm:text-left">© 2025 Degen Screener. Built on Solana.</p>
                                    <a target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm font-medium" href="https://x.com/bobradarapp">Follow us on X</a>
                                </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}