  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import 'animate.css';
  import Layout from '../../layout/DefaultLayout';
  import AddChallengerByAdmin from './AddChallengerByAdmin';
  import { Link, useNavigate } from 'react-router-dom';
  import { faAdd, faCheck, faCircleExclamation, faPenNib, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { FaUserEdit, FaBan, FaTrashAlt, FaCheck,FaUserPlus } from 'react-icons/fa'; // Importation des icônes
  import { MdEdit, MdBlock, MdDelete, MdCheck } from 'react-icons/md'; // Importation des icônes
  import Swal from 'sweetalert2';

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
  }


  // ... (previous imports)

  export default function FetchData() {
    const [data, setData] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');


    useEffect(() => {
      fetchData();
      console.log(data); // Vérifiez les données après chaque mise à jour
    }, [selectedRole, searchTerm]); // Fetch data again when selectedRole or searchTerm changes
    
    const fetchData = () => {
  axios.get<User[]>(`http://localhost:3000/Admin/${selectedRole || 'All'}`)
    .then(response => {
      const filteredUsers = response.data.filter(user =>
        (user.FirstName.toLowerCase().startsWith(searchTerm) ||
        user.LastName.toLowerCase().startsWith(searchTerm) ||
        user.phone.startsWith(searchTerm))
      );
      setData(filteredUsers);
    })
    .catch(err => console.log(err));
};

const sortUsersByFirstName = (users: User[]) => {
  return users.slice().sort((a, b) => {
    const firstNameA = a.FirstName.toLowerCase();
    const firstNameB = b.FirstName.toLowerCase();
    if (firstNameA < firstNameB) return -1;
    if (firstNameA > firstNameB) return 1;
    return 0;
  });
};

    
  // Fonction de gestion pour mettre à jour le terme de recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };


  // Filtrer les données en fonction du terme de recherche
  const filteredData = data.filter(user =>
    (user.FirstName.toLowerCase().startsWith(searchTerm) ||
    user.LastName.toLowerCase().startsWith(searchTerm) ||
    user.phone.startsWith(searchTerm))
  );
  console.log(filteredData); // Ajoutez cette ligne
  

  var bloquer = (email: string) => {
    const userToBlock = data.find(user => user.email === email);
    if (!userToBlock) {
      console.error('User not found');
      return;
    }
  
    if (userToBlock.state === 'blocked') {
      console.log('User is already blocked');
      return;
    }
  
    // Afficher une boîte de dialogue de confirmation
    Swal.fire({
      title: 'Are you sure you want to block this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, block !',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, alors procédez avec le blocage
        axios.put(`http://localhost:3000/Admin/${email}/updateState`, { email, state: 'blocked' })
          .then(response => {
            console.log('User blocked successfully:', response.data);
            const updatedData = data.map(user =>
              user.email === email ? { ...user, state: 'blocked' as const } : user
            );
            setData(updatedData);
          })
          .catch(err => console.log('Error blocking user:', err));
      }
    });
  };
  
  var debloquer = (email: string) => {
    const userToValidate = data.find(user => user.email === email);
    if (!userToValidate) {
      console.error('User not found');
      return;
    }
  
    if (userToValidate.state === 'validated') {
      console.log('User is already validated');
      return;
    }
  
    // Afficher une boîte de dialogue de confirmation
    Swal.fire({
      title: 'Are you sure you want to validate this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, validate !',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, alors procédez avec la validation
        axios.put(`http://localhost:3000/Admin/${email}/updateState`, { email, state: 'validated' })
          .then(response => {
            console.log('User validated successfully:', response.data);
            const updatedData = data.map(user =>
              user.email === email ? { ...user, state: 'validated' as const } : user
            );
            setData(updatedData);
          })
          .catch(err => console.log('Error validating user:', err));
      }
    });
  };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const navigate = useNavigate();

    const handleEdit = (email: string, e: React.MouseEvent<HTMLButtonElement>) => {
      // Prevent default button behavior
      e.preventDefault();
      // Redirect to edit form with user ID
      navigate(`/modifierAdmin/${email}`);
    };

    var changeToCompany = (users: User) => {
      console.log(users)
    }

    return (
      <Layout>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">List</h2>
            <div className="flex items-center space-x-4">
            <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">All Users</option>
                <option value="admin">Admin</option>
                <option value="challenger">Challenger</option>
                <option value="company">Company</option>
              </select>
                <Link to="/AddAdmin" className="bg-[#1C6F55] text-white py-2 px-4 rounded-md">
                <FaUserPlus className="mr-2" />
                Add Admin
              </Link>
            
            </div>
          </div>
          <div className="max-w-full overflow-x-auto">
              {/* Champ de recherche */}
              <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="mb-4 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left dark:bg-meta-4">
                  <th className="px-4 py-3">First Name</th>
                  <th className="px-4 py-3">Last Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
  {sortUsersByFirstName(currentUsers).map((user, index) => (
    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
      <td className="px-4 py-3">{user.FirstName}</td>
      <td className="px-4 py-3">{user.LastName}</td>
      <td className="px-4 py-3">{user.phone}</td>
      <td className="px-4 py-3">{user.role}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${
            user.state === 'validated' ? 'bg-green-400 text-white' :
            user.state === 'blocked' ? 'bg-red-400 text-white' :
            'bg-yellow-400 text-black'
          }`}
        >
          {user.state}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <button onClick={(e) => handleEdit(user.email, e)}>
            <FaUserEdit className="text-yellow-500" />
          </button>
          <button onClick={() => bloquer(user.email)}>
            <FaBan className="text-red-500" />
          </button>
          <Link to={`/Archiver`}>
            <FaTrashAlt className="text-red-500" />
          </Link>
          <button onClick={() => debloquer(user.email)}>
            <FaCheck className="text-green-500" />
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
            totalUsers={filteredData.length}
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