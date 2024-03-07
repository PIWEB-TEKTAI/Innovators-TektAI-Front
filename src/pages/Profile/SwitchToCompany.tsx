import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { checkEmailUnique, getProfile, switchAccount, } from '../../services/user.service'; 
import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import CustomAlert from '../UiElements/CostumAlert';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../services/auth.service';
import axios from 'axios';
import { countryFlagsPhone } from '../Authentication/CountryList';


const TIMEOUT_DURATION = 5000; // 5 seconds 
interface Country {
  name:any;
  flagPath:any;
  code:any;
}


const SwitchToCompany = () => {
  const professionalFields = 
  ["Healthcare",
  "Technology",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Hospitality",
  "Consulting",
  "Real Estate",
  "Legal",
  "Transportation",
  "Energy",
  "Media & Entertainment",
  "Non-profit",
  "Government",
  "Agriculture",
  "Construction",
  "Telecommunications",
  "Marketing & Advertising",
  "Research & Development"];


  const [CompanyNameValue, setCompanyNameValue] = useState('');
  const [CompanyNameError, setCompanyNameError] = useState('');
 
  const [companyAddessValue, setCompanyAddressValue] = useState('');
  const [companyAddessError, setCompanyAddressError] = useState('');

  const [companyDescription, setCompanyDescription] = useState('');
  const [companyDescriptionError, setCompanyDescriptionError] = useState('');

  const [companyEmailValue, setCompanyEmailValue] = useState('');
  const [companyEmailError, setCompanyEmailError] = useState('');

  const [selectedCompanyCountry, setSelectedCompanyCountry] = useState<Country | null>(null);

  const [companyPhoneValue, setCompanyPhoneValue] = useState('');
  const [companyPhoneError, setCompanyPhoneError] = useState('');

  
  const [companyProfessionnalFieldsValue, setCompanyProfessionnalFieldsValue] = useState('Choose company professional fields');
  const [companyProfessionnalFieldsError, setCompanyProfessionnalFieldsError] = useState('');

  // ... (other state variables)
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

   const validateCompanyDescription = (value:any) =>{
    setCompanyDescription(value)
    if (!value.trim()) {
      setCompanyDescriptionError("Description is required");
    } 
    else if (value.length < 200 || value.length > 800) {
      setCompanyDescriptionError("Desciption must be between 200 and 800 digits");
    }
    else {
      setCompanyDescriptionError("");
    }
   }
 const checkCompanyName = (value:any) =>{
    setCompanyNameValue(value)
    if (!value.trim()) {
      setCompanyNameError("Please enter the company name");
    } else {
      setCompanyNameError("");
    }
  }

   
  const checkCompanyEmail = (value:any) =>{
    setCompanyEmailValue(value)
    if (!value.trim()) {
      setCompanyEmailError("Please enter the company email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setCompanyEmailError("Please enter a valid email");
    }else{
      setCompanyEmailError("");
    }
   }
  

  const checkCompanyAddress = (value:any) =>{
    setCompanyAddressValue(value)
    if (!value.trim()) {
      setCompanyAddressError("Please enter the company address");
    } else {
      setCompanyAddressError("");
    }
  }
  const handleCompanyCountrySelect = (country:Country) => {
    setSelectedCompanyCountry(country);
    setIsOpen(false); 
  };

  const checkCompanyPhone = (value:any) =>{
    setCompanyPhoneValue(value)
    if (!value.trim()) {
      setCompanyPhoneError("Please enter the company phone number");

    }else if(!/^\d{8}$/.test(value)){
      setCompanyPhoneError("Please enter a valid phone number")
    }else {
      setCompanyPhoneError("");
    }
  }



  
  const checkProfesionnalFieldsValue = (value:any) =>{
    setCompanyProfessionnalFieldsValue(value)
    if (value == "Choose company professional fields") {
      setCompanyProfessionnalFieldsError("Please enter the company professionnal fileds");
    } else {
      setCompanyProfessionnalFieldsError("");
    }
  }



  
  const handleForm2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
     const switchedAccount =  await switchAccount({
        name: CompanyNameValue,
        phone: companyPhoneValue,
        email: companyEmailValue,
        address:companyAddessValue,
        professionnalFields:companyProfessionnalFieldsValue,
        description:companyDescription
      });

      if(switchedAccount){
        setAlert({
          type: 'success',
          message:
          'Request for account switch added successfully'
        });
        setTimeout(() => {
          setAlert(null);
          navigate('/profile')

        }, 3000);

      }
    } catch (error) {
      setAlert({
        type: 'error',
        message:
        'Error switching account:' + error
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      console.error('Error updating user:', error);
    }
  };

  const isForm2Valid = () => {
    return  CompanyNameValue !== '' && companyAddessValue !== '' && companyEmailValue !== '' && companyPhoneValue !== '' && companyProfessionnalFieldsValue !== 'Choose company professional fields' 
    && CompanyNameError==="" &&companyAddessError===""&&companyEmailError===""&&companyPhoneError==="";
   };
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        
      setCompanyNameValue(data?.company.name || '')
      setCompanyEmailValue(data?.company.email || '')
      setCompanyAddressValue(data?.company.address)
      setCompanyPhoneValue(data?.company.phone);
      setCompanyProfessionnalFieldsValue(data?.company.professionnalFields)
      setCompanyDescription(data?.company.description);
       } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
    
  }, []);  

  const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPrompt, setShowPrompt] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [logoutMessage, setLogoutMessage] = useState('');
    const [timer, setTimer] = useState(TIMEOUT_DURATION);
    const [profileData, setProfileData] = useState<User | null>(null);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
  
      if (showConfirmation) {
        timeoutId = setTimeout(() => {
          handleLogout();
        }, timer);
      }
  
      return () => {
        clearTimeout(timeoutId); // Clear the timeout when the component unmounts
      };
    }, [showConfirmation, timer]);
  
    useEffect(() => {
      const handleResetTimer = () => {
        if (showConfirmation) {
          setTimer(TIMEOUT_DURATION);
          sessionStorage.setItem('logoutTimer', String(Date.now() + TIMEOUT_DURATION));
        }
      };
  
      const intervalId = setInterval(() => {
        const logoutTime = Number(sessionStorage.getItem('logoutTimer'));
        if (logoutTime) {
          const timeLeft = logoutTime - Date.now();
          if (timeLeft > 0) {
            setTimer(timeLeft);
          } else {
            handleLogout();
          }
        }
      }, 1000); // Update the timer every 1 second
  
      window.addEventListener('mousemove', handleResetTimer);
      window.addEventListener('keydown', handleResetTimer);
  
      return () => {
        clearInterval(intervalId);
        window.removeEventListener('mousemove', handleResetTimer);
        window.removeEventListener('keydown', handleResetTimer);
      };
    }, [showConfirmation]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const handleLogout = () => {
      signOut();
      sessionStorage.removeItem('logoutTimer'); // Clear logout timer on logout
      navigate('/auth/signin');
    };
      return (
    <ConnectedClientLayout>
      {alert&&<CustomAlert type={alert.type} message={alert?.message} />}
      <div className="flex justify-end">
   
    </div>

 

      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-4">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Switch To Company: Company Information
                </h3>
                
              </div>
              <form onSubmit={handleForm2Submit}>
               <div className="p-7">
               <div className="mb-4">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Company name
                    </label>
                    <div className="relative">
                      <input
                        value={CompanyNameValue}
                        onChange={(e)=> checkCompanyName(e.target.value)}
                        type="text"
                        placeholder="Enter the company name "
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />

                      { CompanyNameError &&
                        <div className="flex">
                        <p className="text-red-500 text-sm mt-1">{ CompanyNameError }</p>
                        </div> 
                      }

                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                              fill=""
                            />
                            <path
                              d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      
                    </div>
                  </div> 
                  <div className="mb-4">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Company email
                      </label>
                      <div className="relative">
                        <input
                          value={companyEmailValue}
                          onChange={(e)=> checkCompanyEmail(e.target.value)}
                          type="text"
                          placeholder="Enter the company address email"
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        />
                        { companyEmailError &&
                        <div className="flex">
                        <p className="text-red-500 text-sm mt-1">{ companyEmailError }</p>
                        </div> 
                        }
                        <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Professional fields
                    </label>
                    <select id="professionnalFields"  value={companyProfessionnalFieldsValue}   onChange={(e)=> checkProfesionnalFieldsValue(e.target.value)} className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                        <option value="Choose company professional fields">Choose company professional fields</option>
                        {
                          professionalFields.map((item,index)=>(
                            <option key={index} value={item}>{item}</option>
                          ))
                        }
                    </select>

                    { companyProfessionnalFieldsError &&
                        <div className="flex">
                        <p className="text-red-500 text-sm mt-1">{ companyProfessionnalFieldsError }</p>
                        </div> 
                        }
                  </div>
                  <div className="mb-4">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Company address
                    </label>
                    <div className="relative">
                      <input
                      
                      value={companyAddessValue}
                      onChange={(e)=> checkCompanyAddress(e.target.value)}
                        type="text"
                        placeholder="Enter the company address "
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />

                      { companyAddessError &&
                        <div className="flex">
                        <p className="text-red-500 text-sm mt-1">{ companyAddessError }</p>
                        </div> 
                      }
                        <span className="absolute left-4.5 top-4">
                          <img src="/src/images/icon/adresse.png" alt="adresse" width="45%"/>
                        </span>  
                    </div>
                  </div>
                  <div className="mb-4">
                  <div className="relative">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Company phone number
                    </label>
                    <div className="flex items-center">
                          <button
                                  id="dropdown-phone-button"
                                  className="flex-shrink-0 z-10 inline-flex items-center py-4 px-3 rounded-lg border border-stroke bg-transparent text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                  onClick={toggleDropdown}
                                  type="button">
                                  {selectedCompanyCountry && (
                                      <>
                                        {selectedCompanyCountry.flagPath}
                                        {selectedCompanyCountry.code}
                                        <svg
                                          className="w-2.5 h-2.5 ms-2.5"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 10 6"
                                        >
                                          <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 4 4 4-4"
                                          />
                                        </svg>
                                      </>
                                    )}
                                      {!selectedCompanyCountry && (
                                        <>
                                          <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-tn" viewBox="0 0 512 512" width="30" height="20"><path fill="#e70013" d="M0 0h512v512H0z"/><path fill="#fff" d="M256 135a1 1 0 0 0-1 240 1 1 0 0 0 0-241zm72 174a90 90 0 1 1 0-107 72 72 0 1 0 0 107m-4.7-21.7-37.4-12.1-23.1 31.8v-39.3l-37.3-12.2 37.3-12.2v-39.4l23.1 31.9 37.4-12.1-23.1 31.8z"/></svg>,
                                          +216{" "}
                                          <svg
                                            className="w-2.5 h-2.5 ms-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                          >
                                            <path
                                              stroke="currentColor"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="m1 1 4 4 4-4"
                                            />
                                          </svg>
                                        </>
                                      )}  

                                </button>

                                {isOpen && (
                                  <div
                                    id="dropdown-phone"
                                    className="absolute top-15 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button">
                                      {countryFlagsPhone.map((country, index) => (
                                        <li key={index}>
                                          <button
                                            type="button"
                                            onClick={() => handleCompanyCountrySelect(country)}
                                            className="inline-flex w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                            role="menuitem">
                                            <div className="inline-flex items-center">
                                              {country.flagPath}
                                              {country.name} 
                                            </div>
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              <div className="relative w-full">
                             <input
                        value={companyPhoneValue}
                        onChange={(e)=> checkCompanyPhone(e.target.value)}
                        type="text"
                        placeholder="Enter the company phone number"
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                                   
                              </div>
                          </div>
                    <div className="relative">
                    { companyPhoneError &&
                        <div className="flex">
                        <p className="text-red-500 text-sm mt-1">{ companyPhoneError }</p>
                        </div> 
                      } 
                    </div>
                  </div>
                    <div className="mb-4">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="companyDescription"
                    >
                      BIO
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="companyDescription"
                        id="companyDescription"
                        rows={6}
                        placeholder="Write your bio here"
                        value={companyDescription}
                        onChange={(e) =>validateCompanyDescription(e.target.value)} 

                      ></textarea>
                          {companyDescriptionError && <p className="text-red-500 text-sm mt-1">{companyDescriptionError}</p>}

                    </div>
                  </div>
                  </div>
                  <div className="flex justify-end gap-4.5">
                    
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-30"
                      type="submit"
                      disabled={!isForm2Valid()}
                    >
                      Save
                    </button>
                  </div>
               </div>
              </form>
                        

           
            </div>
          </div>
         
        </div>
      </div>
    </ConnectedClientLayout>
  );
};


export default SwitchToCompany;
