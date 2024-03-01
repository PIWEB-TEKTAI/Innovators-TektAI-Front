import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-tekt-gray2.png';
import Logo from '../../images/logo/logo.svg';
import "../../css/style1.css";

import ClientLayout from '../../layout/clientLayout'
import { verifyEmail } from "../../services/userServices";
import { AxiosError } from 'axios';

const VerificationEmail: React.FC = () => {
  const { id, token } = useParams();


  const [errorEmailVerif , setErrorEmailVerif] = useState(false);


  useEffect(()=>{
      verifyEmail(id,token)
      .then((response) => {
          console.log("Verification email successfully :", response.msg);
      })
      .catch((error: AxiosError<any>) => {
        if (error.response && error.response.data && error.response.data.msg) {
            const errorMessage = error.response.data.msg;
            console.error("Erreur in the verification mail :", errorMessage);
            setErrorEmailVerif(true);
        } else {
            console.error("Erreur in the verification mail :", error.message);
            setErrorEmailVerif(true);
        }
    });
  })




  return (
    <ClientLayout>


      { errorEmailVerif ? (

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
                       <img src="/src/images/auth/verificationMail.png" alt="verificationMail" />
                   </span>
                 </div>
               </div>
     
               <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                 <div className="w-full p-4 sm:p-12.5 xl:p-17.5">             
                   <h2 className="mb-[30px] flex flex-col items-center justify-center card">
                       <img src="/src/images/auth/error_email.png" alt="check" className='w-25 sm:w-25 md:w-30 lg:w-30 xl:w-25' />
                       <span className='text-2xl block font-bold text-center text-primary dark:text-white sm:text-title-xl2'>Link expired!</span>
                       <span className="mt-2 block text-center font-medium">Click below and we'll send a link to verify you email address.  </span>
                       <div className=" mt-[20px]">
                         <Link to="/auth/ResendVerifEmail" className="text-primary">
                             <input
                                 type="submit"
                                 value="Resend"
                                 className=" w-25 cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                             />
                         </Link>
                       </div>
                   </h2>
                 </div>
               </div>
             </div>
           </div>
           ):(
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
                          <img src="/src/images/auth/verificationMail.png" alt="verificationMail" />
                      </span>
                    </div>
                  </div>
        
                  <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">             
                      <h2 className="mb-[30px] flex flex-col items-center justify-center card">
                          <img src="/src/images/auth/email.png" alt="check" className='w-20 sm:w-25 md:w-30 lg:w-35 xl:w-20' />
                          <span className='text-2xl block font-bold text-center text-primary dark:text-white sm:text-title-xl2 mt-5'>Email Verified</span>
                          <span className="mt-2 block text-center font-medium">Your email address was successfully verified. </span>
                          <div className=" mt-[20px]">
                            <Link to="/auth/signin" className="text-primary">
                                <input
                                    type="submit"
                                    value="Sign in"
                                    className=" w-25 cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                                />
                            </Link>
                          </div>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
           )
      }
    </ClientLayout>
  );
};

export default VerificationEmail;