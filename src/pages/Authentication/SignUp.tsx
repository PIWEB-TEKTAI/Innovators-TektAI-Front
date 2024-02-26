import React from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-tekt-gray2.png';
import Logo from '../../images/logo/logo.svg';
import ClientLayout from '../../layout/clientLayout';
import Stepper from './stepperForm';

const SignUp: React.FC = () => {
  return (
    <ClientLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="pt-[4rem] pb-[25rem] px-26 text-center">
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
              <Stepper/>

            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default SignUp;
