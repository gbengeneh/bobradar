
"use client"
import { useState } from "react";
import ConnectWallet from "./ConnectWallet";

const Sidebar = ({ handleClick }: { handleClick: () => void }) => {
    const menuItems = [
      { icon: 'lucide-trophy', label: 'Leaderboard', gradient: 'from-yellow-500 to-orange-600' },
      { icon: 'lucide-plus', label: 'Submit', gradient: 'from-green-500 to-emerald-600' },
      { icon: 'lucide-user', label: 'Profile', gradient: 'from-blue-500 to-cyan-600' },
      { icon: 'lucide-trending-up', label: 'Explorer', gradient: 'from-orange-500 to-red-600' },
      { icon: 'lucide-settings', label: 'Settings', gradient: 'from-gray-600 to-gray-800' },
    ];
  
    return (
        <div className="hidden md:flex absolute left-6 top-64 z-40">
            <div className="flex flex-col space-y-6">
            {menuItems.map((item, index) => (
                <div key={index} className="group relative" onClick={handleClick}>
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer border border-white/20`}>
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
                    className={`lucide ${item.icon} w-8 h-8 text-white`}
                    >
                    {item.icon === 'lucide-trophy' && (
                        <>
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                        </>
                    )}
                    {item.icon === 'lucide-plus' && (
                        <>
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                        </>
                    )}
                    {item.icon === 'lucide-user' && (
                        <>
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                        </>
                    )}
                    {item.icon === 'lucide-trending-up' && (
                        <>
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                        </>
                    )}
                    {item.icon === 'lucide-settings' && (
                        <>
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                        </>
                    )}
                    </svg>
                </div>
                <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
                    {item.label}
                </div>
                </div>
            ))}
            </div>
        </div>
    );
};


export default Sidebar;