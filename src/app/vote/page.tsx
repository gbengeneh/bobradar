"use client";
import ConnectModal from '@/components/ConnectWallet';
import Sidebar from '@/components/Sidebar';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

const memecoins = [
  { name: 'memecoin', description: 'just memecoin', logo: 'https://ipfs.io/ipfs/bafybeic356prb3behkqhrnrf6i4kpkwkuj2lg2vifrfccymms4jdn7t3ja', link: 'https://solscan.io/token/4daoTLufDmV3ods48Zh8rymaZKBLtgEvuH9qALYLbonk' },
  { name: 'DJI6930', description: 'DOWGE', logo: 'https://ipfs.io/ipfs/bafybeic4lupxyxjdzqr5vdvq6j4f3toceacxw2tovubvyiqzevnzyr6uhu', link: 'https://solscan.io/token/DQnkBM4eYYMnVE8Qy2K3BB7uts1fh2EwBVktEz6jpump' },
  { name: 'USDUC', description: 'unstable coin', logo: 'https://ipfs.io/ipfs/QmQw4DQjdWp3G8TuMCykG8SVSwtFwkxvTyxEWNMuAVYU4q', link: 'https://solscan.io/token/CB9dDufT3ZuQXqqSfa1c5kY935TEreyBw9XJXxHKpump' },
  { name: 'Fartcoin', description: 'Fartcoin', logo: 'https://ipfs.io/ipfs/QmQr3Fz4h1etNsF7oLGMRHiCzhB5y9a7GjyodnF7zLHK1g', link: 'https://solscan.io/token/9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump' },
  { name: 'USELESS', description: 'USELESS COIN', logo: 'https://ipfs.io/ipfs/bafkreihsdoqkmpr5ryebaduoutyhj3nxco6wdp4s4743l2qrae4sz4hqrm', link: 'https://solscan.io/token/Dz9mQ9NzkBcCsuGPFJ3r1bS4wgqKMHBPiVuniW8Mbonk' },
  { name: 'PENGU', description: 'Pudgy Penguins', logo: 'https://arweave.net/BW67hICaKGd2_wamSB0IQq-x7Xwtmr2oJj1WnWGJRHU', link: 'https://solscan.io/token/2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv' },
  { name: 'BoatKid', description: 'Pacu Jalur', logo: 'https://ipfs.io/ipfs/bafkreiab2prdcpif2mouzxqed7eelhxqxj4qrnz5ejfk4ovktcfvaelisy', link: 'https://solscan.io/token/FJjKH9Xp2SvNDNUSN7X9T4uMNafFEYzbZpnwEZXKpump' },
];

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <Head>
        <title>DexTrending</title>
        <meta name="description" content="The Operating System for Peak Memecoins" />
        <link rel="icon" href="/favicon.ico" />
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
      <ConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main className="ml-0 md:ml-32 pt-40 md:pt-32 pb-32 px-4 md:px-0">
        <div className="p-4 md:p-8 max-w-6xl mx-auto mb-16">
          <div className="grid gap-6">
            {memecoins.map((coin) => (
              <div key={coin.name} className="backdrop-blur-xl border rounded-2xl p-4 hover:bg-white/20 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl group shadow-xl bg-black/40 border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  <div className="col-span-1 md:col-span-8">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={coin.logo} 
                        alt={`${coin.name} logo`} 
                        className="rounded-xl shadow-lg border-2 border-white/40 object-cover w-12 h-12" 
                        />
                      <div>
                        <div className="font-bold text-white group-hover:text-purple-200 transition-colors text-xl font-mono tracking-wider">{coin.name}</div>
                        <div className="text-white/60 font-mono truncate max-w-[180px] md:max-w-[180px] tracking-wide text-sm">{coin.description}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 md:hidden">
                    <div className="flex justify-center gap-4 mt-3">
                      <div className="text-center">
                        <button onClick={() => setIsModalOpen(true)} className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 border-2 border-green-400/60" title="Vote for this token">
                          <span className="text-lg">👍🏻</span>
                        </button>
                      </div>
                      <div className="text-center">
                        <a href={coin.link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 border-2 border-blue-400/60">
                          <span className="text-lg">📈</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:col-span-2 text-center">
                    <button onClick={() => setIsModalOpen(true)} className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 border-2 border-green-400/60 mx-auto" title="Vote for this token">
                      <span className="text-lg">👍🏻</span>
                    </button>
                  </div>
                  <div className="hidden md:block md:col-span-2 text-center">
                    <a href={coin.link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 border-2 border-blue-400/60 mx-auto">
                      <span className="text-lg">📈</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;