import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { checkEmailUnique, getProfile, updateCompany, updateUser } from '../../services/user.service'; 
import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import CustomAlert from '../UiElements/CostumAlert';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
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
  const [FirstName, setFirstName] = useState<string | undefined>("");
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
 
  const [companyAddessValue, setCompanyAddressValue] = useState('');
  const [companyAddessError, setCompanyAddressError] = useState('');


  const [companyEmailValue, setCompanyEmailValue] = useState('');
  const [companyEmailError, setCompanyEmailError] = useState('');


  const [companyPhoneValue, setCompanyPhoneValue] = useState('');
  const [companyPhoneError, setCompanyPhoneError] = useState('');

  
  const [companyProfessionnalFieldsValue, setCompanyProfessionnalFieldsValue] = useState('Choose company professional fields');
  const [companyProfessionnalFieldsError, setCompanyProfessionnalFieldsError] = useState('');

  // ... (other state variables)
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const navigate = useNavigate();

  const handleAddSkill = () => {
    if (skillsInput.trim() !== '' && !skills.includes(skillsInput)) {
      setSkills((prevSkills) => [...prevSkills, skillsInput]);
      setSkillsInput(''); // Clear the input after adding a skill
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  const validateEmail = async(value:any) =>{
    setEmail(value)
    
    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))

    {
    setEmailError("Please enter a valid email");
    }else {
      if(value!=profileData?.email){
        try {
          const isUnique = await checkEmailUnique(value);
          if (!isUnique) {
            setEmailError("Email is not unique");
          } else {
            setEmailError("");
          }
        } catch (error) {
          console.error('Error checking email uniqueness:', error);
        }
      }
  
  }
   }
   const validateFirstName = (value:any) =>{
    setFirstName(value)
    if (!value.trim()) {
      setFirstNameError("FirstName is required");
    } 
    else {
      setFirstNameError("");
    }
   }
   const validateLastName = (value:any) =>{
    setLastName(value)
    if (!value.trim()) {
      setLastNameError("Last Name is required");
    } 
    else {
      setLastNameError("");
    }
   }
   const validatePhone = (value:any) =>{
    setPhone(value)
    if (!value.trim()) {
      setPhoneError("phone is required");
    } 
    else {
      setPhoneError("");
    }
   }
   const validateCountry = (value:any) =>{
    setContry(value)
    if (!value.trim()) {
      setContryError("Contry is required");
    } 
    else {
      setContryError("");
    }
   }
   const validateAddress = (value:any) =>{
    setAddress(value)
    if (!value.trim()) {
      setAddressError("Address is required");
    } 
    else {
      setAddressError("");
    }
   }
   const validateDescription = (value:any) =>{
    setDescription(value)
    if (!value.trim()) {
      setDescriptionError("Description is required");
    } 
    else {
      setDescriptionError("");
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

  const checkCompanyPhone = (value:any) =>{
    setCompanyPhoneValue(value)
    if (!value.trim()) {
      setCompanyPhoneError("Please enter the company phone number");

    }else if(! /^\d+$/.test(value)){
        setCompanyPhoneError("Please enter a valid phone number")
    } else {
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


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedUser = await updateUser({
        FirstName: FirstName,
        LastName:LastName,
        phone: phone,
        email: email,
        Description: Description,
        contry:contry,
        address:address,
        skills:skills,

  
      });
      if(updatedUser){
        setAlert({
          type: 'success',
          message:
          'user updated succesfully'
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
        'Error updating user:' + error
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
     const updatedCompany =  await updateCompany({
        name: CompanyNameValue,
        phone: companyPhoneValue,
        email: companyEmailValue,
        address:companyAddessValue,
        professionnalFields:companyProfessionnalFieldsValue,
      });

      if(updatedCompany){
        setAlert({
          type: 'success',
          message:
          'company updated succesfully'
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
        'Error updating company:' + error
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      console.error('Error updating user:', error);
    }
  };
  const isFormValid = () => {
    return (
      FirstName!== ''&&
      LastName!==''&&
      contry!==''&&
      phone!=''&&
      address!=''&&
      Description!=''&&
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
    return  CompanyNameValue !== '' && companyAddessValue !== '' && companyEmailValue !== '' && companyPhoneValue !== '' && companyProfessionnalFieldsValue !== 'Choose company professional fields';
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
        setContry(data?.contry || ''); 
        setAddress(data?.address || ''); 
        setDescription(data?.Description || '')
        setSkills(data?.skills || []);     
      setCompanyNameValue(data?.company.name || '')
      setCompanyEmailValue(data?.company.email || '')
      setCompanyAddressValue(data?.company.address)
      setCompanyPhoneValue(data?.company.phone);
      setCompanyProfessionnalFieldsValue(data?.company.professionnalFields)
       } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
    
  }, []);  
  
  return (
    <ConnectedClientLayout>
      {alert&&<CustomAlert type={alert.type} message={alert?.message} />}
        

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
                        First Name
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
                          onChange={(e) =>validateFirstName(e.target.value)} 
                          id="First Name"
                          placeholder="First Name"
                          value={FirstName}
                        />
                            {FirstNameError && <p className="text-red-500 text-sm mt-1">{FirstNameError}</p>}

                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="LastName"
                      >
                        LastName
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
                          onChange={(e) =>validateLastName(e.target.value)} 

                        />
                            {LastNameError && <p className="text-red-500 text-sm mt-1">{LastNameError}</p>}

                      </div>
                    </div>
                
                  </div>
                  <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="+990 3343 7865"
                        value={phone}
                        onChange={(e) =>validatePhone(e.target.value)} 

                      />
                          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}

                    </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="email"
                    >
                      Email Address
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
                        onChange={(e) =>validateEmail(e.target.value)} 

                      />
                          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

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
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="conttry"
                      id="contry"
                      placeholder="tunis"
                      value={contry}
                      onChange={(e) =>validateCountry(e.target.value)} 

                    />
                        {contryError && <p className="text-red-500 text-sm mt-1">{contryError}</p>}

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
                      onChange={(e) =>validateAddress(e.target.value)} 

                    />
                        {addressError && <p className="text-red-500 text-sm mt-1">{addressError}</p>}

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
                        onChange={(e) =>validateDescription(e.target.value)} 

                      ></textarea>
                          {descriptionError && <p className="text-red-500 text-sm mt-1">{descriptionError}</p>}

                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
                      type="submit"
                      disabled={!isFormValid()}
                    >
                      Save
                    </button>
                  </div>
                </form>
                        
           
              </div>
            </div>
          </div>
          {profileData?.role == "company"?(<> <div className="col-span-5 xl:col-span-2">
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
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Company phone number
                    </label>
                    <div className="relative">
                      <input
                        value={companyPhoneValue}
                        onChange={(e)=> checkCompanyPhone(e.target.value)}
                        type="text"
                        placeholder="Enter the company phone number"
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />

                    { companyPhoneError &&
                        <div className="flex">
                        <p className="text-red-500 text-sm mt-1">{ companyPhoneError }</p>
                        </div> 
                      }
                      <span className="absolute left-4.5 top-4">
                          <img src="/src/images/icon/tel.png" alt="tel" width="45%"/>
                      </span>  
                    </div>
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
                      type="submit"
                      disabled={!isForm2Valid()}
                    >
                      Save
                    </button>
                  </div>
               </div>
              </form>
                        

           
            </div>
          </div></>):(<><div></div></>)}
         
        </div>
      </div>
    </ConnectedClientLayout>
  );
};


export default ProfileSettings;
