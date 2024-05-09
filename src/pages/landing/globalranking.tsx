import React, { useEffect, useState } from 'react';
import Footer from '../landing/footer';
import ClientLayout from '../../layout/clientLayout';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GlobalRanking: React.FC = () => {
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
    globalScore: number;
    isEmailVerified: boolean;
    state: 'validated' | 'not validated' | 'blocked';
    role: 'super admin' | 'admin' | 'challenger' | 'company' | 'archive';
  }

  interface Team {
    _id: string;
    name: string;
    description?: string;
    globalScore: number;
    leader?: string;
    imageUrl: string;
    // Add any other properties specific to teams
  }

  const [users, setUsers] = useState<(User | Team)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items to display per page
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<(User | Team)[]>([]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<any>('http://localhost:3000/user/users');
        const allUsers: (User | Team)[] = response.data.allUsers || [];

        // Sort the combined array by globalScore in descending order
        allUsers.sort((a, b) => b.globalScore - a.globalScore);

        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      if ((user as User).role === 'challenger') {
        return ((user as User).FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user as User).LastName.toLowerCase().includes(searchTerm.toLowerCase()));
      } else {
        return (user as Team).name.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });

    setFilteredUsers(filteredUsers);
  }, [searchTerm, users]);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <ClientLayout>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center  lg:mb-16">
          <h2 className="mb-2 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            <span className="animated-text" style={{ animationDelay: '0.1s' }}>G</span>
            <span className="animated-text" style={{ animationDelay: '0.2s' }}>l</span>
            <span className="animated-text" style={{ animationDelay: '0.3s' }}>o</span>
            <span className="animated-text" style={{ animationDelay: '0.4s' }}>b</span>
            <span className="animated-text" style={{ animationDelay: '0.5s' }}>a</span>
            <span className="animated-text" style={{ animationDelay: '0.6s' }}>l</span>{' '}
            <span className="animated-text text-primary" style={{ animationDelay: '0.7s' }}>R</span>
            <span className="animated-text text-primary " style={{ animationDelay: '0.8s' }}>a</span>
            <span className="animated-text text-primary" style={{ animationDelay: '0.9s' }}>n</span>
            <span className="animated-text text-primary" style={{ animationDelay: '1s' }}>k</span>
            <span className="animated-text text-primary" style={{ animationDelay: '1.1s' }}>i</span>
            <span className="animated-text text-primary" style={{ animationDelay: '1.2s' }}>n</span>
            <span className="animated-text text-primary" style={{ animationDelay: '1.3s' }}>g</span>
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Meet our top challengers
          </p>
        </div>
        <div className="bg-white pt-4 rounded-lg table-auto mx-auto  w-[90%]">

       <div className="flex bg-white p-4 mx-auto rounded-lg justify-end mb-4">
          <input
            type="text"
            placeholder="Search "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 "
          />
        </div>
  
       <table >
          <thead className=''>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody className='text-center'>
  {filteredUsers.slice(indexOfFirstItem, indexOfLastItem).map((user, index) => {
    const overallIndex = users.findIndex((u) => u._id === user._id);
    return (
      <tr key={user._id} className="p-4 text-center"> {/* Apply text-center to center the content */}
        <td className="py-2 flex justify-center items-center"> {/* Apply flexbox styling */}
        <div className={`rank-circle ${index === 0 ? 'rank-circle-medalgold' : index === 1 ? 'rank-circle-medalsilver' : index === 2 ? 'rank-circle-medalbronze' : ''}`}>
          {overallIndex + 1}
        </div>
      </td>

        <td>
          {user.role === 'challenger' ? (
            <Link to={`/visit/user/${user._id}`} className="text-lg font-semibold">
              {(user as User).FirstName} {(user as User).LastName}
            </Link>
          ) : (
            <h2 className="text-lg font-semibold">{(user as Team).name}</h2>
          )}
        </td>
        <td>{user.globalScore}</td>
        <td>
          <div className="flex justify-center items-center">
          <Link to={`/visit/user/${user._id}`}>
            <img src={user.role === 'challenger' ? (user as User).imageUrl : (user as Team).imageUrl} alt="User" className="w-15 h-15 cursor-pointer rounded-full shadow-lg" />
          </Link>
          </div>
            </td>
          </tr>
        );
      })}
    </tbody>

        </table>
  
        <ul className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, i) => (
            <li key={i} className="mx-1 my-2">
              <button
                className={`w-8 h-8 flex items-center justify-center rounded-full border border-blue-500 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>

       </div>
      </div>
      <Footer />
    </ClientLayout>
  );
  
};

export default GlobalRanking;
