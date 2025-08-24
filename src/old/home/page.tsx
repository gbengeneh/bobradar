
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      <Navbar />
      <div className="relative flex-1 flex flex-col min-h-0">
        <main className="flex-1 flex items-center justify-center min-h-0 pb-16 sm:pb-0">
          <section className="w-full px-4 sm:px-6">
            <div className="container mx-auto text-center max-w-4xl">
              <div className="space-y-6 sm:space-y-8">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  Visualize Solana tokens{' '}
                  <span className="relative">
                    like never before
                    <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-white/20 rounded-full"></div>
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
                  Powered by Coinwind Protocol. Made for degen explorers.
                </p>
                <div className="pt-4 sm:pt-6">
                  <Link href="/scanner">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md bg-white text-black hover:bg-white/90 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 transform hover:scale-105 group">
                      Launch Scanner
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
                        className="lucide lucide-arrow-right ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:relative sm:z-auto">
        <footer className="border-t border-white/10 py-4 sm:py-6 md:py-8 bg-black/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
              <p className="text-white/70 text-xs sm:text-sm font-medium text-center sm:text-left">
                © 2025 Dex Scanner. Built on Solana.
              </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm font-medium"
                href="https://x.com/bobradarapp"
              >
                Follow us on X
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}