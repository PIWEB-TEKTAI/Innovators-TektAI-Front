import { useEffect, useState } from 'react';
import Layout from '../../layout/DefaultLayout';
import 'react-phone-number-input/style.css';
import { Terms } from '../../types/termsConditions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import '../../css/style1.css';
import { ErrorToast, successfullToast } from '../../components/Toast';
import {updateTermsConditions} from '../../services/termsConditions'
import { deleteTermsConditions } from '../../services/termsConditions'
import { AxiosError } from 'axios';
import Modal from '../../components/modal';

const TermsConditions = () => {
  
    const [Data, setData] = useState<Terms | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedData, setEditedData] = useState<{ title: string, content: string }>({ title: '', content: '' });
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(
      null,
    );


    const closeModal = () => {
      setShowModal(false);
    };
      


    const url = "http://localhost:3000/terms"  

    useEffect(() => {
        const fetchDataTermsConditions = async () => {
          try {
            const response = await fetch(`${url}/list`); 
            const data = await response.json();
            if (data.termsConditions) { 
                setData(data.termsConditions); 
            }
          } catch (error) {
            console.error('Error fetching data terms:', error);
          }
        };
    
        fetchDataTermsConditions();
      }, []);  

      const handleEdit = (index: number) => {
        setEditIndex(index);
        setEditedData({ title: Data && Data[index].title, content: Data && Data[index].content });
      };


      const handleCancel = (e:any) =>{
        e.preventDefault();
        setEditIndex(null);
    }
    
      const handleSave = async (index: string) => {
        updateTermsConditions(editedData,index)
            .then((response) => {
              console.log(response)
              console.log('data edited successfully :', response.msg);
              setAlert({
                type: 'success',
                message: '' + response.msg,
              });
              setEditIndex(null);
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
                console.error("Erreur lors du submit data :", error.message);
                setAlert({
                  type: 'error',
                  message: error.message,
                });
              }
            });
      };


      const handleDelete = async (index: string) => {
            setShowModal(true);
            deleteTermsConditions(index)
            .then((response) => {
              console.log(response)
              console.log('data deleted successfully :', response.msg);
              setAlert({
                type: 'success',
                message: '' + response.msg,
              });
              setEditIndex(null);
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
      };
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedData(prevState => ({ ...prevState, [name]: value }));
      };
     

  return (
    <Layout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Terms and conditions</h2>
          <div className='flex'>
            <Link to="/UpdateTermsConditions" className="bg-[#1C6F55] font-semibold mr-3 text-white py-2 px-4">
              Add
            </Link>
          
          </div>
        </div>
        <div className="mb-4">
          {alert?.type == 'error' && ErrorToast(alert.message)}
          {alert?.type == 'success' && successfullToast(alert.message)}
        </div>

   

  {Data && Data.map((item:any, index:any) => (   

     <div className='mb-3 card' key={index}>
      {editIndex === index ? (
       <div>
      
        <input
          type="text"
          name="title"
          value={editedData.title}
          onChange={handleChange}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <textarea
              name="content"
              value={editedData.content}
              onChange={handleChange}
              className="w-full h-40 rounded-lg border border-stroke bg-transparent py-4 mt-3 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
        <div className="flex justify-end">
          <button
            onClick={(e) => handleCancel(e)}
            className=" w-20 rounded-sm bg-gray-500 p-2 mr-2 text-lg font-semibold text-gray hover:bg-opacity-90">
            cancel
          </button>
          <button
            type="submit"
            onClick={() => handleSave(item._id)}
            className=" w-20 rounded-sm bg-primary p-2 text-lg font-semibold text-gray hover:bg-opacity-90">
              save
          </button>
        </div>    
      </div>      
      ) : (
        <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Delete Confirmation"
        content="Are you sure you want to delete it?"
        onClose={closeModal}
        onSave={()=>handleDelete(item._id)}
      />
          <div className='flex justify-end'>
            <FontAwesomeIcon icon={faPencil} onClick={() => handleEdit(index)} className='mr-2' fontSize={18} color='orange' />
            <FontAwesomeIcon icon={faTrash}  onClick={()=>  handleDelete(item._id)} fontSize={18} color='red' />
          </div>
          <h3 className="text-md mt-2 font-semibold text-primary dark:text-white">
             {item.title}
          </h3>
          <p className="text-base leading-relaxed mt-3 text-gray-500 dark:text-gray-400">
            {item.content}
          </p>
        </div>
      )}
            
     </div>
  ))}
      </div>
    </Layout>
  );

      
};

export default TermsConditions;
