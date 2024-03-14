// DropDownLanguage.tsx
import React from 'react';

interface CountryFlag {
  name: string;
  flagPath: JSX.Element;
}
import { countryFlags } from './flag';

interface DropDownLanguageProps {
  countryFlagsPhone: CountryFlag[];
  handleCompanyCountrySelect: (country: CountryFlag) => void;
  selectedCountry: CountryFlag | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDownLanguage: React.FC<DropDownLanguageProps> = ({ countryFlagsPhone, handleCompanyCountrySelect, selectedCountry,isOpen, setIsOpen }) => {
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="flex items-center">
      <button
        id="dropdown-phone-button"
        className="flex-shrink-0 z-10 p-0.5 inline-flex items-center  rounded-lg border border-stroke bg-transparent  outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
        onClick={toggleDropdown}
        type="button"
      >
        {selectedCountry ? (
          <>
          
            {selectedCountry.flagPath}
            {selectedCountry.name}


            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>

          </>
        ) : (
          // Default to English
          <>
                    {countryFlags[1].flagPath}
                    {countryFlags[1].name}
                    <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>

          </>
        )}
      </button>

      {isOpen && (
        <div
          id="dropdown-phone"
          className="absolute justify-center lg:top-15 top-[19.50rem]  z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button">
            {countryFlagsPhone.map((country, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => {
                    handleCompanyCountrySelect(country);
                    setIsOpen(false);
                  }}
                  className="inline-flex w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  <div className="inline-flex items-center">
                    {country.flagPath}
                    {country.name}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownLanguage;
