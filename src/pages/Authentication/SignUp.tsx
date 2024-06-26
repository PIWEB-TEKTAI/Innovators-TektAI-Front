import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-tekt-gray2.png';
import Logo from '../../images/logo/logo.svg';
import ClientLayout from '../../layout/clientLayout';
import StepperForm from './stepperForm';
import Footer from '../landing/footer';
import Copyrightfooter from '../landing/copyRightFooter';

const SignUp: React.FC = () => {

  const phrases = [
    "Empowering Collaboration, Solving Challenges",
    "Unlocking Potential, Achieving Success",
    "Fostering Innovation, Driving Results",
    "Building Bridges, Overcoming Obstacles"
  ];

  const coloredPhrases = phrases.map(phrase => {
    const parts = phrase.split(','); 
    const coloredPart = <span style={{ color: 'rgb(60 80 224 / var(--tw-text-opacity))'}}>{parts[0]}</span>; 
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
        prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <div>
        <ClientLayout>
      <div className="h-screen rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">

          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="pb-[60rem] px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>
              <p className="2xl:px-20 font-semibold">
                {coloredPhrases[currentPhraseIndex]}
              </p>

              <span className="mt-15 inline-block">
                <img src="/src/images/auth/Forms-amico.png" alt="signup" className='w-80'/>
              </span>
            </div>
          </div>



          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">           
              <StepperForm/>

            </div>
          </div>
        </div>

      </div>
    </ClientLayout>
    <Copyrightfooter/>
  </div>
   

  );
};

export default SignUp;
