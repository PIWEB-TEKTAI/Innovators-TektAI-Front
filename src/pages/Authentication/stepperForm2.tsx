import { useEffect, useState } from "react";
import "../../css/stepper.css";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'; 
import { register } from "../../services/userServices";
import { useNavigate } from 'react-router-dom';
import { successfullToast } from "../../components/Toast";
import { ErrorToast } from "../../components/Toast";
import { AxiosError } from "axios";
import { countries } from "./CountryList";

const StepperForm = () => {
  const steps = ["Basic Info","Personnal Info", "Professionnal Info"];
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


  const [personnalAddressValue, setPersonnalAddressValue] = useState('Choose your country');
  const [personnalAddressError, setPersonnalAddressError] = useState('');

  
  const [personnalPhoneValue, setPersonnalPhoneValue] = useState('');
  const [personnalPhoneError, setPersonnalPhoneError] = useState('');

  const [occupationValue, setOccupationValue] = useState('occupation');
  const [occupationError, setOccupationError] = useState('');

  const [radioValue , setRadioValue] = useState('');
  const [isChallenger , setIsChallengerValue] = useState(false);



  const [CompanyNameValue, setCompanyNameValue] = useState('');
  const [CompanyNameError, setCompanyNameError] = useState('');
 
  const [companyAddessValue, setCompanyAddressValue] = useState('Choose your country');
  const [companyAddessError, setCompanyAddressError] = useState('');


  const [companyEmailValue, setCompanyEmailValue] = useState('');
  const [companyEmailError, setCompanyEmailError] = useState('');


  const [companyPhoneValue, setCompanyPhoneValue] = useState('');
  const [companyPhoneError, setCompanyPhoneError] = useState('');

  
  const [companyProfessionnalFieldsValue, setCompanyProfessionnalFieldsValue] = useState('Choose company professional fields');
  const [companyProfessionnalFieldsError, setCompanyProfessionnalFieldsError] = useState('');
   
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

     
  const [isOpen, setIsOpen] = useState(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


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
    console.log(value)
    if (!value.trim()) {
      setDateBirthError("Please enter your birth day");
    } else {
      setDateBirthError("");
    }
  }


  const checkPersonnalAddress = (value:any) =>{
    setPersonnalAddressValue(value)
    if (value == "Choose your country") {
      setPersonnalAddressError("Please enter your address");
    } else {
      setPersonnalAddressError("");
    }
  }

  const checkPersonnalPhone = (value:any) =>{
    setPersonnalPhoneValue(value)
    if (!value.trim()) {
      setPersonnalPhoneError("Please enter your phone number");

    }else if(!/^\d{8}$/.test(value)){
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
    if (value == "Choose your country") {
      setCompanyAddressError("Please enter the company address");
    } else {
      setCompanyAddressError("");
    }
  }

  const checkCompanyPhone = (value:any) =>{
    setCompanyPhoneValue(value)
    if (!value.trim()) {
      setCompanyPhoneError("Please enter the company phone number");

    }else if(!/^\d{8}$/.test(value)){
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
    return FirstNameValue !== '' && LastNameValue !== '' && EmailValue !== '' && PasswordValue !== '' && ConfirmPasswordValue !== '';
   };


   const isForm1Valid = () => {
    return DateBirthValue !== '' && personnalAddressValue !== 'Choose your country' && personnalPhoneValue !== '' && occupationValue !== "occupation";
   };


   const isForm2Valid = () => {
    return  CompanyNameValue !== '' && companyAddessValue !== 'Choose your country' && companyEmailValue !== '' && companyPhoneValue !== '' && companyProfessionnalFieldsValue !== 'Choose company professional fields';
   };

   const isForm3Valid = () => {
    return radioValue !== '' ;
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


  function handleSubmit(e:any){
    e.preventDefault();
    register(formData)
        .then((response) => {
            console.log("Inscription réussie :", response.msg);
            setAlert({
              type: 'success',
              message:
              ''+  response.msg,
            });
            setTimeout(() => {
                navigate('/auth/signin');
            }, 3000);
        })
        .catch((error: AxiosError<any>) => {
          if (error.response && error.response.data && error.response.data.msg) {
              const errorMessage = error.response.data.msg;
              console.error("Erreur lors de l'inscription :", errorMessage);
              setAlert({
                  type: 'error',
                  message: errorMessage,
              });
          } else {
              console.error("Erreur lors de l'inscription :", error.message);
              setAlert({
                  type: 'error',
                  message: error.message,
              });
          }
          setTimeout(() => {
            navigate('/auth/signup');
        }, 3000);
      });

}


const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

const toggleConfirmPasswordVisibility = () => {
  setShowConfirmPassword(!showConfirmPassword);
};


  return (
    <>

    <div className="mb-4">
      {alert?.type == 'success' && (
              successfullToast(alert.message)
        )}

        {alert?.type == 'error' && (
                ErrorToast(alert.message)
        )} 
    </div>
 

    {btnClicked == true ? (
              


      <div className="flex justify-between mb-[4rem]">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            }  ${ i == 2 && isChallenger && "challenger"}  
               ${i == 1 && completeChallenger && "completeChallenger"}
               
               
            `}
          >
            <div className="step">
            {  i == 1 && completeChallenger ? (<TiTick size={24} />):(i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1)}
            </div>
            <p className="text-gray-700">{step}</p>
          </div>
        ))}
          

      </div>
        
    ):(
        null
      )}



        <div className="mb-[8rem]">
          { btnClicked == false ? (
              <div className="mb-[25rem]">
                <h2 className="mb-3 text-title-sm font-semibold text-black dark:text-white sm:text-title-md">
                  Choose your account type
                </h2>
                 
               <div className='mb-10'>
                  <p>Empowering collaboration to tackle real-world challenges </p>
                  <p>Companies submit challenges, Data Scientists offer solutions</p>
               </div>  
            
  
                <form>
                  <div className='mb-6'>
                      <ul className="flex flex-col w-full gap-6 md:grid-cols-2">
                          <li>
                              <input type="radio" id="hosting-small" name="hosting" value="challenger"  checked={radioValue === 'challenger'} onChange={(e)=>checkValueRadio(e.target.value)} className="hidden peer"/>
                              <label htmlFor="hosting-small" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:text-primary-600 peer-checked:text-primary peer-checked:bg-gray-2 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                  <div className="flex items-center">
                                      <img src="/src/images/auth/user.png" alt="user" className='w-[31px]'/>
                                      <div className="w-full text-lg  font-semibold ml-5 ">Challenger</div>
                                  </div>
                              </label>
                          </li>
                          <li>
                              <input type="radio" id="hosting-big" name="hosting" value="company"  checked={radioValue === 'company'}  onChange={(e)=>checkValueRadio(e.target.value)}  className="hidden peer"/>
                              <label htmlFor="hosting-big" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:text-primary-600 peer-checked:text-primary peer-checked:bg-gray-2 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                  <div className="flex items-center">
                                      <img src="/src/images/auth/company.png" alt="company" className='w-[35px]'/>
                                      <div className="w-full text-lg font-semibold ml-5">Company</div>
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
                      type="submit"
                      disabled={!isForm3Valid()}
                      value="NEXT"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
  
                  <div className="mt-6 text-center">
                    <p>
                      Already have an account?{' '}
                      <Link to="/auth/signin" className="text-primary">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>  
          ):( 
            <form >


              { currentStep == 1 && (
               <div>
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
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your Password"
                      autoComplete="off"
                      name="password"
                      onChange={(e) => checkPassword(e.target.value) }
                      value={PasswordValue}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-7 top-4">
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
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.83 9.17999C14.2706 8.61995 13.5576 8.23846 12.7813 8.08386C12.0049 7.92926 11.2002 8.00851 10.4689 8.31152C9.73758 8.61453 9.11264 9.12769 8.67316 9.78607C8.23367 10.4444 7.99938 11.2184 8 12.01C7.99916 13.0663 8.41619 14.08 9.16004 14.83" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 16.01C13.0609 16.01 14.0783 15.5886 14.8284 14.8384C15.5786 14.0883 16 13.0709 16 12.01" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M20.9994 3L17.6094 6.39" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.38 17.62L3 21" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
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
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>                          </svg>
                        )}
                      </button>
                    </span>
                    { PasswordError &&
                      <div className="flex">
                       <p className="error-msg">{ PasswordError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Confirm password
                  </label>
                  <div className="relative">
                  <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter your confirm password"
                      autoComplete="off"
                      name="confirmPassword"
                      value={ConfirmPasswordValue}
                      onChange={(e) => checkConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-7 top-4">
                      <button type="button" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? (
                          <svg
                            className="fill-current"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.83 9.17999C14.2706 8.61995 13.5576 8.23846 12.7813 8.08386C12.0049 7.92926 11.2002 8.00851 10.4689 8.31152C9.73758 8.61453 9.11264 9.12769 8.67316 9.78607C8.23367 10.4444 7.99938 11.2184 8 12.01C7.99916 13.0663 8.41619 14.08 9.16004 14.83" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 16.01C13.0609 16.01 14.0783 15.5886 14.8284 14.8384C15.5786 14.0883 16 13.0709 16 12.01" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M20.9994 3L17.6094 6.39" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.38 17.62L3 21" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
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
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>                          
                          </svg>
                        )}

                      </button>
                    </span>
                    { ConfirmPasswordError &&
                      <div className="flex">
                       <p className="error-msg">{ ConfirmPasswordError }</p>
                       <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                      </div> 
                    }
                  </div>
                </div>
                <div className="mb-5">
                  <input
                    onClick={(e)=>{
                      e.preventDefault()
                      currentStep === steps.length
                      ? setComplete(true) 
                      : setCurrentStep((prev) => prev + 1)
                    }
                    }
                    disabled={!isFormValid()}
                    type="submit"
                    value="NEXT"
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
             </div>

            )} 
               
            { currentStep == 2 && (
                <div className="mb-[23rem]">
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Date of Birth
                        </label>
                        <div className="relative">
                        <input
                            type="date"
                            value={DateBirthValue}
                            style={{ color: '#00000079'}}
                            onChange={(e) => checkDateBirth(e.target.value)}
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
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Address
                        </label>
                        <div className="relative">
                        <select id="country"  value={personnalAddressValue}   onChange={(e)=> checkPersonnalAddress(e.target.value)} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                            <option value="Choose your country">Choose your country</option>
                            {
                                countries.map((item,index)=>(
                                  <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>

                        { personnalAddressError &&
                                <div className="flex">
                                    <p className="error-msg">{ personnalAddressError }</p>
                                    <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                                </div> 
                                    }
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Phone number
                            </label>

                          <div className="relative">
                          
                          <div className="flex items-center">
                                <button
                                  id="dropdown-phone-button"
                                  className="flex-shrink-0 z-10 inline-flex items-center py-4 px-3 rounded-lg border border-stroke bg-transparent text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                  onClick={toggleDropdown}
                                  type="button"
                                >
                                  <img src="/src/images/auth/tunisia.png" alt="flag"/>
                                  +216 <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
                                </button>

                                {isOpen && (
                                  <div
                                    id="dropdown-phone"
                                    className="absolute top-15 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700"
                                  >
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button">
                                      <li>
                                        <button
                                          type="button"
                                          className="inline-flex w-full  px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                          role="menuitem"
                                        >
                                          <div className="inline-flex items-center">
                                            <img src="/src/images/auth/tunisia.png" alt="flag"/>
                                            Tunisia (+216)
                                          </div>
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              <div className="relative w-full">
                                  <input type="text" id="phone-input"
                                    value={personnalPhoneValue}
                                    onChange={(e)=>checkPersonnalPhone(e.target.value)} 
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                              </div>
                            </div>

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
                        <div className="flex justify-between">
                          <button
                              className="w-30 cursor-pointer rounded-lg border border-[#808080] bg-[#808080] p-4 text-white transition hover:bg-opacity-90"
                              onClick={(e) => {
                                  e.preventDefault()
                                  setCurrentStep((prev) => prev - 1 ),
                                  setComplete(false)
                                  setcompleteChallenger(false)
                              }}
                          > BACK
                          </button>
                          <button
                              className="w-30 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                              onClick={(e) => {
                                  e.preventDefault()
                                  !isChallenger ? setCurrentStep((prev) => prev + 1):null
                                  isChallenger ? (
                                  setcompleteChallenger(true),
                                  handleSubmit(e)
                                  ):(null)  ;
                              }}
                              disabled={!isForm1Valid()}
                          > NEXT
                          </button>
                         
                        

                        </div>
                          
                      
                    </div> )}

              
              { currentStep == 3  && (

               <div className="mb-[18rem]">
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
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Company address
                        </label>
                        <div className="relative">
                          <select id="country"  value={companyAddessValue}   onChange={(e)=> checkCompanyAddress(e.target.value)} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                            <option value="Choose your country">Choose your country</option>
                            {
                                countries.map((item,index)=>(
                                <option key={index} value={item}>{item}</option>
                                ))
                            }
                           </select>

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
                    <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Company phone number
                        </label>
                        <div className="relative">
                          <div className="flex items-center">
                            <button
                                  id="dropdown-phone-button"
                                  className="flex-shrink-0 z-10 inline-flex items-center py-4 px-3 rounded-lg border border-stroke bg-transparent text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                  onClick={toggleDropdown}
                                  type="button"
                                >
                                  <img src="/src/images/auth/tunisia.png" alt="flag"/>
                                  +216 <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
                                </button>

                                {isOpen && (
                                  <div
                                    id="dropdown-phone"
                                    className="absolute top-15 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700"
                                  >
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button">
                                      <li>
                                        <button
                                          type="button"
                                          className="inline-flex w-full  px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                          role="menuitem"
                                        >
                                          <div className="inline-flex items-center">
                                            <img src="/src/images/auth/tunisia.png" alt="flag"/>
                                            Tunisia (+216)
                                          </div>
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              <div className="relative w-full">
                                  <input type="text" id="phone-input"
                                    value={companyPhoneValue}
                                    onChange={(e)=>checkCompanyPhone(e.target.value)} 
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                              </div>
                          </div>

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
                   </div>
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
                    <div className="flex justify-between">
                      <button
                          className="w-30 cursor-pointer rounded-lg border border-[#808080] bg-[#808080] p-4 text-white transition hover:bg-opacity-90"
                          onClick={(e) => {
                              e.preventDefault()
                              setCurrentStep((prev) => prev - 1 ),
                              setComplete(false)
                          }}
                          >
                          BACK
                      </button>
                      <button
                          className="w-30 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                          onClick={(e) => {
                              e.preventDefault()
                              currentStep === steps.length
                              ? setComplete(true) 
                              : null
                              handleSubmit(e)
                          }}
                          disabled={!isForm2Valid()}
                          >
                          FINISH
                       </button>
                      
                    </div>
                   
                    
                    
             </div>
              )}
                
              </form> 
              )}
        </div>
    </>
  );


  
};





export default  StepperForm ;