import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import {
  checkEmailUnique,
  getProfile,
  updateCompany,
  updateUser,
} from '../../services/user.service';
import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import CustomAlert from '../UiElements/CostumAlert';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../services/auth.service';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PhoneInputWithCountrySelect, {
  isValidPhoneNumber,
} from 'react-phone-number-input';
import ReactFlagsSelect from 'react-flags-select';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';

const TIMEOUT_DURATION = 5000; // 5 seconds
interface Country {
  name: any;
  flagPath: any;
  code: any;
}

const ProfileSettings = () => {
  const professionalFields = [
    'Healthcare',
    'Technology',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Hospitality',
    'Consulting',
    'Real Estate',
    'Legal',
    'Transportation',
    'Energy',
    'Media & Entertainment',
    'Non-profit',
    'Government',
    'Agriculture',
    'Construction',
    'Telecommunications',
    'Marketing & Advertising',
    'Research & Development',
  ];
  const [FirstName, setFirstName] = useState<string | undefined>('');
  const [FirstNameError, setFirstNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [LastName, setLastName] = useState('');
  const [LastNameError, setLastNameError] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [contry, setContry] = useState('');
  const [contryError, setContryError] = useState('');

  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const [Description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const [profileData, setProfileData] = useState<User | null>(null);
  const [skillsInput, setSkillsInput] = useState<string>(''); // State for the single skill input
  const [skills, setSkills] = useState<string[]>([]); // State for the skills array

  const [CompanyNameValue, setCompanyNameValue] = useState('');
  const [CompanyNameError, setCompanyNameError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCompanyCountry, setSelectedCompanyCountry] =
    useState<Country | null>(null);

  const [companyAddessValue, setCompanyAddressValue] = useState('');
  const [companyAddessError, setCompanyAddressError] = useState('');

  const [companyDescription, setCompanyDescription] = useState('');
  const [companyDescriptionError, setCompanyDescriptionError] = useState('');

  const [companyEmailValue, setCompanyEmailValue] = useState('');
  const [companyEmailError, setCompanyEmailError] = useState('');

  const [companyWebsiteUrlValue, setcompanyWebsiteUrlValue] = useState('');
  const [companyWebsiteUrlError, setcompanyWebsiteUrlError] = useState('');

  const [companyPhoneValue, setCompanyPhoneValue] = useState('');
  const [companyPhoneError, setCompanyPhoneError] = useState('');


  const [CreationDateValue, setCreationDateValue] = useState('');
  const [CreationDateError, setCreationDateError] = useState('');

  const [companyProfessionnalFieldsValue, setCompanyProfessionnalFieldsValue] =
    useState('Choose company professional fields');
  const [companyProfessionnalFieldsError, setCompanyProfessionnalFieldsError] =
    useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isForm1Submited, setIsForm1Submited] = useState(false);
  const [isForm2Submited, setIsForm2Submited] = useState(false);

  // ... (other state variables)
  const [alert, setAlert] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleAddSkill = () => {
    if (skillsInput.trim() !== '' && !skills.includes(skillsInput)) {
      setSkills((prevSkills) => [...prevSkills, skillsInput]);
      setSkillsInput(''); // Clear the input after adding a skill
    }
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const handleCompanyCountrySelect = (country: Country) => {
    setSelectedCompanyCountry(country);
    setIsOpen(false);
  };

  const validateEmail = async (value: any) => {
    setEmail(value);

    if (!value.trim()) {
      setEmailError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Please enter a valid email');
    } else {
      if (value != profileData?.email) {
        try {
          const isUnique = await checkEmailUnique(value);
          if (!isUnique) {
            setEmailError('Email is not unique');
          } else {
            setEmailError('');
          }
        } catch (error) {
          console.error('Error checking email uniqueness:', error);
        }
      }
    }
  };
  const validateFirstName = (value: any) => {
    setFirstName(value);
    if (!value.trim()) {
      setFirstNameError('FirstName is required');
    } else {
      setFirstNameError('');
    }
  };
  const validateLastName = (value: any) => {
    setLastName(value);
    if (!value.trim()) {
      setLastNameError('Last Name is required');
    } else {
      setLastNameError('');
    }
  };
  const validatePhone = (value: any) => {
    setPhone(value);
    if (!value.trim()) {
      setPhoneError('Please enter your phone number');
    } else if (!isValidPhoneNumber(value)) {
      setPhoneError('Please enter a valid phone number');
    } else {
      setPhoneError('');
    }
  };

  const validateCountry = (value: any) => {
    setContry(value);
    if (!value.trim()) {
      setContryError('Country is required');
    } else {
      setContryError('');
    }
  };
  const validateAddress = (value: any) => {
    setAddress(value);
    if (!value.trim()) {
      setAddressError('Address is required');
    } else {
      setAddressError('');
    }
  };
  const validateDescription = (value: any) => {
    setDescription(value);
    if (!value.trim()) {
      setDescriptionError('Description is required');
    } else if (value.length < 200 || value.length > 800) {
      setDescriptionError('Desciption must be between 200 and 800 digits');
    } else {
      setDescriptionError('');
    }
  };
  const validateCompanyDescription = (value: any) => {
    setCompanyDescription(value);
    if (!value.trim()) {
      setCompanyDescriptionError('Description is required');
    } else if (value.length < 200 || value.length > 800) {
      setCompanyDescriptionError(
        'Desciption must be between 200 and 800 digits',
      );
    } else {
      setCompanyDescriptionError('');
    }
  };
  const checkCompanyName = (value: any) => {
    setCompanyNameValue(value);
    if (!value.trim()) {
      setCompanyNameError('Please enter the company name');
    } else {
      setCompanyNameError('');
    }
  };

  const checkCompanyEmail = (value: any) => {
    setCompanyEmailValue(value);
    if (!value.trim()) {
      setCompanyEmailError('Please enter the company email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setCompanyEmailError('Please enter a valid email');
    } else {
      setCompanyEmailError('');
    }
  };

  const checkCompanyWebsiteUrl = (value: any) => {
    setcompanyWebsiteUrlValue(value);
    if (!value.trim()) {
      setcompanyWebsiteUrlError('Please enter the company website url');
    } else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value)) {
      setcompanyWebsiteUrlError('Please enter a valid website url');
    } else {
      setcompanyWebsiteUrlError('');
    }
  };

  const checkCompanyAddress = (value: any) => {
    setCompanyAddressValue(value);
    if (!value.trim()) {
      setCompanyAddressError('Please enter the company address');
    } else {
      setCompanyAddressError('');
    }
  };

  const checkCompanyPhone = (value: any) => {
    setCompanyPhoneValue(value);
    if (!value.trim()) {
      setCompanyPhoneError('Please enter your phone number');
    } else if (!isValidPhoneNumber(value)) {
      setCompanyPhoneError('Please enter a valid phone number');
    } else {
      setCompanyPhoneError('');
    }
  };

  const checkProfesionnalFieldsValue = (value: any) => {
    setCompanyProfessionnalFieldsValue(value);
    if (value == 'Choose company professional fields') {
      setCompanyProfessionnalFieldsError(
        'Please enter the company professionnal fileds',
      );
    } else {
      setCompanyProfessionnalFieldsError('');
    }
  };


  const checkCreationDate = (value: any) => {  
    setCreationDateValue(value);
    if (!value.trim()) {
      setCreationDateError('Please enter creation date of your company');
    } else {
      setCreationDateError('');
    }
  };


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedUser = await updateUser({
        FirstName: FirstName,
        LastName: LastName,
        phone: phone,
        email: email,
        Description: Description,
        country: contry,
        address: address,
        skills: skills,
      });
      setIsForm1Submited(true);

      if (updatedUser) {
        setAlert({
          type: 'success',
          message: 'user updated succesfully',
        });
        setTimeout(() => {
          setAlert(null);
          navigate('/profile');
        }, 3000);
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Error updating user:' + error,
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      console.error('Error updating user:', error);
    }
  };

  const handleForm2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedCompany = await updateCompany({
        name: CompanyNameValue,
        phone: companyPhoneValue,
        email: companyEmailValue,
        address: companyAddessValue,
        professionnalFields: companyProfessionnalFieldsValue,
        websiteUrl: companyWebsiteUrlValue,
        creationDate:CreationDateValue,
        description: companyDescription,
      });

      if (updatedCompany) {
        setIsForm2Submited(true);
        setAlert({
          type: 'success',
          message: 'company updated succesfully',
        });
        setTimeout(() => {
          setAlert(null);
          navigate('/profile');
        }, 3000);
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Error updating company:' + error,
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      console.error('Error updating user:', error);
    }
  };
  const isFormValid = () => {
    return (
      FirstName !== '' &&
      LastName !== '' &&
      contry !== '' &&
      phone != '' &&
      address != '' &&
      Description != '' &&
      FirstNameError === '' &&
      emailError === '' &&
      LastNameError === '' &&
      phoneError === '' &&
      contryError === '' &&
      addressError === '' &&
      descriptionError === ''
    );
  };
  const isForm2Valid = () => {
    return (
      CompanyNameValue !== '' &&
      CompanyNameError === '' &&
      companyAddessValue !== '' &&
      companyAddessError === '' &&
      companyEmailValue !== '' &&
      companyEmailError === '' &&
      companyPhoneValue !== '' &&
      companyPhoneError === '' &&
      companyProfessionnalFieldsValue !==
        'Choose company professional fields' &&
      companyProfessionnalFieldsError === '' &&
      companyWebsiteUrlValue !== '' &&
      companyWebsiteUrlError === '' &&
      CreationDateValue !== '' &&
      CreationDateError === ''
    );
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
        setProfileData(data);
        setFirstName(data?.FirstName || '');
        setEmail(data?.email || '');
        setLastName(data?.LastName || '');
        setPhone(data?.phone || '');
        setContry(data?.country || '');
        setAddress(data?.address || '');
        setDescription(data?.Description || '');
        setSkills(data?.skills || []);
        setCompanyNameValue(data?.company.name || '');
        setCompanyEmailValue(data?.company.email || '');
        setCompanyAddressValue(data?.company.address || '');
        setCompanyPhoneValue(data?.company.phone || '');
        setcompanyWebsiteUrlValue(data?.company.websiteUrl || '');
        setCreationDateValue(data?.company.creationDate || '');
        setCompanyProfessionnalFieldsValue(
          data?.company.professionnalFields || '',
        );
        setCompanyDescription(data?.company.description || '');
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
        sessionStorage.setItem(
          'logoutTimer',
          String(Date.now() + TIMEOUT_DURATION),
        );
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

  const handleDeactivateAccount = () => {
    setShowPrompt(true);
  };

  const handleConfirmDeactivation = async () => {
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:3000/auth/deactivate',
        { password },
        { withCredentials: true },
      );
      setMessage(response.data.message);
      setLogoutMessage('See you soon, enjoy your break.');
      setShowPrompt(false); // Close the first popup
      setShowConfirmation(true);
      sessionStorage.setItem(
        'logoutTimer',
        String(Date.now() + TIMEOUT_DURATION),
      );
    } catch (error: any) {
      setMessage('');
      setError(error.response.data.message);
    }
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
      {alert && <CustomAlert type={alert.type} message={alert?.message} />}

      {showPrompt && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="mb-4">
              Are you sure you want to deactivate your account?
            </p>
            <p>If yes please write down your password</p>
            <p> </p>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="absolute right-4 top-4">
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {' '}
                          <path
                            d="M14.83 9.17999C14.2706 8.61995 13.5576 8.23846 12.7813 8.08386C12.0049 7.92926 11.2002 8.00851 10.4689 8.31152C9.73758 8.61453 9.11264 9.12769 8.67316 9.78607C8.23367 10.4444 7.99938 11.2184 8 12.01C7.99916 13.0663 8.41619 14.08 9.16004 14.83"
                            stroke="#757575"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{' '}
                          <path
                            d="M12 16.01C13.0609 16.01 14.0783 15.5886 14.8284 14.8384C15.5786 14.0883 16 13.0709 16 12.01"
                            stroke="#757575"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{' '}
                          <path
                            d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z"
                            stroke="#757575"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{' '}
                          <path
                            d="M20.9994 3L17.6094 6.39"
                            stroke="#757575"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{' '}
                          <path
                            d="M6.38 17.62L3 21"
                            stroke="#757575"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{' '}
                          <path
                            d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23"
                            stroke="#757575"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{' '}
                        </g>
                      </svg>
                    </svg>
                  ) : (
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {' '}
                          <path
                            d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z"
                            stroke="#757575"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{' '}
                          <path
                            d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98"
                            stroke="#757575"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{' '}
                          <path
                            d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01"
                            stroke="#757575"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{' '}
                        </g>
                      </svg>{' '}
                    </svg>
                  )}
                </button>
              </span>
            </div>{' '}
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
              onClick={handleConfirmDeactivation}
            >
              Yes, deactivate
            </button>
            <button
              className="text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
              onClick={() => {
                setShowPrompt(false);
                setError('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {message && <p>{message}</p>}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="mb-4">{logoutMessage}</p>
            <button
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
              onClick={handleLogout}
            >
              Goodbye
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="First Name"
                      >
                        First name
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
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="First Name"
                          onChange={(e) => validateFirstName(e.target.value)}
                          id="First Name"
                          placeholder="First Name"
                          value={FirstName}
                        />
                        {FirstNameError && (
                          <p className="text-red-500 text-sm mt-1">
                            {FirstNameError}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="LastName"
                      >
                        Last name
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
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="LastName"
                          id="LastName"
                          placeholder="Last Name"
                          value={LastName}
                          onChange={(e) => validateLastName(e.target.value)}
                        />
                        {LastNameError && (
                          <p className="text-red-500 text-sm mt-1">
                            {LastNameError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Phone number
                    </label>
                    <div className="flex items-center ">
                      <PhoneInputWithCountrySelect
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(value) => {
                          if (value) {
                            validatePhone(value.toString());
                          }
                        }}
                        className="w-full flex-shrink-0 z-10 inline-flex items-center py-4 px-3 rounded-lg border border-stroke bg-transparent text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
                      />
                    </div>
                    {phoneError && (
                      <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                    )}
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="email"
                    >
                      Email address
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
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="flenBenfoulen@gmail.com"
                        value={email}
                        onChange={(e) => validateEmail(e.target.value)}
                        readOnly={profileData?.isExternalUser} // Set readOnly based on isExternalUser
                      />
                      {emailError && (
                        <p className="text-red-500 text-sm mt-1">
                          {emailError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="contry"
                      >
                        Country
                      </label>
                      <ReactFlagsSelect
                        selected={contry}
                        onSelect={(code) => validateCountry(code)}
                        selectButtonClassName="w-full rounded-lg border border-stroke outline-none h-12"
                        placeholder="Select your country"
                        searchable={true}
                      />

                      {contryError && (
                        <p className="text-red-500 text-sm mt-1">
                          {contryError}
                        </p>
                      )}
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary "
                        type="text"
                        name="addres"
                        id="address"
                        placeholder="rue de palastine n45"
                        value={address}
                        onChange={(e) => validateAddress(e.target.value)}
                      />
                      {addressError && (
                        <p className="text-red-500 text-sm mt-1">
                          {addressError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    {/* ... (other input fields) */}

                    {/* Input for single skill */}
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="skills"
                      >
                        Skills
                      </label>
                      <div className="relative">
                        {/* Input for a single skill */}
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="skills"
                          value={skillsInput}
                          onChange={(e) => setSkillsInput(e.target.value)}
                          placeholder="Enter a skill"
                        />
                        <button
                          type="button"
                          className="absolute right-4.5 top-4 text-primary hover:underline"
                          onClick={handleAddSkill}
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Display the list of skills */}
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="skillsList"
                      >
                        Skills List
                      </label>
                      <div>
                        {skills.map((skill, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <p className="mr-2">{skill}</p>
                            <button
                              type="button"
                              className="text-red-500 hover:underline"
                              onClick={() => handleRemoveSkill(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* ... (other JSX) */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="description"
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
                        name="description"
                        id="description"
                        rows={6}
                        placeholder="Write your bio here"
                        value={Description}
                        onChange={(e) => validateDescription(e.target.value)}
                      ></textarea>
                      {descriptionError && (
                        <p className="text-red-500 text-sm mt-1">
                          {descriptionError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
                      type="submit"
                      disabled={!isFormValid() || isForm1Submited}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="rounded-sm border mt-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Deactivate account
                </h3>
              </div>

              <div className="px-7 py-4">
                <p>
                  Just a tap on the button below and your account deactivation
                  will be done smoothly
                </p>
                <button
                  className="text-white mt-3 bg-gray-500 hover:bg-gray-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  onClick={handleDeactivateAccount}
                >
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>

          {profileData?.role == 'company' ? (
            <>
              {' '}
              <div className="col-span-5 xl:col-span-2">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Company Information
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
                            onChange={(e) => checkCompanyName(e.target.value)}
                            type="text"
                            placeholder="Enter the company name "
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          />

                          {CompanyNameError && (
                            <div className="flex">
                              <p className="text-red-500 text-sm mt-1">
                                {CompanyNameError}
                              </p>
                            </div>
                          )}

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
                            onChange={(e) => checkCompanyEmail(e.target.value)}
                            type="text"
                            placeholder="Enter the company address email"
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          />
                          {companyEmailError && (
                            <div className="flex">
                              <p className="text-red-500 text-sm mt-1">
                                {companyEmailError}
                              </p>
                            </div>
                          )}
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
                          Company website url
                        </label>
                        <div className="relative">
                          <input
                            value={companyWebsiteUrlValue}
                            onChange={(e) =>
                              checkCompanyWebsiteUrl(e.target.value)
                            }
                            type="text"
                            placeholder="Enter the company website url"
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          />
                          {companyWebsiteUrlError && (
                            <div className="flex">
                              <p className="text-red-500 text-sm mt-1">
                                {companyWebsiteUrlError}
                              </p>
                            </div>
                          )}
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
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                          Creation Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={CreationDateValue}
                            style={{ color: '#00000079' }}
                            onChange={(e) => checkCreationDate(e.target.value)}
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary no-calendar-icon"
                          />
                          <span className="absolute right-0 top-4">
                            <img
                              src="/src/images/icon/calendrier.png"
                              alt="cal"
                              width="45%"
                            />
                          </span>
                        </div>

                        {CreationDateError && (
                          <div className="flex">
                            <p className="error-msg">{CreationDateError}</p>
                            <FontAwesomeIcon
                              icon={faCircleExclamation}
                              style={{ color: '#f20202' }}
                              className="mt-1 ml-1"
                            />
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Company address
                        </label>
                        <div className="relative">
                          <input
                            value={companyAddessValue}
                            onChange={(e) =>
                              checkCompanyAddress(e.target.value)
                            }
                            type="text"
                            placeholder="Enter the company address "
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          />

                          {companyAddessError && (
                            <div className="flex">
                              <p className="text-red-500 text-sm mt-1">
                                {companyAddessError}
                              </p>
                            </div>
                          )}
                          <span className="absolute left-4.5 top-4">
                            <img
                              src="/src/images/icon/adresse.png"
                              alt="adresse"
                              width="45%"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Company phone number
                        </label>
                        <div className="relative">
                          <div className="flex items-center">
                            <PhoneInputWithCountrySelect
                              placeholder="Enter company phone number"
                              value={companyPhoneValue}
                              onChange={(value) => {
                                if (value) {
                                  checkCompanyPhone(value.toString());
                                }
                              }}
                              className="w-full flex-shrink-0 z-10 inline-flex items-center py-4 px-3 rounded-lg border border-stroke bg-transparent text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            />
                          </div>

                          {companyPhoneError && (
                            <div className="flex">
                              <p className="text-red-500 text-sm mt-1">
                                {companyPhoneError}
                              </p>
                            </div>
                          )}
                          <span className="absolute left-4.5 top-4">
                            <img
                              src="/src/images/icon/tel.png"
                              alt="tel"
                              width="45%"
                            />
                          </span>
                        </div>

                        <div className="mb-4 mt-4">
                          <label className="mb-4 block text-sm font-medium text-black dark:text-white">
                            Professional fields
                          </label>
                          <select
                            id="professionnalFields"
                            value={companyProfessionnalFieldsValue}
                            onChange={(e) =>
                              checkProfesionnalFieldsValue(e.target.value)
                            }
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          >
                            <option value="Choose company professional fields">
                              Choose company professional fields
                            </option>
                            {professionalFields.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>

                          {companyProfessionnalFieldsError && (
                            <div className="flex">
                              <p className="text-red-500 text-sm mt-1">
                                {companyProfessionnalFieldsError}
                              </p>
                            </div>
                          )}
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
                                <g
                                  opacity="0.8"
                                  clipPath="url(#clip0_88_10224)"
                                >
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
                              onChange={(e) =>
                                validateCompanyDescription(e.target.value)
                              }
                            ></textarea>
                            {companyDescriptionError && (
                              <p className="text-red-500 text-sm mt-1">
                                {companyDescriptionError}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-4.5">
                        <button
                          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
                          type="submit"
                          disabled={!isForm2Valid() || isForm2Submited}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <>
              <div></div>
            </>
          )}
        </div>
      </div>
    </ConnectedClientLayout>
  );
};

export default ProfileSettings;
