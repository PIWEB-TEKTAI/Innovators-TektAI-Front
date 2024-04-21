import { useNavigate } from 'react-router-dom';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import DateTimePicker from '../../components/Forms/DatePicker/DateTimePickery';
import { useRef, useState } from 'react';
import { addChallenge } from '../../services/challengeService';
import { TiTick } from 'react-icons/ti';
import { ErrorToast, successfullToast } from '../../components/Toast';
import ReCAPTCHA from 'react-google-recaptcha';
import DateTimePickerStart from '../../components/Forms/DatePicker/DateTimePickeryStart';

const AddChallenge = () => {
  const [step, setStep] = useState(1);
  const [titleError, setTitleError] = useState('');
  const [title, setTitle] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [description, setDescription] = useState('');
  const [problematicError, setProblematicError] = useState('');
  const [problematic, setProblematic] = useState('');

  const [amountError, setAmountError] = useState('');
  const [amount, setAmount] = useState('');

  const [durationError, setDurationError] = useState('');
  const [duration, setDuration] = useState('');

  const [prizeNameError, setprizeNameError] = useState('');
  const [prizeName, setprizeName] = useState('');

  const [prizeDescriptionError, setprizeDescriptionError] = useState('');
  const [prizeDescription, setprizeDescription] = useState('');

  const [positionTitleError, setpositionTitleError] = useState('');
  const [positionTitle, setpositionTitle] = useState('');

  const [jobDescriptionError, setjobDescriptionError] = useState('');
  const [jobDescription, setjobDescription] = useState('');

  const [projectDescriptionError, setprojectDescriptionError] = useState('');
  const [projectDescription, setprojectDescription] = useState('');

  const [projectTitleError, setprojectTitleError] = useState('');
  const [projectTitle, setprojectTitle] = useState('');

  const [InternDescriptionError, setInternDescriptionError] = useState('');
  const [InternDescription, setInternDescription] = useState('');

  const [InternTitleError, setInternTitleError] = useState('');
  const [InternTitle, setInternTitle] = useState('');

  const [startDateError, setStartDateError] = useState('');
  const [startDate, setStartDate] = useState('');

  const [visibility, setVisibility] = useState('');
  const [visibilityError, setvisibilityError] = useState('');

  const [endDateError, setEndDateError] = useState('');
  const [endDate, setEndDate] = useState('');

  const [DataSetFileError, setDataSetError] = useState('');
  const [DataSetFile, setDataSetFile] = useState<string | Blob>('');
  const [FileName, setFileName] = useState('');
  const [ImageName, setImageName] = useState('');

  const [ImageError, setImageError] = useState('');
  const [Image, SetImage] = useState<string | Blob>('');

  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null,
  );

  const [textInputVisible, setTextInputVisible] = useState(false);
  const [numberInputVisible, setNumberInputVisible] = useState(false);
  const [isPrizesChecked, setIsPrizesChecked] = useState<boolean>(false);
  const [isMonetaryChecked, setIsMonetaryChecked] = useState<boolean>(false);

  const [isOutputChecked, setIsOutputChecked] = useState<boolean>(true);
  const [isPresentationChecked, setIsPresentationChecked] =
    useState<boolean>(true);
  const [isCodeSourceChecked, setIsCodeSourceChecked] = useState<boolean>(true);
  const [isDatasetChecked, setIsDatasetChecked] = useState<boolean>(false);
  const [isReadMeFileChecked, setIsReadMeFileChecked] =
    useState<boolean>(false);
  const [isRapportChecked, setIsRapportChecked] = useState<boolean>(false);
  const [isDemoChecked, setIsDemoChecked] = useState<boolean>(false);

  const [isPrizeChecked, setIsPrizeChecked] = useState<boolean>(false);
  const [isRecruitementChecked, setIsRecruitementChecked] =
    useState<boolean>(false);
  const [isFreelanceChecked, setIsFreelanceChecked] = useState<boolean>(false);
  const [isInternChecked, setIsInternChecked] = useState<boolean>(false);

  const [submitted, setSubmitted] = useState(false);

  const handleTextCheckboxChange = () => {
    setNumberInputVisible(false);
    setIsPrizesChecked(!isPrizesChecked);
    setAmount('');
    setAmountError('');
    if (isMonetaryChecked) {
      setIsMonetaryChecked(false);
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

  const handleBaremeCheckboxChange = (name: any, e: any) => {
    const { checked } = e.target;
    if (name == 'output') {
      if (checked) {
        setIsOutputChecked(true);
      } else {
        setIsOutputChecked(false);
      }
    } else if (name == 'presentation') {
      if (checked) {
        setIsPresentationChecked(true);
      } else {
        setIsPresentationChecked(false);
      }
    } else if (name == 'codeSource') {
      if (checked) {
        setIsCodeSourceChecked(true);
      } else {
        setIsCodeSourceChecked(false);
      }
    } else if (name == 'dataset') {
      if (checked) {
        setIsDatasetChecked(true);
      } else {
        setIsDatasetChecked(false);
      }
    } else if (name == 'readmeFile') {
      if (checked) {
        setIsReadMeFileChecked(true);
      } else {
        setIsReadMeFileChecked(false);
      }
    } else if (name == 'rapport') {
      if (checked) {
        setIsRapportChecked(true);
      } else {
        setIsRapportChecked(false);
      }
    }else if (name == 'demo') {
      if (checked) {
        setIsDemoChecked(true);
      } else {
        setIsDemoChecked(false);
      }
    }
  };

  const handlePrizeCheckboxChange = (name: any, e: any) => {
    const { checked } = e.target;
    if (name == 'prize') {
      if (checked) {
        setIsPrizeChecked(true);
      } else {
        setIsPrizeChecked(false);
      }
    } else if (name == 'recruitement') {
      if (checked) {
        setIsRecruitementChecked(true);
      } else {
        setIsRecruitementChecked(false);
      }
    } else if (name == 'freelance') {
      if (checked) {
        setIsFreelanceChecked(true);
      } else {
        setIsFreelanceChecked(false);
      }
    } else if (name == 'intern') {
      if (checked) {
        setIsInternChecked(true);
      } else {
        setIsInternChecked(false);
      }
    }
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
    } else if (name == 'problematic') {
      setProblematic(value);
      if (!value.trim()) {
        setProblematicError('Problematic is required');
      } else {
        setProblematicError('');
      }
    } else if (name == 'endDate') {
      setEndDate(value);
      if (!value.trim()) {
        setEndDateError('EndDate is required');
      } else {
        setEndDateError('');
      }
    } else if (name == 'startDate') {
      setStartDate(value);
      if (!value.trim()) {
        setStartDateError('StartDate is required');
      } else {
        setStartDateError('');
      }
    } else if (name == 'amount') {
      setAmount(value);
      if (!value.trim()) {
        setAmountError('Amount is required');
      } else {
        setAmountError('');
      }
    } else if (name == 'prizeName') {
      setprizeName(value);
      if (!value.trim()) {
        setprizeNameError('Prize name is required');
      } else {
        setprizeNameError('');
      }
    } else if (name == 'prizeDescription') {
      setprizeDescription(value);
      if (!value.trim()) {
        setprizeDescriptionError('Prize description is required');
      } else {
        setprizeDescriptionError('');
      }
    } else if (name == 'positionTitle') {
      setpositionTitle(value);
      if (!value.trim()) {
        setpositionTitleError('Position title is required');
      } else {
        setpositionTitleError('');
      }
    } else if (name == 'Jobdescription') {
      setjobDescription(value);
      if (!value.trim()) {
        setjobDescriptionError('Job description is required');
      } else {
        setjobDescriptionError('');
      }
    } else if (name == 'projectTitle') {
      setprojectTitle(value);
      if (!value.trim()) {
        setprojectTitleError('Project title is required');
      } else {
        setprojectTitleError('');
      }
    } else if (name == 'projectDescription') {
      setprojectDescription(value);
      if (!value.trim()) {
        setprojectDescriptionError('Project description is required');
      } else {
        setprojectDescriptionError('');
      }
    } else if (name == 'internshipTitle') {
      setInternTitle(value);
      if (!value.trim()) {
        setInternTitleError('Internship title is required');
      } else {
        setInternTitleError('');
      }
    } else if (name == 'Internshipdescription') {
      setInternDescription(value);
      if (!value.trim()) {
        setInternDescriptionError('Internship description is required');
      } else {
        setInternDescriptionError('');
      }
    } else if (name == 'duration') {
      setDuration(value);
      if (!value.trim()) {
        setDurationError('Duration is required');
      } else {
        setDurationError('');
      }
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
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
      problematic !== '' &&
      startDate !== '' &&
      endDate != '' &&
      Image !== '' &&
      DataSetFile !== '' &&
      ImageError === '' &&
      titleError === '' &&
      descriptionError === '' &&
      endDateError === '' &&
      startDateError === '' &&
      problematicError === '' &&
      DataSetFile === ''
    );
  };

  /* const isSecondPageValid = () => {
    return (price !== '' || award !== '') && priceError === '';
  };*/

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

  const navigate = useNavigate();

  // Callback function to update endDate in form data
  const handleEndDateChange = (endDate: any) => {
    checkValidity('endDate', endDate);
  };

  // Callback function to update endDate in form data
  const handleStartDateChange = (startDate: any) => {
    checkValidity('startDate', startDate);
  };

  const checkVisibility = (value: any) => {
    setVisibility(value);
    if (value == 'Choose visiblity') {
      setvisibilityError('Please enter the visiblity of your competition');
    } else {
      setvisibilityError('');
    }
  };

  const handleSubmit = (e: any) => {
    setSubmitted(true);
    if (captchaToken == '') {
      setAlert({
        type: 'error',
        message: 'Please make sure to check the captcha checkbox',
      });
    } else {
      e.preventDefault();
      console.log('file' + DataSetFile);
      console.log('image' + Image);

      addChallenge(
        {
          title: title,
          description: description,
          problematic:problematic,
          amount: amount,
          visibility:visibility,
          startDate:startDate,
          endDate: endDate,
          file:DataSetFile,        
          bareme: {
            output:isOutputChecked ? true : false,
            presentation:isPresentationChecked ? true:false,
            codeSource:isCodeSourceChecked ? true:false,
            dataSet:isDatasetChecked ? true:false,
            readmeFile:isReadMeFileChecked ? true:false,
            rapport:isRapportChecked ? true:false,
            Demo:isDemoChecked ? true:false
          },
          prizes:{
             prizeName:prizeName,
             prizeDescription:prizeDescription
          },
          recruitement:{
            positionTitle:positionTitle,
            jobDescription:jobDescription
          },
         
         freelance:{
           projectTitle:projectTitle,
           projectDescription:projectDescription
          },
       
         internship:{
           internshipTitle:InternTitle,
           internshipDescription:InternDescription,
           duration:duration
         },
         image: Image,
        },
        captchaToken,
      )
        .then((response) => {
          console.log('Challenge added successfully:', response);
          setAlert({
            type: 'success',
            message: 'Challenge added successfully',
          });
          setTimeout(() => {
            navigate('/competitions');
          }, 3000);
        })
        .catch((error) => {
          resetRecaptcha();
          console.error('Error adding challenge:', error);
          setAlert({
            type: 'error',
            message: 'Error adding challenge',
          });
        });
    }
  };

  return (
    <ConnectedClientLayout>
      <div className={`${alert && `mt-8`}`}>
        {alert?.type == 'success' && successfullToast(alert.message)}

        {alert?.type == 'error' && ErrorToast(alert.message)}
      </div>

      <div className="flex flex-col gap-9 border-full">
        <div className="rounded-sm  border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b rounded-lg border-stroke py-4 px-6.5 dark:border-strokedark">
            {/* Stepper */}
            <ol className="flex justify-center items-center w-full">
              <li
                className={`flex w-[15rem] items-center text-blue-600 dark:text-blue-500 ${step === 1 ? 'bg-blue-10 font-bold' : step > 1 ? 'after:border-green-600 text-white font-semibold' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800 `}
              >
                <span
                  className={`flex items-center justify-center w-10 h-10  text-white font-semibold rounded-full lg:h-12 lg:w-12  shrink-0 ${step === 1 ? 'bg-primary font-bold' : step > 1 ? 'bg-green-600 text-white font-semibold' : ''}`}
                >
                  {step > 1 ? <TiTick size={24} /> : '1'}
                </span>
              </li>

              <li
                className={`flex w-[15rem] items-center text-blue-600 dark:text-blue-500 ${step === 2 ? 'bg-blue-10 font-bold' : step > 2 ? 'after:border-green-600 text-white font-semibold' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800 `}
              >
                <span
                  className={`flex items-center justify-center w-10 h-10  text-white font-semibold rounded-full lg:h-12 lg:w-12  shrink-0 ${step === 2 || step === 1 ? 'bg-primary font-bold' : step > 2 ? 'bg-green-600 text-white font-semibold' : ''}`}
                >
                  {step > 2 ? <TiTick size={24} /> : '2'}
                </span>
              </li>

              <li
                className={`flex items-center  ${step === 3 ? 'font-semibold' : ''}`}
              >
                <span
                  className={`flex items-center justify-center w-10 h-10 text-white font-semibold ${submitted ? 'bg-green-600 text-white font-semibold' : 'bg-primary'}  rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}
                >
                  {submitted ? <TiTick size={24} /> : '3'}
                </span>
              </li>
            </ol>

            <ol className="flex justify-center items-cente w-full">
              <li className={`mr-30`}>
                <span
                  className={`font-medium text-md ${step === 1 ? 'text-gray-700 font-bold' : step > 1 ? 'text-green-700 font-semibold' : ''}`}
                >
                  Competition Info
                </span>
              </li>

              <li className={`mr-28`}>
                <span
                  className={`font-medium text-md ${step === 2 || step === 1 ? 'text-gray-700 font-bold' : step > 2 ? 'text-green-700 font-semibold' : ''}`}
                >
                  Evaluation metrics
                </span>
              </li>

              <li className="mr-3">
                <span
                  className={`font-medium text-md text-gray-700 ${submitted ? 'text-green-700 font-semibold' : ''}`}
                >
                  Prize Info
                </span>
              </li>
            </ol>
          </div>
          <div className="sm:py-6.5 sm:px-28 p-6.5">
            {/* Content for Step 1 */}
            <div className={step === 1 ? '' : 'hidden'}>
              <div className="mb-4.5">
                <h2 className="text-xl text-gray-700 font-semibold">
                  Create a competition
                </h2>
                <p className="mt-3">
                  Welcome to the competition creation form. Please fill out the
                  following details to set up your competition
                </p>
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

              <div className="mb-4.5">
                <label className="mb-2.5 font-medium  block text-black dark:text-white">
                  Problematic
                </label>
                <textarea
                  name="problematic"
                  value={problematic}
                  rows={2}
                  placeholder="Enter the problematic of your competition"
                  onChange={(e) => checkValidity('problematic', e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
                {problematicError && (
                  <p className="text-red-500 text-sm mt-1">
                    {problematicError}
                  </p>
                )}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 font-medium  block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  rows={2}
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

              <div className="mb-6">
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
                    className="flex items-center justify-between py-2 px-4 rounded border-[1.5px] border-stroke cursor-pointer"
                    htmlFor="customFile"
                  >
                    {ImageName ? ImageName : 'Upload Challenge Image'}
                  </label>
                </div>
                {ImageError && (
                  <p className="text-red-500 text-sm mt-1">{ImageError}</p>
                )}
              </div>

              <div className="flex w-full">
                <div className="mb-6 w-1/2 mr-4">
                  <DateTimePickerStart
                    onChange={handleStartDateChange}
                    value={startDate}
                  />
                  {startDateError && (
                    <p className="text-red-500 text-sm mt-1">
                      {startDateError}
                    </p>
                  )}
                </div>

                <div className="mb-6 w-1/2 ">
                  <DateTimePicker
                    onChange={handleEndDateChange}
                    value={endDate}
                  />
                  {endDateError && (
                    <p className="text-red-500 text-sm mt-1">{endDateError}</p>
                  )}
                </div>
              </div>

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
                      className="flex items-center justify-between py-2 px-4 rounded border-[1.5px] border-stroke cursor-pointer"
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

            {/* Content for Step 2 */}
            <div className={step === 2 ? '' : 'hidden'}>
              <div>
                <div className="mb-4">
                  <label className="mb-3 block font-medium text-black dark:text-white">
                    Visibility
                  </label>
                  <select
                    id="visibility"
                    value={visibility}
                    onChange={(e) => checkVisibility(e.target.value)}
                    className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  >
                    <option value="Choose Visibility">
                      <span className="text-gray-500">Choose Visibility</span>
                    </option>
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                  </select>

                  {visibilityError && (
                    <div className="flex">
                      <p className="text-red-500 text-sm mt-1">
                        {visibilityError}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block font-medium text-black dark:text-white">
                    Bareme
                  </label>
                  <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                      id="bordered-checkbox-1"
                      type="checkbox"
                      value=""
                      onChange={(e) => handleBaremeCheckboxChange('output', e)}
                      checked={isOutputChecked}
                      name="output"
                      className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="output"
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Output
                    </label>
                  </div>

                  <div className="flex items-center mt-8  ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                      id="bordered-checkbox-2"
                      type="checkbox"
                      value=""
                      onChange={(e) =>
                        handleBaremeCheckboxChange('presentation', e)
                      }
                      checked={isPresentationChecked}
                      name="presentation"
                      className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="presentation"
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Presentation
                    </label>
                  </div>
                  <div className="flex items-center mt-8  ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                      id="bordered-checkbox-3"
                      type="checkbox"
                      value=""
                      onChange={(e) =>
                        handleBaremeCheckboxChange('codeSource', e)
                      }
                      checked={isCodeSourceChecked}
                      name="codeSource"
                      className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="codeSource"
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Source Code
                    </label>
                  </div>
                  <div className="flex items-center mt-8  ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                      id="bordered-checkbox-4"
                      type="checkbox"
                      value=""
                      onChange={(e) => handleBaremeCheckboxChange('dataset', e)}
                      checked={isDatasetChecked}
                      name="dataset"
                      className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="dataset"
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Dataset
                    </label>
                  </div>
                  <div className="flex items-center mt-8  ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                      id="bordered-checkbox-5"
                      type="checkbox"
                      value=""
                      onChange={(e) =>
                        handleBaremeCheckboxChange('readmeFile', e)
                      }
                      checked={isReadMeFileChecked}
                      name="readmeFile"
                      className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="readmeFile"
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      README File
                    </label>
                  </div>
                  <div className="flex items-center mt-8  ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                      id="bordered-checkbox-6"
                      type="checkbox"
                      value=""
                      onChange={(e) => handleBaremeCheckboxChange('rapport', e)}
                      checked={isRapportChecked}
                      name="rapport"
                      className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="rapport"
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      detailed report
                    </label>
                  </div>

                  <div className="flex items-center mt-8  ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                      id="bordered-checkbox-7"
                      type="checkbox"
                      value=""
                      onChange={(e) => handleBaremeCheckboxChange('demo', e)}
                      checked={isDemoChecked}
                      name="demo"
                      className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="demo"
                      className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Demonstration
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* Content for Step 3 */}

            <div className={step === 3 ? '' : 'hidden'}>
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

                  {numberInputVisible && (
                    <div className="mb-4.5 mt-4.5 ml-5">
                      <label className="mb-2.5 font-medium text-sm block text-black dark:text-white">
                        Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={amount}
                        placeholder="Enter the amount of your competition"
                        onChange={(e) =>
                          checkValidity('amount', e.target.value)
                        }
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {amountError && (
                        <p className="text-red-500 text-sm mt-1">
                          {amountError}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center mt-8  ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input
                      id="bordered-radio-1"
                      type="radio"
                      value=""
                      onChange={handleTextCheckboxChange}
                      checked={isPrizesChecked}
                      name="bordered-radio"
                      className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-blue-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                  <div className="ml-5">
                    <div className="flex items-center ps-4 mb-4.5 border border-gray-200 rounded dark:border-gray-700">
                      <input
                        id="bordered-checkbox-1"
                        type="checkbox"
                        value=""
                        onChange={(e) => handlePrizeCheckboxChange('prize', e)}
                        checked={isPrizeChecked}
                        name="prize"
                        className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="prize"
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Prize
                      </label>
                    </div>

                    {isPrizeChecked && (
                      <div>
                        <div className="mb-4.5 mt-4.5 ml-5">
                          <label className="mb-2.5 font-medium text-sm block text-black dark:text-white">
                            Prize Name
                          </label>
                          <input
                            type="text"
                            name="prizeName"
                            value={prizeName}
                            placeholder="Enter the name of the prize"
                            onChange={(e) =>
                              checkValidity('prizeName', e.target.value)
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          {prizeNameError && (
                            <p className="text-red-500 text-sm mt-1">
                              {prizeNameError}
                            </p>
                          )}
                        </div>
                        <div className="mb-4.5 mt-4.5 ml-5">
                          <label className="mb-2.5 font-medium text-sm  block text-black dark:text-white">
                            Prize Description
                          </label>
                          <textarea
                            name="prizeDescription"
                            value={prizeDescription}
                            rows={2}
                            placeholder="Enter the description of the prize"
                            onChange={(e) =>
                              checkValidity('prizeDescription', e.target.value)
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          ></textarea>

                          {prizeDescriptionError && (
                            <p className="text-red-500 text-sm mt-1">
                              {prizeDescriptionError}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center ps-4 mb-4.5 border border-gray-200 rounded dark:border-gray-700">
                      <input
                        id="bordered-checkbox-1"
                        type="checkbox"
                        value=""
                        onChange={(e) =>
                          handlePrizeCheckboxChange('recruitement', e)
                        }
                        checked={isRecruitementChecked}
                        name="recruitement"
                        className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="recruitement"
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Recruitment
                      </label>
                    </div>

                    {isRecruitementChecked && (
                      <div>
                        <div className="mb-4.5 mt-4.5 ml-5">
                          <label className="mb-2.5 font-medium text-sm block text-black dark:text-white">
                            Position Title
                          </label>
                          <input
                            type="text"
                            name="positionTitle"
                            value={positionTitle}
                            placeholder="Enter the name of the position"
                            onChange={(e) =>
                              checkValidity('positionTitle', e.target.value)
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          {positionTitleError && (
                            <p className="text-red-500 text-sm mt-1">
                              {positionTitleError}
                            </p>
                          )}
                        </div>
                        <div className="mb-4.5 mt-4.5 ml-5">
                          <label className="mb-2.5 font-medium text-sm  block text-black dark:text-white">
                            Job Description
                          </label>
                          <textarea
                            name="Jobdescription"
                            value={jobDescription}
                            rows={2}
                            placeholder="Enter the description of the position"
                            onChange={(e) =>
                              checkValidity('Jobdescription', e.target.value)
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          ></textarea>
                          {jobDescriptionError && (
                            <p className="text-red-500 text-sm mt-1">
                              {jobDescriptionError}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center ps-4 mb-4.5 border border-gray-200 rounded dark:border-gray-700">
                      <input
                        id="bordered-checkbox-1"
                        type="checkbox"
                        value=""
                        onChange={(e) =>
                          handlePrizeCheckboxChange('freelance', e)
                        }
                        checked={isFreelanceChecked}
                        name="freelance"
                        className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="freelance"
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Freelance
                      </label>
                    </div>

                    {isFreelanceChecked && (
                      <div>
                        <div className="mb-4.5 mt-4.5 ml-5">
                          <label className="mb-2.5 font-medium text-sm block text-black dark:text-white">
                            Project Title
                          </label>
                          <input
                            type="text"
                            name="projectTitle"
                            value={projectTitle}
                            placeholder="Enter the name of the project"
                            onChange={(e) =>
                              checkValidity('projectTitle', e.target.value)
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          {projectTitleError && (
                            <p className="text-red-500 text-sm mt-1">
                              {projectTitleError}
                            </p>
                          )}
                        </div>
                        <div className="mb-4.5 mt-4.5 ml-5">
                          <label className="mb-2.5 font-medium text-sm  block text-black dark:text-white">
                            Project Description
                          </label>
                          <textarea
                            name="projectDescription"
                            value={projectDescription}
                            rows={2}
                            placeholder="Enter the description of your project"
                            onChange={(e) =>
                              checkValidity(
                                'projectDescription',
                                e.target.value,
                              )
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          ></textarea>
                          {projectDescriptionError && (
                            <p className="text-red-500 text-sm mt-1">
                              {projectDescriptionError}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center ps-4 mb-4.5 border border-gray-200 rounded dark:border-gray-700">
                      <input
                        id="bordered-checkbox-1"
                        type="checkbox"
                        value=""
                        onChange={(e) => handlePrizeCheckboxChange('intern', e)}
                        checked={isInternChecked}
                        name="intern"
                        className="w-10 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="intern"
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Internship
                      </label>
                    </div>

                    {isInternChecked && (
                      <div>
                        <div className="mb-4.5 mt-4.5 ml-5">
                          <label className="mb-2.5 font-medium text-sm block text-black dark:text-white">
                            Internship Title
                          </label>
                          <input
                            type="text"
                            name="internshipTitle"
                            value={InternTitle}
                            placeholder="Enter the name of the internship"
                            onChange={(e) =>
                              checkValidity('internshipTitle', e.target.value)
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          {InternTitleError && (
                            <p className="text-red-500 text-sm mt-1">
                              {InternTitleError}
                            </p>
                          )}
                        </div>
                        <div className="mb-4.5 mt-4.5 ml-5">
                          <label className="mb-2.5 font-medium text-sm  block text-black dark:text-white">
                            Internship Description
                          </label>
                          <textarea
                            name="Internshipdescription"
                            value={InternDescription}
                            rows={2}
                            placeholder="Enter the description of the internship"
                            onChange={(e) =>
                              checkValidity(
                                'Internshipdescription',
                                e.target.value,
                              )
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          ></textarea>
                          {InternDescriptionError && (
                            <p className="text-red-500 text-sm mt-1">
                              {InternDescriptionError}
                            </p>
                          )}
                        </div>
                        <div className="mb-4.5 mt-4.5 ml-5">
                          <label className="mb-2.5 font-medium text-sm block text-black dark:text-white">
                            Duration
                          </label>
                          <input
                            type="number"
                            name="duration"
                            value={duration}
                            placeholder="Enter the duration of the internship"
                            onChange={(e) =>
                              checkValidity('duration', e.target.value)
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          {durationError && (
                            <p className="text-red-500 text-sm mt-1">
                              {durationError}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation buttons */}

            <div className="flex justify-between">
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
                  onClick={nextStep}
                >
                  Next
                </button>
                /*disabled={step === 1 ? !isFirstPageValid() : !isSecondPageValid()}*/
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

export default AddChallenge;
