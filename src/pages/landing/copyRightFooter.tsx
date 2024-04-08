import React from 'react';

const Copyrightfooter: React.FC = () => {
    
    return (
      <footer className="bg-white dark:bg-gray-800">
      <div className="max-w-screen-xl p-4 py-2 mx-auto lg:py-5 md:p-8 lg:p-10">
                 <div className="text-center">
              <a href="#" className="flex items-center justify-center mb-3 mr-4 text-md font-semibold text-gray-900 dark:text-white">
                  <img src="/src/images/landing/logo-transparent.png" className="h-6 mr-2 mb-1 sm:h-7" alt="Landwind Logo" />
                  TektAI    
              </a>
              <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} TektAI. All Rights Reserved.
              </span>
            
          </div>
      </div>
  </footer>

    );
};

export default Copyrightfooter;
