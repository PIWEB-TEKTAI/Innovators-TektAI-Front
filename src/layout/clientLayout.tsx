import React, { useState, ReactNode, useEffect } from 'react';
import ClientHeader from '../components/ClientHeader/index';
import { getProfile } from '../services/user.service';
import { User } from '../types/user';

const ClientLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [connectedUser, setconnectedUser] = useState<User | null>(null);
  const { pathname } = location;
    // Check if the current path contains "auth"
  const isAuthPath = pathname.includes('/auth');

  useEffect(() => {
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
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
                <ClientHeader connectedUser={connectedUser} authenticated={authenticated} />

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex  overflow-hidden">


        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-hidden overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto mt-0 max-w-screen-2xl ">
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

export default ClientLayout;
