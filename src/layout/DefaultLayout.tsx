import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { getProfile } from '../services/user.service';
import { User } from '../types/User';
import { NotifToast } from '../components/Toast';
import { useSocket } from '../SocketContext';
import { useAuth } from '../components/Auth/AuthProvider';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null,
  );
  const toTitleCase = (str:string) => {
    return str.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };
  const [connectedUser, setConnectedUser]= useState<any>(null);
  const { userAuth } = useAuth(); 
  
  
  
  useEffect(() => {
    setConnectedUser(userAuth);
  }, [userAuth]);
  
  
  const socket = useSocket();

  useEffect(() => {
    socket.on('newUserRegistered', (userData) => {
      console.log('New user created:', userData.firstname);
      let msg = `${toTitleCase(userData.firstname)} ${toTitleCase(userData.lastname)} has created an account`;
      setAlert({
        type: "info",
        message: msg
      });
    });

    return () => {
      socket.off('newUserRegistered');
    };
  }, [socket]);



 


  useEffect(() => {
    if (alert && alert.type === 'info') {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 8000); 

      return () => clearTimeout(timer);
    }
  }, [alert]);


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
          <div>
             {alert?.type == 'info' && NotifToast(alert.message)}
          </div>

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
