import React, { useEffect, useState } from 'react';
import ClientLayout from '../../layout/clientLayout';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
  addSubmission,
  editSubmission,
  getSubmissionById,
  getSubmissionsByChallengeId,
  deleteSubmission
} from '../../services/submissionService';
import { ErrorToast, successfullToast } from '../../components/Toast';
import ModalForm from '../../components/modalForm';
import { useAuth } from '../../components/Auth/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Props } from 'react-select';
import Swal from 'sweetalert2';

const AddSubmissionForm: React.FC = () => {
  const { id } = useParams();

  const [titleError, setTitleError] = useState('');
  const [title, setTitle] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [description, setDescription] = useState('');

  const [DataSetFile, setDataSetFile] = useState<string | Blob>('');
  const [DataSetFileError, setDataSetFileError] = useState('');

  const [FileName, setFileName] = useState('');
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null,
  );

  const checkValidity = (name: any, value: any) => {
    if (name == 'title') {
      setTitle(value);
      if (!value.trim()) {
        setTitleError('Title is required');
      } else {
        setTitleError('');
      }
    } else if (name == 'description') {
      setDescription(value);
      if (!value.trim()) {
        setDescriptionError('Description is required');
      } else {
        setDescriptionError('');
      }
    } else if (name == 'dataSetFile') {
      if (!value.trim()) {
        setDataSetFileError('File is required');
      } else {
        setDataSetFileError('');
      }
    }
  };
  const isFormValid = () => {
    return (
      title !== '' &&
      description !== '' &&
      titleError === '' &&
      descriptionError === '' &&
      DataSetFile !== '' &&
      DataSetFileError === ''
    );
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setDataSetFile(file);
    setFileName(file.name);
    if (!file) {
      setDataSetFileError('File is required');
    } else {
      setDataSetFileError('');
    }
  };
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('file' + DataSetFile);

    addSubmission(
      {
        title: title,
        description: description,
        file: DataSetFile,
      },
      id,
    )
      .then((response) => {
        setAlert({
          type: 'success',
          message: 'submission added successfully',
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        setAlert({
          type: 'error',
          message: 'Error adding submission',
        });
      });
  };
  return (
    <div>
      <div className={`${alert && `mt-8`}`}>
        {alert?.type == 'success' && successfullToast(alert.message)}

        {alert?.type == 'error' && ErrorToast(alert.message)}
      </div>

      <div className="flex w-full p-1 flex-col  gap-1 border-full">
        {/* Content for Step 1 */}
        <div className="">
          <label className="mb-2.5 font-medium block text-black dark:text-white">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter the title of your competition"
            onChange={(e) => checkValidity('title', e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          {titleError && (
            <p className="text-red-500 text-sm mt-1">{titleError}</p>
          )}
        </div>

        <div>
          <label className="mb-2.5 font-medium  block text-black dark:text-white">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            rows={1}
            placeholder="Enter the description of your competition"
            onChange={(e) => checkValidity('description', e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          ></textarea>
          {descriptionError && (
            <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
          )}
        </div>

        <div>
          <div>
            <label className="mb-3 block font-medium text-black dark:text-white">
              Attach submission file
            </label>
            <div className="relative overflow-hidden">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                id="customFile"
                name="file"
                onChange={handleFileChange}
              />
              <label
                className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                htmlFor="customFile"
              >
                {FileName ? FileName : 'Upload submission file'}
              </label>
              {DataSetFileError && (
                <p className="text-red-500 text-sm mt-1">{DataSetFileError}</p>
              )}
            </div>
          </div>
        </div>
        {/* Navigation buttons */}
        <div className="flex justify-end">
          <button
            className="rounded bg-primary p-3  text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const EditSubmissionForm: React.FC<Props> = ({id}) => {

  const [titleError, setTitleError] = useState('');
  const [title, setTitle] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [description, setDescription] = useState('');

  const [DataSetFile, setDataSetFile] = useState<string | Blob>('');
  const [DataSetFileError, setDataSetFileError] = useState('');

  const [FileName, setFileName] = useState('');
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null,
  );

  const checkValidity = (name: any, value: any) => {
    if (name == 'title') {
      setTitle(value);
      if (!value.trim()) {
        setTitleError('Title is required');
      } else {
        setTitleError('');
      }
    } else if (name == 'description') {
      setDescription(value);
      if (!value.trim()) {
        setDescriptionError('Description is required');
      } else {
        setDescriptionError('');
      }
    } else if (name == 'dataSetFile') {
      if (!value.trim()) {
        setDataSetFileError('File is required');
      } else {
        setDataSetFileError('');
      }
    }
  };

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const data = await getSubmissionById(id);
        console.log(data)
        setTitle(data?.title || ''); 
        setDescription(data?.description || '');
        setFileName(data?.files[0].name);
       } catch (error) {
        console.error('Error fetching submission data:', error);
      }
    };


    fetchSubmission();
  }, []); 

  const isFormValid = () => {
    return (
      title !== '' &&
      description !== '' &&
      titleError === '' &&
      descriptionError === '' &&
      DataSetFile !== '' &&
      DataSetFileError === ''
    );
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    setDataSetFile(file);
    setFileName(file.name);
    if (!file) {
      setDataSetFileError('File is required');
    } else {
      setDataSetFileError('');
    }
  };
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('file' + DataSetFile);

    editSubmission(
      {
        title: title,
        description: description,
        file: DataSetFile,
      },
      id,
    )
      .then((response) => {
        setAlert({
          type: 'success',
          message: 'submission edited successfully',
        });

        setTimeout(() => {
          window.location.reload();

        }, 3000);
      
      })
      .catch((error) => {
        setAlert({
          type: 'error',
          message: 'Error editing submission',
        });
      });
  };
  return (
    <div>
      <div className={`${alert && `mt-8`}`}>
        {alert?.type == 'success' && successfullToast(alert.message)}

        {alert?.type == 'error' && ErrorToast(alert.message)}
      </div>

      <div className="flex w-full p-1 flex-col  gap-1 border-full">
        {/* Content for Step 1 */}
        <div className="">
          <label className="mb-2.5 font-medium block text-black dark:text-white">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter the title of your competition"
            onChange={(e) => checkValidity('title', e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          {titleError && (
            <p className="text-red-500 text-sm mt-1">{titleError}</p>
          )}
        </div>

        <div>
          <label className="mb-2.5 font-medium  block text-black dark:text-white">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            rows={1}
            placeholder="Enter the description of your competition"
            onChange={(e) => checkValidity('description', e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          ></textarea>
          {descriptionError && (
            <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
          )}
        </div>

        <div>
          <div>
            <label className="mb-3 block font-medium text-black dark:text-white">
              Attach submission file
            </label>
            <div className="relative overflow-hidden">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                id="customFile"
                name="file"
                onChange={handleFileChange}
              />
              <label
                className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                htmlFor="customFile"
              >
                {FileName ? FileName : 'Upload submission file'}
              </label>
              {DataSetFileError && (
                <p className="text-red-500 text-sm mt-1">{DataSetFileError}</p>
              )}
            </div>
          </div>
        </div>
        {/* Navigation buttons */}
        <div className="flex justify-end">
          <button
            className="rounded bg-primary p-3  text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const ChallengeDetails: React.FC = () => {
  const [challengeDetails, setChallengeDetails] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('overview'); // Default active tab
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [EditShowModal, setShowEditModal] = useState(false); // State to manage modal visibility
  const [openDropdowns, setOpenDropdowns] = useState(false);
  const { userAuth } = useAuth();

  const toggleDropdown = () => {
    if (openDropdowns === false) {
      setOpenDropdowns(true);
    } else {
      setOpenDropdowns(false);
    }
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
        console.log(fetchedSubmissions)
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
      const response = await axios.get(
        `http://localhost:3000/challenge/${id}`,
        
      );
      setChallengeDetails(response.data);
    } catch (error) {
      console.error('Error fetching challenge details:', error);
    }
  };

  useEffect(() => {
    fetchChallengeDetails();
  }, [id]);

  if (!challengeDetails) {
    return <div>Loading...</div>;
  }

  const getStatusColor = () => {
    switch (challengeDetails.status) {
      case 'open':
        return 'bg-blue-400';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (challengeDetails.status) {
      case 'open':
        return 'Open';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

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



  const handleDeleteSubmission = (id:any)=> {
    Swal.fire({
      title: 'Are you sure you want to delete your submission ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, validate !',
      cancelButtonText: 'Cancel'
    }).then((result:any) => {
      if (result.isConfirmed) {
        deleteSubmission(id)
        .then((response:any) => {
          console.log(response)
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
          if (error.response && error.response.data && error.response.data.msg) {
            const errorMessage = error.response.data.msg;
            console.error("Erreur lors du delete data :", errorMessage);
            setAlert({
              type: 'error',
              message: errorMessage,
            });
          } else {
            console.error("Erreur lors du delete data :", error.message);
            setAlert({
              type: 'error',
              message: error.message,
            });
          }
        });
      }
    });
  }

  return (
    
    <ClientLayout>
      <div className="mx-auto xl:mx-[10rem] my-4 rounded-lg px-4 py-8">
        <div className="bg-white px-[2rem] py-8 shadow-lg rounded-lg overflow-hidden">

        <div className={`${alert && `mt-8`}`}>
          {alert?.type == 'success' && successfullToast(alert.message)}
    
          {alert?.type == 'error' && ErrorToast(alert.message)}
        </div>

          <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0">
            <img
              src={`http://localhost:3000/images/${challengeDetails.image}`}
              alt="Challenge"
              className="w-50 h-30 mr-4 px-auto rounded-lg"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 capitalize">
                {challengeDetails.title}
              </h2>
              <div className="flex items-center mt-4">
                <div
                  className={`rounded-full py-1 px-3 text-sm font-semibold mr-4 ${challengeDetails.status === 'open' ? 'bg-blue-400' : challengeDetails.status === 'archived' ? 'bg-red-600' : 'bg-green-500'} text-white`}
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
                  handleCompanyNameClick(challengeDetails.createdBy.company)
                }
              >
                Hosted by: {challengeDetails.createdBy.company.name}
              </p>
              {challengeDetails.status === 'open' && (
                <p className="mt-2 text-gray-600">
                  Time Left: {timeLeftString}
                </p>
              )}
            </div>
          </div>
        </div>

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
                className={`bg-white inline-block rounded-t py-2 px-4 text-blue-700 font-semibold ${activeTab == 'overview' ? 'bg-blue-100 border-l border-t border-r ' : ''}`}
                onClick={() => handleTabChange('overview')}
              >
                Overview
              </a>
            </li>
            <li className="mr-1">
              <a
                className={`bg-white inline-block py-2 rounded-t  px-4 text-blue-500 hover:text-blue-800 font-semibold ${activeTab === 'leaderboard' ? 'bg-blue-100 border-l border-t border-r' : ''}`}
                onClick={() => handleTabChange('leaderboard')}
              >
                Leaderboard
              </a>
            </li>
            <li className="mr-1">
              <a
                className={`bg-white inline-block py-2 rounded-t  px-4 text-blue-500 hover:text-blue-800 font-semibold ${activeTab === 'discussion' ? 'bg-blue-100 border-l border-t border-r' : ''}`}
                onClick={() => handleTabChange('discussion')}
              >
                Discussion
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
          </ul>

          <div className="p-8">
            {activeTab === 'overview' && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">
                  Description
                </h2>
                <p className="text-gray-600 mt-4 break-words text-black">
                  {challengeDetails.description}
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-8">
                  Prizes
                </h2>
                <p className="text-gray-600 mt-4 text-black">
                  {challengeDetails.price}Dt
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 ">
                  Submission Guidelines
                </h2>
                <p className="text-gray-600 mt-4 break-words text-black">
                  {challengeDetails.description}
                </p>
              </>
            )}
            {activeTab === 'leaderboard' && (
              <div>
                <h2>Leaderboard</h2>
              </div>
            )}
            {activeTab === 'discussion' && (
              <div>
                <h2>Discussion</h2>
              </div>
            )}
            {activeTab === 'submission' && (
              <div>
                <div className="flex justify-end mb-4">
                  {userAuth?.role === 'challenger' && (
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
                    onSave={() => {}}
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
                        onSave={() => {}}
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
                            {submission.files[0].name.substring(0, 15)}...
                          </p>


                          {userAuth?._id === submission.submittedBy ?
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
                                  <button onClick={()=>handleDeleteSubmission(submission._id)} className=" w-full flex justify-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-semibold">
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div> : null}
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
      </div>
    </ClientLayout>
  );
};

export default ChallengeDetails;
