import { useEffect, useState } from 'react';
import DropdownUser from './DropdownUser';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { User } from '../../types/User';
import { countryFlags } from './flag';
import DropDownLanguage from './DropDownLanguage';
import { directlySwitchAccount } from '../../services/user.service';
const ClientHeader = (props: {
  connectedUser: User | null;
  authenticated: Boolean;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userName = `${props.connectedUser?.FirstName} ${props.connectedUser?.LastName}`;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = location;
  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleCountrySelectFunction = (selectedCountry: any) => {
    console.log(`Selected country: ${selectedCountry.name}`);
    // Implement any other logic you need with the selected country
    setIsOpen(false);
    setSelectedCountry(selectedCountry);
  };
  const handleSwitchAccount = async () => {
    try {
      setIsLoading(true);

      await directlySwitchAccount();

      alert('Account switched successfully');

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error switching account', error);

      alert('Error switching account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-999999">
      <nav className="sticky bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavLink to="/">
            <a href="" className="flex items-center">
              <img
                src="/src/images/landing/logo-transparent.png"
                className="mr-3 h-6 sm:h-14"
                alt="TektAi Logo"
              />
              <span className="font-satoshi self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                <span className="text-black">Tekt</span>
                <span className="text-primary">AI</span>
              </span>
            </a>{' '}
          </NavLink>

          <div className="flex items-center lg:order-2">
            {props.connectedUser != null ? (
              <>
                <DropdownUser
                  companyName={props.connectedUser?.company?.name}
                  userName={userName}
                  occupation={props.connectedUser?.occupation}
                  imageUrl={props.connectedUser?.imageUrl}
                />
              </>
            ) : (
              <>
                <Link to="/auth/signin">
                  <a className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                    Log in
                  </a>
                </Link>
                <Link to="/auth/signup">
                  <a
                    href="#"
                    className="text-white bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary2 focus:outline-none dark:focus:ring-primary-800"
                  >
                    Sign Up
                  </a>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-6 h-6 ${mobileMenuOpen ? 'hidden' : 'block'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className={`w-6 h-6 ${mobileMenuOpen ? 'block' : 'hidden'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            {/* Mobile Menu */}
          </div>
          <div
            className={` ${mobileMenuOpen ? '' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="/LCFront"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 focus:bg-primary rounded focus:text-white lg:hover:text-primary lg:p-0 dark:text-gray-400 focus:bg-primary lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Competitions
                </a>
              </li>
              <li>
                <a
                  href="/ranking"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 focus:bg-primary rounded focus:text-white dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Ranking
                </a>
              </li>
              <li>
                <a
                  href="/teams"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 focus:bg-primary rounded focus:text-white dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Team
                </a>
              </li>

              <li>
                <a
                  href="/paiement"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 focus:bg-primary rounded focus:text-white dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="/landing#contactUs"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 focus:bg-primary rounded focus:text-white dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>

              <li>
                <DropDownLanguage
                  countryFlagsPhone={countryFlags}
                  handleCompanyCountrySelect={handleCountrySelectFunction}
                  isOpen={isOpen}
                  selectedCountry={selectedCountry}
                  setIsOpen={setIsOpen}
                />
              </li>
              {props.connectedUser != null &&   props.connectedUser.role != "admin" && props.connectedUser.role!="superAdmin"
                      &&(

                <div className="flex px-4">
                  {props.connectedUser.AlreadyCompany ?(
                    <>
                    
                      <a
                        onClick={handleSwitchAccount}
                        className="hover:scale-[1.05] cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        {props.connectedUser?.role === 'challenger' ? (
                          <>Switch to company</>
                        ) : (
                          <>Switch to challenger</>
                        )}
                      </a>
                      
                    </>
                  ) : (
                    <Link to="/SwitchToCompany">
                      <a  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        {props.connectedUser?.role === 'challenger' ? (
                          <>Switch to company</>
                        ) : (
                          <>Switch to challenger</>
                        )}
                      </a>
                    </Link>
                  )}
                </div>
              )}
              
              {/*admin*/}
              {props.connectedUser != null &&   (props.connectedUser.role == "admin" || props.connectedUser.role=="superAdmin")
                      &&(

                <div className="flex px-4">
                    <>
                    
                      <a
                        onClick={()=>{navigate('/dashboard')}}
                        className="hover:scale-[1.05] cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Go To BackOffice
                      </a>
                      
                    </>
                  
                </div>
              )}
              {/*admin*/}
            </ul>
          </div>
        </div>
      </nav>
      {/* {props.connectedUser != null && (
      <div className={`p-2 z-9999 top-0 ${pathname.includes("landing") || pathname.includes("LCFront") ? 'bg-white' : 'bg-white'}`}>
  <div className="flex justify-end px-4">
    {props.connectedUser?.AlreadyCompany ? (
      <>
        <a onClick={handleSwitchAccount} className="hover:scale-[1.05] cursor-pointer inline-flex items-center m-1 px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {props.connectedUser?.role === 'challenger' ? (
            <>
              Switch to company
            </>
          ) : (
            <>
              Switch to challenger
            </>
          )}
        </a>
      </>
    ) : (
      <Link to="/SwitchToCompany">
        <a onClick={handleSwitchAccount} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {props.connectedUser?.role === 'challenger' ? (
            <>
              Switch to company
            </>
          ) : (
            <>
              Switch to challenger
            </>
          )}
        </a>
      </Link>
    )}
  </div>
</div>

)}*/}
    </header>
  );
};

export default ClientHeader;
