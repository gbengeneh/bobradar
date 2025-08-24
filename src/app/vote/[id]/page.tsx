"use client";
import ConnectWallet from '@/components/ConnectWallet';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import { Tokennomics } from '@/interfaces/tokennomics';
import { TokenDetails } from '@/interfaces/token';
import axios from 'axios';

const VoteSection = ({ isMobile } : { isMobile: boolean }) => (
  <div className={isMobile ? 'lg:hidden' : 'hidden lg:block space-y-6'}>
    <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">👍🏻</div>
        <h2 className="text-2xl font-bold text-white font-mono tracking-wider mb-2">VOTE FOR LLM</h2>
        <p className="text-white/60 font-mono text-sm tracking-wide">SHOW YOUR SUPPORT FOR THIS MEMECOIN</p>
      </div>
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-white font-mono tracking-wider mb-2">47</div>
        <div className="text-white/60 font-mono text-sm tracking-wider">TOTAL VOTES</div>
        <div className="mt-4 mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/60 font-mono text-xs tracking-wider">PROGRESS</span>
            <span className="text-white/60 font-mono text-xs tracking-wider">47/100</span>
          </div>
          <div className="w-full bg-black/60 rounded-full h-3 border border-white/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: '47%' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      <button className="w-full py-4 rounded-xl font-mono font-bold tracking-wider text-lg transition-all duration-300 border-2 flex items-center justify-center space-x-2 bg-gradient-to-br from-green-500 to-emerald-600 border-green-400/60 text-white hover:scale-105 shadow-lg">
        <span className="text-xl">🔒</span>
        <span>VOTE NOW</span>
      </button>
    </div>
  </div>
);

type Holder = {
    address: string;
    amount: number;
    uiAmount: number;
    decimals: number;
    uiAmountString: string;
}

export default function VotePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [tokennomics, setTokennomics] = useState<Tokennomics[] | null>(null);
    const [tokenData, setTokenData] = useState<TokenDetails | null>(null);
    const [holders, setHolders] = useState<Holder[]>([]);
    const [error, setError] = useState<boolean>(false);

    const fetchTokenData = async () => {
        const data = {
            "jsonrpc": "2.0",
            "id": "helius-metadata",
            "method": "getAsset",
            "params": {
                "id": id
            }
        }
       const holdersRequestBody = {
            "jsonrpc": "2.0",
            "id": "holders",
            "method": "getTokenLargestAccounts",
            "params": [
                id,
            ]
        }

        try {
            setLoading(true);
            // const tokennomics = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${id}`);   
            // setTokennomics(tokennomics.data.pairs);

            const response = await axios.post(
                `https://mainnet.helius-rpc.com/?api-key=00b4067b-0ffe-428c-ae8a-4cd890291b34`, 
                data
            );
            setTokenData(response?.data?.result);

            const holders = await axios.post(
                `https://mainnet.helius-rpc.com/?api-key=00b4067b-0ffe-428c-ae8a-4cd890291b34`, 
                holdersRequestBody
            )
            setHolders(holders?.data?.result?.value || []);



            console.log("HOLDERS:", holders?.data?.result?.value);
            console.log("TOKEN DATA:", response?.data?.result);


        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }

    }


    console.log("ID:", id);
    useEffect(()=> {
        if(id){
            fetchTokenData();
        }
    } ,[id])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <Head>
            <title>DexTrending</title>
            <meta name="description" content="The operating system for peak memecoins" />
            <link rel="icon" href="/vpiWpJWX_400x400.jpg" />
        </Head>

        <div className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm border-b border-white/10 h-8 flex items-center overflow-hidden">
            <div className="animate-scroll whitespace-nowrap text-white/80 text-sm font-mono">
            → DEXTRENDING → THE OPERATING SYSTEM FOR PEAK MEMECOINS → DEXTRENDING (MEMECOIN PLATFORM) → DEXTRENDING → THE OPERATING SYSTEM FOR PEAK MEMECOINS → DEXTRENDING (MEMECOIN PLATFORM) → DEXTRENDING → THE OPERATING SYSTEM FOR PEAK MEMECOINS →
            </div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-float"></div>
            <div className="absolute top-40 right-32 w-1 h-1 bg-pink-400 rounded-full animate-float-delayed"></div>
            <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float"></div>
            <div className="absolute bottom-40 right-20 w-2 h-2 bg-green-400 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-60 left-1/4 w-1 h-1 bg-orange-400 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-blue-300 rounded-full animate-float"></div>
            <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-red-300 rounded-full animate-float-delayed"></div>
        </div>

        <Header />
        <Sidebar handleClick={() => setIsModalOpen(true)} />
        <ConnectWallet isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <main className="ml-0 md:ml-32 pt-40 md:pt-32 pb-32 px-4 md:px-0">
            <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center space-x-4 mb-4">
                    <img
                        src="https://ipfs.io/ipfs/QmQpizmuNEMsUYqsGfqZyKW2jpZsJVyagcWo4Jv9Qag7H9"
                        alt="LLM logo"
                        className="w-16 h-16 rounded-xl shadow-lg border-2 border-white/40"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-white font-mono tracking-wider">LLM</h1>
                        <p className="text-white/60 font-mono text-lg tracking-wide">Latina Language Model</p>
                        <div className="flex items-center space-x-2 mt-2">
                        <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-lg font-mono font-medium text-sm border border-purple-400/60 backdrop-blur-xl tracking-wider">
                            SOLANA
                        </span>
                        <span className="bg-green-500/30 text-green-200 px-3 py-1 rounded-lg font-mono font-medium text-sm border border-green-400/60 backdrop-blur-xl tracking-wider">
                            LIVE
                        </span>
                        </div>
                    </div>
                    </div>
                </div>
                <VoteSection isMobile={true} />
                <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                    <h3 className="text-white/60 font-mono text-sm mb-3 tracking-wider">CONTRACT ADDRESS</h3>
                    <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-black/60 border border-white/20 rounded-lg p-3 font-mono text-white text-sm break-all">
                        BnszRWbs9LxSzsCUUS57HMTNNtyDHFsnmZ1mVhAYdaos
                    </div>
                    <button className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-lg font-mono font-bold tracking-wider hover:scale-105 transition-all duration-300 border border-cyan-400/60 flex items-center space-x-2">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-copy w-4 h-4"
                        >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                        <span>COPY</span>
                    </button>
                    </div>
                </div>
                <div className="lg:hidden bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center space-x-2 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-users w-5 h-5 text-white/60"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <h3 className="text-white font-mono tracking-wider">COMMUNITY STATS</h3>
                    </div>
                    <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                        <span className="text-lg">👥</span>
                        <span className="text-white/80 font-mono text-sm">RECENT VOTERS</span>
                        </div>
                        <span className="text-white font-mono font-bold">6</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                        <span className="text-lg">⏰</span>
                        <span className="text-white/80 font-mono text-sm">LAST VOTE</span>
                        </div>
                        <div className="flex items-center space-x-1 text-white/60 font-mono text-xs">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-clock w-3 h-3"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>2 minutes ago</span>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center space-x-2 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-users w-5 h-5 text-white/60"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <h3 className="text-white font-mono tracking-wider">RECENT VOTING ACTIVITY</h3>
                    <div className="bg-green-500/30 text-green-200 px-2 py-1 rounded-lg font-mono font-medium text-xs border border-green-400/60 backdrop-blur-xl tracking-wider flex items-center space-x-1">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trending-up w-3 h-3"
                        >
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                        </svg>
                        <span>47 TOTAL VOTES</span>
                    </div>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                    {[
                        { address: 'Bm9k…mK3p', time: '2 minutes ago' },
                        { address: 'Ty1y…Q7uZ', time: '8 minutes ago' },
                        { address: 'Nq2m…Q7uZ', time: '12 minutes ago' },
                        { address: 'Kj2h…Y0yU', time: '15 minutes ago' },
                        { address: 'Ty1y…L4kJ', time: '18 minutes ago' },
                        { address: 'Nq2m…L4kJ', time: '22 minutes ago' },
                    ].map((vote, index) => (
                        <div key={index} className="flex items-center justify-between bg-black/60 rounded-lg p-3 border border-white/10">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            <span className="text-sm">👍🏻</span>
                            </div>
                            <div>
                            <div className="text-white font-mono text-sm">
                                <span className="text-white/80">{vote.address}</span>
                            </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 text-white/60 font-mono text-xs">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-clock w-3 h-3"
                            >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>{vote.time}</span>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
                <div className="hidden lg:block space-y-6">
                <VoteSection isMobile={false} />
                <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center space-x-2 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-users w-5 h-5 text-white/60"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <h3 className="text-white font-mono tracking-wider">COMMUNITY STATS</h3>
                    </div>
                    <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                        <span className="text-lg">👥</span>
                        <span className="text-white/80 font-mono text-sm">RECENT VOTERS</span>
                        </div>
                        <span className="text-white font-mono font-bold">6</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                        <span className="text-lg">⏰</span>
                        <span className="text-white/80 font-mono text-sm">LAST VOTE</span>
                        </div>
                        <div className="flex items-center space-x-1 text-white/60 font-mono text-xs">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-clock w-3 h-3"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>2 minutes ago</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </main>

        <Footer />
        </div>
    );
}