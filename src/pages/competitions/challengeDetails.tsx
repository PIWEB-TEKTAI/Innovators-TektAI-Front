import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../components/modal';
import { Link, useNavigate } from 'react-router-dom';
import { addChallenge } from '../../services/challengeService';
import { ErrorToast, successfullToast } from '../../components/Toast';
import { addSubmission } from '../../services/submissionService';
import ModalForm from '../../components/modalForm';

function ChallengeDetailsPage() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const AddSubmissionForm: React.FC = () => {
    
  const [titleError, setTitleError] = useState('');
  const [title, setTitle] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [description, setDescription] = useState('');

  const [DataSetFile, setDataSetFile] = useState<string | Blob >('');
  const [DataSetFileError, setDataSetFileError] = useState('');

  const [FileName, setFileName] = useState('');
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null,
  );

  

  const checkValidity = (name:any,value:any) =>{
    if(name=="title"){
      setTitle(value)
      if (!value.trim()) {
        setTitleError("Title is required");
      }else {
        setTitleError("");
      }
    }
    else if(name=="description"){
      setDescription(value)
      if (!value.trim()) {
        setDescriptionError("Description is required");
      }else {
        setDescriptionError("");
      }
    }
    else if(name=="dataSetFile"){
      if (!value.trim()) {
        setDataSetFileError("File is required");
      }else {
        setDataSetFileError("");
      }
    }
    
   }
   const isFormValid = () => {
    return (
      title!== ''&&
      description!==''&&
      titleError === '' &&
      descriptionError === '' &&
      DataSetFile!==''   &&
      DataSetFileError === '' 

    );
  };
  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    setDataSetFile(file);
    setFileName(file.name)
    if (!file) {
      setDataSetFileError("File is required");
    }else {
      setDataSetFileError("");
    }


  };
  const navigate = useNavigate();

 
  const handleSubmit = (e:any) => {

    e.preventDefault();
    console.log('file'+DataSetFile);
    
    addSubmission({
      title:title,
      description:description,
      file:DataSetFile,

    },challengeId)
      .then((response) => {
        setAlert({
          type: 'success',
          message: 'submission added successfully' ,
        });
        setTimeout(() => {
          navigate("/competitions");
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
            
        <div className="flex w-full p-2 flex-col gap-9 border-full">
              
                    {/* Content for Step 1 */}
                    <div className="mb-4.5">
                        <label className="mb-2.5 font-medium block text-black dark:text-white">Title</label>
                        <input
                        type="text"
                        name="title"
                        value={title}
                        placeholder="Enter the title of your competition"
                        onChange={(e) =>checkValidity("title",e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                            {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}

                    </div>
                
                  
                    <div className="mb-6">
                        <label className="mb-2.5 font-medium  block text-black dark:text-white">Description</label>
                        <textarea
                        name="description"
                        value={description}
                        rows={6}
                        placeholder="Enter the description of your competition"
                        onChange={(e)=>checkValidity("description",e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        ></textarea>
                            {descriptionError && <p className="text-red-500 text-sm mt-1">{descriptionError}</p>}

                    </div>
        
                    <div className="mb-4.5">
                    <div>
                    <label className="mb-3 block font-medium text-black dark:text-white">Attach submission file</label>
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
                            {DataSetFileError && <p className="text-red-500 text-sm mt-1">{DataSetFileError}</p>}

                    </div>

                </div>
                    </div>
                        {/* Navigation buttons */}
                    <div className="flex justify-end">
                
                    <button className="rounded bg-primary p-3  text-gray hover:bg-opacity-90 disabled:bg-opacity-60" onClick={handleSubmit} disabled={!isFormValid()}>
                    Submit
                    </button>
                    </div>
                    </div>
                     
        </div>

        );
    
    };
                          

  return (
    <div>
     <div>
     <h2>Challenge Details</h2>
      <p>Challenge ID: {challengeId}</p>
      {/* Button to open the modal */}
      <button onClick={openModal} className="rounded-full bg-green-600 p-3 py-3 text-sm font-semibold  text-gray disabled:opacity-60 hover:bg-opacity-90">
        Add Submission
      </button>
      ggggggggg
     </div>

      {/* Render the Modal component */}
      <ModalForm
        showModal={showModal}
        setShowModal={setShowModal}
        title="Add Submission"
        content={<AddSubmissionForm />} // Pass the AddSubmissionForm as content
        onClose={closeModal}
        onSave={()=>{}} // Handle save logic
      />
    </div>
  );
}

export default ChallengeDetailsPage;

