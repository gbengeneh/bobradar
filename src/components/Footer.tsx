import React from "react";

const Footer = () => {
    const footerLinks = [
      { href: 'https://t.me/MajorVolumeBot', icon: 'lucide-bot', label: 'Major Volume Bot', gradient: 'from-blue-500 to-cyan-600' },
      { href: 'https://t.me/MajorBoostBot', icon: 'lucide-zap', label: 'Major Boost Bot', gradient: 'from-green-500 to-emerald-600' },
      { href: 'https://t.me/MajorCommunityChat', icon: 'lucide-users', label: 'Community Chat', gradient: 'from-blue-500 to-cyan-600' },
      { href: 'https://t.me/MajorHelpBot', icon: 'lucide-headphones', label: 'Support', gradient: 'from-orange-500 to-red-600' },
      { href: 'https://t.me/MajorBotsHub', icon: 'lucide-info', label: 'Info', gradient: 'from-indigo-500 to-blue-600' },
      { icon: 'lucide-terminal', label: 'Terminal', gradient: 'from-green-600 to-teal-700', isButton: true },
    ];
  
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-t border-white/20 p-2 md:p-4">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            {footerLinks.map((link, index) => (
              <div key={index} className="group relative">
                {link.isButton ? (
                  <button className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${link.gradient} rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 border border-white/20 pointer-events-auto`}>
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
                      className={`lucide ${link.icon} w-4 h-4 md:w-5 md:h-5 text-white`}
                    >
                      {link.icon === 'lucide-bot' && (
                        <>
                          <path d="M12 8V4H8" />
                          <rect width="16" height="12" x="4" y="8" rx="2" />
                          <path d="M2 14h2" />
                          <path d="M20 14h2" />
                          <path d="M15 13v2" />
                          <path d="M9 13v2" />
                        </>
                      )}
                      {link.icon === 'lucide-zap' && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />}
                      {link.icon === 'lucide-users' && (
                        <>
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </>
                      )}
                      {link.icon === 'lucide-headphones' && (
                        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                      )}
                      {link.icon === 'lucide-info' && (
                        <>
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </>
                      )}
                      {link.icon === 'lucide-terminal' && (
                        <>
                          <polyline points="4 17 10 11 4 5" />
                          <line x1="12" x2="20" y1="19" y2="19" />
                        </>
                      )}
                    </svg>
                  </button>
                ) : (
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${link.gradient} rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 border border-white/20 pointer-events-auto`}>
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
                        className={`lucide ${link.icon} w-4 h-4 md:w-5 md:h-5 text-white`}
                      >
                        {link.icon === 'lucide-bot' && (
                          <>
                            <path d="M12 8V4H8" />
                            <rect width="16" height="12" x="4" y="8" rx="2" />
                            <path d="M2 14h2" />
                            <path d="M20 14h2" />
                            <path d="M15 13v2" />
                            <path d="M9 13v2" />
                          </>
                        )}
                        {link.icon === 'lucide-zap' && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />}
                        {link.icon === 'lucide-users' && (
                          <>
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </>
                        )}
                        {link.icon === 'lucide-headphones' && (
                          <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                        )}
                        {link.icon === 'lucide-info' && (
                          <>
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </>
                        )}
                      </svg>
                    </div> 
                  </a>
                )}
                <div className="absolute bottom-12 md:bottom-14 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity font-mono pointer-events-none">
                  {link.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default Footer;