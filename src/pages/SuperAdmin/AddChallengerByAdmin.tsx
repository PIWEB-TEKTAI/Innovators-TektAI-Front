import React, { useState, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';

interface FormData {
  FirstName: string;
  LastName: string;
  email: string;
  password: string;
  imageUrl: string;
  phone: string;
  address: string;
  occupation: string;
  Description: string;
  Education: string;
  Skills: string;
}

const FormElements = () => {
  const [formData, setFormData] = useState<FormData>({
    FirstName: '',
    LastName: '',
    email: '',
    password: '',
    imageUrl: '',
    phone: '',
    address: '',
    occupation: '',
    Description: '',
    Education: '',
    Skills: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    // Ajoutez vos règles de validation ici
    const newErrors: Partial<FormData> = {};

    if (!formData.FirstName.trim()) {
      newErrors.FirstName = 'Le prénom est requis.';
    }

    // Ajoutez d'autres règles de validation pour les autres champs

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validez le formulaire avant de procéder
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3000/Admin/AddChallengerByAdmin', formData, {
          headers: {
            'Content-Type': 'application/json',
            // Ajoutez d'autres en-têtes si nécessaire pour votre API
          },
        });

        if (response.status === 200) {
          console.log('Données envoyées avec succès!');
        } else {
          console.error('Échec de l\'envoi des données au serveur.');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    } else {
      console.log('Le formulaire contient des erreurs. Veuillez les corriger.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Cast e.target to HTMLInputElement
    const target = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Challengers" />
      <form onSubmit={handleSubmit}>
        {/* ... Votre code existant */}

        <div>
          <label className="mb-3 block text-black dark:text-white">
            FirstName
          </label>
          <input
            type="text"
            placeholder="Default Input"
            name='FirstName'
            required
            value={formData.FirstName}
            onChange={handleChange}
            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${errors.FirstName && 'border-red-500'}`}
          />
          { <p className="text-red-500">{errors.FirstName} </p>}
        </div>

        <div>
          <label className="mb-3 block text-black dark:text-white">LastName</label>
          <input
            type="text"
            placeholder="Active Input"
            name="LastName"
            required
            value={formData.LastName}
            onChange={handleChange}
            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
          {errors.LastName && <p style={{ color: 'red' }}>{errors.LastName}</p>}
        </div>

        <div>
          <label className="mb-3 block font-medium text-black dark:text-white">Email</label>
          <input
            type="email"
            placeholder="Exemple@gmail.com"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
  <label className="mb-3 block text-black dark:text-white">
    Password
  </label>
  <input
    type="password"
    placeholder="Enter password"
    name='password'
    minLength={8}
    required
    value={formData.password}
    onChange={handleChange}
    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${errors.password && 'border-red-500'}`}
  />
  {errors.password && <p className="text-red-500">{errors.password} minLength 8 </p>}
</div>

<div>
  <label className="mb-3 block text-black dark:text-white">Image URL</label>
  <input
    type="file"
    placeholder="Enter image URL"
    name='imageUrl'
    value={formData.imageUrl}
    onChange={handleChange}
    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${errors.imageUrl && 'border-red-500'}`}
  />
  {errors.imageUrl && <p className="text-red-500">{errors.imageUrl}</p>}
</div>

<div>
  <label className="mb-3 block text-black dark:text-white">Phone Number</label>
  <input
    type="text"
    placeholder="Enter phone number"
    name='phone'
    required
    value={formData.phone}
    onChange={handleChange}
    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${errors.phone && 'border-red-500'}`}
  />
  {errors.phone && <p className="text-red-500">{errors.phone}</p>}
</div>

<div>
  <label className="mb-3 block text-black dark:text-white">Address</label>
  <input
    type="text"
    placeholder="Enter address"
    name='address'
    required
    value={formData.address}
    onChange={handleChange}
    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${errors.address && 'border-red-500'}`}
  />
  {errors.address && <p className="text-red-500">{errors.address}</p>}
</div>

<div>
  <label className="mb-3 block text-black dark:text-white">Occupation</label>
  <input
    type="text"
    required
    placeholder="Enter occupation"
    name='occupation'
    value={formData.occupation}
    onChange={handleChange}
    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${errors.occupation && 'border-red-500'}`}
  />
  {errors.occupation && <p className="text-red-500">{errors.occupation}</p>}
</div>

<div>
  <label className="mb-3 block text-black dark:text-white">Description</label>
  <textarea
    rows={6}
    placeholder="Enter description"
    name='Description'
    required
    value={formData.Description}
    onChange={handleChange}
    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${errors.Description && 'border-red-500'}`}
  ></textarea>
  {errors.Description && <p className="text-red-500">{errors.Description}</p>}
</div>

<div>
  <label className="mb-3 block text-black dark:text-white">Education</label>
  <textarea
    rows={6}
    placeholder="Enter education"
    name='Education'
    required
    value={formData.Education}
    onChange={handleChange}
    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${errors.Education && 'border-red-500'}`}
  ></textarea>
  {errors.Education && <p className="text-red-500">{errors.Education}</p>}
</div>

<div>
  <label className="mb-3 block text-black dark:text-white">Skills</label>
  <textarea
    rows={6}
    placeholder="Enter skills"
    name='Skills'
    required
    value={formData.Skills}
    onChange={handleChange}
    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${errors.Skills && 'border-red-500'}`}
  ></textarea>
  {errors.Skills && <p className="text-red-500">{errors.Skills}</p>}
</div>
        
        <button type='submit' className="flex w-full justify-center align-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" >
          Sign Up
        </button>
      </form>
    </DefaultLayout>
  );
};

export default FormElements;
