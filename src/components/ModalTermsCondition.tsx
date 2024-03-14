import { useEffect, useState } from "react";
import { Terms } from "../types/termsConditions";

export const ModalTermsConditions = ({ isOpen, onClose } : any) => {
    if (!isOpen) return null;

    const [step, setStep] = useState(1);

    const handleNext = () => {
      setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1 );
      };
  
      const [Data, setData] = useState<Terms | null>(null);



    const url = "http://localhost:3000/terms"  

    useEffect(() => {
        const fetchDataTermsConditions = async () => {
          try {
            const response = await fetch(`${url}/list`); 
            const data = await response.json();
            if (data.termsConditions) { 
                setData(data.termsConditions); 
            }
          } catch (error) {
            console.error('Error fetching data terms:', error);
          }
        };
    
        fetchDataTermsConditions();
      }, []);  
  
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
                    {Data && Data.map((item:any, index:any) => (
                        step === index + 1 && (
                            <div key={index}>
                                <h3 className="text-md font-semibold text-primary dark:text-white">{item.title}</h3>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    {item.content}
                                </p>
                                <div className="flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    {index > 0 && (
                                        <button onClick={handlePrevious} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mr-3">Back</button>
                                    )}
                                    {index < Data.length - 1 && ( 
                                          <button onClick={handleNext} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
                                     )}
                                </div>
                            </div>
                        )
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
  };