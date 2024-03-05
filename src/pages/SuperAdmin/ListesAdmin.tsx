import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css';
import Layout from '../../layout/DefaultLayout';
import AddChallengerByAdmin from './AddChallengerByAdmin';
import { Link, useNavigate } from 'react-router-dom';
import { faAdd, faCircleExclamation, faPenNib, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const API_URL = 'http://localhost:3000/Admin';

export default function FetchData() {
  const [data, setData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<User[]>(`${API_URL}/admin`)
      .then(response => {
        setData(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterData = data.filter(user =>
    user.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateUserState = (email: string, newState: 'blocked' | 'validated') => {
    const updatedData = data.map(user =>
      user.email === email ? { ...user, state: newState } : user
    );

    axios.put(`${API_URL}/${email}/updateState`, { email, state: newState })
      .then(response => {
        console.log(`User ${newState} successfully:`, response.data);
        setData(updatedData);
      })
      .catch(err => console.log(`Error ${newState} user:`, err));
  };

  const handleEdit = (email: string) => {
    navigate(`/modifierAdmin/${email}`);
  };

  const switchToCompany = (user: User) => {
    console.log(user);
  };

  return (
    <Layout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Admin List</h2>
          <Link to="/AddAdmin" className="bg-[#46216A] text-white py-2 px-4">
            +
          </Link>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 px-4 py-2 rounded-md mb-4"
        />
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Image
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  FirstName
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  LastName
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Phone
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
              {filterData.map(user => (
                <tr key={user._id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    {user.imageUrl && (
                      <img src={user.imageUrl} alt={`${user.FirstName} ${user.LastName}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    )}
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
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${user.state === 'validated'
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
                      <button className="hover:text-primary" onClick={() => handleEdit(user.email)}>
                        <FontAwesomeIcon icon={faPencil} style={{ color: "#28A471" }} className="mt-1 ml-1" />
                      </button>
                      <Link to={`/switchToCompany/${user.email}`} className="hover:text-primary">
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
                              d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                              fill=""
                            />
                            <path
                              d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </Link>
                      <button className="hover:text-primary" onClick={() => updateUserState(user.email, 'blocked')}>
                        <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#FF5733" }} className="mt-1 ml-1" />
                      </button>
                      <button className="hover:text-primary" onClick={() => updateUserState(user.email, 'validated')}>
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
