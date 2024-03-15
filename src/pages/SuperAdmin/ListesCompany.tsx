import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css';
import Layout from '../../layout/DefaultLayout';

import { Link, useNavigate } from 'react-router-dom';
import { faAdd, faCheck, faPencil, faRemove, faTrash } from '@fortawesome/free-solid-svg-icons';
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
        name: string,
        address: string,
        email: string,
        description: string,
        phone: string,
        professionnalFields: []
    },

}


// ... (previous imports)


export default function FetchData() {
    const [data, setData] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get<User[]>('http://localhost:3000/Admin/Company')
            .then(response => {
                setData(response.data || []); // Ensure response.data is an array, or use an empty array if it's undefined
            })
            .catch(err => console.log(err));
    }, []);

     // Fonction de gestion pour mettre à jour le terme de recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(user =>
    user.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.phone.includes(searchTerm)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    var bloquer = (email: string) => {
        const updatedData = data.map(user =>
            user.email === email ? { ...user, state: 'blocked' as const } : user
        );

        // console.log('Updated Data:', updatedData);

        console.log(`http://localhost:3000/Admin/${email}/updateState`)
        axios.put(`http://localhost:3000/Admin/${email}/updateState`, { email, state: 'blocked' })
            .then(response => {
                console.log('User blocked successfully:', response.data);
                setData(updatedData);
            })
            .catch(err => console.log('Error blocking user:', err));
    };
    var debloquer = (email: string) => {
        const updatedData = data.map(user =>
            user.email === email ? { ...user, state: 'validated' as const } : user
        );

        // console.log('Updated Data:', updatedData);

        console.log(`http://localhost:3000/Admin/${email}/updateState`)
        axios.put(`http://localhost:3000/Admin/${email}/updateState`, { email, state: 'validated' })
            .then(response => {
                console.log('Company validated successfully:', response.data);
                setData(updatedData);
            })
            .catch(err => console.log('Error Company user:', err));
    };
    const navigate = useNavigate();

    const handleEdit = (email: string, e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent default button behavior
        e.preventDefault();
        // Redirect to edit form with user ID
        navigate(`/modifierAdmin/${email}`);
    };
    

    return (
        <Layout >
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Company List</h2>

                    <Link to="/companyAdd" className="bg-[#1C6F55] text-white py-2 px-4 ">
                        +
                    </Link>
                </div>
                 <div className="max-w-full overflow-x-auto ">
                 <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="mb-4 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
                    <table className="w-full table-auto ">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Name company
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Adresse
                                </th>

                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Email Company

                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Company Phone
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    state

                                </th>

                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {currentUsers.map(company => (
                <tr className="bg-white dark:bg-boxdark" key={company._id}>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                    {company.company.name}
                </h5>
                <br />
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                    {company.company.address}
                </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">
                    {company.company.email}
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
                <div className="flex items-center space-x-3.5" >
                    <button className="hover:text-primary" onClick={(e) => handleEdit(company.email, e)}>
                        <FontAwesomeIcon icon={faPencil} style={{ color: "#EC7C0C" }} className="mt-1 ml-1" />
                    </button>
                    <button className="hover:text-primary" onClick={() => bloquer(company.email)}>
                    <FontAwesomeIcon icon={faRemove} style={{ color: "#000000" }} className="mt-1 ml-1" />
                    </button>
                    <Link to={`/Archiver`} className="hover:text-primary" >
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#A91A1A" }} className="mt-1 ml-1" />
                    </Link>
                    <button className="hover:text-primary" onClick={() => debloquer(company.email)}>
                        <FontAwesomeIcon icon={faCheck} style={{ color: "#28A471" }} className="mt-1 ml-1" />
                    </button>
                </div>
            </td>
        </tr>
    ))}
</tbody>

                    </table>
                </div>
                <Pagination
          usersPerPage={usersPerPage}
          totalUsers={data.length}
          currentPage={currentPage}
          paginate={paginate}
        />
            </div>
        </Layout>
    );
}
function Pagination({
    usersPerPage,
    totalUsers,
    currentPage,
    paginate
  }: {
    usersPerPage: number;
    totalUsers: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
  }) {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="flex justify-center mt-4">
        <ul className="flex items-center">
          {pageNumbers.map(number => (
            <li key={number}>
              <a
                onClick={() => paginate(number)}
                href="#"
                className={`${
                  currentPage === number
                    ? 'bg-[#1C6F55] text-white'
                    : 'bg-white text-[#1C6F55]'
                } py-2 px-4 mx-1 rounded-full`}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
