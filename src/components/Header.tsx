import React from "react";


const Header: React.FC = () => (
    <header className="absolute top-16 left-0 right-0 z-40 pointer-events-none mb-12">
      <div className="flex justify-center">
        <div className="">
          <div className="flex items-center space-x-3">
            <img 
              src="/img/dex-logo.jpeg" 
              alt="DexTrending" 
              className="rounded-xl border-2 border-amber-500/60 shadow-lg max-h-[80px] w-auto object-contain" 
            />
          </div>
        </div>
      </div>
    </header>
);
export default Header;