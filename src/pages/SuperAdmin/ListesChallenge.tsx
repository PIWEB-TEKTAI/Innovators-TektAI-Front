import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css';
import Modal from 'react-modal';
import Layout from '../../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaBan, FaTrashAlt, FaCheck, FaUserPlus, FaStop, FaStopCircle, FaHands, FaHandPointUp, FaStopwatch, FaBullseye, FaEye, FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa'; // Importation des icônes
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
  role: 'super admin' | 'admin' | 'challenger' | 'company' | 'archive';
}
interface Challenge {
  _id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  status: 'open' | 'completed' | 'archived';
  startDate: Date;
  endDate: Date;
  createdBy: User['_id']; // Référence à l'ID de l'utilisateur
  targetedSkills: string[];
  dataset: {
    name: string;
    description: string;
    fileUrl: string;
  };
}
interface Submission {
  _id: string;
  description: string;
  files: { name: string; url: string }[];
  status: 'pending' | 'approved' | 'rejected';
  score: number;
  submissionDate: Date;
}
interface CardSubmissionProps {
  submission: Submission;
}
interface SubmissionsModalProps {
  submissions: Submission[];
  isOpen: boolean;
  onClose: () => void;
}

const CardSubmission: React.FC<CardSubmissionProps> = ({ submission }) => {
  // Fonction pour calculer un classement basé sur le score
  const calculateRanking = (score: number) => {
    if (score >= 90) {
      return 5; // 5 étoiles pour un score supérieur ou égal à 90
    } else if (score >= 80) {
      return 4; // 4 étoiles pour un score entre 80 et 89
    } else if (score >= 70) {
      return 3; // 3 étoiles pour un score entre 70 et 79
    } else if (score >= 60) {
      return 2; // 2 étoiles pour un score entre 60 et 69
    } else {
      return 1; // 1 étoile pour un score inférieur à 60
    }
  };

  const renderStars = (ranking: number) => {
    const stars = [];
    for (let i = 0; i < ranking; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500 inline-block mx-1" />);
    }
    return stars;
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
      <h3 className="font-semibold text-lg text-blue-500 mb-2">Description: {submission.description}</h3>
      <table>
        <tbody>
          <tr>
            <td className={`px-4 py-3 inline-flex rounded-full text-sm font-medium ${submission.status === 'pending' ? 'bg-green-400 text-white font-semibold' :
              submission.status === 'rejected' ? 'bg-black text-white font-semibold' :
              'bg-red-400 text-white font-semibold'
              }`}
            >
              {toTitleCase(submission.status)}
            </td>
          </tr>
          
          <tr>
          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
             {renderStars(calculateRanking(submission.score))}
            </td>
            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Score: {submission.score}</td>
          </tr>
        
        </tbody>
      </table>
      {/* Vous pouvez ajouter d'autres champs ici */}
    </div>
  );
};

const toTitleCase = (str: string) => {
  return str.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

// ... (previous imports)

export default function FetchData() {
  const [data, setData] = useState<Challenge[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
    console.log(data); // Vérifiez les données après chaque mise à jour
  }, [selectedRole, searchTerm]); // Fetch data again when selectedRole or searchTerm changes

  const fetchData = () => {
    axios.get<Challenge[]>(`http://localhost:3000/challenge/${selectedRole || 'AllChallenge'}`)
      .then(response => {
        const filteredUsers = response.data.filter(challenge =>
        (challenge.title.toLowerCase().startsWith(searchTerm) ||
          challenge.price.toLowerCase().startsWith(searchTerm) ||
          challenge.description.startsWith(searchTerm))
        );
        setData(filteredUsers);

      })
      .catch(err => console.log(err));
  };
  const handleSubmissionsClick = (id: any) => {
    axios.get(`http://localhost:3000/Submission/SubmissionsByIdChallenge/${id}`)
      .then(response => {
        const submissionsData = response.data;
        setSubmissions(submissionsData);
        openModal();
      })
      .catch(err => console.log('Error fetching submissions:', err));
  };
  const sortUsersByFirstName = (users: Challenge[]) => {
    return users.slice().sort((a, b) => {
      const firstNameA = a.title.toLowerCase();
      const firstNameB = b.description.toLowerCase();
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
  (user.title.toLowerCase().startsWith(searchTerm) ||
    user.price.toLowerCase().startsWith(searchTerm) ||
    user.description.startsWith(searchTerm))
  );
  console.log(filteredData); // Ajoutez cette ligne



  /*var archive = (id: string) => {
      const updatedData = data.map(user =>
        user._id === id? { ...user, status: 'completed' as const } : user
      );
  
      console.log(`http://localhost:3000/challenge/${id}/updateStatus`)
      axios.put(`http://localhost:3000/challenge/${id}/updateStatus`, { id, status: 'archived' })
        .then(response => {
          console.log('User validated successfully:', response.data);
          setData(updatedData);
      
          
        })
        .catch(err => console.log('Error validated user:', err));
    };
  */
  var archive = (id: string) => {
    const userToValidate = data.find(user => user._id === id);
    if (!userToValidate) {
      console.error('User not found');
      return;
    }



    // Afficher une boîte de dialogue de confirmation
    Swal.fire({
      title: 'Are you sure you want to archive this challenge?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, validate !',
      cancelButtonText: 'Cancel'
    }).then((result: any) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, alors procédez avec la validation
        axios.put(`http://localhost:3000/challenge/${id}/updateStatus`, { id, status: 'archived' })
          .then(response => {
            console.log('User validated successfully:', response.data);
            const updatedData = data.map(user =>
              user._id === id ? { ...user, status: 'archived' as const } : user
            );
            setData(updatedData);
            //window.location.reload();
          })
          .catch(err => console.log('Error validating challenge:', err));
      }
    });
  };




  var open = (id: string) => {

    const userToValidate = data.find(user => user._id === id);
    if (!userToValidate) {
      console.error('User not found');
      return;
    }



    // Afficher une boîte de dialogue de confirmation
    Swal.fire({
      title: 'Are you sure you want to open this challenge ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, validate !',
      cancelButtonText: 'Cancel'
    }).then((result: any) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, alors procédez avec la validation
        axios.put(`http://localhost:3000/challenge/${id}/updateStatus`, { id, status: 'open' })
          .then(response => {
            console.log('challenge opened successfully:', response.data);
            const updatedData = data.map(user =>
              user._id === id ? { ...user, status: 'open' as const } : user
            );
            setData(updatedData);
            //window.location.reload();
          })
          .catch(err => console.log('Error validating challenge:', err));
      }
    });
  };































  var completed = (id: string) => {
    const userToValidate = data.find(user => user._id === id);
    if (!userToValidate) {
      console.error('User not found');
      return;
    }


    // Afficher une boîte de dialogue de confirmation
    Swal.fire({
      title: 'Are you sure you want to completed this challenge?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, validate !',
      cancelButtonText: 'Cancel'
    }).then((result: any) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, alors procédez avec la validation
        axios.put(`http://localhost:3000/challenge/${id}/updateStatus`, { id, status: 'completed' })
          .then(response => {
            console.log('challenge complete successfully:', response.data);
            const updatedData = data.map(user =>
              user._id === id ? { ...user, status: 'completed' as const } : user
            );
            setData(updatedData);
            //window.location.reload();
          })
          .catch(err => console.log('Error validating challenge:', err));
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
  const view = (email: string, e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default button behavior
    e.preventDefault();
    // Redirect to edit form with user ID
    navigate(`/ViewChallenge/${email}`);

  };


  <Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '800px',
        height: '60vh',
        padding: '40px',
        borderRadius: '8px',
      },
    }}
  >
    {/* Contenu du modal */}
    <h2>Submissions Modal</h2>
    {/* Ajoutez ici le contenu que vous souhaitez afficher dans le modal */}
    <button onClick={closeModal}>Close Modal</button>
  </Modal>


  return (
    <Layout>
 <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '100%', // Largeur du modal
      maxWidth: '800px', // Largeur maximale du modal
      height: '80vh', // Hauteur du modal
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Ombre légère
    },
  }}
>
  {/* Contenu du modal */}
  <h2 className="text-2xl font-semibold mb-4">Submissions List</h2>
  {/* Contenu de la modal */}
  <div>
    {submissions.map(submission => (
      <CardSubmission key={submission._id} submission={submission} />
    ))}
  </div>
  {/* Bouton pour fermer le modal */}
  <button onClick={closeModal} className="bg-green-500 text-white py-2 my-5 px-4 rounded-md mt-4 absolute bottom  right-4">
    Close 
  </button>
</Modal>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">List</h2>
          <div className="flex items-center space-x-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">All challenge</option>
              <option value="OpenedChallenge">open challenge</option>
              <option value="completedChallenge">completed challenge</option>
              <option value="archivedChallenge">Archive challenge</option>

            </select>
            {selectedRole && selectedRole !== 'archivedChallenge' ? (
              <Link to={`/Add${selectedRole}`} className="bg-[#1C6F55] text-white py-2 px-4 rounded-md">
                <FaUserPlus className="mr-2" />

              </Link>
            ) : (
              <button hidden className="bg-gray-300 text-white py-2 px-4 rounded-md cursor-not-allowed">
                <FaUserPlus className="mr-2" />

              </button>
            )}
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
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>

                <th className="px-4 py-3">Price</th>

                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Submissions</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>

              {sortUsersByFirstName(currentUsers).map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>

                  <td className="px-4 py-3">

                    <img src={user.image} alt={user.title} className="h-10 w-10 rounded-full object-cover" />
                  </td>
                  <td className="px-4 py-3">{toTitleCase(user.title)}</td>

                  <td className="px-4 py-3">{user.price}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${user.status === 'open' ? 'bg-green-400 text-white font-semibold' :
                          user.status === 'archived' ? 'bg-black text-white font-semibold' :
                            'bg-red-400 text-white font-semibold'
                        }`}
                    >
                      {toTitleCase(user.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full py-1 px-3 text-sm font-medium bg-teal-400 text-white font-semibold' :
      user.status === 'archived' ? 'bg-black text-white font-semibold' :
      'bg-red-400 text-white font-semibold'
    }`}
                      onClick={() => {
                        handleSubmissionsClick(user._id);
                        // Appel de la fonction pour ouvrir le modal
                      }}
                    >
                      Submissions
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button onClick={(e) => handleEdit(user._id, e)}>
                        <FaUserEdit className="text-yellow-500" />
                      </button>

                      <button onClick={() => completed(user._id)}>
                        <FaStopwatch className="text-orange-500" />
                      </button>
                      <button onClick={() => archive(user._id)}>
                        <FaTrashAlt className="text-red-500" />
                      </button>
                      <button onClick={() => open(user._id)}>
                        <FaCheck className="text-green-500" />
                      </button>
                      <button onClick={(e) => view(user._id, e)}>
                        <FaEye className="text-blue-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>


          </table>
        </div>
        <div className='mb-5'>
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={filteredData.length}
            currentPage={currentPage}
            paginate={paginate}

          />
        </div>

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
              className={`${currentPage === number
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