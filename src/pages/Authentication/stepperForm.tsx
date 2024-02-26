import { useEffect, useState } from "react";
import "../../css/stepper.css";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'; 
import { register } from "../../services/userServices";
import { useNavigate } from 'react-router-dom';

const Stepper = () => {
  const steps = ["Personnal Info", "Professionnal Info"];
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
  "Research & Development"]


  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [completeChallenger , setcompleteChallenger] = useState(false);


  const[ btnClicked , setBtnClicked ] = useState(false);

  const [LastNameValue, setLastNameValue] = useState('');
  const [LastnameError, setLastNameError] = useState('');

  const [FirstNameValue, setFirstNameValue] = useState('');
  const [FirstnameError, setFirstNameError] = useState('');

  const [EmailValue, setEmailValue] = useState('');
  const [EmailError, setEmailError] = useState('');


  const [PasswordValue, setPasswordValue] = useState('');
  const [PasswordError, setPasswordError] = useState('');
 
  const [ConfirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [ConfirmPasswordError, setConfirmPasswordError] = useState('');


  const [DateBirthValue, setDateBirthValue] = useState('');
  const [DateBirthError, setDateBirthError] = useState('');


  const [personnalAddressValue, setPersonnalAddressValue] = useState('');
  const [personnalAddressError, setPersonnalAddressError] = useState('');

  
  const [personnalPhoneValue, setPersonnalPhoneValue] = useState('');
  const [personnalPhoneError, setPersonnalPhoneError] = useState('');

  const [occupationValue, setOccupationValue] = useState('occupation');
  const [occupationError, setOccupationError] = useState('');

  const [radioValue , setRadioValue] = useState('');
  const [isChallenger , setIsChallengerValue] = useState(false);



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


  const navigate = useNavigate();



  const checkFirstName = (value:any) =>{
    setFirstNameValue(value)
    if (!value.trim()) {
      setFirstNameError("Please enter your first name");
    } else {
      setFirstNameError("");
    }
  }
  
  
  const checkLastName = (value:any) =>{
    setLastNameValue(value)
    if (!value.trim()) {
      setLastNameError("Please enter your last name");
    } else {
      setLastNameError("");
    }
   }
  
  
   const checkEmail = (value:any) =>{
    setEmailValue(value)
    if (!value.trim()) {
      setEmailError("Please enter your email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid email");
    }else{
      setEmailError("");
    }
   }
  
   const checkPassword = (value:any) =>{
    setPasswordValue(value)
    if (!value.trim()) {
      setPasswordError("Please enter your password");
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
      setPasswordError("The password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number and one special character");
    }else{
      setPasswordError("");
    }
   }
   
   const checkConfirmPassword = (value:any) =>{
    setConfirmPasswordValue(value)
    if (!value.trim()) {
      setConfirmPasswordError("Please enter your confirm password");
    } else if (value !== PasswordValue) {
      setConfirmPasswordError("The passwords do not match");
    }else{
      setConfirmPasswordError("");
    }
   }

   const checkValueRadio = (value:any) =>{
      setRadioValue(value);
   }

   const checkDateBirth = (value:any) =>{
    setDateBirthValue(value)
    if (!value.trim()) {
      setDateBirthError("Please enter your birth day");
    } else {
      setDateBirthError("");
    }
  }


  const checkPersonnalAddress = (value:any) =>{
    setPersonnalAddressValue(value)
    if (!value.trim()) {
      setPersonnalAddressError("Please enter your address");
    } else {
      setPersonnalAddressError("");
    }
  }

  const checkPersonnalPhone = (value:any) =>{
    setPersonnalPhoneValue(value)
    if (!value.trim()) {
      setPersonnalPhoneError("Please enter your phone number");

    }else if(! /^\d+$/.test(value)){
        setPersonnalPhoneError("Please enter a valid phone number")
    } else {
      setPersonnalPhoneError("");
    }
  }


  const checkOccupationValue = (value:any) =>{
    setOccupationValue(value)
    if (value == "occupation") {
      setOccupationError("Please enter your occupation");
    } else {
      setOccupationError("");
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



   const isFormValid = () => {
    return FirstNameValue !== '' && LastNameValue !== '' && EmailValue !== '' && PasswordValue !== '' && ConfirmPasswordValue !== '' && radioValue !== '';
   };


   const isForm1Valid = () => {
    return DateBirthValue !== '' && personnalAddressValue !== '' && personnalPhoneValue !== '' && occupationValue !== "occupation";
   };


   const isForm2Valid = () => {
    return  CompanyNameValue !== '' && companyAddessValue !== '' && companyEmailValue !== '' && companyPhoneValue !== '' && companyProfessionnalFieldsValue !== 'Choose company professional fields';
   };



   useEffect(() => {
    if(radioValue === 'challenger'){
        setIsChallengerValue(true)
    }else{
      setIsChallengerValue(false)
    }
  }, [radioValue]); 


  const formData = {
     FirstName:FirstNameValue,
     LastName:LastNameValue,
     email:EmailValue,
     password:PasswordValue,
     birthDate:DateBirthValue,
     address:personnalAddressValue,
     phone:personnalPhoneValue,
     occupation:occupationValue,
     role:radioValue,
     companyName:CompanyNameValue,
     companyAddress:companyAddessValue,
     companyPhone:companyPhoneValue,
     companyEmail:companyEmailValue,
     companyProfessionnalFields:companyProfessionnalFieldsValue
  }


  return (
    <>

    {btnClicked == true ? (


      <div className="flex justify-between mb-[4rem]">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            }  ${ i == 1 && isChallenger && "challenger"}  
               ${i == 0 && completeChallenger && "completeChallenger"}
            `}
          >
            <div className="step">
              {  i==0 && completeChallenger ? (<TiTick size={24} />):(i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1)}
            </div>
            <p className="text-gray-700">{step}</p>
          </div>
        ))}


      </div>
    ):(
        null
      )}

        <div>
          { btnClicked == false ? (
          <div>   
            <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to TektAI
              </h2>

            <form>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    First name
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => checkFirstName(e.target.value) }
                      value={FirstNameValue}
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    { FirstnameError &&
                      <div className="flex">
                       <p className="error-msg">{ FirstnameError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }

                    <span className="absolute right-7 top-4">
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
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Last name
                  </label>
                  <div className="relative">
                    <input
                       onChange={(e) => checkLastName(e.target.value) }
                       value={LastNameValue}
                  
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    { LastnameError &&
                      <div className="flex">
                       <p className="error-msg">{ LastnameError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }


                    <span className="absolute right-7 top-4">
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
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => checkEmail(e.target.value) }
                      value={EmailValue}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    { EmailError &&
                      <div className="flex">
                       <p className="error-msg">{ EmailError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }

                    <span className="absolute right-7 top-4">
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
                    Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => checkPassword(e.target.value) }
                      value={PasswordValue}
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    { PasswordError &&
                      <div className="flex">
                       <p className="error-msg">{ PasswordError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }


                    <span className="absolute right-7 top-4">
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
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => checkConfirmPassword(e.target.value) }
                      value={ConfirmPasswordValue}
                      type="password"
                      placeholder="Enter your confirm password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    { ConfirmPasswordError &&
                      <div className="flex">
                       <p className="error-msg">{ ConfirmPasswordError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }


                    <span className="absolute right-7 top-4">
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
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>


                <div className='mb-6'>
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                       Account Type
                    </label>
                    <ul className="grid w-full gap-6 md:grid-cols-2">
                        <li>
                            <input type="radio" id="hosting-small" name="hosting" value="challenger"  checked={radioValue === 'challenger'} onChange={(e)=>checkValueRadio(e.target.value)} className="hidden peer"/>
                            <label htmlFor="hosting-small" className="inline-flex items-center w-full rounded-lg border border-stroke bg-transparent p-3 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input text-gray-500 bg-white  border-gray-200  cursor-pointer dark:hover:text-gray-300  dark:peer-checked:text-blue-500 peer-checked:border-primary peer-checked:text-primary  peer-checked:bg-gray-2 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div className="block">
                                    <div className="w-full text-lg  font-semibold">Challenger</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="hosting-big" name="hosting" value="company"  checked={radioValue === 'company'}  onChange={(e)=>checkValueRadio(e.target.value)}  className="hidden peer"/>
                            <label htmlFor="hosting-big" className="inline-flex items-center w-full rounded-lg border border-stroke bg-transparent p-3  outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input text-gray-500 bg-white  border-gray-200  cursor-pointer dark:hover:text-gray-300  dark:peer-checked:text-blue-500 peer-checked:border-primary peer-checked:text-primary  peer-checked:bg-gray-2 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-lg  font-semibold">Company</div>
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>  

                <div className="mb-5">
                  <input
                    onClick={(e)=>{
                      e.preventDefault()
                      setBtnClicked(true)}
                    }
                    disabled={!isFormValid()}
                    type="submit"
                    value="Next"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_191_13499)">
                        <path
                          d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_191_13499">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign up with Google
                </button>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
            </form> 
            </div>):( 


            <form className="mb-[16rem]">
              { currentStep != steps.length ? (
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Date of Birth
                  </label>
                  <div className="relative">
                   <input
                     type="date"
                     style={{ color: '#00000079'}}
                     onBlur={(e) => checkDateBirth(e.target.value)}
                     className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary no-calendar-icon"
                   />
                    <span className="absolute right-0 top-4">
                         <img src="/src/images/icon/calendrier.png" alt="cal" width="45%"/>
                    </span>  
                  </div>
                  { DateBirthError &&
                      <div className="flex">
                       <p className="error-msg">{ DateBirthError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                  }

                </div>
              ) : (
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Company name
                  </label>
                  <div className="relative">
                    <input
                      value={CompanyNameValue}
                      onChange={(e)=> checkCompanyName(e.target.value)}
                      type="text"
                      placeholder="Enter the company name "
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    { CompanyNameError &&
                      <div className="flex">
                       <p className="error-msg">{ CompanyNameError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }

                    <span className="absolute right-7 top-4">
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
              )}
              
              { currentStep != steps.length ? (
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Address
                  </label>
                  <div className="relative">
                   <input
                     type="text"
                     value={personnalAddressValue}
                     onChange={(e)=> checkPersonnalAddress(e.target.value)}
                     placeholder="Enter your address"
                     className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                   />

                    { personnalAddressError &&
                      <div className="flex">
                       <p className="error-msg">{ personnalAddressError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }
                    <span className="absolute right-0 top-4">
                         <img src="/src/images/icon/adresse.png" alt="adresse" width="45%"/>
                    </span>  
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Company address
                  </label>
                  <div className="relative">
                    <input
                     
                     value={companyAddessValue}
                     onChange={(e)=> checkCompanyAddress(e.target.value)}
                      type="text"
                      placeholder="Enter the company address "
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    { companyAddessError &&
                      <div className="flex">
                       <p className="error-msg">{ companyAddessError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }
                      <span className="absolute right-0  top-4">
                         <img src="/src/images/icon/adresse.png" alt="adresse" width="45%"/>
                      </span>  
                  </div>
                </div>
              )}
                
                
              { currentStep != steps.length ? (
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Phone number
                  </label>
                  <div className="relative">
                   <input
                     type="text"
                     value={personnalPhoneValue}
                     onChange={(e)=>checkPersonnalPhone(e.target.value)}
                     placeholder="Enter your phone number"
                     className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                   />

                    { personnalPhoneError &&
                      <div className="flex">
                       <p className="error-msg">{ personnalPhoneError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }
                   <span className="absolute right-0 top-4">
                         <img src="/src/images/icon/tel.png" alt="tel" width="45%"/>
                    </span>  
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Company phone number
                  </label>
                  <div className="relative">
                    <input
                       value={companyPhoneValue}
                       onChange={(e)=> checkCompanyPhone(e.target.value)}
                      type="text"
                      placeholder="Enter the company phone number"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                   { companyPhoneError &&
                      <div className="flex">
                       <p className="error-msg">{ companyPhoneError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }
                    <span className="absolute right-0 top-4">
                         <img src="/src/images/icon/tel.png" alt="tel" width="45%"/>
                    </span>  
                  </div>
                </div>
              )}
                
                
               { currentStep != steps.length ? (
                
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Occupation
                  </label>
                  <select id="occupations" value={occupationValue} onChange={(e)=>checkOccupationValue(e.target.value)} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                      <option value="occupation">Choose your occupation</option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="company">Company</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="searcher">Searcher</option>
                   </select>

                   { occupationError &&
                      <div className="flex">
                       <p className="error-msg">{ occupationError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }

                </div>


                
                ):(
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Company email
                    </label>
                    <div className="relative">
                      <input
                         value={companyEmailValue}
                         onChange={(e)=> checkCompanyEmail(e.target.value)}
                        type="text"
                        placeholder="Enter the company address email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      { companyEmailError &&
                      <div className="flex">
                       <p className="error-msg">{ companyEmailError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                      }
                       <span className="absolute right-7 top-4">
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
                )}
                
                { currentStep == steps.length ? (
                
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Professional fields
                  </label>
                  <select id="professionnalFields"  value={companyProfessionnalFieldsValue}   onChange={(e)=> checkProfesionnalFieldsValue(e.target.value)} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                      <option value="Choose company professional fields">Choose company professional fields</option>
                      {
                        professionalFields.map((item,index)=>(
                          <option key={index} value={item}>{item}</option>
                        ))
                      }
                   </select>

                   { companyProfessionnalFieldsError &&
                      <div className="flex">
                       <p className="error-msg">{ companyProfessionnalFieldsError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                      }
                </div>
                
                ):(
                    null
                )}

                <div className="mb-5">
                { currentStep == steps.length ? (
                  <button
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                      onClick={(e) => {
                        e.preventDefault()
                        currentStep === steps.length
                          ? setComplete(true) 
                          : null
                        register(formData) 
                        setTimeout(()=>{
                          navigate('/auth/signin')
                        },2000)
                      }}
                      disabled={!isForm2Valid()}
                    >
                      Finish
                  </button>
                  
                  ):
                  ( 
                  <button
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                      onClick={(e) => {
                        e.preventDefault()
                         !isChallenger ? setCurrentStep((prev) => prev + 1):null
                          isChallenger ? (
                          setcompleteChallenger(true),
                          register(formData) , 
                          setTimeout(()=>{
                            navigate('/auth/signin')
                          },2000)
                          ):(null)  ;
                      }}
                      disabled={!isForm1Valid()}
                    >
                      Next
                  </button>
                  
                )}




                  
                  {/*!complete ? (
                  <button
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                      onClick={(e) => {
                        e.preventDefault()
                        currentStep === steps.length
                          ? setComplete(true) 
                          : setCurrentStep((prev) => prev + 1);
                      }}
                    >
                      {currentStep === steps.length ? "Finish" : "Next"}
                  </button>
                  
                  ):
                    (<button  onClick={()=> handleClick} className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">Finish</button>)*/}
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>  )}
        </div>
    </>
  );


  
};





export default Stepper;