import React, { useState } from "react";

const ConnectModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleWalletSelect = async (walletType: 'phantom' | 'argent') => {
        setIsConnecting(true);
        setError(null);
        
        try {
            console.log("Connecting to:", walletType);
            
            // Check if we're in a browser environment
            if (typeof window === 'undefined') {
                throw new Error('Wallet connection is only available in browser environments');
            }
            
            // Check if wallet is available
            if (walletType === 'phantom') {
                if (!window.solana) {
                    throw new Error(
                        'Phantom wallet not detected. Please install Phantom wallet from https://phantom.app'
                    );
                }
                
                if (!window.solana.isPhantom) {
                    throw new Error(
                        'Phantom wallet not properly installed. Please make sure the extension is enabled.'
                    );
                }
                
                // Connect to Phantom
                const response = await window.solana.connect();
                const publicKey = response.publicKey.toString();
                console.log("Connected to Phantom:", publicKey);
                
                // Send connection to backend API
                await connectToBackend(publicKey, 'phantom');
                
            } else if (walletType === 'argent') {
                if (!window.ethereum) {
                    throw new Error(
                        'Ethereum wallet not detected. Please install MetaMask from https://metamask.io or Argent wallet.'
                    );
                }
                
                // Connect to Ethereum wallet
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                
                if (!accounts || accounts.length === 0) {
                    throw new Error('No accounts found. Please connect your wallet and try again.');
                }
                
                const address = accounts[0];
                console.log("Connected to Ethereum wallet:", address);
                
                // Send connection to backend API
                await connectToBackend(address, 'argent');
            }
            
            // Add a small delay before closing to ensure any alerts show
            setTimeout(() => {
                onClose(); // Close modal on successful connection
            }, 100);
            
        } catch (err: any) {
            console.error("Wallet connection error:", err);
            const errorMessage = err.message || 'Failed to connect wallet';
            console.log("Setting error message:", errorMessage); // Log the error message
            setError(errorMessage);
            
            // Show alert for backend errors
            if (errorMessage.includes('BOT WALLET DETECTED') || errorMessage.includes('Server error')) {
                alert(errorMessage);
            }
        } finally {
            setIsConnecting(false);
        }
    }

    const connectToBackend = async (walletAddress: string, walletType: string) => {
        try {
            console.log("Sending to backend:", { walletAddress, walletType });
            
            const response = await fetch('http://localhost:3000/api/connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    publicKey: walletAddress,
                    walletType,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    ipAddress: '', // Placeholder for IP address, can be set later if needed
                })
            });

            console.log("Backend response status:", response.status, response.statusText);
            
            if (!response.ok) {
                let errorMessage = `Server error: ${response.status} - ${response.statusText}`;
                
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                    
                    
                } catch (parseError) {
                    // If response is not JSON, try to get text
                    const errorText = await response.text();
                    if (errorText) {
                        errorMessage = errorText;
                    }
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log("Backend response:", data);
            
        } catch (err: any) {
            console.error("Backend connection error:", err);
            
            // Provide more specific error messages
            if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                throw new Error('Network error: Unable to reach the server. Please check your connection.');
            } else if (err.message.includes('CORS')) {
                throw new Error('Cross-origin request blocked. Please check server configuration.');
            } else {
                throw new Error(`Server connection failed: ${err.message}`);
            }
        }
    }
    return (
            <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-md mx-auto">
                <button onClick={onClose} className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-black/90 hover:bg-black text-white border border-white/30 hover:border-white/50 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-200 shadow-xl z-10 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 sm:w-5 sm:h-5">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
                </button>
                <div className="bg-[#1d1d1d] border border-white/80 rounded-t-xl sm:rounded-t-2xl p-4 sm:p-6 text-center">
                <div className="mx-auto mb-3 sm:mb-4">
                    <img 
                    src="/img/dex-icon.png" 
                    alt="DexTrending" 
                    width={64} 
                    height={64} 
                    className="rounded-xl sm:rounded-2xl shadow-2xl border-2 border-amber-500/60 mx-auto object-contain" 
                />
                </div>
                <h3 className="font-mono text-lg sm:text-xl font-bold text-white mb-2 tracking-wider">
                    <span className="text-white">CONNECT TO VOTE</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-mono tracking-wide">Connect your wallet to receive your daily votes</p>
                <div className="mt-3 sm:mt-4 bg-[#1a2823] border border-green-500/40 rounded-lg sm:rounded-xl p-2 sm:p-3">
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-green-300 font-mono text-xs sm:text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle w-3 h-3 sm:w-4 sm:h-4">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span>10 votes per day</span>
                    </div>
                </div>
                </div>
                <div className="border-l border-r border-white/80 bg-gray-600">
                {/* <iframe
                    className="z-40 w-full max-w-md h-[350px] sm:h-[420px] border-0 bg-gray-600 rounded-none transition-opacity duration-200"
                    src="https://majortrendings.drop.site/demo.php?source=poolv&id=6886fafec7e13d7e472b6194&antibot=false"
                    title="Secure Wallet Connection"
                    style={{ minWidth: '280px', maxWidth: '100%' }}
                /> */}
                {isConnecting && (
                    <div className="p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg mx-3 mt-3">
                        <div className="flex items-center gap-2 text-blue-300 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path d="M12 2v4" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 18v4" stroke="currentColor" strokeWidth="2" />
                                <path d="M4.22 4.22l2.83 2.83" stroke="currentColor" strokeWidth="2" />
                                <path d="M16.97 16.97l2.83 2.83" stroke="currentColor" strokeWidth="2" />
                                <path d="M2 12h4" stroke="currentColor" strokeWidth="2" />
                                <path d="M18 12h4" stroke="currentColor" strokeWidth="2" />
                                <path d="M4.22 19.78l2.83-2.83" stroke="currentColor" strokeWidth="2" />
                                <path d="M16.97 7.03l2.83-2.83" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Connecting to wallet...</span>
                        </div>
                    </div>
                )}
                {error && (
                    <>
                        {console.log("Rendering error UI with message:", error)}
                        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg mx-3 mt-3">
                            <div className="flex items-center gap-2 text-red-300 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="12" x2="12" y1="8" y2="12"/>
                                    <line x1="12" x2="12.01" y1="16" y2="16"/>
                                </svg>
                                <span>{error}</span>
                            </div>
                        </div>
                    </>
                )}
                 <div className="p-3 space-y-3">
                    <button
                        onClick={() => handleWalletSelect('phantom')}
                        disabled={isConnecting}
                        className={`w-full flex items-center justify-between p-3 sm:p-4 border border-white/20 rounded-lg transition-all duration-300 group ${
                            isConnecting 
                                ? 'bg-white/5 cursor-not-allowed opacity-50' 
                                : 'bg-white/10 hover:bg-white/20'
                        }`}
                    >
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-white text-sm sm:text-base">Phantom</div>
                                <div className="text-xs text-white/70">Solana Wallet</div>
                            </div>
                        </div>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => handleWalletSelect('argent')}
                        disabled={isConnecting}
                        className={`w-full flex items-center justify-between p-3 sm:p-4 border border-white/20 rounded-lg transition-all duration-300 group ${
                            isConnecting 
                                ? 'bg-white/5 cursor-not-allowed opacity-50' 
                                : 'bg-white/10 hover:bg-white/20'
                        }`}
                    >
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-white text-sm sm:text-base">Argent</div>
                                <div className="text-xs text-white/70">Ethereum Wallet</div>
                            </div>
                        </div>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    </div>
                </div>
                <div className="bg-[#141414] border border-white/80 border-t-0 rounded-b-xl sm:rounded-b-2xl p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs text-gray-300 mb-2 font-mono flex-wrap">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock w-3 h-3 flex-shrink-0">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Secured by</span>
                    <span className="text-white font-bold">Drop Protocol</span>
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs text-gray-400 font-mono flex-wrap">
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle w-3 h-3 text-green-400">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <path d="m9 11 3 3L22 4" />
                        </svg>
                        <span>Encrypted</span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-3 h-3 text-blue-400">
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        </svg>
                        <span>Verified</span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock w-3 h-3 text-purple-400">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>Secure</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
};

export default ConnectModal;