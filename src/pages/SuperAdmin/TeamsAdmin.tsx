import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css';
import Layout from '../../layout/DefaultLayout';

import { useAuth } from '../../components/Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import CreateTeamModal from '../Teams/CreateTeamModal';
import { FaEye } from 'react-icons/fa'; // Import the eye icon from Font Awesome
import { FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; 
import jsPDF from 'jspdf'; // Modified import statement
import html2canvas from 'html2canvas';



export default function FetchData() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
    // Ajoutez ici la logique de filtrage en fonction du filtre sélectionné
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [cardsData, setCardsData] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate(); // Move useNavigate hook here

  const navigateToTeamDetails = (teamId: any) => {
    navigate(`/TeamsAdmin/teamDetails/${teamId}`);
  };

  useEffect(() => {
    fetchData();
    console.log(cardsData); // Vérifiez les données après chaque mise à jour
  }, [selectedRole, searchTerm]); // Fetch data again when selectedRole or searchTerm changes

  const fetchData = () => {
   
    axios
      .get<any[]>('http://localhost:3000/teams/front/all' ,{withCredentials:true} )
      .then((response) => {
        console.log(response.data);
        const filteredUsers = response.data.filter((user) =>
          user.name.toLowerCase().startsWith(searchTerm),
        );
        setCardsData(filteredUsers);
      })
      .catch((err) => console.log(err));
  };
  const filteredCards = cardsData.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const [showModalCreateTeam, setshowModalCreateTeam] = useState(false);

  const handleCreateTeamModal = () => {
    setshowModalCreateTeam(true);
  };

  const handleTeamModalClose = () => {
    setshowModalCreateTeam(false);
  };


  const { userAuth } = useAuth();

  const handleDeleteTeam = async (teamId: string) => {
    try {
      // Send a DELETE request to delete the team
      await axios.delete(`http://localhost:3000/teams/${teamId}`);

      // Fetch the updated list of teams after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting team:', error);
      // Handle error
    }
  };
  const handleDeleteTeamConfirmation = (teamId: string) => {
    Swal.fire({
      title: 'Are you sure you want to delete this team?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result: any) => {
      if (result.isConfirmed) {
        handleDeleteTeam(teamId);
      }
    });
  };

  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileName = 'users_list.xlsx';
    const ws = XLSX.utils.json_to_sheet(cardsData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataExcel = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(dataExcel);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  };

  const exportToPDF = () => {
    const input = document.getElementById('pdf-content');
    if (!input) return;
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('users_list.pdf');
    });
  };


  return (
<Layout>
  <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">Teams List</h2>
      
      <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
      <button onClick={exportToExcel} className="bg-[#1C6F55] text-white py-2 px-4 rounded-md">
              Export to Excel
            </button>
            <button onClick={exportToPDF} className="bg-[#bf2d2d] text-white py-2 px-4 rounded-md">
              Export to PDF
            </button>


          <button
            onClick={handleCreateTeamModal}
            className="inline-flex items-center justify-center bg-transparent px-5 py-3 mr-3 text-primary font-semibold text-center text-white-900 border border-primary-300 rounded-full hover:bg-opacity-90 hover:shadow-4 hover:bg-primary hover:text-white  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
          >
            Create a Team
          </button>


          {showModalCreateTeam && (
            <CreateTeamModal onClose={handleTeamModalClose}></CreateTeamModal>
          )
          }
        </div>          
    </div>
    <input
      type="text"
      placeholder="Search teams"
      value={searchQuery}
      onChange={handleSearchChange}
      className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
    />
    <div  className="max-w-full overflow-x-auto">
      <table id="pdf-content" className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11"></th>
            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Name
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {cardsData.length === 0 ? (
            <tr>
              <td
                className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                colSpan={2}
              >
                No teams found.
              </td>
            </tr>
          ) : (
            filteredCards.map((team, index) => (
              <tr
                key={index}
                className="border-b border-[#eee] dark:border-strokedark"
              >
                <td className="py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <img
                    src="src/images/auth/teamUser.jpg"
                    className="card-img-top mt-3 w-15"
                    alt="Card image"
                  />
                </td>
                <td className="py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  {team.name}
                </td>
                <td className="py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <button
                    className="text-blue-500 hover:text-blue-700 font-medium relative"
                    onClick={() => navigateToTeamDetails(team._id)}
                  >
                    <FaEye className="inline-block mr-1" />
                    <span className="absolute bg-black text-white text-xs px-2 py-1 rounded-md left-0 top-full -mt-1 opacity-0 transition-opacity duration-300 pointer-events-none">
                      View Details
                    </span>
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 font-medium"
                    onClick={() => handleDeleteTeamConfirmation(team._id)}
                  >
                    <FiTrash2 className="inline-block mr-1" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
</Layout>

  );
}


