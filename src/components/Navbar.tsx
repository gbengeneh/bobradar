
import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <header className="relative z-50 border-b border-white/10 backdrop-blur-sm fixed top-0 left-0 right-0 bg-black/95">
            <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                        <div className="relative transition-all duration-500 ">
                            <div className="relative  w-full h-full overflow-hidden">
                                <img
                                    alt="Degen Scanner"
                                    height={96}
                                    className="w-full h-[64px] object-contain filter brightness-110 contrast-110"
                                    style={{ color: 'transparent' }}
                                    src="/img/logo-alt.jpeg"
                                />
                            </div>
                        </div>
                    </Link>

                    <Link href="/login">
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 font-medium bg-transparent text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-2 hover:shadow-lg hover:shadow-white/20">
                        Login
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar;