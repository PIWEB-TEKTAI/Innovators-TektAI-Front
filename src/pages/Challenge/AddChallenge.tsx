import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import DefaultLayout from '../../layout/DefaultLayout';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import DateTimePicker from '../../components/Forms/DatePicker/DateTimePickery';
import { useState } from 'react';
import { addChallenge } from '../../services/challengeService';

const AddChallenge = () => {
  const [step, setStep] = useState(1);
  const [titleError, setTitleError] = useState('');
  const [title, setTitle] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [description, setDescription] = useState('');
  const [priceError, setPriceError] = useState('');
  const [price, setPrice] = useState('');
  const [endDateError, setEndDateError] = useState('');
  const [endDate, setEndDate] = useState('');
  const [DataSetFileError, setDataSetError] = useState('');
  const [DataSetFile, setDataSetFile] = useState<string | Blob >('');
  const [dataSetDescriptionError, setDataSetDescriptionError] = useState('');
  const [dataSetDescription, setDataSetDescription] = useState('');
  const [dataSetTitleError, setDataSetTitleError] = useState('');
  const [dataSetTitle, setDataSetTitle] = useState('');
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
      price!==''&&
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
    console.log("file"+file);
    setDataSetFile(file);

  };
  // Callback function to update endDate in form data
  const handleEndDateChange = (endDate:any) => {
    checkValidity("endDate",endDate);
  };
  const formData = new FormData(); // Create FormData object to handle file upload
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    addChallenge({
      title:title,
      description:description,
      price:price,
      endDate:endDate,
      dataset: 
        {
          name: dataSetTitle,
          description: dataSetDescription,
        }
        ,
       file:DataSetFile
   

    })
      .then((response) => {
        // Handle success
        console.log('Challenge added successfully:', response);
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding challenge:', error);
      });
  };

  return (
    <ConnectedClientLayout>
      <Breadcrumb pageName="Add Challenge" />
      <div className="">
        <div className="flex flex-col gap-9 border-full">
          <div className="rounded-sm rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b rounded-lg border-stroke py-4 px-6.5 dark:border-strokedark">
              {/* Stepper */}
              <ol className="flex justify-center items-center w-full">
                <li className={`flex w-[10rem] items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800 ${step === 1 ? 'font-semibold' : ''}`}>
                  <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                    1
                  </span>
                </li>
                <li className={`flex items-center  ${step === 2 ? 'font-semibold' : ''}`}>
                  <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                    2
                  </span>
                </li>
              </ol>
            </div>
            <div className="sm:py-6.5 sm:px-28 p-6.5">
              {/* Content for Step 1 */}
              <div className={step === 1 ? '' : 'hidden'}>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Enter the title of your challenge"
                    onChange={(e) =>checkValidity("title",e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                      {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}

                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={price}
                    placeholder="Enter the price"
                    onChange={(e)=>checkValidity("price",e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                      {priceError && <p className="text-red-500 text-sm mt-1">{priceError}</p>}

                </div>
                <div className="mb-4 5">
                  <DateTimePicker onChange={handleEndDateChange}  />
                  {endDateError && <p className="text-red-500 text-sm mt-1">{endDateError}</p>}

                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">Add Challenge description</label>
                  <textarea
                    name="description"
                    value={description}
                    rows={6}
                    placeholder="Type your description"
                    onChange={(e)=>checkValidity("description",e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                      {descriptionError && <p className="text-red-500 text-sm mt-1">{descriptionError}</p>}

                </div>
              </div>
              {/* Content for Step 2 */}
              <div className={step === 2 ? '' : 'hidden'}>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">DataSet Title</label>
                  <input
                    type="text"
                    name="dataSetTitle"
                    value={dataSetTitle}
                    placeholder="Enter the title of the Dataset"
                    onChange={(e)=>checkValidity("DataSetTitle",e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                      {dataSetTitleError && <p className="text-red-500 text-sm mt-1">{dataSetTitleError}</p>}

                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Add DataSet description</label>
                  <textarea
                    name={dataSetDescription}
                    rows={6}
                    placeholder="Type your description"
                    onChange={(e)=>checkValidity("DataSetDescription",e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                    </div>
                    <div className="mb-4.5">
                    <div>
                    <label className="mb-3 block text-black dark:text-white">Attach dataSet file</label>
                    <input
                      type="file"
                      name='file'
                      onChange={handleFileChange}
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                    {dataSetDescriptionError && <p className="text-red-500 text-sm mt-1">{dataSetDescriptionError}</p>}

              </div>
                    </div>
                    </div>
                    {/* Navigation buttons */}
                    {step > 1 && (
                    <div className="flex justify-between">
                    <button className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={prevStep}>
                    Previous
                    </button>
                    <button className="rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90" onClick={handleSubmit}>
                    Submit
                    </button>
                    </div>
                    )}
                    {step < 2 && (
                    <div className="flex justify-end">
                    <button className="rounded bg-primary p-3 font-medium text-gray disabled:opacity-60 hover:bg-opacity-90" onClick={nextStep} disabled={!isFirstPageValid()}>
                    Next
                    </button>
                    </div>
                    )}
                    </div>
                    </div>
                    </div>
                    </div>
                    </ConnectedClientLayout>
                    );
                    };
                    
                    export default AddChallenge;



