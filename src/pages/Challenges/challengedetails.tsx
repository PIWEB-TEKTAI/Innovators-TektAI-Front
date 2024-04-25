import React, { useEffect, useState } from 'react';
import ClientLayout from '../../layout/clientLayout';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios, { AxiosError } from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  deleteSubmission,
} from '../../services/submissionService';
import { ErrorToast, successfullToast } from '../../components/Toast';
import ModalForm from '../../components/modalForm';
import { useAuth } from '../../components/Auth/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Props } from 'react-select';
import Swal from 'sweetalert2';
import ChallengeParticipations from './ChallengeParticipations';
import { addSoloParticipationRequest } from '../../services/challengeService';
import Modal from '../../components/modal';
import TeamSelectionModal from './teamSelectionModal';
import Discussion from './discussion';
import { challenge } from '../../types/challenge';

const AddSubmissionForm: React.FC = () => {
  const { id } = useParams();

  const [step, setStep] = useState(1);
  const [titleError, setTitleError] = useState('');
  const [title, setTitle] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [description, setDescription] = useState('');

  const [DataSetFile, setDataSetFile] = useState<string | Blob>('');
  const [DataSetFileError, setDataSetFileError] = useState('');


  const [Output, setOutput] = useState('');
  const [OutputError, setOutputError] = useState('');


  const [presentationFile, setPresentationFile] = useState<string | Blob>('');
  const [presentationFileError, setPresentationFileError] = useState('');

  const [presentationFileName, setPresentationFileName] = useState('');
  

  const [codeSourceFile, setCodeSourceFile] = useState<string | Blob>('');
  const [CodeSourceFileError, setCodeSourceFileError] = useState('');
  const [codeSourceFileName, setCodeSourceFileName] = useState('');


  const [readMeFile, setReadMeFileFile] = useState<string | Blob>('');
  const [readMeFileError, setReadMeFileFileError] = useState('');

  const [readmeFileName, setReadmeFileName] = useState('');


  const [reportFile, setReportFile] = useState<string | Blob>('');
  const [ReportFileError, setReportFileError] = useState('');
  const [reportFileName, setReportFileName] = useState('');



  const [demoFile, setDemoFile] = useState<string | Blob>('');
  const [DemoError, setDemoError] = useState('');
  const [demoFileName, setDemoFileName] = useState('');




  const [challengeData,setChallengeData] = useState<challenge>();


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
    }else if (name == 'output') {
      setOutput(value);
      if (!value.trim()) {
        setOutputError('Output is required');
      } else {
        setOutputError('');
      }
    }
  };
  const isFormValid = () => {
    return (
      title !== '' &&
      description !== '' &&
      titleError === '' &&
      descriptionError === '' 
    
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

  const handlePresentationFileChange = (e: any) => {
    const file = e.target.files[0];
    setPresentationFile(file);
    setPresentationFileName(file.name);
    if (!file) {
      setPresentationFileError('File is required');
    } else {
      setPresentationFileError('');
    }
  };

  const handleSourceCodeFileChange = (e: any) => {
    const file = e.target.files[0];
    setCodeSourceFile(file);
    setCodeSourceFileName(file.name);
    if (!file) {
      setCodeSourceFileError('File is required');
    } else {
      setCodeSourceFileError('');
    }
  };


  const handleReadMeFileChange = (e: any) => {
    const file = e.target.files[0];
    setReadMeFileFile(file);
    setReadmeFileName(file.name);
    if (!file) {
      setReadMeFileFileError('File is required');
    } else {
      setReadMeFileFileError('');
    }
  };


  const handleReportFileChange = (e: any) => {
    const file = e.target.files[0];
    setReportFile(file);
    setReportFileName(file.name);
    if (!file) {
      setReportFileError('File is required');
    } else {
      setReportFileError('');
    }
  };


  const handleDemoFileChange = (e: any) => {
    const file = e.target.files[0];
    setDemoFile(file);
    setDemoFileName(file.name);
    if (!file) {
      setDemoError('File is required');
    } else {
      setDemoError('');
    }
  };

  
  const fetchChallengeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/challenge/${id}`);
      setChallengeData(response.data);
    } catch (error) {
      console.error('Error fetching challenge details:', error);
    }
  };

  useEffect(() => {
    fetchChallengeDetails();
  }, [id]);


  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('file' + DataSetFile);

    addSubmission(
      {
        title: title,
        description: description,
        output:Output,
        datasetFile:DataSetFile,
        presentationFile:presentationFile,
        codeSourceFile: codeSourceFile,
        reportFile:reportFile,
        demoFile:demoFile,
        readMeFile:readMeFile,
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
       {step === 1 ? (

          <div>
             <div>
               <label className="mb-2.5 font-medium block text-black dark:text-white">
                 Title
               </label>
               <input
                 type="text"
                 name="title"
                 value={title}
                 placeholder="Enter the title of your submission"
                 onChange={(e) => checkValidity('title', e.target.value)}
                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
               />
               {titleError && (
                 <p className="text-red-500 text-sm mt-1">{titleError}</p>
               )}
             </div>
     
             <div>
               <label className="mt-3 mb-2.5 font-medium  block text-black dark:text-white">
                 Description
               </label>
               <textarea
                 name="description"
                 value={description}
                 rows={1}
                 placeholder="Enter the description of your submittion"
                 onChange={(e) => checkValidity('description', e.target.value)}
                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
               ></textarea>
               {descriptionError && (
                 <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
               )}
             </div>

             {challengeData?.bareme.output && (
            <div>
              <label className=" mb-2.5 font-medium  block text-black dark:text-white">
                Output
              </label>
              <input
                type='text'
                name="output"
                value={Output}
                placeholder="Enter the output of your submission"
                onChange={(e) => checkValidity('output', e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></input>
              {OutputError && (
                <p className="text-red-500 text-sm mt-1">{OutputError}</p>
              )}
            </div>
          )}

          {challengeData?.bareme.presentation && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach presentation file
              </label>
              <div className="relative overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="customFile"
                  name="file"
                  onChange={handlePresentationFileChange}
                />
                <label
                  className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                  htmlFor="customFile"
                >
                  {presentationFileName ? presentationFileName : 'Upload presentation file'}
                </label>
                {presentationFileError && (
                  <p className="text-red-500 text-sm mt-1">{presentationFileError}</p>
                )}
              </div>
            </div>
          )}
     
          </div>
       ) : (
        <div>          
          {challengeData?.bareme.codeSource && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach source code file
              </label>
              <div className="relative overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="customFile"
                  name="file"
                  onChange={handleSourceCodeFileChange}
                />
                <label
                  className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                  htmlFor="customFile"
                >
                  {codeSourceFileName ? codeSourceFileName : 'Upload source code file'}
                </label>
                {CodeSourceFileError && (
                  <p className="text-red-500 text-sm mt-1">{CodeSourceFileError}</p>
                )}
              </div>
            </div>
          )}

          {challengeData?.bareme.dataSet && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach dataset file
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
                  {FileName ? FileName : 'Upload dataset file'}
                </label>
                {DataSetFileError && (
                  <p className="text-red-500 text-sm mt-1">{DataSetFileError}</p>
                )}
              </div>
            </div>
          )}

          
          {challengeData?.bareme.readmeFile && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach README file
              </label>
              <div className="relative overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="customFile"
                  name="file"
                  onChange={handleReadMeFileChange}
                />
                <label
                  className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                  htmlFor="customFile"
                >
                  {readmeFileName ? readmeFileName : 'Upload README file'}
                </label>
                {readMeFileError && (
                  <p className="text-red-500 text-sm mt-1">{readMeFileError}</p>
                )}
              </div>
            </div>
          )}
          
          {challengeData?.bareme.rapport && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach detailed report file
              </label>
              <div className="relative overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="customFile"
                  name="file"
                  onChange={handleReportFileChange}
                />
                <label
                  className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                  htmlFor="customFile"
                >
                  {reportFileName ? reportFileName : 'Upload detailed report file'}
                </label>
                {ReportFileError && (
                  <p className="text-red-500 text-sm mt-1">{ReportFileError}</p>
                )}
              </div>
            </div>
          )}
          
             
          {challengeData?.bareme.Demo && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach demonstration file
              </label>
              <div className="relative overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="customFile"
                  name="file"
                  onChange={handleDemoFileChange}
                />
                <label
                  className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                  htmlFor="customFile"
                >
                  {demoFileName ? demoFileName : 'Upload demonstration report file'}
                </label>
                {DemoError && (
                  <p className="text-red-500 text-sm mt-1">{DemoError}</p>
                )}
              </div>
            </div>
          )}
          
      </div>
       )} 
     
    
        {/* Navigation buttons */}
        <div className="flex justify-between">
          { step === 2 && (
               <button
               className="rounded bg-primary p-2 px-4  text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
               onClick={prevStep}
             >
               back
             </button>
          )}
        
          {step === 1 ? (
               <button
               className="rounded bg-primary p-2 px-4 ml-auto text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
               onClick={nextStep}
               disabled={!isFormValid()}
             >
               next
             </button>
          ): (
            <button
            className="rounded bg-primary p-2 px-4  text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Submit
          </button>
          )}
         
        </div>
      </div>
    </div>
  );
};

const EditSubmissionForm: React.FC<Props> = ({ id }) => {
  const [titleError, setTitleError] = useState('');
  const [title, setTitle] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [description, setDescription] = useState('');

  const [DataSetFile, setDataSetFile] = useState<string | Blob>('');
  const [DataSetFileError, setDataSetFileError] = useState('');

  const [step, setStep] = useState(1);


  const [Output, setOutput] = useState('');
  const [OutputError, setOutputError] = useState('');


  const [presentationFile, setPresentationFile] = useState<string | Blob>('');
  const [presentationFileError, setPresentationFileError] = useState('');

  const [presentationFileName, setPresentationFileName] = useState('');
  

  const [codeSourceFile, setCodeSourceFile] = useState<string | Blob>('');
  const [CodeSourceFileError, setCodeSourceFileError] = useState('');
  const [codeSourceFileName, setCodeSourceFileName] = useState('');


  const [readMeFile, setReadMeFileFile] = useState<string | Blob>('');
  const [readMeFileError, setReadMeFileFileError] = useState('');

  const [readmeFileName, setReadmeFileName] = useState('');


  const [reportFile, setReportFile] = useState<string | Blob>('');
  const [ReportFileError, setReportFileError] = useState('');
  const [reportFileName, setReportFileName] = useState('');



  const [demoFile, setDemoFile] = useState<string | Blob>('');
  const [DemoError, setDemoError] = useState('');
  const [demoFileName, setDemoFileName] = useState('');

  const [challengeDetailsData,setChallengeDetailsData] = useState<challenge>();

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
    
    }else if (name == 'output') {
      setOutput(value);
      if (!value.trim()) {
        setOutputError('Output is required');
      } else {
        setOutputError('');
      }
    }
  };

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const data = await getSubmissionById(id);
        console.log(data);
        setTitle(data?.title || '');
        setDescription(data?.description || '');
        setOutput(data?.output || '')
        setFileName(data?.datasetFile.name || '');
        setPresentationFileName(data?.presentationFile.name || '');
        setReportFileName(data?.reportFile.name);
        setCodeSourceFileName(data?.codeSourceFile.name);
        setReadmeFileName(data?.readMeFile.name);
        setDemoFileName(data?.demoFile.name);

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
      descriptionError === '' 
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


  

  const handlePresentationFileChange = (e: any) => {
    const file = e.target.files[0];
    setPresentationFile(file);
    setPresentationFileName(file.name);
    if (!file) {
      setPresentationFileError('File is required');
    } else {
      setPresentationFileError('');
    }
  };

  const handleSourceCodeFileChange = (e: any) => {
    const file = e.target.files[0];
    setCodeSourceFile(file);
    setCodeSourceFileName(file.name);
    if (!file) {
      setCodeSourceFileError('File is required');
    } else {
      setCodeSourceFileError('');
    }
  };


  const handleReadMeFileChange = (e: any) => {
    const file = e.target.files[0];
    setReadMeFileFile(file);
    setReadmeFileName(file.name);
    if (!file) {
      setReadMeFileFileError('File is required');
    } else {
      setReadMeFileFileError('');
    }
  };


  const handleReportFileChange = (e: any) => {
    const file = e.target.files[0];
    setReportFile(file);
    setReportFileName(file.name);
    if (!file) {
      setReportFileError('File is required');
    } else {
      setReportFileError('');
    }
  };


  const handleDemoFileChange = (e: any) => {
    const file = e.target.files[0];
    setDemoFile(file);
    setDemoFileName(file.name);
    if (!file) {
      setDemoError('File is required');
    } else {
      setDemoError('');
    }
  };


  const fetchChallengeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/challenge/${id}`);
      setChallengeDetailsData(response.data);
    } catch (error) {
      console.error('Error fetching challenge details:', error);
    }
  };

  useEffect(() => {
    fetchChallengeDetails();
  }, [id]);


  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('file' + DataSetFile);

    editSubmission(
      {
        title: title,
        description: description,
        output:Output,
        datasetFile:DataSetFile,
        presentationFile:presentationFile,
        codeSourceFile: codeSourceFile,
        reportFile:reportFile,
        demoFile:demoFile,
        readMeFile:readMeFile,
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
       {step === 1 ? (

          <div>
             <div>
               <label className="mb-2.5 font-medium block text-black dark:text-white">
                 Title
               </label>
               <input
                 type="text"
                 name="title"
                 value={title}
                 placeholder="Enter the title of your submission"
                 onChange={(e) => checkValidity('title', e.target.value)}
                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
               />
               {titleError && (
                 <p className="text-red-500 text-sm mt-1">{titleError}</p>
               )}
             </div>
     
             <div>
               <label className="mt-3 mb-2.5 font-medium  block text-black dark:text-white">
                 Description
               </label>
               <textarea
                 name="description"
                 value={description}
                 rows={1}
                 placeholder="Enter the description of your submittion"
                 onChange={(e) => checkValidity('description', e.target.value)}
                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
               ></textarea>
               {descriptionError && (
                 <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
               )}
             </div>

             {Output && (
            <div>
              <label className=" mb-2.5 font-medium  block text-black dark:text-white">
                Output
              </label>
              <input
                type='text'
                name="output"
                value={Output}
                placeholder="Enter the output of your submission"
                onChange={(e) => checkValidity('output', e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></input>
              {OutputError && (
                <p className="text-red-500 text-sm mt-1">{OutputError}</p>
              )}
            </div>
          )}

          {presentationFileName && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach presentation file
              </label>
              <div className="relative overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="customFile"
                  name="file"
                  onChange={handlePresentationFileChange}
                />
                <label
                  className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                  htmlFor="customFile"
                >
                  {presentationFileName ? presentationFileName : 'Upload presentation file'}
                </label>
                {presentationFileError && (
                  <p className="text-red-500 text-sm mt-1">{presentationFileError}</p>
                )}
              </div>
            </div>
          )}
     
          </div>
       ) : (
        <div>          
          {codeSourceFileName && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach source code file
              </label>
              <div className="relative overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="customFile"
                  name="file"
                  onChange={handleSourceCodeFileChange}
                />
                <label
                  className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                  htmlFor="customFile"
                >
                  {codeSourceFileName ? codeSourceFileName : 'Upload source code file'}
                </label>
                {CodeSourceFileError && (
                  <p className="text-red-500 text-sm mt-1">{CodeSourceFileError}</p>
                )}
              </div>
            </div>
          )}

          {FileName && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach dataset file
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
                  {FileName ? FileName : 'Upload dataset file'}
                </label>
                {DataSetFileError && (
                  <p className="text-red-500 text-sm mt-1">{DataSetFileError}</p>
                )}
              </div>
            </div>
          )}

          
          {readmeFileName && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach README file
              </label>
              <div className="relative overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="customFile"
                  name="file"
                  onChange={handleReadMeFileChange}
                />
                <label
                  className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                  htmlFor="customFile"
                >
                  {readmeFileName ? readmeFileName : 'Upload README file'}
                </label>
                {readMeFileError && (
                  <p className="text-red-500 text-sm mt-1">{readMeFileError}</p>
                )}
              </div>
            </div>
          )}
          
          {reportFileName && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach detailed report file
              </label>
              <div className="relative overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="customFile"
                  name="file"
                  onChange={handleReportFileChange}
                />
                <label
                  className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                  htmlFor="customFile"
                >
                  {reportFileName ? reportFileName : 'Upload detailed report file'}
                </label>
                {ReportFileError && (
                  <p className="text-red-500 text-sm mt-1">{ReportFileError}</p>
                )}
              </div>
            </div>
          )}
          
             
          {demoFileName && (
            <div>
                <label className="mb-2  mt-3 block font-medium text-black dark:text-white">
                Attach demonstration file
              </label>
              <div className="relative overflow-hidden">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  id="customFile"
                  name="file"
                  onChange={handleDemoFileChange}
                />
                <label
                  className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                  htmlFor="customFile"
                >
                  {demoFileName ? demoFileName : 'Upload demonstration report file'}
                </label>
                {DemoError && (
                  <p className="text-red-500 text-sm mt-1">{DemoError}</p>
                )}
              </div>
            </div>
          )}
          
      </div>
       )} 
     
    
        {/* Navigation buttons */}
        <div className="flex justify-between">
          { step === 2 && (
               <button
               className="rounded bg-primary p-2 px-4  text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
               onClick={prevStep}
             >
               back
             </button>
          )}
        
          {step === 1 ? (
               <button
               className="rounded bg-primary p-2 px-4 ml-auto text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
               onClick={nextStep}
               disabled={!isFormValid()}
             >
               next
             </button>
          ): (
            <button
            className="rounded bg-primary p-2 px-4  text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Submit
          </button>
          )}
         
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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confiramtionMessage, setConfirmationMessage] = useState('');
  const [showTeamModal, setShowTeamModal] = useState(false);

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
    return <div>Loading...</div>;
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
    <ClientLayout>
    {showTeamModal && (
        <TeamSelectionModal onClose={handleTeamModalClose} />
      )}    
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
      <div className="mx-auto xl:mx-[10rem] my-4 rounded-lg px-4 py-8">
        <div className="bg-white px-[2rem] py-4 shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-end">
            {userAuth?.role === 'challenger' &&
              !challengeDetails.participations.soloParticipants.includes(
                userAuth._id,
              ) &&
              !challengeDetails.participations.soloParticipationRequests.includes(
                userAuth._id,
              ) && (
                <div className="flex ">
                  <div className="flex-col m-1">
                    <button
                      onClick={handleConfirmationModalAppearance}
                      className="text-sm p-2 border  hover:text-white broder-gray-300 hover:bg-black hover:bg-opacity-90 bg-white rounded-md text-black font-semibold group"
                    >
                      <span className="group-hover:ease-in duration-300">
                        Solo Join
                      </span>
                    </button>
                  </div>
                  <div className="flex-col my-1">
                    <button className="text-sm p-2 bg-primary border border-gray-500 rounded-md text-white  font-semibold group"
                     onClick={handleJoinTeamClick}>
                      <span className="group-hover:ease-in duration-300">
                        Join a Team
                      </span>
                    </button>
                  </div>
                </div>
              )}
          </div>

          <div className={`${alert && `mt-8`}`}>
            {alert?.type == 'success' && successfullToast(alert.message)}

            {alert?.type == 'error' && ErrorToast(alert.message)}
          </div>

          <div className="flex flex-col py-4 sm:flex-row sm:items-center mt-4 sm:mt-0">
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
                  className={`rounded-full py-1 px-3 text-sm font-semibold mr-4 ${
                    challengeDetails.status === 'open'
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
          </ul>

          <div className="p-8">
            {activeTab === 'overview' && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">
                  Description
                </h2>
                <p className="text-gray-600 mt-4 break-words text-black	">
                  {challengeDetails.description}
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-8">
                  Prizes
                </h2>
                <p className="text-gray-600 mt-4 text-black">
                  {challengeDetails.amount}Dt
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
                <Discussion/>
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
                    challengeDetails.participations.soloParticipants.includes(
                      userAuth._id,
                    ) &&
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
                            {submission.datasetFile.name.substring(0, 20)}...
                          </p>

                          {userAuth?._id === submission.submittedBy ? (
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
      </div>
    </ClientLayout>
  );
};

export default ChallengeDetails;