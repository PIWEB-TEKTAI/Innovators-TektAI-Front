import React, { useEffect, useState } from 'react';
import LogoDark from '../../images/logo/logo-tekt-gray2.png';
import Logo from '../../images/logo/logo.svg';
import { useNavigate } from 'react-router-dom';
import {signIn, signInWithGoogle} from '../../services/auth.service'
import { CodeResponse, TokenResponse, useGoogleLogin } from '@react-oauth/google';
import ClientLayout from '../../layout/clientLayout'
import axios from 'axios';
import CustomAlert from '../UiElements/CostumAlert';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [password, setPassword] = useState('');

const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');
const [isFormValid, setIsFormValid] = useState(false);
const [alert, setAlert] = useState<{ type:  'success' | 'error' | 'warning'; message: string } | null>(null);
const [user, setUser] = useState<TokenResponse | null>(null);
const [alert2, setAlert2] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
const [profile, setProfile] = useState<UserProfile | null>(null);
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const [showWelcome, setshowWelcome] = useState(false);
const [WelcomeMessage, setWelcomeMessage] = useState('');

const handleThankuClick = () => {
  setshowWelcome(false);
};


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => {
        setUser(codeResponse);

      console.log('Google Login Successful:', codeResponse);
    },
    onError: (errorResponse: Pick<CodeResponse, "error" | "error_description" | "error_uri">) => {
      // Handle error, for example, display an error message
      console.error('Google Login Failed:', errorResponse);
    }
  });

  const handleGoogleLogin = () => {
    login();
  };
  
useEffect(
    () => {
      console.log("userrrrrrrr"+user)
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    }

                })
                .then((res) => {
                  signInWithGoogle(res).then(
                    () => {
                    setProfile(res.data);
                    if(res.status == 201 || res.status == 200){
                      console.log(res.data);
                      navigate("/profile");
                    }
                  }).catch((error) =>
                   {console.log(error.response.data.message)
                    setAlert2({
                      type: 'warning',
                      message: error.response.data.message
                    });
                    setTimeout(() => {
                      setAlert2(null);            
                    }, 15000);                   
                  });
                
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]

  );
  const navigate = useNavigate();
  const checkEmail = (value:any) =>{
    setEmail(value)
    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    {
    setEmailError("Please enter a valid email");
    }else {
      setEmailError("");
    }
   }
const checkPassword = (value:any) =>{
setPassword(value)
if (!value.trim()) {
  setPasswordError("Password is required");
} else {
  setPasswordError("");
}
}
  
const handleSignIn = async () => {
  try {
    setEmailError('');
    setPasswordError('');
  
    // Validation de l'email
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    // Validation du mot de passe
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    // Perform form validation
    setIsFormValid(!emailError && !passwordError);

    if (isFormValid) {
      const responseData = await signIn(email, password);
      console.log('Login successful:', responseData);
      if (responseData.message !== 'User not reactivated') {
        if (responseData.wasReactivated) {
          setWelcomeMessage('Welcome Back. We hope that you enjoyed your break');
          setshowWelcome(true); 
      
          setTimeout(() => {
            setshowWelcome(false);
          }, 10000);
        } else {
          setshowWelcome(false);
        }
      } else {
        setshowWelcome(false);
      }
      
      // Navigate to the profile page after 5 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    }
  } catch (error: any) {
    // Handle login errors
    setAlert({
      type: 'error',
      message:
        'Login failed:' +
        (error.response?.data?.message || 'An error occurred during login.'),
    });
    console.error('Login failed:', error);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }
};
    return (
    <ClientLayout>
                {alert2 && (
                <CustomAlert type={alert2.type} message={alert2.message} />
                )}
            
                {alert && (
                   <CustomAlert type={alert.type} message={alert.message}/>
                 )}
                 
{showWelcome && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
         <div className="bg-gray-200 p-8 rounded-lg text-center">
          <p className="mb-4">{WelcomeMessage}</p>
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            onClick={handleThankuClick}
          >
            Thank You
          </button>
    </div>
  </div>
)}
    
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-1 px-26 text-center">
            <Link className="mb-2 pt-2 inline-block" to="/">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} alt="Logo" />
            </Link>
            <p className="2xl:px-20">
              Empowering Collaboration, Solving Challenges
            </p>

            <span className="mt-15 inline-block">
              <img src="/src/images/auth/My password-amico.png" alt="signup" />
            </span>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full px-4 sm:p-12.5 xl:p-17.5 xl:pt-0 mt-2">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to TektAI
            </h2>

            <form onSubmit={(e) => e.preventDefault()}>
        

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    value={email} onChange={(e) =>checkEmail(e.target.value)} 
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

                  <span className="absolute right-4 top-4">
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
                    value={password} onChange={(e) => checkPassword(e.target.value)}
                    placeholder="Enter your password"
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
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.83 9.17999C14.2706 8.61995 13.5576 8.23846 12.7813 8.08386C12.0049 7.92926 11.2002 8.00851 10.4689 8.31152C9.73758 8.61453 9.11264 9.12769 8.67316 9.78607C8.23367 10.4444 7.99938 11.2184 8 12.01C7.99916 13.0663 8.41619 14.08 9.16004 14.83" stroke="#757575" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 16.01C13.0609 16.01 14.0783 15.5886 14.8284 14.8384C15.5786 14.0883 16 13.0709 16 12.01" stroke="#757575" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z" stroke="#757575" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.9994 3L17.6094 6.39" stroke="#757575" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.38 17.62L3 21" stroke="#757575" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23" stroke="#757575" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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
                         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z" stroke="#757575" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98" stroke="#757575" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01" stroke="#757575" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                          </svg>
                        )}
                      </button>
       
                  </span>
                  {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

                </div>
              </div>
              <div className="mt-5 mb-5.5 flex items-center justify-between">
                  <label htmlFor="formCheckbox" className="flex cursor-pointer">
                    <div className="relative pt-0.5">
                      <input
                        type="checkbox"
                        id="formCheckbox"
                        className="taskCheckbox sr-only"
                      />
                      <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                        <span className="text-white opacity-0">
                          <svg
                            className="fill-current"
                            width="10"
                            height="7"
                            viewBox="0 0 10 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                              fill=""
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <p>Remember me</p>
                  </label>

                  <Link to="/auth/forgotPassword" className="text-md text-primary hover:underline font-semibold ">
                    Forgot password?
                  </Link>
              </div>


              <div className="mb-5">
                  <input
                   onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSignIn();
                    }
                  }}
                  onClick={handleSignIn}
                  type="submit"
                    value="Sign In"
                    className="w-full text-center cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <button onClick={handleGoogleLogin} className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
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
                  Sign in with Google
                </button>
            

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  </ClientLayout>
  );
};

export default SignIn;
