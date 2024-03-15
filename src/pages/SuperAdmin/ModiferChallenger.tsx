  import React, { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import axios from 'axios';
  import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
  import 'react-phone-number-input/style.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
  import Layout from '../../layout/DefaultLayout';

  interface User {
    email: string;
    FirstName: string;
    LastName: string;
    password: string;
    imageUrl: string;
    phone: string;
    address: string;
    birthDate: Date | null;
    occupation: string;
    Description: string;
    Education: string;
    Skills: string[];
    isEmailVerified: boolean;
    state: 'validated' | 'not validated' | 'blocked';
    role: 'super admin' | 'admin' | 'challenger' | 'company';
    company: {
      name: string;
      address: string;

      emailCompany: string;
      description: string;
      phone: string;
      professionnalFields: string[];
    };
  }

  function ModifierAdmin() {

    const [imageUrlValue, setimageUrlValue] = useState('');
    const [professionalSkills, setProfessionalSkills] = useState<string[]>([
      "Programming Languages: Python, R",
      "Statistical Analysis and Mathematics",
      "Machine Learning: TensorFlow, PyTorch",
      " Data Wrangling: Pandas",
      "Data Visualization: Matplotlib, Seaborn, Tableau",
      "Big Data Technologies: Hadoop, Spark",
      " Database Knowledge: SQL",
      " Domain Knowledge",
      " Data Ethics",
      " Communication Skills",
      "Problem-Solving Skills",
      " Version Control: Git",
      " Collaboration",
      "  Continuous Learning",
      "Project Management"
    ]);


    const Education = [
      " Computer Science/Computer Engineering",
      "Statistics/Mathematics",
      "Machine Learning",
      "Data Engineering",
      "Data Analytics",
      "Database Management",
      "Business/Domain Knowledge",
      "Data Ethics and Privacy",
      "Data Visualization",
      "Big Data Technologies",
      "Communication and Presentation",
      "Optimization Techniques",
      "Data Governance",
      "Software Development",
      "Domain-Specific Specializations"
    ]
    const [EducationValueError] = useState('');

    const [occupationError] = useState('');
    const [imageUrlValueError, setimageUrlValueError] = useState('');
    const { email } = useParams<{ email: string }>();
    const [formIsValid, setFormIsValid] = useState<boolean>(false);
    const [firstNameError] = useState<string>('');
    const [lastNameError] = useState<string>('');


    const [userData, setUserData] = useState<User>({

      email: '',
      FirstName: '',
      LastName: '',
      password: '',
      imageUrl: imageUrlValue,
      phone: '',
      address: '',
      birthDate: null,
      occupation: '',
      Description: '',
      Education: '',
      Skills: [],
      isEmailVerified: false,
      state: 'not validated',
      role: 'admin',
      company: {
        name: '',
        address: '',
        emailCompany: '',
        description: '',
        phone: '',
        professionnalFields: [],
      },
    });
    const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);
    const [selectedSkills, setSelectedSkills] = useState<string[]>(userData.Skills || []);

    useEffect(() => {
      axios.get<User>(`http://localhost:3000/Admin/${email}`)
        .then(response => {
          const userDataFromApi = response.data;
          console.log("UserData from API:", userDataFromApi); // Vérifiez les données renvoyées par l'API
          setUserData(userDataFromApi);
          setSelectedSkills(userDataFromApi.Skills || []); // Assurez-vous que la propriété est "skills" et non "Skills"
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }, [email]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setUserData(prevState => {
        if (name.startsWith('company.')) {
          const fieldName = name.split('.')[1];
          return {
            ...prevState,
            company: {
              ...prevState.company,
              [fieldName]: value
            }
          };
        } else {
          return {
            ...prevState,
            [name]: value
          };
        }
      });

      // Validate the form
      validateForm();
    };


    const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const skill = e.target.value;
      console.log('Selected skill:', skill);

      setSelectedSkills(prevSelectedSkills => {
        const updatedSkills = prevSelectedSkills.includes(skill)
          ? prevSelectedSkills.filter(selectedSkill => selectedSkill !== skill)
          : [...prevSelectedSkills, skill];

        console.log('Updated skills:', updatedSkills);

        setUserData(prevUserData => {
          console.log('Previous user data:', prevUserData);
          const updatedUserData = {
            ...prevUserData,
            Skills: updatedSkills // Assurez-vous que la propriété est "Skills" et non "skills"
          };
          console.log('Updated user data:', updatedUserData);
          return updatedUserData;
        });

        return updatedSkills;
      });
    };




    const validateForm = () => {
      const isValid =
        userData.email.trim() !== '' &&
        userData.FirstName.trim() !== '' &&
        userData.LastName.trim() !== '' &&
        isValidPhoneNumber(userData.phone) &&
        userData.occupation !== 'occupation' &&
        userData.Education !== '' &&
        userData.Description.trim() !== '' &&
        userData.Description.trim().length >= 200 &&
        userData.Description.trim().length <= 400 &&
        userData.birthDate !== null &&
        new Date().getFullYear() - new Date(userData.birthDate).getFullYear() >= 18;

      setFormIsValid(isValid);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isPhoneValid) {
        alert('Veuillez saisir un numéro de téléphone valide.');
        validateForm();

        return;
      }

      const userDataToSend = {
        ...userData,
        Skills: selectedSkills // Utiliser selectedSkills au lieu de userData.Skills
 };

      console.log('Submitting user data:', userDataToSend); // Log user data before making the request
      axios.put(`http://localhost:3000/Admin/update/${email}`, userDataToSend)
        .then(response => {
          console.log('User updated successfully:', response.data);

          // Redirection en fonction du rôle de l'utilisateur
          switch (userData.role) {
            case 'company':
              window.location.href = '/companylist';
              break;
            case 'challenger':
              window.location.href = '/tables';
              break;
            case 'admin':
              window.location.href = '/AdminList';
              break;
            default:
              // Si le rôle n'est pas reconnu, rediriger vers une page par défaut
              window.location.href = '/';
          }
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    };



    const handleCancel = () => {
      // Redirection vers la liste sans effectuer de changement
      switch (userData.role) {
        case 'company':
          window.location.href = '/companylist';
          break;
        case 'challenger':
          window.location.href = '/tables';
          break;
        case 'admin':
          window.location.href = '/AdminList';
          break;
        default:
          // Si le rôle n'est pas reconnu, rediriger vers une page par défaut
          window.location.href = '/';
      }
    };

    const checkImageUrl = (value: any) => {
      setimageUrlValue(value)
      if (!value.trim()) {
        setimageUrlValueError("Please enter your first name");
      } else {
        setimageUrlValueError("");
      }
    }

    const handlePhoneChange = (value: string | undefined) => {
      if (typeof value === 'string') {
        setUserData(prevState => ({
          ...prevState,
          phone: value
        }));
        setIsPhoneValid(isValidPhoneNumber(value));
      }

      validateForm();
    };


    return (
      <Layout>

        <div className="flex flex-col gap-9">
          <form onSubmit={handleSubmit} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Edit</h3>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">First name</label>
                  <input type="text" name="FirstName" value={userData.FirstName} onChange={handleChange} placeholder="Enter your first name"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required />
                  {firstNameError && <p className="text-red-500 text-sm mt-1">{firstNameError}</p>}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">Last name</label>
                  <input type="text" name="LastName" value={userData.LastName} onChange={handleChange} placeholder="Enter your last name" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required />
                  {lastNameError && <p className="text-red-500 text-sm mt-1">{lastNameError}</p>}
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Email <span className="text-meta-1">*</span></label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Enter your email address" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">Phone <span className="text-meta-1">*</span></label>
                <PhoneInput
                  name="phone"
                  placeholder="Enter your phone number"
                  value={userData.phone}
                  onChange={handlePhoneChange}
                  country="FR"
                />
                {!isPhoneValid && <p className="text-red-500 text-sm mt-1">Please enter a valid phone number.</p>}
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    value={imageUrlValue}
                    onChange={(e) => checkImageUrl(e.target.value)}
                    placeholder="Enter your description"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required
                  />

                  {imageUrlValueError &&
                    <div className="flex">
                      <p className="error-msg">{imageUrlValueError}</p>
                    </div>
                  }
                  <span className="absolute right-0 top-4">
                    <img src="/src/images/icon/tel.png" alt="tel" width="45%" />
                  </span>
                </div>
              </div>
              {userData.role !== 'admin' && (
                <>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Address</label>
                    <input type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Enter your address" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Birth Date</label>
                    <input
                      type="date"
                      name="birthDate"
                      value={userData.birthDate ? new Date(userData.birthDate).toISOString().split('T')[0] : ''}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Occupation
                    </label>
                    <select id="occupations" name="occupation" value={userData.occupation} onChange={handleChange} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                      <option value="occupation">Choose your occupation</option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="company">Company</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="searcher">Searcher</option>
                    </select>

                    {occupationError &&
                      <div className="flex">
                        <p className="error-msg">{occupationError}</p>
                      </div>
                    }

                  </div>


                  {professionalSkills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={skill}
                        value={skill}
                        checked={selectedSkills.includes(skill)}
                        onChange={handleSkillChange}
                        className="mr-2"
                      />
                      <label htmlFor={skill}>{skill}</label>
                    </div>
                  ))}



                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Education
                    </label>
                    <select id="education" name="Education" value={userData.Education} onChange={handleChange} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required>
                      <option value="">Choose personal Education</option>
                      {
                        Education.map((item1, index1) => (
                          <option key={index1} value={item1}>{item1}</option>
                        ))
                      }
                    </select>

                    {EducationValueError &&
                      <div className="flex">
                        <p className="error-msg">{EducationValueError}</p>
                        <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#f20202" }} className="mt-1 ml-1" />
                      </div>
                    }
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Description</label>
                    <textarea rows={6} name="Description" value={userData.Description} onChange={handleChange} placeholder="Enter description" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required />
                  </div>
                </>
              )}


              {userData.role === 'company' && (

                <>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Email <span className="text-meta-1">*</span></label>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Enter your email address" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Company Name</label>
                    <input type="text" name="company.name" value={userData.company.name} onChange={handleChange} placeholder="Enter company name" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Company Address</label>
                    <input type="text" name="company.address" value={userData.company.address} onChange={handleChange} placeholder="Enter company address" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Company Email</label>
                    <input type="email" name="company.email" value={userData.company.emailCompany} onChange={handleChange} placeholder="Enter company email" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Company Description</label>
                    <textarea rows={6} name="company.description" value={userData.company.description} onChange={handleChange} placeholder="Enter company description" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" required />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">Company Phone</label>
                    <PhoneInput
                      name="company.phone"
                      placeholder="Enter company phone number"
                      value={userData.company.phone || ''}
                      onChange={(value: string | undefined) => handlePhoneChange(value)}
                      country="FR"
                    />
                  </div>
                </>
              )}


              <button
                type="submit"
                className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 `}
              >
                Save Changes
              </button>


              <button type="button" className="flex w-full justify-center rounded bg-red-500 p-3 font-medium text-white hover:bg-opacity-90 mt-3" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }

  export default ModifierAdmin;