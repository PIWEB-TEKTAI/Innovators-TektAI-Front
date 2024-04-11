import React, { useState, ReactNode, useEffect } from 'react';
import ClientHeader from '../components/ClientHeader/index';
import { getProfile } from '../services/user.service';
import { User } from '../types/User';
import { useAuth } from '../components/Auth/AuthProvider';

const ClientLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const { pathname } = location;
    // Check if the current path contains "auth"
  const isLanding = pathname.includes('/landing');
  const [connectedUser, setConnectedUser]= useState<any>(null);
  const { userAuth } = useAuth(); 
  
  
  
  useEffect(() => {
    setConnectedUser(userAuth);
  }, [userAuth]);
  
  
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
            <div className="mx-auto mt-0 max-w-screen-2xl" >
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
