import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css';
import Layout from '../../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
import { faAdd, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Définissez le type des données attendues
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
    company: {
        name: string;
        address: string;
        emailCompany: string;
        description: string;
        phone: string;
        professionnalFields: [];
    };
}

export default function FetchData() {
    const [data, setData] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<User[]>('http://localhost:3000/Admin/Company')
            .then(response => {
                setData(response.data || []);
            })
            .catch(err => console.log(err));
    }, []);

    // Fonction de filtrage des entreprises en fonction du terme de recherche
    const filteredData = data.filter(company =>
        company.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.company.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.company.emailCompany.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const bloquer = (email: string) => {
        const updatedData = data.map(user =>
            user.email === email ? { ...user, state: 'blocked' as const } : user
        );

        axios.put(`http://localhost:3000/Admin/${email}/updateState`, { email, state: 'blocked' })
            .then(response => {
                console.log('User blocked successfully:', response.data);
                setData(updatedData);
            })
            .catch(err => console.log('Error blocking user:', err));
    };

    const debloquer = (email: string) => {
        const updatedData = data.map(user =>
            user.email === email ? { ...user, state: 'validated' as const } : user
        );

        axios.put(`http://localhost:3000/Admin/${email}/updateState`, { email, state: 'validated' })
            .then(response => {
                console.log('Company validated successfully:', response.data);
                setData(updatedData);
            })
            .catch(err => console.log('Error Company user:', err));
    };

    const handleEdit = (email: string, e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent default button behavior
        e.preventDefault();
        // Redirect to edit form with user ID
        navigate(`/modifierAdmin/${email}`);
    };

    return (
        <Layout>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Company List</h2>
                    <Link to="/companyAdd" className="bg-[#46216A] text-white py-2 px-4">
                        +
                    </Link>
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded-md mb-4"
                />
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Name company
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Address
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Email Company
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Company Phone
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    State
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(data) && filteredData.map((company) => (
                                <tr key={company.company.emailCompany}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {company.company.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {company.company.address}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {company.company.emailCompany}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {company.company.phone}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${company.state === 'validated'
                                                ? 'bg-success text-success'
                                                : company.state === 'blocked'
                                                ? 'bg-danger text-danger'
                                                : 'bg-warning text-warning'
                                            }`}
                                        >
                                            {company.state}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button className="hover:text-primary">
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                               
>
                                                    <path
                                                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </button>
                                            <button className="hover:text-primary" onClick={(e) => handleEdit(company.email, e)}>
                                                <FontAwesomeIcon icon={faPencil} style={{ color: "#28A471" }} className="mt-1 ml-1" />
                                            </button>
                                            <button className="hover:text-primary" onClick={() => bloquer(company.email)} >
                                                <svg
                                                    className="fill-current"
                                                    width="22"
                                                    height="22"
                                                    viewBox="0 0 22 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.5">
                                                        <path
                                                            d="M11 0C4.92487 0 0 4.92487 0 11s4.92487 11 11 11 11-4.92487 11-11S17.0751 0 11 0ZM11 20.25C5.5335 20.25 1.75 16.4665 1.75 11S5.5335 1.75 11 1.75 20.25 5.5335 20.25 11 16.4665 20.25 11 20.25Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            d="M16.75 11.8981H5.25C4.73859 11.8981 4.32349 11.483 4.32349 10.9716C4.32349 10.4602 4.73859 10.0451 5.25 10.0451H16.75C17.2614 10.0451 17.6765 10.4602 17.6765 10.9716C17.6765 11.483 17.2614 11.8981 16.75 11.8981Z"
                                                            fill=""
                                                        />
                                                    </g>
                                                </svg>
                                            </button>
                                            <button className="hover:text-primary" onClick={() => debloquer(company.email)}>
                                                <FontAwesomeIcon icon={faAdd} style={{ color: "#28A471" }} className="mt-1 ml-1" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
