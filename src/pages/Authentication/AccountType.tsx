import React from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-tekt-gray2.png';
import Logo from '../../images/logo/logo.svg';
import ClientLayout from '../../layout/clientLayout';

const AccountType: React.FC = () => {
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
              <p className="2xl:px-20">
                 Empowering Collaboration, Solving Challenges
              </p>

              <span className="mt-15 inline-block">
                <img src="/src/images/auth/Forms-amico.png" alt="signup" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
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
                            <input type="radio" id="hosting-small" name="hosting" value="hosting-small" className="hidden peer" required />
                            <label htmlFor="hosting-small" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:text-primary-600 peer-checked:text-primary peer-checked:bg-gray-2 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div className="flex items-center">
                                    <img src="/src/images/auth/user.png" alt="user" className='w-[31px]'/>
                                    <div className="w-full text-lg  font-semibold ml-5 ">Challenger</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="hosting-big" name="hosting" value="hosting-big" className="hidden peer"/>
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
                    type="submit"
                    value="Next Step"
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
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default AccountType;
