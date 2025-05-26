'use client';

import { useRouter, usePathname } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Don't show back button on home page
  if (pathname === '/') {
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto py-3">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          <span className="text-sm font-medium">Voltar</span>
        </button>
      </div>
    </div>
  );
};

export default BackButton; 