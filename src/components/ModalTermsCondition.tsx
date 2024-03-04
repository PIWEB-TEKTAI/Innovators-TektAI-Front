import { useState } from "react";

export const ModalTermsConditions = ({ isOpen, onClose } : any) => {
    if (!isOpen) return null;

    const [step, setStep] = useState(1);

    const handleNext = () => {
      setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1 );
      };
  
  
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center z-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-500 dark:text-white">
                           Terms and Conditions
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        { step == 1 && (
                            <div>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Welcome to Tektai! These terms and conditions outline the rules and regulations for the use of the Tektai web app.
                                By accessing Tektai, we assume you accept these terms and conditions. Do not continue to use Tektai if you do not agree to take all of the terms and conditions stated on this page.
                                </p>
                                <h3 className="text-md mt-4 font-semibold text-primary dark:text-white">
                                    General
                                </h3>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Tektai is a platform where companies can submit real-world data science challenges, and individuals or teams ("Challengers") can submit their solutions.
                                    The winning solution will be determined by Tektai based on predefined criteria, and a prize will be awarded to the winning Challenger or team.
                                </p>
                                <div className="flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button  onClick={handlePrevious} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mr-3">Back</button>
                                    <button  onClick={handleNext} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
                                </div>
                            </div>  
                        )}
                        { step == 2 && (
                            <div>
                                <h3 className="text-md font-semibold text-primary dark:text-white">User Responsibilities</h3>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Users must provide accurate and truthful information when submitting challenges or solutions.
                                    Users must not engage in any unlawful or unethical behavior on the Tektai platform.
                                    Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.
                                </p>
                                <h3 className="text-md mt-4 font-semibold text-primary dark:text-white">
                                    Intellectual Property
                                </h3>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    By submitting challenges or solutions to Tektai, users retain ownership of their intellectual property rights. However, users grant Tektai a non-exclusive license to use, reproduce, and distribute their submissions for the purposes of operating the platform and promoting Tektai.
                                </p>
                               
                                <div className="flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button  onClick={handlePrevious} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mr-3">Back</button>
                                    <button  onClick={handleNext} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
                                </div>
                            </div>  
                        )}
                        { step == 3 && (
                            <div>
                                <h3 className="text-md font-semibold text-primary dark:text-white">Limitation of Liability</h3>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Tektai is not responsible for any loss or damage incurred as a result of using the platform or participating in challenges.
                                    Tektai does not guarantee the accuracy, reliability, or completeness of any information or content provided on the platform.
                                </p>
                                <h3 className="text-md mt-4 font-semibold text-primary dark:text-white">
                                    Changes to Terms and Conditions
                                </h3>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Tektai reserves the right to modify or revise these terms and conditions at any time. Users will be notified of any changes, and continued use of the platform constitutes acceptance of the modified terms.
                                </p>
                                <h3 className="text-md mt-4 font-semibold text-primary dark:text-white">
                                    Contact Information
                                </h3>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    If you have any questions or concerns about these terms and conditions, please contact us at [contact@tektai.com].
                                </p>

                                <div className="flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button  onClick={handlePrevious} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mr-3">Back</button>
                                    <button  onClick={onClose} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
                                </div>
                            </div>  
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
  };