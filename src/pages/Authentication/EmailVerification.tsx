import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-tekt-gray2.png';
import Logo from '../../images/logo/logo.svg';
import "../../css/style1.css";

import ClientLayout from '../../layout/clientLayout'
import { VerifcationEmail  , resendVerifcationEmail } from "../../services/userServices";
import { ErrorToast, successfullToast } from '../../components/Toast';
import { AxiosError } from 'axios';
import VerificationInput from "react-verification-input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from 'react-google-recaptcha';


const EmailVerification: React.FC = () => {

  const [CodeValue, setCodeValue] = useState('');
  const [CodeError, setCodeError] = useState('');

  const { id } = useParams();

  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);


  const navigate = useNavigate();


  const checkCode = (value:any) =>{
    setCodeValue(value)
    if (!value.trim()) {
      setCodeError("Please enter your verification code");
    } else if (!/^\d+$/.test(value)) {
      setCodeError("The code must contain only numerical digits");
    }else if(value.length !== 4){
      setCodeError("The code must contain exactly 4 numbers");
    }else{
      setCodeError("");
    }
   }
   

   const isFormValid = () => {
    return CodeValue !== '' && CodeError == '' ;
   };

   const [captchaToken, setCaptchaToken] = useState('');

   const handleCaptchaChange = (token: any) => {
     console.log('Captcha token:', token);
     setCaptchaToken(token);
   };
 
   const recaptchaRef = useRef<ReCAPTCHA>(null);
 
   // Fonction pour décocher le reCAPTCHA
  /* const resetRecaptcha = () => {
     if (recaptchaRef.current) {
       recaptchaRef.current.reset();
     }
   };*/
 


   function verifyEmail(e:any){
    e.preventDefault();
  
    VerifcationEmail(CodeValue,id,captchaToken)
        .then((response) => {
            console.log("Verification email successfully :", response.msg);
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
         // resetRecaptcha();
          if (error.response && error.response.data && error.response.data.msg) {
              const errorMessage = error.response.data.msg;
              console.error("Verification Error :", errorMessage);
              setAlert({
                  type: 'error',
                  message: errorMessage,
              });
          } else {
              console.error("Verification Error :", error.message);
              setAlert({
                  type: 'error',
                  message: error.message,
              });
          }
          
      });
    }


    function resendCode(e:any){
      e.preventDefault();
      resendVerifcationEmail(id)
          .then((response) => {
              console.log("Verification code sent successfully :", response.msg);
              setAlert({
                type: 'success',
                message:
                ''+  response.msg,
              });
          })
          .catch((error: AxiosError<any>) => {
            if (error.response && error.response.data && error.response.data.msg) {
                const errorMessage = error.response.data.msg;
                console.error("Verification resend Error :", errorMessage);
                setAlert({
                    type: 'error',
                    message: errorMessage,
                });
            } else {
                console.error("Verification resend Error :", error.message);
                setAlert({
                    type: 'error',
                    message: error.message,
                });
            }
        });
      }



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
    <ClientLayout>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>

              <p className="2xl:px-20 font-semibold"> {coloredPhrases[currentPhraseIndex]}</p>


              <span className="inline-block">
                  <img src="/src/images/auth/verificationMail.png" alt="verificationMail" className='w-100' />
              </span>
            </div>
          </div>

  

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
 
                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">   
                    <div className='mb-3'>
                      {alert?.type == 'success' && (
                          successfullToast(alert.message)
                      )}

                      {alert?.type == 'error' && (
                          ErrorToast(alert.message)
                      )}  
                    </div>
                           
                      <h2 className="mb-[6rem] flex flex-col items-center justify-center card">
                          <img src="/src/images/auth/email.png" alt="check" className='w-20 sm:w-25 md:w-30 lg:w-35 xl:w-20' />
                          
                          <span className='text-2xl block font-bold text-center text-primary dark:text-white sm:text-title-xl2 mt-5'>Email Verification</span>
                          <span className="mt-2 block text-center font-medium">Enter your verification code to verify your email address</span>

                          <div className="mt-5 flex justify-center">
                              <VerificationInput onChange={(value)=>checkCode(value)} value={CodeValue} length={4} placeholder='⚬' classNames={{
                                character: "w-50 h-15 rounded-lg border border-stroke text-primary",           
                              }} />
                              
                          </div>

                          { CodeError &&
                                <div className="flex mt-4">
                                 <p className="error-msg">{ CodeError }</p>
                                 <FontAwesomeIcon  icon={faCircleExclamation} style={{color: "#f20202"}} className="mt-1 ml-1" />
                                </div> 
                              }

                          <div className="mt-[2rem]">
                                <input
                                    type="submit"
                                    value="Verify code"
                                    disabled={!isFormValid()}
                                    onClick={(e)=>{
                                      e.preventDefault(),
                                      verifyEmail(e)
                                    }}
                                    className=" w-40 cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90 disabled:border-transparent disabled:bg-opacity-60"
                                />
                            
                        </div>
                            <p className='mt-4 font-semibold'>
                              Don’t get a code?{' '}
                                <input
                                      type="submit"
                                      value="Resend Code"
                                      className='cursor-pointer text-primary'
                                      onClick={(e)=>{
                                        e.preventDefault(),
                                        resendCode(e)
                                      }}
                                  />
                            </p>
                            <div className="flex justify-center mt-5">
                              <ReCAPTCHA
                                sitekey="6LenUIgpAAAAAFvWhgy4KRWwmLoQmThvaM5nrupd"
                                onChange={handleCaptchaChange}
                                ref={recaptchaRef}/>
                           </div>
                      </h2>
                   
                    </div>
            </div>
          </div>
        </div>
 
    </ClientLayout>
  );
};

export default EmailVerification;