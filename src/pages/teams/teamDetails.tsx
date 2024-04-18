// TeamDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import teamService from '../../services/teamsService';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import CoverTwo from '../../images/cover/download.jpg';

const TeamDetails = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview'); // State to manage active tab

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const teamDetails = await teamService.getTeamById(teamId); // Fetch team details by ID
        setTeam(teamDetails);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };


    fetchTeamDetails();
  }, [teamId]);
const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <ConnectedClientLayout>
    <div className='bg-white  rounded-lg p-4'>
        <div className="z-20 h-15 md:h-35 bg-gray-200 text-black text-xl items-center flex justify-center font-semibold">
            <span className='text-primary'>Welcome To</span> <span className=' ml-1'> {team.name}</span>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
         
        </div>
        <div className="flex justify-center items-center my-2">

   
        <img src={team.leader.imageUrl} alt="profile" className="rounded-full mr-2 max-h-16 w-16 mr-2" />
        <p className='text-lg  font-semibold capitalize' > {team.leader.FirstName} {team.leader.LastName}</p>
        <p className='text-sm text-black font-semibold bg-gray-50 rounded-full py-1 px-2 sm:ml-8'>
        Leader 
      </p>

      </div>

    <div className="flex justify-center">
    <p className='text-lg text-black my-4 font-semibold sm:mr-8'>
        Members: 
      </p>     
  
       </div>
       <div >
       <ul className="flex justify-center">
        {team.members.map((member:any) => (
          <li key={member._id} className="flex mx-2 px-2 py-1 rounded-full bg-gray-100">
        <img src={member.imageUrl} alt="profile" className="rounded-full mr-2 max-h-8 w-8 mr-2" />
          <p className='text-md font-semibold capitalize' > {member.FirstName} {member.LastName}</p></li>
        ))}
      </ul>
    </div>
      {/* Add more team details rendering as needed */}
    </div>
    <div className="bg-white rounded-lg my-6">
      <ul className="p-8 flex cursor-pointer flex-wrap sm:flex-nowrap border-gray-200 border-b py-4">
        <li className="-mb-px mr-1">
          <a
            className={`bg-white inline-block rounded-t py-2 px-4 hover:text-blue-700 text-blue-500 font-semibold ${activeTab === 'overview' ? 'bg-blue-100 text-blue-700 border-l border-t border-r' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </a>
        </li>
        {/* Add other tabs similarly */}
      </ul>

      <div className="p-8">
        {activeTab === 'overview' && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">
              Description
            </h2>
            {/* Add description content */}
          </>
        )}
        {/* Add content for other tabs */}
      </div>
    </div>
    </ConnectedClientLayout>
  );
};

export default TeamDetails;
