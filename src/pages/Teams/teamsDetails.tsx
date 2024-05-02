// TeamDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import teamService from '../../services/teamsService';
import ClientLayout from '../../layout/clientLayout';
import Modal from '../../components/modal';
import { useAuth } from '../../components/Auth/AuthProvider';

const TeamsDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview'); // State to manage active tab
  const [showModal, setShowModal] = useState(false);
  const [joinMessage,setJoinMessage] = useState('');
  const {userAuth} = useAuth();
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
    return <div>Loading...</div>;
  }
  const closeModal = () => {
    setShowModal(false);
  };
    
  const handleJoinTeam = async (teamId:any) => {
    try {
      await teamService.joinTeamRequest(teamId);
      setJoinMessage("Request sent succesfully")
    } catch (error:any) {
      setJoinMessage(error.response.data.message);
    }
  };  return (
    <ClientLayout>
            <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Add Join Request"
        content="Are you sure you want to join this team?"
        onClose={closeModal}
        onSave={()=>handleJoinTeam(team._id)}
        postSaveMessage={joinMessage}
      />
        <div className="mx-auto xl:mx-[10rem] my-4 rounded-lg px-4 py-8">
            <div className="z-20 py-8 bg-white rounded-lg ">
       
             
              <div className="text-black text-xl items-center flex justify-center font-semibold  py-2">
              <span>Welcome To</span> <span className=' text-primary ml-1'> {team.name}</span>

              </div>
              {userAuth?.role === "challenger" && !team.requests?.some((request:any) => request._id === userAuth?._id) && !team.members?.some((member:any) => member._id === userAuth?._id)&&!team.invitations?.some((invitation:any) => invitation._id === userAuth?._id)  && (
              <div className="flex items-center justify-center">
                <img src="/src/images/team/5346323.jpg" className="hidden sm:block w-[13rem] h-[13rem]" alt="mockup" />

                <span className='break-words flex-col p-8 hover:text-black hover:bg-gray-100 hover:font-semibold rounded-full m-4 cursor-pointer max-w-[32rem]'>
                  Ready to dive into an epic adventure? Join our team and become part of a thrilling journey filled with camaraderie, innovation, and endless possibilities!
                </span>
                <button onClick={() => setShowModal(true)} className='max-h-16 text-white bg-primary font-semibold rounded-lg py-1 hover:bg-opacity-80 hover:scale-[1.05] p-4 text-lg'>
                  Join Us
                </button>
              </div>
            )}


            </div>
            
            <div className="z-20 h-15 md:h-35 rounded-lg text-black text-xl items-center flex justify-start font-semibold">
                <span className='rounded-full bg-white px-4 py-2'>Team Members</span>
            </div>
            <div>
            <ul className="flex justify-center  flex-wrap">
                {team.members.map((member: any) => (
                <div className='card-design2 ml-5 bg-white' key={member._id}>
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
