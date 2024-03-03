
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
interface User {
  _id: string;
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
  Skills: string;
  isEmailVerified: boolean;
  state: 'validated' | 'not validated' | 'blocked';
  role: 'super admin' | 'admin' | 'challenger' | 'company';
}

function ModifierAdmin() {
  const { userId } = useParams();
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [userData, setUserData] = useState<User>({ // Assurez-vous d'avoir défini l'interface User
    _id: '',
    email: '',
    FirstName: '',
    LastName: '',
    password: '',
    imageUrl: '',
    phone: '',
    address: '',
    birthDate: null,
    occupation: '',
    Description: '',
    Education: '',
    Skills: '',
    isEmailVerified: false,
    state: 'not validated',
    role: 'admin'
  });
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);

  useEffect(() => {
    axios.get<User>(`http://localhost:3000/users/${userId}`)
      .then(response => {
        const userDataFromApi = response.data;
        setUserData(userDataFromApi);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    // Vérifier si le champ est FirstName ou LastName
    if (name === "FirstName") {
      // Vérifier si la première lettre n'est pas une majuscule
      if (value.trim() !== '' && !/^[A-Z]/.test(value)) {
        setFirstNameError('Le prénom doit commencer par une majuscule.');
      } else {
        setFirstNameError('');
      }
    } else if (name === "LastName") {
      // Vérifier si la première lettre n'est pas une majuscule
      if (value.trim() !== '' && !/^[A-Z]/.test(value)) {
        setLastNameError('Le nom de famille doit commencer par une majuscule.');
      } else {
        setLastNameError('');
      }
    }
  
    // Mettre à jour les données de l'utilisateur
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    // Vérifier si le formulaire est valide
    validateForm();
  };
  
  const handlePhoneChange = (value: string | undefined) => {
    if (typeof value === 'string') {
      setUserData(prevState => ({
        ...prevState,
        phone: value
      }));
      setIsPhoneValid(isValidPhoneNumber(value));
    }
  
    // Vérifier si le formulaire est valide
    validateForm();
  };
  
  const validateForm = () => {
    // Vérifier si tous les champs sont valides
    const isValid = !firstNameError && !lastNameError && isPhoneValid;
  
    // Mettre à jour l'état de validation du formulaire
    setFormIsValid(isValid);
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPhoneValid) {
      alert('Veuillez saisir un numéro de téléphone valide.');
      return;
    }
    axios.put(`http://localhost:3000/users/update/${userId}`, userData)
      .then(response => {
        console.log('User updated successfully:', response.data);
        window.location.href = '/tables';
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };
const handleCancel = () => {
    // Redirection vers la liste sans effectuer de changement
    window.location.href = '/tables';
  };

  return (
    <div className="flex flex-col gap-9">
      <form onSubmit={handleSubmit} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Edit User</h3>
        </div>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
  <label className="mb-2.5 block text-black dark:text-white">First name</label>
  <input type="text" name="FirstName" value={userData.FirstName} onChange={handleChange} placeholder="Enter your first name" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
  {firstNameError && <p className="text-red-500 text-sm mt-1">{firstNameError}</p>}
</div>
<div className="w-full xl:w-1/2">
  <label className="mb-2.5 block text-black dark:text-white">Last name</label>
  <input type="text" name="LastName" value={userData.LastName} onChange={handleChange} placeholder="Enter your last name" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
  {lastNameError && <p className="text-red-500 text-sm mt-1">{lastNameError}</p>}
</div>
</div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Email <span className="text-meta-1">*</span></label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Enter your email address" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
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
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Address</label>
            <input type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Enter your address" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
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
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Occupation</label>
            <input type="text" name="occupation" value={userData.occupation} onChange={handleChange} placeholder="Enter your occupation" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Description</label>
            <textarea rows={6} name="Description" value={userData.Description} onChange={handleChange} placeholder="Enter description" className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Profile Picture URL</label>
            <input
              type="text"
              name="imageUrl"
              value={userData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          
          <button type="submit" className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 ${!formIsValid ? 'cursor-not-allowed opacity-50' : ''}`} disabled={!formIsValid}>Save Changes</button>
          <button type="button" className="flex w-full justify-center rounded bg-red-500 p-3 font-medium text-white hover:bg-opacity-90 mt-3" onClick={handleCancel}>Cancel</button>

        </div>
      </form>
    </div>
  );
}

export default ModifierAdmin;
