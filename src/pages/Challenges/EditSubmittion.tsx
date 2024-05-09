
import React, { useEffect, useState } from 'react';
import {
  editSubmission,
  getSubmissionById
 
} from '../../services/submissionService';
import { ErrorToast, successfullToast } from '../../components/Toast';

import { challenge } from '../../types/challenge';
import { Props } from 'react-select';


const EditSubmissionForm: React.FC<Props> = ({ id }) => {
    const [titleError, setTitleError] = useState('');
    const [title, setTitle] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [description, setDescription] = useState('');
  
    const [DataSetFile, setDataSetFile] = useState<string | Blob>('');
    const [DataSetFileError, setDataSetFileError] = useState('');
  
    const [step, setStep] = useState(1);
  
    const [Output, setOutput] = useState('');

    const [IsOutput, setIsOutput] = useState(false);

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
  
    const [challengeDetailsData, setChallengeDetailsData] = useState<challenge>();
  
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
      } else if (name == 'output') {
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
          setOutput(data?.output || '');

          if(data?.output){
            setIsOutput(true);
         }else{
           setIsOutput(false);
         }

          setPresentationFileName(data?.presentationFile?.name || '');
          setCodeSourceFileName(data?.codeSourceFile?.name || '');
          setFileName(data?.datasetFile?.name || '');
          setReadmeFileName(data?.readMeFile?.name || '');
          setReportFileName(data?.reportFile?.name || '');
          setDemoFileName(data?.demoFile?.name || '');
          
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
        ((Output ? (Output !== '' && OutputError === '') : true) &&  (presentationFileName ? (presentationFileName !== '' && presentationFileError === '') : true))
    )};

    const isForm1Valid = () => {
        return (
          (
            (FileName ? (FileName !== '' && DataSetFileError === '') : true) &&  
          (codeSourceFileName ? (codeSourceFileName !== '' && CodeSourceFileError === '') : true ) &&
          (readmeFileName  ? (readmeFileName !== '' && readMeFileError === '')  : true) &&
          (demoFileName ? (demoFileName !== '' && DemoError === '') : true ) &&
          (reportFileName ? (reportFileName !== '' && ReportFileError === '') : true ) 
        )
    )};

    const handleFileChange = (e: any) => {
      const file = e.target.files[0];
      setDataSetFile(file);
      setFileName(file.name);
      if (!file) {
        setDataSetFileError('Dataset file is required');
      }else if (
        file.type != 'application/vnd.ms-excel' &&
        file.type !=
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        setDataSetFileError('You should provide an xsl file')
      } else {
        setDataSetFileError('');
      }
    };
  
    const handlePresentationFileChange = (e: any) => {
      const file = e.target.files[0];
      setPresentationFile(file);
      setPresentationFileName(file.name);
      if (!file) {
        setPresentationFileError('Presentation file is required');
      } else if (file.type !== 'application/pdf') {

        setPresentationFileError('You should provide an PDF file');
      } else {
        setPresentationFileError('');
      }
    };
  
    const handleSourceCodeFileChange = (e: any) => {
      const file = e.target.files[0];
      setCodeSourceFile(file);
      setCodeSourceFileName(file.name);
      if (!file) {
        setCodeSourceFileError('Source Code file is required');
      }else if (
           !file.name.toLowerCase().endsWith('.zip') &&
           !file.name.toLowerCase().endsWith('.war'))
      {
        setCodeSourceFileError('You should provide a ZIP or WAR file');
      } else {
        setCodeSourceFileError('');
      }
    };
  
    const handleReadMeFileChange = (e: any) => {
      const file = e.target.files[0];
      setReadMeFileFile(file);
      setReadmeFileName(file.name);
      if (!file) {
        setReadMeFileFileError('Source Code file is required');
      }else if (
        file.type !== 'text/plain' || !file.name.toLowerCase().endsWith('.txt')
      )
      {
        setReadMeFileFileError('You should provide a txt file');
      } else {
        setReadMeFileFileError('');
      }
    };
  
    const handleReportFileChange = (e: any) => {
      const file = e.target.files[0];
      setReportFile(file);
      setReportFileName(file.name);
      if (!file) {
        setReportFileError('Report file is required');

      } else if (file.type !== 'application/pdf') {

        setReportFileError('You should provide an PDF file');
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
    } else if (
            !file.name.toLowerCase().endsWith('.mp4') )
       {
         setDemoError('You should provide a mp4 file');
       } else {
        setDemoError('');
       }  
    };
  
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
          output: Output,
          datasetFile: DataSetFile,
          presentationFile: presentationFile,
          codeSourceFile: codeSourceFile,
          reportFile: reportFile,
          demoFile: demoFile,
          readMeFile: readMeFile,
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
  
        <div className="flex w-full p-1 flex-col overflow-y-auto max-h-115  gap-1 border-full">
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
                {descriptionError && (
                  <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
                )}
              </div>
  
              {IsOutput && (
                <div>
                  <label className=" mb-2.5 font-medium  block text-black dark:text-white">
                    Output
                  </label>
                  <input
                    type="text"
                    name="output"
                    value={Output}
                    placeholder="Enter the output of your submission"
                    onChange={(e) => checkValidity('output', e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                      className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded border-[1.5px] border-stroke cursor-pointer"
                      htmlFor="customFile"
                    >
                      {presentationFileName
                        ? presentationFileName
                        : 'Upload presentation file'}
                    </label>
                    <p className="mt-1 text-xs text-primary font-medium dark:text-gray-300" id="file_input_help">  This field requires only PDF files. </p>

                    {presentationFileError && (
                      <p className="text-red-500 text-sm mt-1">
                        {presentationFileError}
                      </p>
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
                      className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded border-[1.5px] border-stroke cursor-pointer"
                      htmlFor="customFile"
                    >
                      {codeSourceFileName
                        ? codeSourceFileName
                        : 'Upload source code file'}
                    </label>
                    <p className="mt-1 text-xs text-primary font-medium dark:text-gray-300" id="file_input_help">  This field requires only ZIP files. </p>

                    {CodeSourceFileError && (
                      <p className="text-red-500 text-sm mt-1">
                        {CodeSourceFileError}
                      </p>
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
                      className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded border-[1.5px] border-stroke cursor-pointer"
                      htmlFor="customFile"
                    >
                      {FileName ? FileName : 'Upload dataset file'}
                    </label>
                    <p className="mt-1 text-xs text-primary font-medium dark:text-gray-300" id="file_input_help">  This field requires only EXCEL files. </p>

                    {DataSetFileError && (
                      <p className="text-red-500 text-sm mt-1">
                        {DataSetFileError}
                      </p>
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
                      className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded border-[1.5px] border-stroke cursor-pointer"
                      htmlFor="customFile"
                    >
                      {readmeFileName ? readmeFileName : 'Upload README file'}
                    </label>
                    <p className="mt-1 text-xs text-primary font-medium dark:text-gray-300" id="file_input_help">  This field requires only TXT files. </p>

                    {readMeFileError && (
                      <p className="text-red-500 text-sm mt-1">
                        {readMeFileError}
                      </p>
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
                      className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded border-[1.5px] border-stroke cursor-pointer"
                      htmlFor="customFile"
                    >
                      {reportFileName
                        ? reportFileName
                        : 'Upload detailed report file'}
                    </label>
                    <p className="mt-1 text-xs text-primary font-medium dark:text-gray-300" id="file_input_help">  This field requires only PDF files. </p>

                    {ReportFileError && (
                      <p className="text-red-500 text-sm mt-1">
                        {ReportFileError}
                      </p>
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
                      className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded border-[1.5px] border-stroke cursor-pointer"
                      htmlFor="customFile"
                    >

                      {demoFileName
                        ? demoFileName
                        : 'Upload demonstration report file'}
                    </label>
                    <p className="mt-1 text-xs text-primary font-medium dark:text-gray-300" id="file_input_help">  This field requires only MP4 files. </p>

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
            {step === 2 && (
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
            ) : (
              <button
                className="rounded bg-primary p-2 px-4  text-gray hover:bg-opacity-90 disabled:bg-opacity-60"
                onClick={handleSubmit}
                disabled={!isForm1Valid()}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };



export default EditSubmissionForm;