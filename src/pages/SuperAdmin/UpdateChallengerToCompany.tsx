import React, { useState, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';

const FormElements1 = () => {
  const { email } = useParams();
  const professionalFields1 =
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
  const [CompanyNameValue, setCompanyNameValue] = useState('');
  const [CompanyNameError, setCompanyNameError] = useState('');

  const [companyAddressValue, setCompanyAddressValue] = useState('');
  const [companyAddressError, setCompanyAddressError] = useState('');

  const [companyEmailValue, setCompanyEmailValue] = useState('');
  const [companyEmailError, setCompanyEmailError] = useState('');

  const [companyPhoneValue, setCompanyPhoneValue] = useState('');
  const [companyPhoneError, setCompanyPhoneError] = useState('');

  const [descriptionValue, setdescriptionValue] = useState('');
  const [descriptionError, setdescriptionError] = useState('');

  const [CompanyProfessionalFieldsValue, setCompanyProfessionalFieldsValue] = useState('Choose personal professional skills');
  const [CompanyProfessionalFieldsError, setCompanyProfessionalFieldsError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Admin/${email}`);
        const userData = response.data;

        setCompanyNameValue(userData.company.name);
        setCompanyAddressValue(userData.company.address);
        setCompanyEmailValue(userData.company.emailCompany);
        setdescriptionValue(userData.company.description)
        setCompanyPhoneError(userData.company.phone);
        setCompanyProfessionalFieldsValue(userData.company.CompanyProfessionalFieldsValue);

      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
      }
    };

    fetchUserData();
  }, [email]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    try {
      const response = await axios.put(`http://localhost:3000/Admin/${email}/updateChallengerToCompany`, {
        company: {
         name: CompanyNameValue,
         address:companyAddressValue,
         emailCompany:companyEmailValue,
         phone:companyPhoneValue,
         professionnalFields:CompanyProfessionalFieldsValue,
         description:descriptionValue

        },
        // Ajoutez d'autres champs pour la mise à jour de l'utilisateur
      });

      console.log(response.data);

      
  
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    }
  
  };

  const checkCompanyName = (value: string) => {
    setCompanyNameValue(value);
    if (!value.trim()) {
      setCompanyNameError('Please enter the company name');
    } else {
      setCompanyNameError('');
    }
  };

  const checkCompanyEmail = (value: string) => {
    setCompanyEmailValue(value);
    if (!value.trim()) {
      setCompanyEmailError('Please enter the company email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setCompanyEmailError('Please enter a valid email');
    } else {
      setCompanyEmailError('');
    }
  };

  const checkCompanyAddress = (value: string) => {
    setCompanyAddressValue(value);
    if (!value.trim()) {
      setCompanyAddressError('Please enter the company address');
    } else {
      setCompanyAddressError('');
    }
  };
  const checkCompanyProfessionalFieldsValue = (value: any) => {
    setCompanyProfessionalFieldsValue(value);
    if (value === "Choose personal professional skills") {
      setCompanyProfessionalFieldsError("Please enter the company professional fields");
    } else {
      setCompanyProfessionalFieldsError("");
    }
  };

  const checkCompanyPhone = (value: string) => {
    setCompanyPhoneValue(value);
    if (!value.trim()) {
      setCompanyPhoneError('Please enter the company phone number');
    } else if (!/^\d+$/.test(value)) {
      setCompanyPhoneError('Please enter a valid phone number');
    } else {
      setCompanyPhoneError('');
    }
  };

  const checkdescription = (value: any) => {
    setdescriptionValue(value)
    if (!value.trim()) {
      setdescriptionError("Please enter your professionnal Description");
    } else {
      setdescriptionError("");
    }
  }

  return (
    <Layout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <Breadcrumb pageName="Add Challengers" />
        <form onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Company name
            </label>
            <div className="relative">
              <input
                value={CompanyNameValue}
                onChange={(e) => checkCompanyName(e.target.value)}
                type="text"
                placeholder="Enter the company name"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              {CompanyNameError && (
                <div className="flex">
                  <p className="error-msg">{CompanyNameError}</p>
                  <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#f20202" }} className="mt-1 ml-1" />
                </div>
              )}

              <span className="absolute right-7 top-4">
              
              </span>
            </div>
          </div>

          {/* Company Address */}
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Company address
            </label>
            <div className="relative">
              <input
                value={companyAddressValue}
                onChange={(e) => checkCompanyAddress(e.target.value)}
                type="text"
                placeholder="Enter the company address"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              {companyAddressError && (
                <div className="flex">
                  <p className="error-msg">{companyAddressError}</p>
                  <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#f20202" }} className="mt-1 ml-1" />
                </div>
              )}

              <span className="absolute right-0  top-4">
                {/* Ajoutez ici votre icône ou élément visuel associé au champ */}
              </span>
            </div>
          </div>

          {/* Company Phone */}
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Company phone number
            </label>
            <div className="relative">
              <input
                value={companyPhoneValue}
                onChange={(e) => checkCompanyPhone(e.target.value)}
                type="text"
                placeholder="Enter the company phone number"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              {companyPhoneError && (
                <div className="flex">
                  <p className="error-msg">{companyPhoneError}</p>
                  <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#f20202" }} className="mt-1 ml-1" />
                </div>
              )}

              <span className="absolute right-0 top-4">
                {/* Ajoutez ici votre icône ou élément visuel associé au champ */}
              </span>
            </div>
          </div>

          {/* Company Email */}
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Company email
            </label>
            <div className="relative">
              <input
                value={companyEmailValue}
                onChange={(e) => checkCompanyEmail(e.target.value)}
                type="text"
                placeholder="Enter the company email"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              {companyEmailError && (
                <div className="flex">
                  <p className="error-msg">{companyEmailError}</p>
                  <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#f20202" }} className="mt-1 ml-1" />
                </div>
              )}

              <span className="absolute right-7 top-4">
                {/* Ajoutez ici votre icône ou élément visuel associé au champ */}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Skills
            </label>
            <select id="professionnalFields" value={CompanyProfessionalFieldsValue} onChange={(e) => checkCompanyProfessionalFieldsValue(e.target.value)} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
              <option value="Choose company professional fields">Choose Skills professional fields</option>
              {
                professionalFields1.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))
              }
            </select>

            {CompanyProfessionalFieldsError &&
              <div className="flex">
                <p className="error-msg">{CompanyProfessionalFieldsError}</p>
                <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#f20202" }} className="mt-1 ml-1" />
              </div>
            }
          </div>
          <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Description
          </label>
          <div className="relative">
            <textarea

              value={descriptionValue}
              onChange={(e) => checkdescription(e.target.value)}
              placeholder="Enter your description"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>

            {descriptionError &&
              <div className="flex">
                <p className="error-msg">{descriptionError}</p>
                <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#f20202" }} className="mt-1 ml-1" />
              </div>
            }
            <span className="absolute right-0 top-4">
              <img src="/src/images/icon/tel.png" alt="tel" width="45%" />
            </span>
          </div>

        </div>
        <div className="flex justify-end">
  <button
    type='submit'
    className="rounded-sm bg-[#28A471] p-2 text-sm font-medium text-gray hover:bg-opacity-90"
  >
    Update to company
  </button>
</div>
        </form>
      </div>
    </Layout>
  );
};

export default FormElements1;
