// components/Loading.tsx

import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="min-h-screen bg-black text-white flex flex-col">
                <div className="relative flex-1 pb-16 md:pb-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div>
                
                <main className="flex-1">
                    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-lg flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div>
                    <div className="relative z-10 text-center">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/40 to-purple-400/40 blur-xl animate-pulse"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/40 bg-black/50 backdrop-blur-sm">
                            <img 
                            alt="Degen Scanner" 
                            width="160" 
                            height="160" 
                            decoding="async" 
                            data-nimg="1" 
                            className="w-full h-full object-contain animate-spin-slow filter brightness-110 contrast-110" 
                            src="https://bobradar.io/logo_transparent.png" 
                            style={{ color: 'transparent' }} />
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-40"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute inset-0 rounded-full border border-purple-400/20 animate-ping opacity-30" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-gradient-to-b from-white/80 to-transparent origin-bottom" style={{ animation: '2s linear 0s infinite normal none running spin' }}></div>
                        </div>
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-blue-400/60 to-transparent origin-bottom" style={{ animation: '3s linear 0s infinite reverse none running spin' }}></div>
                        </div>
                        </div>
                        <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-black text-white">Scanning Token...</h2>
                        <p className="text-white/70 text-lg">Analyzing blockchain data</p>
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </main>
                </div>
            </div>
        </div>
    );
};

export default Loading;
