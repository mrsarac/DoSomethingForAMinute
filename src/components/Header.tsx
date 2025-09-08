import { ModeToggle } from "./ModeToggle";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-30 mx-auto max-w-5xl px-4">
      <div className="flex items-center gap-4 p-3.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-sm border border-gray-100/80 dark:border-gray-700/80 transition-all duration-300">
        <button 
          className="p-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-lg transition-all duration-200 active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        <div className="relative flex-1">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-lg transition-all duration-200 group w-full"
          >
            <span className="bg-status-draft/10 text-status-draft px-3 py-1.5 rounded-md text-sm font-mono font-medium">
              DRAFT
            </span>
            <span className="font-mono text-gray-700 dark:text-gray-300 truncate font-medium">
              Starting a busin...
            </span>
            <ChevronDown 
              className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-all duration-300 ${
                isMenuOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {isMenuOpen && (
            <div className="fixed inset-0 z-40">
              <div 
                className="absolute inset-0 bg-black/5 backdrop-blur-[1px] transition-opacity duration-300"
                onClick={() => setIsMenuOpen(false)} 
              />
              {/* <StatusMenu onClose={() => setIsMenuOpen(false)} /> */}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="p-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-lg transition-all duration-200 active:scale-95"
            aria-label="Next"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 rotate-180" />
          </button>
          <button 
            className="p-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 rounded-lg transition-all duration-200 active:scale-95"
            aria-label="Refresh"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <span className="font-mono text-sm font-medium text-gray-600 dark:text-gray-300">AI</span>
            <button 
              className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              role="switch"
              aria-checked="false"
            >
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" />
            </button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
