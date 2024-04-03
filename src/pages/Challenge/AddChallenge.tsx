import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../layout/DefaultLayout';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import DateTimePicker from '../../components/Forms/DatePicker/DateTimePickery';
import { useState } from 'react';
import { addChallenge } from '../../services/challengeService';
import CheckboxR from '../../components/Checkboxes/CheckboxR';
import { TiTick } from 'react-icons/ti';
import { ErrorToast, successfullToast } from '../../components/Toast';

const AddChallenge = () => {
  const [step, setStep] = useState(1);
  const [titleError, setTitleError] = useState('');
  const [title, setTitle] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [description, setDescription] = useState('');
  const [priceError, setPriceError] = useState('');
  const [price, setPrice] = useState('');
  const [awardError, setawardError] = useState('');
  const [award, setAward] = useState('');
  const [endDateError, setEndDateError] = useState('');
  const [endDate, setEndDate] = useState('');
  const [DataSetFileError, setDataSetError] = useState('');
  const [DataSetFile, setDataSetFile] = useState<string | Blob >('');
  const [FileName, setFileName] = useState('');
  const [ImageName, setImageName] = useState('');

  const [ImageError, setImageError] = useState('');
  const [Image, SetImage] = useState<string | Blob >('');
  const [dataSetDescriptionError, setDataSetDescriptionError] = useState('');
  const [dataSetDescription, setDataSetDescription] = useState('');
  const [dataSetTitleError, setDataSetTitleError] = useState('');
  const [dataSetTitle, setDataSetTitle] = useState('');
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null,
  );

  const [textInputVisible, setTextInputVisible] = useState(false);
  const [numberInputVisible, setNumberInputVisible] = useState(false);
  const [isPrizesChecked, setIsPrizesChecked] = useState<boolean>(false);
  const [isMonetaryChecked, setIsMonetaryChecked] = useState<boolean>(false)
  const [submitted , setSubmitted] = useState(false);

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
    else if(name=="price"){
      setPrice(value)
      if (!value.trim()) {
        setPriceError("Price is required");
      }else {
        setPriceError("");
      }
    }
    else if(name=="award"){
      setAward(value)
      if (!value.trim()) {
        setawardError("Award is required");
      }else {
        setawardError("");
      }
    }
    else if(name=="endDate"){
      setEndDate(value)
      if (!value.trim()) {
        setEndDateError("EndDate is required");
      }else {
        setEndDateError("");
      }
    }
    else if(name=="DataSetTitle"){
      setDataSetTitle(value)
     {/*  if (!value.trim()) {
        setDataSetTitleError("DataSet title is required");
      }else {
        setDataSetTitleError("");
      } */}
    }
    else if(name=="DatasetDescription"){
      setDataSetDescription(value)
      {/* if (!value.trim()) {
        setDataSetTitleError("DataSet title is required");
      }else {
        setDataSetTitleError("");
      } */}
    }
    else if(name=="DataSetFile"){
      {/* if (!value.trim()) {
        setDataSetTitleError("DataSet title is required");
      }else {
        setDataSetTitleError("");
      } */}
    }
   }
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const isFirstPageValid = () => {
    return (
      title!== ''&&
      (price!==''||award!=="")&&
      description!==''&&
      endDate!=''&&
      titleError === '' &&
      priceError === '' &&
      descriptionError === '' &&
      endDateError === '' 
    );
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    setDataSetFile(file);
    setFileName(file.name)


  };
  const handleImageChange  = (e:any) => {
    const image = e.target.files[0];
    SetImage(image);
    setImageName(image.name)

  };

  const navigate = useNavigate();

  // Callback function to update endDate in form data
  const handleEndDateChange = (endDate:any) => {
    checkValidity("endDate",endDate);
  };  
  const handleSubmit = (e:any) => {
    setSubmitted(true);

    e.preventDefault();
    console.log('file'+DataSetFile);
    console.log("image"+Image)
    let prizes = price;
    if(isPrizesChecked){
      prizes = award;
    }
    addChallenge({
      title:title,
      description:description,
      price:prizes,
      endDate:endDate,
      dataset: 
        {
          name: dataSetTitle,
          description: dataSetDescription,
        },
       file:DataSetFile,
       image:Image

    })
      .then((response) => {
        console.log('Challenge added successfully:', response);
        setAlert({
          type: 'success',
          message: 'Challenge editted successfully' ,
        });
        setTimeout(() => {
          navigate("/competitions");
        }, 3000);

      })
      .catch((error) => {
        console.error('Error adding challenge:', error);
        setAlert({
          type: 'error',
          message: 'Error edditing challenge',
        });
      });
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
                   <span className={`font-medium ${step === 1 ? 'text-gray-700 font-bold' : step === 2 ? 'text-green-700 font-semibold' : ''}`}>Competition Info</span>

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
                <div>
                <div className="mb-4.5 flex">
                  <div className="mr-4">
                  <CheckboxR onChange={handleTextCheckboxChange} labelText="Prizes"  checked={isPrizesChecked} />

                  </div>
                  <CheckboxR onChange={handleNumberCheckboxChange} labelText="Monetary" checked={isMonetaryChecked} />
                </div>
                  {textInputVisible && (
                    <div>
                  <div className="mb-4.5">
                  <label className="mb-2.5 font-medium block text-black dark:text-white">Awards</label>
                  <input
                    type="text"
                    name="award"
                    value={award}
                    placeholder="Enter the price of your competition"
                    onChange={(e)=>checkValidity("award",e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                      {awardError && <p className="text-red-500 text-sm mt-1">{awardError}</p>}

                </div>
                    </div>
                  )}
                  {numberInputVisible && (
                         <div className="mb-4.5">
                         <label className="mb-2.5 font-medium block text-black dark:text-white">Price</label>
                         <input
                           type="number"
                           name="price"
                           value={price}
                           placeholder="Enter the price"
                           onChange={(e)=>checkValidity("price",e.target.value)}
                           className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                         />
                             {priceError && <p className="text-red-500 text-sm mt-1">{priceError}</p>}
       
                       </div>
                  )}
                </div>               
        

                <div className="mb-4 5">
                <label className="mb-3 block font-medium text-black dark:text-white">Challenge Image</label>

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
                </div>
                <div className="mb-4 5">
                  <DateTimePicker onChange={handleEndDateChange} value={endDate}  />
                  {endDateError && <p className="text-red-500 text-sm mt-1">{endDateError}</p>}

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
              </div>
              {/* Content for Step 2 */}
              <div className={step === 2 ? '' : 'hidden'}>
                <div className="mb-4.5">
                  <label className="mb-2.5 font-medium  block text-black dark:text-white">Dataset title</label>
                  <input
                    type="text"
                    name="dataSetTitle"
                    value={dataSetTitle}
                    placeholder="Enter the title of the dataset"
                    onChange={(e)=>checkValidity("DataSetTitle",e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                      {dataSetTitleError && <p className="text-red-500 text-sm mt-1">{dataSetTitleError}</p>}

                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block font-medium  text-black dark:text-white">Dataset description</label>
                  <textarea
                    name="dataSetDescription"
                    value={dataSetDescription}
                    rows={6}
                    placeholder="Enter the description of the dataset "
                    onChange={(e)=>checkValidity("DatasetDescription",e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                    </div>
                    <div className="mb-4.5">
                    <div>
                    <label className="mb-3 block font-medium text-black dark:text-white">Attach dataSet file</label>
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
                    {dataSetDescriptionError && <p className="text-red-500 text-sm mt-1">{dataSetDescriptionError}</p>}

              </div>
                    </div>
                    </div>
                    {/* Navigation buttons */}
                    {step > 1 && (
                    <div className="flex justify-between">
                    <button className="rounded bg-primary p-3  text-gray hover:bg-opacity-90" onClick={prevStep}>
                    Previous
                    </button>
                    <button className="rounded bg-primary p-3  text-gray hover:bg-opacity-90" onClick={handleSubmit}>
                    Submit
                    </button>
                    </div>
                    )}
                    {step < 2 && (
                    <div className="flex justify-end">
                    <button className="rounded bg-primary p-3  text-gray disabled:opacity-60 hover:bg-opacity-90" onClick={nextStep} disabled={!isFirstPageValid()}>
                    Next
                    </button>
                    </div>
                    )}
                    </div>
                    </div>
                    </div>
                    </ConnectedClientLayout>
                    );
                    };
                    
                    export default AddChallenge;



