import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/logo back.png';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
    ref={sidebar}
    className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 bg-[#49698a] text-white py-2 px-4 flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}

  >
    {/* Contenu de votre sidebar */}

      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm text-gray-500 font-semibold p-2 bg-white rounded-lg text-center ">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/dashboard' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <li>
                        <NavLink
                          to="/dashboard"
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes('calendar') &&
                            'bg-graydark dark:bg-meta-4'
                          }`}
                        >
                           <FontAwesomeIcon
                              icon={faHome}
                              style={{ color: 'white' }}
                        />
                          Dashboard
                        </NavLink>
                     </li>

                     
                     
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}
              
             
            
              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to="/List"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon
                              icon={faList}
                              style={{ color: 'white' }}
                        />
                  Users List
                </NavLink>

              </li>
              <li>
                <NavLink
                  to="/ListChallenge"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon
                              icon={faList}
                              style={{ color: 'white' }}
                        />
                  List Competitions
                </NavLink>

              </li>
              <li>
                <NavLink
                  to="/accountSwitchRequests"
                  className={`group relative flex items-center gap-2.5 rounded-sm w-80 py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon
                              icon={faList}
                              style={{ color: 'white' }}
                        />
                  Switch Account Requests
                </NavLink>
                
              </li>
              <li>
                <NavLink
                  to="/TeamsAdmin"
                  className={`group relative flex items-center gap-2.5 rounded-sm w-80 py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon
                              icon={faList}
                              style={{ color: 'white' }}
                        />
                  Teams List
                </NavLink>
                
              </li>
              <li>
                <NavLink
                  to="/sentimentschat"
                  className={`group relative flex items-center gap-2.5 rounded-sm w-80 py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon
                              icon={faList}
                              style={{ color: 'white' }}
                        />
                 Sentiments
                </NavLink>
                
              </li>
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Forms --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/forms' || pathname.includes('forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                     
                      {/* <!-- Dropdown Menu Start --> */}
                  
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}


              <li>
                  <NavLink
                    to="/termsConditions"
                      className={`group relative flex items-center gap-2.5 rounded-sm w-70 py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                       pathname.includes('calendar') &&
                      'bg-graydark dark:bg-meta-4'
                    }`}
                    >
                          <FontAwesomeIcon
                              icon={faGear}
                              style={{ color: 'white' }}
                        />
                          Terms and conditions
                        </NavLink>
                     </li>
       
            
          


              <li>
                <NavLink
                  to="/Editaboutus"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('Editaboutus') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon
                              icon={faGear}
                              style={{ color: 'white' }}
                        />
                  Landing Settings
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/"
                  className={`group bg-white rounded-lg relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-blue-500 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('Editaboutus') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FontAwesomeIcon
                              icon={faExternalLinkAlt}
                              style={{ color: 'blue' }}
                        />
                        Go To Front Office
                  
                </NavLink>
              </li>
            </ul>
          </div>

          {/* <!-- Others Group --> */}
       
          
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
