import React, { useState } from 'react';
import LogoDark from '../../images/logo/logo-tekt-gray2.png';
import Logo from '../../images/logo/logo.svg';
import axios from 'axios';
import ClientLayout from '../../layout/clientLayout';
import { Link } from "react-router-dom";


function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/forgotPassword', { email })
      .then(res => {
        if (res.data.Status === "Success") {
          setSuccessMessage('Password reset link sent successfully.If you did not receive it, please check your spam folder. If it is not there, you can resend the email.');
          setErrorMessage('');
        } else {
          setErrorMessage('User not found .');
          setSuccessMessage('');
        }
      })
      .catch(err => {
        setErrorMessage('An error occurred. Please try again later.');
        setSuccessMessage('');
      });
  };
  const checkEmail = (value:any) =>{
    setEmail(value)
    if (!value.trim()) {
      setErrorMessage("Please enter your email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrorMessage("Please enter a valid email");
    }else{
      setErrorMessage("");
    }
   }


  return (
    <ClientLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>
              <p className="2xl:px-20">Empowering Collaboration, Solving Challenges</p>
              <span className="mt-15 inline-block">
                <img src="/src/images/auth/Forgot password-amico.png" alt="forgotPassword" />
              </span>
            </div>
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-10">
                <span className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">Forgot Password</span>
                <span className="mt-2 block font-medium">Enter your email and we'll send you a link to reset your password</span>
              </h2>
              {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
              {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      autoComplete="off"
                      name="email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) => checkEmail(e.target.value) }
                    />
                  
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
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Send"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
              </form>
            </div>
            <div className="mt-6 text-center">
              <p>
                Don’t have an account?{' '}
                <Link to="/auth/signin" className="text-primary">
                  Sign Up
                </Link>
              </p>
          
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}

export default ForgotPassword;
