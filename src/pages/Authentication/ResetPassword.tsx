import React, { useEffect, useRef, useState } from 'react';
import LogoDark from '../../images/logo/logo-tekt-gray2.png';
import Logo from '../../images/logo/logo.svg';
import ClientLayout from '../../layout/clientLayout';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Copyrightfooter from '../landing/copyRightFooter';

function ResetPassword() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>(''); // New state for success message
  const { id, token } = useParams();

  const [captchaToken, setCaptchaToken] = useState('');

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Fonction pour décocher le reCAPTCHA
  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const handleCaptchaChange = (token: any) => {
    console.log('Captcha token:', token);
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (captchaToken == '') {
      setErrorMessage('Please make sure to check the captcha checkbox');
    } else {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }
      try {
        const captchaResponse = await axios.post(
          'http://localhost:3000/verify-captcha',
          { token: captchaToken },
        );
        console.log('CAPTCHA Verification Response:', captchaResponse.data);
      } catch (error) {
        throw new Error('CAPTCHA verification failed');
      }
      axios
        .post(`http://localhost:3000/user/resetPassword/${id}/${token}`, {
          password,
        })
        .then((res) => {
          if (res.data.Status === 'Success') {
            setSuccessMessage('Password reset successfully! '); // Set success message if reset is successful
          }
        })
        .catch((err) => {
          resetRecaptcha();
          console.log(err.response.data); // Log the error response data to the console
          if (
            err.response &&
            err.response.data &&
            err.response.data.Status ===
              'Cannot reuse previous password, Please try another one'
          ) {
            setErrorMessage(
              'Cannot reuse previous password, Please try another one',
            );
          } else {
            console.log(err);
            setErrorMessage('Link expired, please try again.');
          }
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const checkPassword = (value: any) => {
    setPassword(value);
    if (!value.trim()) {
      setErrorMessage('Please enter your password');
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value,
      )
    ) {
      setErrorMessage(
        'The password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number and one special character',
      );
    } else {
      setErrorMessage('');
    }
  };

  const checkConfirmPassword = (value: any) => {
    setConfirmPassword(value);
    if (!value.trim()) {
      setErrorMessage('Please enter your confirm password');
    } else if (value !== password) {
      setErrorMessage('The passwords do not match');
    } else {
      setErrorMessage('');
    }
  };

  const isFormValid = () => {
    return password !== '' && confirmPassword !== '';
  };

  const phrases = [
    'Empowering Collaboration, Solving Challenges',
    'Unlocking Potential, Achieving Success',
    'Fostering Innovation, Driving Results',
    'Building Bridges, Overcoming Obstacles',
  ];

  const coloredPhrases = phrases.map((phrase) => {
    const parts = phrase.split(',');
    const coloredPart = (
      <span style={{ color: 'rgb(60 80 224 / var(--tw-text-opacity))' }}>
        {parts[0]}
      </span>
    );
    return (
      <div>
        {coloredPart}, {parts[1]}
      </div>
    );
  });

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex: number) =>
        prevIndex === phrases.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ClientLayout>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="py-17.5 px-26 text-center">
                <Link className="mb-5.5 inline-block" to="/">
                  <img className="hidden dark:block" src={Logo} alt="Logo" />
                  <img className="dark:hidden" src={LogoDark} alt="Logo" />
                </Link>
                <p className="2xl:px-20 font-semibold">
                  {' '}
                  {coloredPhrases[currentPhraseIndex]}
                </p>
                <span className="mt-15 inline-block">
                  <img
                    src="/src/images/auth/Reset password-amico.png"
                    alt="forgotPasword"
                    className="w-80"
                  />
                </span>
              </div>
            </div>
            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-5 ">
                  <span className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    Reset Password
                  </span>
                </h2>
                {successMessage ? (
                  <div className="mt-5">
                    <p className="text-green-500  font-semibold">
                      {successMessage}
                    </p>
                    <img
                      src="/src/images/auth/resetsuccess.jpg"
                      alt="check"
                      className="w-40 sm:w-50 md:w-60 lg:w-70 xl:w-80"
                    />

                    <div className="mb-5">
                      <Link to="/auth/signin">
                        <input
                          type="button"
                          value="Sign In"
                          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter Password"
                          autoComplete="off"
                          name="password"
                          value={password}
                          onChange={(e) => checkPassword(e.target.value)}
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <span className="absolute right-4 top-4">
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
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
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {' '}
                                    <path
                                      d="M14.83 9.17999C14.2706 8.61995 13.5576 8.23846 12.7813 8.08386C12.0049 7.92926 11.2002 8.00851 10.4689 8.31152C9.73758 8.61453 9.11264 9.12769 8.67316 9.78607C8.23367 10.4444 7.99938 11.2184 8 12.01C7.99916 13.0663 8.41619 14.08 9.16004 14.83"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M12 16.01C13.0609 16.01 14.0783 15.5886 14.8284 14.8384C15.5786 14.0883 16 13.0709 16 12.01"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M20.9994 3L17.6094 6.39"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M6.38 17.62L3 21"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
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
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {' '}
                                    <path
                                      d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                  </g>
                                </svg>{' '}
                              </svg>
                            )}
                          </button>
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Enter Confirm Password"
                          autoComplete="off"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => checkConfirmPassword(e.target.value)}
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <span className="absolute right-4 top-4">
                          <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {showConfirmPassword ? (
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
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {' '}
                                    <path
                                      d="M14.83 9.17999C14.2706 8.61995 13.5576 8.23846 12.7813 8.08386C12.0049 7.92926 11.2002 8.00851 10.4689 8.31152C9.73758 8.61453 9.11264 9.12769 8.67316 9.78607C8.23367 10.4444 7.99938 11.2184 8 12.01C7.99916 13.0663 8.41619 14.08 9.16004 14.83"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M12 16.01C13.0609 16.01 14.0783 15.5886 14.8284 14.8384C15.5786 14.0883 16 13.0709 16 12.01"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M20.9994 3L17.6094 6.39"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M6.38 17.62L3 21"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
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
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {' '}
                                    <path
                                      d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                    <path
                                      d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01"
                                      stroke="#757575"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{' '}
                                  </g>
                                </svg>
                              </svg>
                            )}
                          </button>
                        </span>
                      </div>
                    </div>

                    {errorMessage && (
                      <p className="text-red-500 mb-4 font-semibold">{errorMessage}</p>
                    )}

                    <div className="mb-5">
                      <input
                        type="submit"
                        value="Reset Password"
                        disabled={!isFormValid()}
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:border-transparent disabled:bg-opacity-60"
                      />
                    </div>
                    <div className="flex justify-center mt-5 mb-5">
                      <ReCAPTCHA
                        sitekey="6LenUIgpAAAAAFvWhgy4KRWwmLoQmThvaM5nrupd"
                        onChange={handleCaptchaChange}
                        ref={recaptchaRef}
                      />
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </ClientLayout>
      <Copyrightfooter />
    </div>
  );
}

export default ResetPassword;
