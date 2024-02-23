import { useState } from "react";
import "../../css/stepper.css";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
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
  return (
    <>
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
            <div className="mt-[50px]">
              <form>

              { currentStep != steps.length ? (
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Date of Birth
                  </label>
                  <div className="relative">
                   <input
                     type="date"
                     className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                   />

                  
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Company name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter the company name "
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    
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
                     placeholder="Enter your address"
                     className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                   />
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter the company address "
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
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
                     placeholder="Enter your phone number"
                     className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                   />
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Phone number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter the company phone number"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              )}
                
                
               { currentStep != steps.length ? (
                
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Occupation
                  </label>
                  <select id="occupations" className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                      <option selected><span className="text-gray-3">Choose your occupation</span></option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="company">Company</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="searcher">Searcher</option>
                   </select>
                </div>
                
                ):(
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter the company address email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                </div>
                )}
                
                { currentStep == steps.length ? (
                
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Professional fields
                  </label>
                  <select id="professionnalFields" className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                      <option selected><span className="text-gray-3">Choose company professional fields </span></option>
                      {
                        professionalFields.map((item,index)=>(
                          <option key={index} value={item}>{item}</option>
                        ))
                      }
                   </select>
                </div>
                
                ):(
                    null
                )}

                <div className="mb-5">
                  {!complete && (
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
                  )}
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
       
      
    </>
  );
};

export default Stepper;