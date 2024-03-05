import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { getProfile } from '../services/user.service';
import { User } from '../types/user';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [connectedUser, setconnectedUser] = useState<User | null>(null);
  const { pathname } = location;
    // Check if the current path contains "auth"
  const isAuthPath = pathname.includes('/auth');

  useEffect(() => {
    console.log("rou")
    const fetchAuthenticationStatus = async () => {
      try {
        const connectedUser = await getProfile();
        setconnectedUser(connectedUser);
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
    };

    fetchAuthenticationStatus();
  }, []);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark"
    style={{ 
          
      backgroundColor: '#E6E2E2' // Remplacez #VOTRE_COULEUR_BG par votre couleur souhaitée
    }}>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};



export default DefaultLayout;
