import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const FetchData: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data when currentPage changes

  const fetchData = () => {
    axios.get<any>('http://localhost:3000/users', {
      params: {
        page: currentPage,
        limit: 3 // Display at most 3 users per page
      }
    })
      .then(response => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          if (Array.isArray(response.data.users)) {
            setData(response.data.users);
          } else {
            console.error('Invalid response format: ', response.data);
          }
        }
        // Get total users count from response headers
        const totalUsers = parseInt(response.headers['x-total-count'], 10);
        // Calculate total pages based on total number of users and limit per page
        const totalPagesCount = Math.ceil(totalUsers / 3); // Limiting to 3 users per page
        setTotalPages(totalPagesCount);
      })
      .catch(err => console.log(err));
  };

  const handleValidate = (userId: string) => {
    axios.get(`http://localhost:3000/users/validate/${userId}`)
      .then(response => {
        setData(prevData => {
          return prevData.map(user => {
            if (user._id === userId) {
              return { ...user, state: 'validated' };
            }
            return user;
          });
        });
        console.log('Utilisateur validé avec succès');
      })
      .catch(error => {
        console.error('Erreur lors de la validation de l\'utilisateur :', error);
      });
  };

  const handleEdit = (userId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default button behavior
    e.preventDefault();
    // Redirect to edit form with user ID
    navigate(`/modifier-admin/${userId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRoleFilter = (role: string) => {
    // Fetch data based on selected role
    axios.get<any>(`http://localhost:3000/users/role/${role}`, {
      params: {
        page: 1, // Reset to the first page when applying filters
        limit: 3, // Display at most 3 users per page
        role: role // Filter by role
      }
    })
      .then(response => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          if (Array.isArray(response.data.users)) {
            setData(response.data.users);
          } else {
            console.error('Invalid response format: ', response.data);
          }
        }
        // Get total users count from response headers
        const totalUsers = parseInt(response.headers['x-total-count'], 10);
        // Calculate total pages based on total number of users and limit per page
        const totalPagesCount = Math.ceil(totalUsers / 3); // Limiting to 3 users per page
        setTotalPages(totalPagesCount);
        // Reset currentPage to 1 when applying filters
        setCurrentPage(1);
      })
      .catch(err => console.log(err));
  };

  const fetchAllUsers = () => {
    axios.get<any>('http://localhost:3000/users', {
      params: {
        page: 1,
        limit: 3 // Display at most 3 users per page
      }
    })
      .then(response => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          if (Array.isArray(response.data.users)) {
            setData(response.data.users);
          } else {
            console.error('Invalid response format: ', response.data);
          }
        }
        // Get total users count from response headers
        const totalUsers = parseInt(response.headers['x-total-count'], 10);
        // Calculate total pages based on total number of users and limit per page
        const totalPagesCount = Math.ceil(totalUsers / 3); // Limiting to 3 users per page
        setTotalPages(totalPagesCount);
        setCurrentPage(1); // Reset currentPage to 1
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between mb-4">
        <button className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={() => handleRoleFilter('super admin')}>
          Super Admin
        </button>
        <button className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={() => handleRoleFilter('admin')}>
          Admin
        </button>
        <button className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={() => handleRoleFilter('challenger')}>
          Challenger
        </button>
        <button className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={() => handleRoleFilter('company')}>
          Company
        </button>
        <button className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={fetchAllUsers}>
          All
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <img src={user.imageUrl} alt="User Image" className="h-10 w-10 object-cover rounded-full" />
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{user.FirstName}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.LastName}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.phone}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.Description}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        user.state === 'validated'
                          ? 'bg-success text-success'
                          : user.state === 'blocked'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}
                  >
                    {user.state}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {user.state !== 'validated' && (
                      <button onClick={() => handleValidate(user._id)}>Valider</button>
                    )}
                    <button onClick={(e) => handleEdit(user._id, e)}>Modifier</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div> 
  );
}

export default FetchData;
