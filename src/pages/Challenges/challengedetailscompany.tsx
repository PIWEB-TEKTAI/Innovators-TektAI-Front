import React, { useEffect, useState } from 'react';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import {
  useParams,
} from 'react-router-dom';


import {
  format,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import CompanyModal from './companydetailsmodal'; // Import your CompanyModal component
import {
  getSubmissionsByChallengeId,
  deleteSubmission,
} from '../../services/submissionService';
import { ErrorToast, successfullToast } from '../../components/Toast';
import ModalForm from '../../components/modalForm';
import { useAuth } from '../../components/Auth/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import ChallengeParticipations from './ChallengeParticipations';
import { addSoloParticipationRequest } from '../../services/challengeService';
import Modal from '../../components/modal';
import TeamSelectionModal from './teamSelectionModal';
import Discussion from './discussion';
import { FaHeart } from 'react-icons/fa';
import Overview from './overview';
import Leaderboard from './leaderboard';


import { faEye } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../common/Loader';
import AddSubmissionForm from './AddSubmittion';
import EditSubmissionForm from './EditSubmittion';
import { Tooltip as ReactTooltip, Tooltip } from 'react-tooltip'
import RecommendChallengersToChallenge from './recommendChallengersToCha';
import DiscussionStatistics from './challengeDiscussionStatistics';






const ChallengeDetailsCompany: React.FC = () => {
  const [challengeDetails, setChallengeDetails] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('overview'); // Default active tab
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [EditShowModal, setShowEditModal] = useState(false); // State to manage modal visibility
  const [openDropdowns, setOpenDropdowns] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [confiramtionMessage, setConfirmationMessage] = useState('');
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [clicked, setClicked] = useState(false);


  const [errorConfirmationMesage, setErrorConfirmationMessage] =
    useState(false);
  let { userAuth } = useAuth();

  const handleConfirmationModalAppearance = () => {
    setShowConfirmationModal(true);
  };


  const toggleDropdown = () => {
    if (openDropdowns === false) {
      setOpenDropdowns(true);
    } else {
      setOpenDropdowns(false);
    }
  };

  const handleJoinTeamClick = () => {
    setShowTeamModal(true);
  };

  const handleTeamModalClose = () => {
    setShowTeamModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleCompanyNameClick = (companyDetails: any) => {
    console.log('Company details:', companyDetails);
    setSelectedCompany(companyDetails);
    setIsModalOpen(true);
  };
  useEffect(() => {
    console.log('isModalOpen:', isModalOpen); // Check if this log updates when the modal state changes
  }, [isModalOpen]);

  const { id } = useParams();
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const fetchedSubmissions = await getSubmissionsByChallengeId(id);
        setSubmissions(fetchedSubmissions);
        console.log(fetchedSubmissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [id]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = submissions.slice(indexOfFirstItem, indexOfLastItem);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null,
  );

  const fetchChallengeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/challenge/${id}`);
      setChallengeDetails(response.data);
    } catch (error) {
      console.error('Error fetching challenge details:', error);
    }
  };

  useEffect(() => {
    fetchChallengeDetails();
  }, [id]);




  if (!challengeDetails) {
    return <div>    <Loader />    </div>;
  }

  const formattedStartDate = format(
    new Date(challengeDetails.startDate),
    'dd MMMM, yyyy',
  );
  const formattedEndDate = format(
    new Date(challengeDetails.endDate),
    'dd MMMM, yyyy',
  );
  const now = new Date();
  const endDate = new Date(challengeDetails.endDate);
  const monthsLeft = differenceInMonths(endDate, now);
  const daysLeft = differenceInDays(endDate, now) % 30;
  const hoursLeft = differenceInHours(endDate, now) % 24;
  const minutesLeft = differenceInMinutes(endDate, now) % 60;
  const secondsLeft = differenceInSeconds(endDate, now) % 60;
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const timeLeftString = `${monthsLeft > 0 ? `${monthsLeft} months, ` : ''}${daysLeft > 0 ? `${daysLeft} days, ` : ''}${hoursLeft > 0 ? `${hoursLeft} hours, ` : ''}${minutesLeft > 0 ? `${minutesLeft} minutes, ` : ''}${secondsLeft} seconds`;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleDeleteSubmission = (id: any) => {
    Swal.fire({
      title: 'Are you sure you want to delete your submission ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, validate !',
      cancelButtonText: 'Cancel',
    }).then((result: any) => {
      if (result.isConfirmed) {
        deleteSubmission(id)
          .then((response: any) => {
            console.log(response);
            console.log('data deleted successfully :', response.msg);
            setAlert({
              type: 'success',
              message: '' + response.msg,
            });
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error: AxiosError<any>) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.msg
            ) {
              const errorMessage = error.response.data.msg;
              console.error('Erreur lors du delete data :', errorMessage);
              setAlert({
                type: 'error',
                message: errorMessage,
              });
            } else {
              console.error('Erreur lors du delete data :', error.message);
              setAlert({
                type: 'error',
                message: error.message,
              });
            }
          });
      }
    });
  };
  const AddTofavories = async (challengeId: any) => {
    try {
      const response = await axios.put(`http://localhost:3000/challenges/Favories/${challengeId}/${userAuth?._id}`);

      if (response.status !== 200) {
        throw new Error('Failed to add challenge to favorites');
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const Removefavories = async (challengeId: any) => {
    try {
      const response = await axios.put(`http://localhost:3000/challenges/Unfavorite/${challengeId}/${userAuth?._id}`);

      if (response.status !== 200) {
        throw new Error('Failed to remove challenge to favorites');
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSoloParticipationRequest = async () => {
    try {
      const responseData = await addSoloParticipationRequest(id, userAuth?._id);
      setConfirmationMessage('Participation request Added succesfully');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      setConfirmationMessage(errorMessage);
      setErrorConfirmationMessage(true);
    } finally {
      setTimeout(() => {
        setShowConfirmationModal(false);
      }, 2000);
    }
  };



  
  return (
    <ConnectedClientLayout>
      {showTeamModal && <TeamSelectionModal onClose={handleTeamModalClose} />}
      <Modal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        title="Add Paticipation Request"
        content="Are you sure you want to participate to this challenge?"
        onClose={closeModal}
        onSave={handleSoloParticipationRequest}
        postSaveMessage={confiramtionMessage}
        error={errorConfirmationMesage}
      />


        <div className="bg-white px-[2rem] py-4 shadow-lg rounded-lg overflow-hidden">
          {userAuth?.favories?.includes(challengeDetails._id) || clicked ? (
            <div className="flex bg-white justify-end">

              <button
                className="text-red-500 hover:text-red-700 flex-col"
                onClick={() => {
                  Removefavories(challengeDetails._id)
                  setClicked(false)
                }}>
                <FaHeart style={{ fontSize: '2em', fill: 'red' }} data-tooltip-id="my-tooltip" data-tooltip-content="Remove from favorites" />
                <Tooltip id="my-tooltip" />

              </button>
            </div>
          ) : (
            <div className="flex bg-white justify-end">

              <button
                className="flex-col"
                onClick={() => {
                  AddTofavories(challengeDetails._id),
                    setClicked(true)
                }
                }>
                <FaHeart style={{ fontSize: '2em', border: '2px solid transparent' }} data-tooltip-id="my-tooltip" data-tooltip-content="Add to favorites" />
                <Tooltip id="my-tooltip" />
              </button>
            </div>
          )}

          <div className={`${alert && `mt-8`}`}>
            {alert?.type == 'success' && successfullToast(alert.message)}

            {alert?.type == 'error' && ErrorToast(alert.message)}
          </div>

          <div className="flex flex-col pb-4 pt-2 sm:flex-row sm:items-center mt-2 sm:mt-0">
            <img
              src={`http://localhost:3000/images/${challengeDetails.image}`}
              alt="Challenge"
              className="w-full sm:w-50 h-auto mr-4 px-auto rounded-lg"
            />

            <div className="flex flex-col sm:flex-grow">
              <h2 className="text-3xl font-bold text-gray-900 mt-2 capitalize break-words">
                {challengeDetails.title}

              </h2>

              <div className="flex items-center mt-4">
                <div
                  className={`rounded-full py-1 px-3 text-sm font-semibold mr-4 ${challengeDetails.status === 'open'
                    ? 'bg-blue-400'
                    : challengeDetails.status === 'archived'
                      ? 'bg-red-600'
                      : 'bg-green-500'
                    } text-white`}
                >
                  {challengeDetails.status === 'open'
                    ? 'Open'
                    : challengeDetails.status === 'archived'
                      ? 'Archived'
                      : 'Completed'}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-current text-gray-500 mr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                <p className="text-gray-600">
                  {formattedStartDate} - {formattedEndDate}
                </p>
              </div>
              <p
                className="text-gray-600 font-bold cursor-pointer mt-2"
                onClick={() =>
                  handleCompanyNameClick(challengeDetails.createdBy)
                }
              >
                Hosted by: {challengeDetails.createdBy.company.name}
              </p>
              {challengeDetails.status === 'open' && (
                <p className="mt-2 text-red-600  font-bold ">
                  Time Left: {timeLeftString}
                </p>
              )}
            </div>

       

          </div>
        </div>

        {userAuth?.role === 'challenger' &&
          challengeDetails.status == 'open' &&
          !challengeDetails.participations.soloParticipants.includes(
            userAuth._id,
          ) &&
          !challengeDetails.participations.soloParticipationRequests.includes(
            userAuth._id,
          ) &&
          !challengeDetails.participations.TeamParticipants.some(
            (team: any) =>
              team?.leader._id == userAuth._id ||
              team.members.some((member: any) => {
                member == userAuth._id;
              }),
          ) &&
          !challengeDetails.participations.TeamParticipationRequests.some(
            (team: any) =>
              team?.leader._id == userAuth._id ||
              team.members.some((member: any) => {
                member == userAuth._id;
              }),
          ) && (
            <div className="my-4 py-4  bg-white pt-2 rounded-lg ">
              <div className="flex justify-center p-4">
                <p className="max-w-[35rem] text-center">
                  Step into the challenge, either as a solo adventurer or with a team at your side. The choice is yours, and the journey awaits.
                </p>
              </div>
              <div className="flex flex-wrap justify-center">
                <div className="flex-col m-1">
                  <button
                    onClick={handleConfirmationModalAppearance}
                    className="text-lg p-2 border mr-2 hover:text-primary text-white border-gray-300 bg-black hover:bg-opacity-90 hover:scale-[1.1] rounded-md font-semibold group"
                  >
                    <span className="group-hover:ease-in duration-300">
                      Solo Join
                    </span>
                    <img src="/src/images/user/graphic_designer_man.jpg" alt="solo join" className='max-h-[7rem] max-w-[7rem] sm:max-w-[15rem] sm:max-h-[15rem] rounded-xl p-2' />
                  </button>
                </div>
                <div className="flex-col my-1 mx-2">
                  <button
                    className="text-lg p-2 bg-primary border border-gray-500 hover:text-black rounded-md text-white hover:scale-[1.1] font-semibold group"
                    onClick={handleJoinTeamClick}
                  >
                    <span className="group-hover:ease-in duration-300">
                      Join a Team
                    </span>
                    <img src="/src/images/team/team.jpg" alt=" join a team" className='max-h-[7rem] max-w-[7rem] sm:max-w-[15rem] sm:max-h-[15rem] rounded-xl p-2' />
                  </button>
                </div>
              </div>

            </div>
          )}
        {isModalOpen && (
          <CompanyModal
            company={selectedCompany}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        {/* Navigation Menu */}
        <div className="bg-white rounded-lg my-6">
          <ul className="p-8 flex cursor-pointer flex-wrap sm:flex-nowrap border-gray-200 border-b py-4">
            <li className="-mb-px mr-1">
              <a
                className={`bg-white inline-block rounded-t py-2 px-4 hover:text-blue-700 text-blue-500 font-semibold ${activeTab == 'overview' ? 'bg-blue-100 text-blue-700 border-l border-t border-r ' : ''}`}
                onClick={() => handleTabChange('overview')}
              >
                Overview
              </a>
            </li>
            <li className="mr-1">
              <a
                className={`bg-white inline-block py-2 rounded-t  px-4 text-blue-500 hover:text-blue-800 font-semibold ${activeTab === 'leaderboard' ? 'bg-blue-100 border-l text-blue-700 border-t border-r' : ''}`}
                onClick={() => handleTabChange('leaderboard')}
              >
                Leaderboard
              </a>
            </li>
            <li className="mr-1">
              <a
                className={`bg-white inline-block py-2 rounded-t  px-4 text-blue-500 hover:text-blue-800 font-semibold ${activeTab === 'discussion' ? 'bg-blue-100 border-l text-blue-700 border-t border-r' : ''}`}
                onClick={() => handleTabChange('discussion')}
              >
                Discussion
              </a>
            </li>
            <li className="mr-1">
              <a
                className={`bg-white inline-block py-2 rounded-t  px-4 text-blue-500 hover:text-blue-800 font-semibold ${activeTab === 'discussionStatistics' ? 'bg-blue-100 border-l text-blue-700 border-t border-r' : ''}`}
                onClick={() => handleTabChange('discussionStatistics')}
              >
                Discussion statistics
              </a>
            </li>
            <li className="-mb-px mr-1">
              <a
                className={`bg-white inline-block rounded-t py-2 px-4 hover:text-blue-700 text-blue-500 font-semibold ${activeTab == 'participations' ? 'bg-blue-100 text-blue-700 border-l border-t border-r ' : ''}`}
                onClick={() => handleTabChange('participations')}
              >
                Participations
              </a>
            </li>

            <li className="mr-1">
              <a
                className={`bg-white inline-block py-2 px-4 rounded-t  text-blue-500 hover:text-blue-800 font-semibold ${activeTab === 'submission' ? 'bg-blue-100 border-l border-t border-r' : ''}`}
                onClick={() => handleTabChange('submission')}
              >
                Submission
              </a>
            </li>
            {userAuth?.role=="company"&&
            (<>
            <li className="-mb-px mr-1">
              <a
                className={`bg-white inline-block rounded-t py-2 px-4 hover:text-blue-700 text-blue-500 font-semibold ${activeTab == 'challengersRecommendations' ? 'bg-blue-100 text-blue-700 border-l border-t border-r ' : ''}`}
                onClick={() => handleTabChange('challengersRecommendations')}
              >
                Challengers Recommendations
              </a>
            </li>
            </>)
            }
          </ul>

          <div className="p-8">
          {userAuth?.role=="company" && activeTab === 'challengersRecommendations' && (
              <RecommendChallengersToChallenge challenge={challengeDetails} />

            )}
            {activeTab === 'overview' && (
              <Overview />

            )}

            {activeTab === 'leaderboard' && (
              <Leaderboard />
            )}
            {activeTab === 'discussion' && (
              <Discussion />
            )}
               {activeTab === 'discussionStatistics' && (
              <DiscussionStatistics />
            )}
            {activeTab == 'participations' && (
              <div>
                <ChallengeParticipations
                  challenge={challengeDetails}
                  userAuth={userAuth}
                />
              </div>
            )}

            {activeTab === 'submission' && (
              <div>
                <div className="flex justify-end mb-4">
                  {userAuth?.role === 'challenger' &&
                    (challengeDetails.participations.soloParticipants.includes(
                      userAuth._id,
                    ) ||
                      challengeDetails.participations.TeamParticipants.some(
                        (team: any) =>
                          team.leader &&
                          team.leader._id &&
                          team.leader._id == userAuth._id,
                      )) &&
                    challengeDetails.status == 'open' && (
                      <button
                        onClick={openModal}
                        className="rounded-full bg-green-600 p-3 py-3 text-sm font-semibold text-gray disabled:opacity-60 hover:bg-opacity-90"
                      >
                        Add Submission
                      </button>
                    )}

                  <ModalForm
                    showModal={showModal}
                    setShowModal={setShowModal}
                    title="Add Submission"
                    content={<AddSubmissionForm />}
                    onClose={closeModal}
                    onSave={() => { }}
                  />
                </div>
                <ul>
                  {currentItems.map((submission) => (
                    <li
                      className="border-b border-gray-300 justify-between flex p-2"
                      key={submission.id}
                    >
                      <div className="w-full flex justify-between">
                        <ModalForm
                          showModal={EditShowModal}
                          setShowModal={setShowEditModal}
                          title="Edit Submission"
                          content={<EditSubmissionForm id={submission._id} />}
                          onClose={closeEditModal}
                          onSave={() => { }}
                        />
                        <div className="flex-col">
                          <p className="break-words text-black font-semibold">
                            {submission.title}
                          </p>
                          <p className="break-words text-black">
                            {submission.description.substring(0, 60)}
                          </p>
                        </div>

                        <div className="flex">
                          <p className="break-words cursor-pointer p-2 mr-5 bg-gray-300 text-black sm:w-[12rem] rounded-lg">
                            {submission.codeSourceFile.name.substring(0, 20)}...
                          </p>

                          {/* View icon */}
                          <div className="p-2 mt-2  text-primary cursor-pointer focus:outline-none">
                            <Link to={`/submission/details/${submission._id}`}>
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                          </div>


                          {userAuth?._id === submission.submittedBy._id ? (
                            <div className="relative">
                              <button
                                id={`dropdownMenuIconButton_${submission.id}`}
                                onClick={() => toggleDropdown()}
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  style={{ color: '#3A8EBA' }}
                                  className="mt-2 ml-1 w-5 h-5 "
                                />
                              </button>

                              {/* Dropdown menu */}
                              <div
                                id={`dropdownDots${submission.id}`}
                                className={`${openDropdowns ? 'block' : 'hidden'} z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                              >
                                <ul
                                  className="py-2 text-sm text-gray-700 dark:text-gray-200 font-semibold"
                                  aria-labelledby={`dropdownMenuIconButton_${submission.id}`}
                                >
                                  <li>
                                    <button
                                      onClick={openEditModal}
                                      className=" w-full flex justify-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-semibold"
                                    >
                                      Edit
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() =>
                                        handleDeleteSubmission(submission._id)
                                      }
                                      className=" w-full flex justify-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-semibold"
                                    >
                                      Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  ))}


                </ul>
                {/* Pagination */}
                <nav>
                  <ul className="pagination">
                    {submissions.length > itemsPerPage &&
                      Array.from({
                        length: Math.ceil(submissions.length / itemsPerPage),
                      }).map((_, index) => (
                        <li key={index} className="page-item">
                          <button
                            onClick={() => paginate(index + 1)}
                            className="page-link bg-primary h-[2rem] w-[2rem] text-white rounded-full "
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
  
    </ConnectedClientLayout>
  );
};

export default ChallengeDetailsCompany;
