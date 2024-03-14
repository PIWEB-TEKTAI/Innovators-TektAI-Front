import { useState } from 'react';
import Layout from '../../layout/DefaultLayout';
import 'react-phone-number-input/style.css';
import { ErrorToast, successfullToast } from '../../components/Toast';
import { useNavigate } from 'react-router-dom';
import {saveTermsConditions} from '../../services/termsConditions'
import { AxiosError } from 'axios';

const AddTermsConditions = () => {
  
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(
        null,
      );


    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        title: '',
        content: '',
        
      });
    
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };


      const handleCancel = (e:any) =>{
          e.preventDefault();
          navigate('/termsConditions')
      }

      const initialFormData = {
        title: '',
        content: '',
        
      };

      const resetForm =  () => {
        setFormData(initialFormData);
      }
    


      const handleSubmit = async (e:any) => {
        e.preventDefault();
        const isEmpty = Object.values(formData).some(value => value === '');
        if (isEmpty) {
            setAlert({
                type: 'error',
                message: "Please fill in all fields",
              });
        } else {
            saveTermsConditions(formData)
            .then((response) => {
              console.log(response)
              console.log('data submitted successfully :', response.msg);
              setAlert({
                type: 'success',
                message: '' + response.msg,
              });
              resetForm();
              setTimeout(() => {
                navigate('/termsConditions');
              }, 3000);
            })
            .catch((error: AxiosError<any>) => {
              if (error.response && error.response.data && error.response.data.msg) {
                const errorMessage = error.response.data.msg;
                console.error("Erreur lors du submit data :", errorMessage);
                setAlert({
                  type: 'error',
                  message: errorMessage,
                });
              } else {
                console.error("Erreur lors du sbmit data :", error.message);
                setAlert({
                  type: 'error',
                  message: error.message,
                });
              }
            });}
        }

  return (
    <Layout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Terms and conditions</h2>
        </div> 

        <div className="mb-4">
          {alert?.type == 'error' && ErrorToast(alert.message)}
          {alert?.type == 'success' && successfullToast(alert.message)}
        </div>

       
        <form onSubmit={handleSubmit}>            
          <div className="mb-4">
            <label className="mt-2 mb-2.5 block font-medium text-black dark:text-white">
              Title 
            </label>
              <input
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
          </div>
          <div className="mb-4">
            <label className="mt-2 mb-2.5 block font-medium text-black dark:text-white">
             Content
            </label>
              <textarea
                name="content"
                placeholder="Enter content"
                value={formData.content}
                onChange={handleChange}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
          </div>
            <div className="flex justify-end">
               <button
                onClick={(e) => handleCancel(e)}
                className=" w-20 rounded-sm bg-gray-500 p-2 mr-2 text-lg font-semibold text-gray hover:bg-opacity-90">
                  cancel
              </button>
              <button
                type="submit"
                className=" w-20 rounded-sm bg-primary p-2 text-lg font-semibold text-gray hover:bg-opacity-90">
                  save
              </button>
             
            </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddTermsConditions;
