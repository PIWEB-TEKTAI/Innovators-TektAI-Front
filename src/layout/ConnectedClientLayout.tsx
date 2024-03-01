import React, { useState, ReactNode, useEffect } from 'react';
import ClientHeader from '../components/ClientHeader/index';
import SidebarClient from '../components/SidebarClient';
import { useLocation } from 'react-router-dom';
import { checkAuthentication } from '../services/auth.service';
import { User } from '../types/User';
import { getProfile } from '../services/user.service';

const ConnectedClientLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
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
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}

      <ClientHeader connectedUser={connectedUser} authenticated={authenticated} />
      <div className="flex">
            <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm h-auto border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
        {/* <!-- ===== Sidebar Start ===== --> */}
        {<SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} connectedUser={connectedUser} />}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className={`flex flex-1 flex-col  overflow-x-hidden ${
                    isAuthPath?'overflow-y-hidden':'overflow-y-auto'
                  }`}>
          {/* <!-- ===== Header Start ===== --> */}
         
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

export default ConnectedClientLayout;
