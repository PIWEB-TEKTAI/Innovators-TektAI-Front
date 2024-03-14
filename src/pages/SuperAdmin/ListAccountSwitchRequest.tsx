import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css';
import Layout from '../../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';
import { acceptSwitchRequest, getUsersWithAccountSwitchRequest } from '../../services/admin.services';

// Définissez le type des données attendues



// ... (previous imports)

export default function FetchData() {
  const [data, setData] = useState<User[]>([]);
  const [showAddSection, setShowAddSection] = useState(false);

  useEffect(() => {
  
    getUsersWithAccountSwitchRequest()
      .then(response => {
        setData(prevData => response);
      })
      .catch(err => console.log(err));
  }, []);

  const navigate = useNavigate();
  var accept = (id: string) => {
    const updatedData = data.map(users =>
      users._id === id ? { ...users, AlreadyCompany: true as const } : users
    );
      acceptSwitchRequest(id)
      .then(response => {
        setData(updatedData);
      })
      .catch(err => console.log('Error accept switch account', err));
  };




  return (
    <Layout >
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Account Switch Requests</h2>
        </div> <div className="max-w-full overflow-x-auto ">
          <table className="w-full table-auto ">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                 
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
                  CompanyName
                </th>
              
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  IsCompany
                </th>

                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((users, index) => {

                return (<tr key={index}>
                  
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                       <img className="w-12 h-12 mb-3 rounded-full shadow-lg" src={users?.imageUrl} alt="Bonnie image"/>
                    </h5>

                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {users.FirstName}
                    </h5>

                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {users.LastName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {users.phone}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {users.company.name}
                    </p>
                  </td>
                  {users.AlreadyCompany?(
                    <>
                  <td>
                    <p  className='inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success'>
                    Yes

                    </p>
                  </td>
                    </>
                  ):(
                    <>
                       <td >
                        <p className='inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-danger text-danger'>
                        No

                        </p>
                  </td>
                    </>
                  )}

                
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark justify-center">
                  <button onClick={()=>{accept(users._id)
                        }
                      }>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-green-500">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
</svg>
                  </button>

                  </td>
                </tr>)
              }

              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}


