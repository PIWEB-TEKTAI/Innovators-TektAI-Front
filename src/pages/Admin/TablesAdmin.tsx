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
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<any>('http://localhost:3000/users')
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
      })
      .catch(err => console.log(err));
  }, []);

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
    // Empêcher le comportement par défaut du bouton
    e.preventDefault();
    // Rediriger vers le formulaire de modification avec l'ID de l'utilisateur
    navigate(`/modifier-admin/${userId}`);

  };
  
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
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
    </div> 
  );
}

export default FetchData;
