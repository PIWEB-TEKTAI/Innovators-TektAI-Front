import React, { useState, ReactNode, useEffect } from 'react';
import ClientHeader from '../components/ClientHeader/index';
import SidebarClient from '../components/SidebarClient';
import { useLocation } from 'react-router-dom';
import { User } from '../types/User';
import { getProfile } from '../services/user.service';
import Footer from '../pages/landing/footer';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthProvider';
import { useSocket } from '../SocketContext';
import { NotifToast } from '../components/Toast';

const ConnectedClientLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const isAuthPath = pathname.includes('/auth');
  const [authenticated, setAuthenticated] = useState(false);
  const [connectedUser, setConnectedUser]= useState<any>(null);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null,
  );
  const toTitleCase = (str:string) => {
    return str.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };
  const { userAuth } = useAuth(); 



  useEffect(() => {
    setConnectedUser(userAuth);
  }, [userAuth]);

  const socket = useSocket();

  useEffect(() => {
    socket.onAny((eventName, eventData) => {
        console.log(`Received event: ${eventName}`);
        if (eventName === "newParticipationRequest" && userAuth?._id === eventData.idUser) {
            console.log('New participation request created:', eventData.firstname);
            let msg = `${toTitleCase(eventData.firstname)} ${toTitleCase(eventData.lastname)} ${eventData.content}`;
            setAlert({
                type: "info",
                message: msg
            });
        } else if (eventName === "AcceptParticipationRequest" && userAuth?._id === eventData.idUser) {
          console.log('New accept participation request created:', eventData.firstname);
          let msg = `${toTitleCase(eventData.firstname)} ${toTitleCase(eventData.lastname)} ${eventData.content}`;
          setAlert({
              type: "info",
              message: msg
          });
      } else if (eventName === "newSubmission" && userAuth?._id === eventData.idUser) {
        console.log('New submission created:', eventData.firstname);
        let msg = `${toTitleCase(eventData.firstname)} ${toTitleCase(eventData.lastname)} ${eventData.content}`;
        setAlert({
            type: "info",
            message: msg
        });
      } else if (eventName === "editSubmission" && userAuth?._id === eventData.idUser) {
        console.log('edit submission:', eventData.firstname);
        let msg = `${toTitleCase(eventData.firstname)} ${toTitleCase(eventData.lastname)} ${eventData.content}`;
        setAlert({
            type: "info",
            message: msg
        });
      }else if (eventName === "addInvitationRequest" && userAuth?._id === eventData.idUser) {
        console.log('add Invitation Request:', eventData.firstname);
        let msg = `${toTitleCase(eventData.firstname)} ${toTitleCase(eventData.lastname)} ${eventData.content}`;
        setAlert({
            type: "info",
            message: msg
        });
      }else if (eventName === "acceptInvitationRequest" && userAuth?._id === eventData.idUser) {
        console.log('accept Invitation Request:', eventData.firstname);
        let msg = `${toTitleCase(eventData.firstname)} ${toTitleCase(eventData.lastname)} ${eventData.content}`;
        setAlert({
            type: "info",
            message: msg
        });
      }else if (eventName === "newParticipationRequestTeam" && userAuth?._id === eventData.idUser) {
        console.log('new Participation Request Team:', eventData.name);
        let msg = `${toTitleCase(eventData.name)} ${eventData.content}`;
        setAlert({
            type: "info",
            message: msg
        });
      }else if (eventName === "AcceptParticipationTeamRequest" && userAuth?._id === eventData.idUser) {
        console.log('accept Participation Request Team:', eventData.name);
        let msg = `${toTitleCase(eventData.firstname)} ${toTitleCase(eventData.lastname)} ${eventData.content}`;
        setAlert({
            type: "info",
            message: msg
        });
      }
    });

    return () => {
        socket.offAny(); 
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
            className="z-99999 block rounded-sm h-auto border  mt-4 border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
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
      <Footer />
    </div>
  );
};

export default ConnectedClientLayout;
