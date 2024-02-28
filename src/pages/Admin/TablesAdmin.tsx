  import { useEffect, useState } from 'react';
  import axios from 'axios';

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

  export default function FetchData() {
    const [data, setData] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<string | null>(null);
    const [editedUserData, setEditedUserData] = useState<Partial<User>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

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
          // Utilisez la réponse ici si nécessaire
          console.log('Réponse de la requête PUT :', response);
    
          // Mettre à jour l'état de l'utilisateur dans l'interface utilisateur après la validation
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
    
   const handleEditUser = (userId: string) => {
    const userToEdit = data.find(user => user._id === userId);
    if (userToEdit) {
      setEditedUserData(userToEdit);
      setEditingUser(userId);
      setIsModalOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      axios.put(`http://localhost:3000/users/update/${editingUser}`, editedUserData)
        .then(response => {
          const updatedUserData = response.data;
          const updatedData = data.map(user => {
            if (user._id === editingUser) {
              return { ...user, ...updatedUserData };
            }
            return user;
          });
          setData(updatedData);
          setEditingUser(null);
          setIsModalOpen(false);
          console.log('Utilisateur mis à jour avec succès');
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        });
    }
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
  <button onClick={() => handleEditUser(user._id)}>Modifier</button>
  {editingUser === user._id && (
    <div className="bg-white rounded-md shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Modifier Utilisateur</h3>
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
        <input
          type="text"
          name="FirstName"
          id="firstName"
          value={editedUserData.FirstName || ''}
          onChange={handleInputChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          name="LastName"
          id="lastName"
          value={editedUserData.LastName || ''}
          onChange={handleInputChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={editedUserData.phone || ''}
          onChange={handleInputChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          name="Description"
          id="description"
          value={editedUserData.Description || ''}
          onChange={handleInputChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSaveEdit}
        >
          Enregistrer
        </button>
      </div>
    </div>
  )}
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