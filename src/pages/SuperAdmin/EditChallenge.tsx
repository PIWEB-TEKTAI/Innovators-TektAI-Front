import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import DateTimePicker from '../../components/Forms/DatePicker/DateTimePickery';
import { useEffect, useState } from 'react';
import { editChallenge, getChallengeById } from '../../services/challengeServices';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorToast, successfullToast } from '../../components/Toast';
import '../../css/stepper.css';
import { TiTick } from 'react-icons/ti';
import DefaultLayout from '../../layout/DefaultLayout';

const EditChallengeAdmin = () => {
  const [step, setStep] = useState(1);
  const [titleError, setTitleError] = useState('');
  const [title, setTitle] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [description, setDescription] = useState('');
  const [priceError, setPriceError] = useState('');
  const [price, setPrice] = useState('');
  const [endDateError, setEndDateError] = useState('');
  const [endDate, setEndDate] = useState("");
  const [DataSetFileError, setDataSetError] = useState('');
  const [DataSetFile, setDataSetFile] = useState<string | Blob>('');
  const [FileName, setFileName] = useState('');
  const [dataSetDescription, setDataSetDescription] = useState('');
  const [dataSetTitleError, setDataSetTitleError] = useState('');
  const [dataSetTitle, setDataSetTitle] = useState('');
  const [submitted , setSubmitted] = useState(false);
  
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null,
  );

  const { id } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const data = await getChallengeById(id);
        console.log(data)
        setTitle(data?.title || ''); 
        setPrice(data?.price || ''); 
        setDescription(data?.description || ''); 
        setEndDate(data?.endDate.toString() || ''); 
        setDataSetTitle(data?.dataset.name || ''); 
        setDataSetDescription(data?.dataset.description || ''); 
        setFileName(data?.dataset.fileUrl || ''); 
        console.log(FileName)
       } catch (error) {
        console.error('Error fetching challenge data:', error);
      }
    };


    fetchChallenge();
  }, []); 





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
    } else if (name == 'price') {
      setPrice(value);
      if (!value.trim()) {
        setPriceError('Price is required');
      } else {
        setPriceError('');
      }
    } else if (name == 'endDate') {
      setEndDate(value);
      if (!value.trim()) {
        setEndDateError('EndDate is required');
      } else {
        setEndDateError('');
      }
    } else if (name == 'DataSetTitle') {
      setDataSetTitle(value);
      
    } else if (name == 'DatasetDescription') {
      setDataSetDescription(value);
      
    } 
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setSubmitted(false);
    setStep(step - 1);
  };

  const isFirstPageValid = () => {
    return (
      title !== '' &&
      price !== '' &&
      description !== '' &&
      endDate != '' &&
      titleError === '' &&
      priceError === '' &&
      descriptionError === '' &&
      endDateError === ''
    );
  };

  
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    console.log('file' + file);
    setDataSetFile(file);
    setFileName(file.name);
  };
  // Callback function to update endDate in form data
  const handleEndDateChange = (endDate: any) => {
    console.log(endDate)
    checkValidity('endDate', endDate);
  };
  const formData = new FormData(); // Create FormData object to handle file upload

  const handleSubmit = (e: any) => {
    setSubmitted(true);
    e.preventDefault();
    editChallenge({
      title: title,
      description: description,
      price: price,
      endDate: endDate,
      dataset: {
        name: dataSetTitle,
        description: dataSetDescription,
      },
      file: DataSetFile,
    },id)
      .then((response) => {
        // Handle success
        console.log('Challenge eddited successfully', response);
        setAlert({
          type: 'success',
          message: 'Challenge eddited successfully' ,
        });
        setTimeout(() => {
            navigate("/listChallenge");
          }, 3000);
  
      })
      .catch((error) => {
        // Handle error
        console.error('Error edditing challenge', error);
        setAlert({
          type: 'error',
          message: 'Error edditing challenge',
        });
      });
  };

  return (
    <DefaultLayout>

       
     <div className={`${alert && `mt-8`}`}>
        {alert?.type == 'success' && successfullToast(alert.message)}

        {alert?.type == 'error' && ErrorToast(alert.message)}
      </div>


         

        <div className="flex flex-col gap-9 border-full">
          <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b rounded-lg border-stroke py-4 px-6.5 dark:border-strokedark">
            <div className="border-b mb-3 border-stroke py-4 px-6.5 dark:border-strokedark">
               <h3 className="font-semibold text-title-sm text-black dark:text-white">Edit Challenge</h3>
            </div>
              {/* Stepper */}
              <ol className="flex justify-center items-center w-full">
                <li
                  className={`flex w-[10rem] items-center text-blue-600 dark:text-blue-500 ${step === 1 ? 'bg-blue-10 font-bold' : step === 2 ? 'after:border-green-600 text-white font-semibold' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800 `}
                >
                  <span className={`flex items-center justify-center w-8 h-8  text-white font-semibold rounded-full lg:h-12 lg:w-12  shrink-0 ${step === 1 ? 'bg-primary font-bold' : step === 2 ? 'bg-green-600 text-white font-semibold' : ''}`}>
                    {step === 2 ? <TiTick size={24} /> : '1'}
                  </span>

                </li>

                <li
                  className={`flex items-center  ${step === 2 ? 'font-semibold' : ''  }`}
                >
                  <span className={`flex items-center justify-center w-8 h-8 text-white font-semibold ${submitted ? 'bg-green-600 text-white font-semibold' : 'bg-primary'}  rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}>
                    {submitted ? <TiTick size={24} /> : '2'}
                  </span>
                </li>
              </ol>
              <ol className="flex justify-center items-cente w-full">
                <li className={`mr-8`}>
                   <span className={`font-medium ${step === 1 ? 'text-gray-700 font-bold' : step === 2 ? 'text-green-700 font-semibold' : ''}`}>Challenge Info</span>

                </li>

                <li className='ml-8'>
                  <span className={`font-medium text-gray-700 ${submitted ? 'text-green-700 font-semibold' : ''}`}>Dataset Info</span>
                </li>
              </ol>
            </div>
            <div className="sm:py-6.5 sm:px-28 p-6.5">
              {/* Content for Step 1 */}
              <div className={step === 1 ? '' : 'hidden'}>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black font-medium dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Enter the title of your challenge"
                    onChange={(e) => checkValidity('title', e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {titleError && (
                    <p className="text-red-500 text-sm mt-1">{titleError}</p>
                  )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black font-medium dark:text-white">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={price}
                    placeholder="Enter the price of your challenge"
                    onChange={(e) => checkValidity('price', e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {priceError && (
                    <p className="text-red-500 text-sm mt-1">{priceError}</p>
                  )}
                </div>
                <div className="mb-4 5">
                  <DateTimePicker onChange={handleEndDateChange} value={endDate} />
                  {endDateError && (
                    <p className="text-red-500 text-sm mt-1">{endDateError}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black font-medium dark:text-white">
                     Challenge description
                  </label>
                  <textarea
                    name="description"
                    value={description}
                    rows={6}
                    placeholder="Enter the description of your challenge"
                    onChange={(e) =>
                      checkValidity('description', e.target.value)
                    }
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                  {descriptionError && (
                    <p className="text-red-500 text-sm mt-1">
                      {descriptionError}
                    </p>
                  )}
                </div>
              </div>
              {/* Content for Step 2 */}
              <div className={step === 2 ? '' : 'hidden'}>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black font-medium dark:text-white">
                    Dataset title
                  </label>
                  <input
                    type="text"
                    name="dataSetTitle"
                    value={dataSetTitle}
                    placeholder="Enter the title of the dataset"
                    onChange={(e) =>
                      checkValidity('DataSetTitle', e.target.value)
                    }
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {dataSetTitleError && (
                    <p className="text-red-500 text-sm mt-1">
                      {dataSetTitleError}
                    </p>
                  )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black font-medium dark:text-white">
                     Dataset description
                  </label>
                  <textarea
                    name="DatasetDescription"
                    value={dataSetDescription}
                    rows={6}
                    placeholder="Enter the description of the dataset"
                    onChange={(e) =>
                      checkValidity('DatasetDescription', e.target.value)
                    }
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
                <div className="mb-4.5">
                  <div>
                    <label className="mb-2.5 block text-black font-medium dark:text-white">
                     Dataset file
                    </label>
                    
                    <div className="relative overflow-hidden">
                          <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            id="customFile"
                            name="img[]"
                            onChange={handleFileChange}
                          />
                          <label
                            className="flex items-center justify-between py-2 px-4 border-stroke bg-gray-200 rounded-lg cursor-pointer"
                            htmlFor="customFile"
                          >
                            {FileName ? FileName : 'Upload Dataset File'}
                          </label>
                    </div>

                    {DataSetFileError && (
                      <p className="text-red-500 text-sm mt-1">
                        {DataSetFileError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Navigation buttons */}
              {step > 1 && (
                <div className="flex justify-between">
                  <button
                    className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    onClick={prevStep}
                  >
                    Previous
                  </button>
                  <button
                    className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              )}
              {step < 2 && (
                <div className="flex justify-end">
                  <button
                    className="rounded bg-primary p-3 font-medium text-gray disabled:opacity-60 hover:bg-opacity-90"
                    onClick={nextStep}
                    disabled={!isFirstPageValid()}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
    </DefaultLayout>
  );
};

export default EditChallengeAdmin;
