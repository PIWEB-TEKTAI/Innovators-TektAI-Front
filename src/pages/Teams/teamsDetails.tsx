// TeamDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import teamService from '../../services/teamsService';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import ClientLayout from '../../layout/clientLayout';
import Loader from '../../common/Loader';

const TeamsDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview'); // State to manage active tab

  function truncateDescription(description:any) {
    // Trouver l'index de la deuxième occurrence de '\n' (pour la deuxième ligne)
    const secondNewLineIndex = description.indexOf('\n', description.indexOf('\n') + 1);
  
    // Si la deuxième occurrence de '\n' est trouvée
    if (secondNewLineIndex !== -1) {
      // Retourner la sous-chaîne de caractères jusqu'à la deuxième occurrence de '\n'
      return description.substring(0, secondNewLineIndex);
    } else {
      // Sinon, retourner la description complète
      return description;
    }
  }

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const teamDetails = await teamService.getTeamById(id); // Fetch team details by ID
        setTeam(teamDetails);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchTeamDetails();
  }, [id]);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  if (!team) {
    return <div><Loader/></div>;
  }

  return (
    <ClientLayout>
        <div className="mx-auto xl:mx-[10rem] my-4 rounded-lg px-4 py-8">
            <div className=" h-15 md:h-35 bg-white rounded-lg text-black text-2xl shadow-md  items-center flex flex-col justify-around font-semibold">
                 <img src={team.imageUrl} alt="profile" className="rounded-full my-2 max-h-12 w-12 ml-5" />

                <span className='mb-5'>Welcome To <span className=' text-primary ml-1'> {team.name}</span></span> 

                
            </div>
            
            <div className=" h-10 md:h-30 rounded-lg text-black text-xl items-center flex justify-start font-semibold">
             

            </div>



            <div>
            <ul className="flex justify-between  flex-wrap">
                {team.members.map((member: any) => (
                <div className='card-design2 ml-5 bg-white shadow-lg' key={member._id}>
                    <img
                    src={member.imageUrl}
                    alt="profile"
                    className="rounded-full max-h-15 w-15 mr-2"
                    />

                    <p className="text-md mt-5 text-primary font-semibold capitalize">
                    {' '}
                    {member.FirstName} {member.LastName}
                    </p>

                    <p className="text-md mt-2 font-semibold capitalize">
                    {' '}
                    {member.address} 
                    </p>

                    <p className="text-md w-55 mt-2 font-medium capitalize ">
                    {' '}
                    { member.Description && member.Description.substring(0,70) }...{' '}
                    </p>

                  {team.leader._id === member._id ? (
                    <p className='mt-5 w-18 text-sm text-white font-semibold bg-primary rounded-full py-1 px-3 sm:ml-15'>
                         Leader
                    </p>
                  ) : (
                    <p className='mt-5 w-18 text-sm text-white font-semibold bg-orange-500 rounded-full py-1 px-2 sm:ml-15'>
                      Member
                    </p>
                  ) }
                    
                  
                </div>
               
                ))}
            </ul>
        </div>
        </div>

        
    {/*<div className="mx-auto xl:mx-[10rem] my-4 rounded-lg px-4 py-8">
        <div className="bg-white px-[2rem] py-4 shadow-lg rounded-lg overflow-hidden">
        <div className="z-20 h-15 md:h-35 bg-gray-200 text-black text-xl items-center flex justify-center font-semibold">
          <span className="text-primary">Welcome To</span>{' '}
          <span className=" ml-1"> {team.name}</span>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5"></div>
        <div className="flex justify-center items-center my-2">
          <img
            src={team.leader.imageUrl}
            alt="profile"
            className="rounded-full mr-2 max-h-16 w-16 mr-2"
          />
          <p className="text-lg  font-semibold capitalize">
            {' '}
            {team.leader.FirstName} {team.leader.LastName}
          </p>
          <p className="text-sm text-black font-semibold bg-gray-50 rounded-full py-1 px-2 sm:ml-8">
            Leader
          </p>
        </div>

        <div className="flex justify-center">
          <p className="text-lg text-black my-4 font-semibold sm:mr-8">
            Members:
          </p>
        </div>
        <div>
          <ul className="flex justify-center">
            {team.members.map((member: any) => (
              <li
                key={member._id}
                className="flex mx-2 px-2 py-1 rounded-full bg-gray-100"
              >
                <img
                  src={member.imageUrl}
                  alt="profile"
                  className="rounded-full mr-2 max-h-8 w-8 mr-2"
                />
                <p className="text-md font-semibold capitalize">
                  {' '}
                  {member.FirstName} {member.LastName}
                </p>
              </li>
            ))}
          </ul>
        </div>
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
        </ul>

        <div className="p-8">
          {activeTab === 'overview' && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                Description
              </h2>
            </>
          )}
        </div>
      </div>
        </div>   */}
    </ClientLayout>
  );
};

export default TeamsDetails;
