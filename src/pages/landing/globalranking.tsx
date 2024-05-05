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

  

    return (
        <ClientLayout>
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
            <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">

            <span
                  className="animated-text"
                  style={{ animationDelay: '0.1s' }}
                >
                  G
                </span>
                <span
                  className="animated-text"
                  style={{ animationDelay: '0.2s' }}
                >
                  l
                </span>
                <span
                  className="animated-text"
                  style={{ animationDelay: '0.3s' }}
                >
                  o
                </span>
                <span
                  className="animated-text"
                  style={{ animationDelay: '0.4s' }}
                >
                  b
                  </span>
                <span
                  className="animated-text"
                  style={{ animationDelay: '0.5s' }}
                >
                  a
                  </span>

                <span
                  className="animated-text"
                  style={{ animationDelay: '0.6s' }}
                >
                  l
                </span>{' '}

                <span
                  className="animated-text  text-primary"
                  style={{ animationDelay: '0.7s' }}
                >
                  R
                </span>
                <span
                  className="animated-text  text-primary "
                  style={{ animationDelay: '0.8s' }}
                >
                  a
                </span>
                <span
                  className="animated-text text-primary"
                  style={{ animationDelay: '0.9s' }}
                >
                  n
                </span>
                <span
                  className="animated-text text-primary"
                  style={{ animationDelay: '1s' }}
                >
                  k
                </span>
                <span
                  className="animated-text text-primary"
                  style={{ animationDelay: '1.1s' }}
                >
                  i
                </span>
                <span
                  className="animated-text text-primary"
                  style={{ animationDelay: '1.2s' }}
                >
                  n
                </span>
                <span
                  className="animated-text text-primary"
                  style={{ animationDelay: '1.3s' }}
                >
                  g
                </span>
              </h2>
              <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
Meet our top challengers              </p>
</div>

                
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user, index) => (
                        <li key={user._id} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className={`rank-circle ${index === 0 ? 'rank-circle-medalgold' : index === 1 ? 'rank-circle-medalsilver' : index === 2 ? 'rank-circle-medalbronze' : ''}`}>
                                    {index + 1}
                                </div> 
                                {user.role === 'challenger' ? (
                                    <>
                                        <Link to={`/visit/user/${user._id}`} className="text-lg font-semibold">
                                            {(user as User).FirstName} {(user as User).LastName}

                                        </Link>
                                        <span className="text-gray-500">Score: {(user as User).globalScore}</span>
                                        <img src= {(user as User).imageUrl} alt="User" className="w-15 h-15 cursor-pointer rounded-full shadow-lg" />

                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-lg font-semibold">{(user as Team).name}</h2>
                                        <span className="text-gray-500">Score: {(user as Team).globalScore}</span>
                                        <img src= {(user as Team).imageUrl} alt="User" className="w-15 h-15 cursor-pointer rounded-full shadow-lg" />
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </ClientLayout>
    );
};

export default GlobalRanking;
