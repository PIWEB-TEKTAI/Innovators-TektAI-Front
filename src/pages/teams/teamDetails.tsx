// TeamDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import teamService from '../../services/teamsService';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useAuth } from '../../components/Auth/AuthProvider';
import InviteMembersForm from './InviteMembersForm';
import JoinRequests from './JoinRequests';

const TeamDetails = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('joinRequests'); // State to manage active tab
  const [isInviteMembersModal,setIsInviteMembersModal] = useState(false)
  const {userAuth } = useAuth();
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
      {isInviteMembersModal&&    
        <InviteMembersForm onClose={()=>{setIsInviteMembersModal(false)}} team={team}></InviteMembersForm>
}
    <div className='bg-white  rounded-lg p-4'>
    <div className="z-20 flex flex-col md:flex-row md:h-35 bg-gray-100 text-black text-2xl items-center justify-center font-semibold">
  <div className="text-primary">
    {"Welcome To ".split("").map((char, index) => (
      <span
        key={index}
        className={`text-black animated-text drop-shadow-2 animate-pulse`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {char}
      </span>
    ))}
  </div>
  <div className="ml-1 text-primary">
    {team.name.split("").map((char:any, index:any) => (
      <span
        key={index}
        className={`animated-text drop-shadow-[0_1px_4px_rgba(60,80,224,1)] animate-pulse ${index === 0 ? "uppercase" : ""}${char === " " ? "capitalize" : ""}`}
        style={{ animationDelay: `${(index + "Welcome To ").length * 0.1}s` }}
      >
      {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </div>
</div>

        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        {userAuth?._id ==team.leader._id && userAuth?.role == "challenger"&&
                  <div className="flex justify-end">        
                  <button 
                  onClick={()=>setIsInviteMembersModal(true)}
                  className='bg-primary text-white font-semibold rounded-lg p-2 m-2 hover:scale-[1.1]'>
                   Invite Members</button>
               </div>
        }
        </div>
        <div className="flex justify-center items-center my-2">

   
        <img src={team.leader.imageUrl} alt="profile" className="rounded-full mr-2 max-h-16 w-16 mr-2" />
        <p className='text-lg  font-semibold capitalize' > {team.leader.FirstName} {team.leader.LastName}</p>
        <p className='text-sm text-white font-semibold bg-primary rounded-full py-1 px-2 sm:ml-8'>
        Leader 
      </p>

      </div>

    <div className="flex justify-center">
    <p className='text-lg text-black my-4 font-semibold sm:mr-8'>
        Members: 
      </p>     
  
    </div>
       <div >
       <ul className="flex sm:px-24 justify-around">
        {team.members.map((member:any) => (
          <li key={member._id} className=" mx-2 px-2 py-1 text-center ">
            <div className="flex justify-center">
            <img src={member.imageUrl} alt="profile" className="rounded-full mr-2 max-h-16 w-16 mr-2" />

            </div>
          <p className='text-md font-semibold text-center capitalize' > {member.FirstName} {member.LastName}</p>
          </li>
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
            onClick={() => handleTabChange('joinRequests')}
          >
            Join Requests
          </a>
        </li>
        {/* Add other tabs similarly */}
      </ul>

      <div className="p-8">
        {activeTab === 'joinRequests' && (
          <>
            <JoinRequests team={team}></JoinRequests>
          </>
        )}
        {/* Add content for other tabs */}
      </div>
    </div>
    </ConnectedClientLayout>
  );
};

export default TeamDetails;
