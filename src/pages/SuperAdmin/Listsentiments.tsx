import React, { useEffect, useState , useRef  } from 'react';

import axios from 'axios';
import 'animate.css';
import Layout from '../../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaBan, FaTrashAlt, FaCheck, FaUserPlus } from 'react-icons/fa'; // Importation des icônes
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'; // Modified import statement
import html2canvas from 'html2canvas';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';


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
  sentimentScore: number; // Add sentiment score property

}

const toTitleCase = (str: string) => {
  return str.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

// ... (previous imports)
const Sentiments = () => {
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




  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const navigate = useNavigate();

  const sentimentCounts = {
    positive: data.filter(user => user.sentimentScore > 0).length,
    neutral: data.filter(user => user.sentimentScore === 0).length,
    negative: data.filter(user => user.sentimentScore < 0).length,
  };
  const options: ApexOptions = {

    chart: {
      type: 'bar',
      height: 200,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: '100%',
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Negative', 'Positive', 'Neutral'],
    },
    legend: {
      show: true
    },
    colors: ['#F05252', '#31C48D', '#666666'], // Assign colors directly

  };
  const series = [{
    data: [sentimentCounts.positive, sentimentCounts.negative, sentimentCounts.neutral]
  }];
  
  
  



  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileName = 'users_list.xlsx';
    const ws = XLSX.utils.json_to_sheet(data);
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
      <div id="bar-chart">
          <ReactApexChart options={options} series={series} type="bar" height={200} />

        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">List</h2>
          <div className="flex items-center space-x-4">
            <button onClick={exportToExcel} className="bg-[#1C6F55] text-white py-2 px-4 rounded-md">
              Export to Excel
            </button>
            <button onClick={exportToPDF} className="bg-[#bf2d2d] text-white py-2 px-4 rounded-md">
              Export to PDF
            </button>


            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">All Users</option>
              <option value="Admin">Admin</option>
              <option value="challenger">Challenger</option>
              <option value="company">Company</option>
              <option value="archive">Archive List</option>
            </select>
            {selectedRole && selectedRole !== 'archive' ? (
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
          <table id="pdf-content" className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left dark:bg-meta-4">
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Sentiment Score</th> {/* Add this column for sentiment score */}

              </tr>
            </thead>
            <tbody>
              {sortUsersByFirstName(currentUsers).map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-4 py-3">{toTitleCase(user.FirstName)}</td>
                  <td className="px-4 py-3">{toTitleCase(user.LastName)}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span style={{ fontSize: '32px' }}>
                      {user.sentimentScore === 0 ? (
                        <span>😐</span>
                      ) : user.sentimentScore < 0 ? (
                        <span>😡</span>
                      ) : user.sentimentScore < 2 ? (
                        <span>😊</span>
                      ) : (
                        <span>😄</span>
                      )}
                    </span>
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

export default Sentiments;

