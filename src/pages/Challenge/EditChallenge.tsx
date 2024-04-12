import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import DateTimePicker from '../../components/Forms/DatePicker/DateTimePickery';
import { useEffect, useRef, useState } from 'react';
import { editChallenge, getChallengeById } from '../../services/challengeServices';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorToast, successfullToast } from '../../components/Toast';
import '../../css/stepper.css';
import { TiTick } from 'react-icons/ti';
import ReCAPTCHA from 'react-google-recaptcha';

const EditChallenge = () => {
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
  const [dataSetDescriptionError, setDataSetDescriptionError] = useState('');
  const [ImageName, setImageName] = useState('');
  const [awardError, setawardError] = useState('');
  const [award, setAward] = useState('');
  const [Image, SetImage] = useState<string | Blob >('');
  const [ImageError, setImageError] = useState('');

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
        setImageName(data?.image || '');
        console.log(FileName)
       } catch (error) {
        console.error('Error fetching challenge data:', error);
      }
    };


    fetchChallenge();
  }, []); 


  const [textInputVisible, setTextInputVisible] = useState(false);
  const [numberInputVisible, setNumberInputVisible] = useState(false);
  const [isPrizesChecked, setIsPrizesChecked] = useState<boolean>(false);
  const [isMonetaryChecked, setIsMonetaryChecked] = useState<boolean>(false)

  const handleTextCheckboxChange = () => {
    
    setNumberInputVisible(false);
    setIsPrizesChecked(!isPrizesChecked);
    setPrice('');
    setPriceError('');
    if (isMonetaryChecked) {
      setIsMonetaryChecked(false);
      setAward('');
      setawardError('');
    }
    setTextInputVisible(!textInputVisible);
  };

  const handleNumberCheckboxChange = () => {
    setIsMonetaryChecked(!isMonetaryChecked);
    if (isPrizesChecked) {
      setIsPrizesChecked(false);
    }
    setTextInputVisible(false);
    setNumberInputVisible(!numberInputVisible);
  };



 
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
    } else if (name == 'award') {
      setAward(value);
      if (!value.trim()) {
        setawardError('Award is required');
      } else {
        setawardError('');
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
      {
        /*  if (!value.trim()) {
        setDataSetTitleError("DataSet title is required");
      }else {
        setDataSetTitleError("");
      } */
      }
    } else if (name == 'DatasetDescription') {
      setDataSetDescription(value);
      {
        /* if (!value.trim()) {
        setDataSetTitleError("DataSet title is required");
      }else {
        setDataSetTitleError("");
      } */
      }
    } else if (name == 'DataSetFile') {
      {
        /* if (!value.trim()) {
        setDataSetTitleError("DataSet title is required");
      }else {
        setDataSetTitleError("");
      } */
      }
    }
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setSubmitted(false);
    setStep(step - 1);
  };

  const [captchaToken, setCaptchaToken] = useState('');

  const handleCaptchaChange = (token: any) => {
    console.log('Captcha token:', token);
    setCaptchaToken(token);
  };

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Fonction pour décocher le reCAPTCHA
  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };


  const isFirstPageValid = () => {
    return (
      title !== '' &&
      description !== '' &&
      endDate != '' &&
      titleError === '' &&
      descriptionError === '' &&
      endDateError === ''
    );
  };


  const isSecondPageValid = () => {
    return (
      (price !== '' || award !== '') &&
      priceError === '' 
    );
  };


  
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (
      file.type != 'application/vnd.ms-excel' &&
      file.type !=
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      setDataSetError('You should provide an xsl file');
    } else {
      setDataSetError('');
    }
    setDataSetFile(file);
    setFileName(file.name);
  };

  const handleImageChange = (e: any) => {
    const image = e.target.files[0];
    console.log(image.type);
    if (
      image.type != 'image/jpg' &&
      image.type != 'image/jpeg' &&
      image.type != 'image/png'
    ) {
      setImageError('you should provide an image of type:jpg,jpeg or png');
    } else {
      setImageError('');
    }
    SetImage(image);
    setImageName(image.name);
  };


  // Callback function to update endDate in form data
  const handleEndDateChange = (endDate: any) => {
    console.log(endDate)
    checkValidity('endDate', endDate);
  };
  const formData = new FormData(); // Create FormData object to handle file upload

  const handleSubmit = (e: any) => {
    if(captchaToken == ''){
      setAlert({
        type: 'error',
        message: "Please make sure to check the captcha checkbox",
      });

    }else{  
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
      image:Image
    },id , captchaToken)
      .then((response) => {
        // Handle success
        console.log('Challenge edited successfully', response);
        setAlert({
          type: 'success',
          message: 'Challenge edited successfully' ,
        });
        setTimeout(() => {
          navigate("/competitions");
        }, 3000);

      })
      .catch((error) => {
        // Handle error
        resetRecaptcha()
        console.error('Error editing challenge', error);
        setAlert({
          type: 'error',
          message: 'Error editing challenge',
        });
      });}
  };

  return (
    <ConnectedClientLayout>

       
     <div className={`${alert && `mt-8`}`}>
        {alert?.type == 'success' && successfullToast(alert.message)}

        {alert?.type == 'error' && ErrorToast(alert.message)}
      </div>


         

      <div className="flex flex-col items-center gap-9 border-full">
        <div className="rounded-sm  border border-stroke w-150 md:w-150 lg:w-203 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b rounded-lg border-stroke py-4 px-2 dark:border-strokedark">
            {/* Stepper */}
            <ol className="flex justify-center items-center w-full">
              <li
                className={`flex w-[8rem] items-center text-blue-600 dark:text-blue-500 ${step === 1 ? 'bg-blue-10 font-bold' : step > 1 ? 'after:border-green-600 text-white font-semibold' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800 `}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8  text-white font-semibold rounded-full lg:h-10 lg:w-10  shrink-0 ${step === 1 ? 'bg-primary font-bold' : step > 1 ? 'bg-green-600 text-white font-semibold' : ''}`}
                >
                  {step > 1 ? <TiTick size={24} /> : '1'}
                </span>
              </li>

              <li
                className={`flex w-[8rem] items-center text-blue-600 dark:text-blue-500 ${step === 2 ? 'bg-blue-10 font-bold' : step > 2 ? 'after:border-green-600 text-white font-semibold' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800 `}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8  text-white font-semibold rounded-full lg:h-10 lg:w-10  shrink-0 ${step === 2 || step === 1 ? 'bg-primary font-bold' : step > 2 ? 'bg-green-600 text-white font-semibold' : ''}`}
                >
                  {step > 2 ? <TiTick size={24} /> : '2'}
                </span>
              </li>

              <li
                className={`flex items-center  ${step === 3 ? 'font-semibold' : ''}`}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 text-white font-semibold ${submitted ? 'bg-green-600 text-white font-semibold' : 'bg-primary'}  rounded-full lg:h-10 lg:w-10 dark:bg-gray-700 shrink-0`}
                >
                  {submitted ? <TiTick size={24} /> : '3'}
                </span>
              </li>
            </ol>

            <ol className="flex justify-center items-cente w-full">
              <li className={`mr-12`}>
                <span
                  className={`font-medium text-sm ${step === 1 ? 'text-gray-700 font-bold' : step > 1 ? 'text-green-700 font-semibold' : ''}`}
                >
                  Competition Info
                </span>
              </li>

              <li className={`mr-10`}>
                <span
                  className={`font-medium text-sm ${step === 2 || step === 1 ? 'text-gray-700 font-bold' : step > 2 ? 'text-green-700 font-semibold' : ''}`}
                >
                  Prize Info
                </span>
              </li>

              <li className="ml-8">
                <span
                  className={`font-medium text-sm text-gray-700 ${submitted ? 'text-green-700 font-semibold' : ''}`}
                >
                  Dataset Info
                </span>
              </li>
            </ol>
          </div>
          <div className="sm:py-6.5 sm:px-28 p-6.5">
            {/* Content for Step 1 */}
            <div className={step === 1 ? '' : 'hidden'}>
              <div className='mb-4.5'>
                  <h2 className='text-xl text-gray-700 font-semibold'>Edit a competition</h2>
                  <p className='mt-3'>Welcome to the competition edit form. Please review and update the following details for your competition</p>
              </div>
              <div className="mb-4.5">
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

              <div className="mb-4 5">
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Image
                </label>

                <div className="relative overflow-hidden">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    id="customFile"
                    name="image"
                    onChange={handleImageChange}
                  />
                  <label
                    className="flex items-center justify-between py-2 px-4 bg-gray-200 rounded-lg cursor-pointer"
                    htmlFor="customFile"
                  >
                    {ImageName ? ImageName : 'Upload Challenge Image'}
                  </label>
                </div>
                {ImageError && (
                  <p className="text-red-500 text-sm mt-1">{ImageError}</p>
                )}
              </div>
              <div className="mb-4 5">
                <DateTimePicker
                  onChange={handleEndDateChange}
                  value={endDate}
                />
                {endDateError && (
                  <p className="text-red-500 text-sm mt-1">{endDateError}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="mb-2.5 font-medium  block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  rows={3}
                  placeholder="Enter the description of your competition"
                  onChange={(e) => checkValidity('description', e.target.value)}
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
              <div>
                <div className="mb-4.5">
                  <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                      
                      id="bordered-radio-2"
                      type="radio"
                      value=""
                      onChange={handleNumberCheckboxChange}
                      checked={isMonetaryChecked}
                      name="bordered-radio"
                      className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="bordered-radio-2"
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Monetary
                    </label>
                  </div>

                  <div className="flex items-center mt-8  ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                      id="bordered-radio-1"
                      type="radio"
                      value=""
                      onChange={handleTextCheckboxChange}
                      checked={isPrizesChecked}
                      name="bordered-radio"
                      className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="bordered-radio-1"
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Not Monetary
                    </label>
                  </div>
                </div>
                {textInputVisible && (
                  <div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 font-medium block text-black dark:text-white">
                        Awards
                      </label>
                      <input
                        type="text"
                        name="award"
                        value={award}
                        placeholder="Enter the award of your competition"
                        onChange={(e) => checkValidity('award', e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {awardError && (
                        <p className="text-red-500 text-sm mt-1">
                          {awardError}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {numberInputVisible && (
                  <div className="mb-4.5">
                    <label className="mb-2.5 font-medium block text-black dark:text-white">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={price}
                      placeholder="Enter the price of your competition"
                      onChange={(e) => checkValidity('price', e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {priceError && (
                      <p className="text-red-500 text-sm mt-1">{priceError}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Content for Step 3 */}
            <div className={step === 3 ? '' : 'hidden'}>
              <div className="mb-4.5">
                <label className="mb-2.5 font-medium  block text-black dark:text-white">
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
                <label className="mb-2.5 block font-medium  text-black dark:text-white">
                  Dataset description
                </label>
                <textarea
                  name="dataSetDescription"
                  value={dataSetDescription}
                  rows={3}
                  placeholder="Enter the description of the dataset "
                  onChange={(e) =>
                    checkValidity('DatasetDescription', e.target.value)
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
              {dataSetDescriptionError && (
                <p className="text-red-500 text-sm mt-1">
                  {dataSetDescriptionError}
                </p>
              )}

              <div className="mb-4.5">
                <div>
                  <label className="mb-3 block font-medium text-black dark:text-white">
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
            
            <div className='flex justify-between'> 
              {step > 1 && (
                <button
                  className="rounded bg-primary p-3  text-gray hover:bg-opacity-90"
                  onClick={prevStep}
                >
                  Previous
                </button>
              )}

              {step !== 1 && step !== 2 ? (
                    <button
                  className="rounded bg-primary p-3  text-gray hover:bg-opacity-90"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
               
              ) : (     

                  <button
                    className="rounded ml-auto bg-primary p-3  text-gray disabled:opacity-60 hover:bg-opacity-90"
                    onClick={nextStep} disabled={step === 1 ? !isFirstPageValid() : !isSecondPageValid()}
                  >
                    Next
                  </button>
              )}
            </div>  
            {step === 3 && (
                 <div className="flex justify-center mt-5 mb-5">
                 <ReCAPTCHA
                   sitekey="6LenUIgpAAAAAFvWhgy4KRWwmLoQmThvaM5nrupd"
                   onChange={handleCaptchaChange}
                   ref={recaptchaRef}
                 />
               </div>
            )}
          </div>
        </div>
      </div>
    </ConnectedClientLayout>
  );
};

export default EditChallenge;
