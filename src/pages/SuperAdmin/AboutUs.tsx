import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Layout from '../../layout/DefaultLayout';

interface WhyUsItem {
  _id: string; // Add the ID field
  title: string;
  contentwhy: string;
}


const AboutUs = () => {
  const [aboutUsContent, setAboutUsContent] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [whyUsContent, setWhyUsContent] = useState<WhyUsItem[]>([]);

  useEffect(() => {
    fetchAboutUsContent();
    fetchWhyUsContent();

  }, []); 

  const fetchAboutUsContent = async () => {
    try {
      const response = await axios.get('http://localhost:3000/adminlan/aboutus');
      console.log('About Us content response:', response.data);
      setAboutUsContent(response.data.content);
    } catch (error) {
      console.error('Error fetching About Us content:', error);
    }
  };
  const fetchWhyUsContent = async () => {
    try {
      const response = await axios.get('http://localhost:3000/adminlan/whyus');
      console.log('WhyUs content response:', response.data);
      setWhyUsContent(response.data);
    } catch (error) {
      console.error('Error fetching WhyUs content:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAboutUsContent(e.target.value);
  };
  const handleWhyUsChange = (index: number) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWhyUsContent(prevWhyUsContent => {
      const updatedContent = [...prevWhyUsContent];
      updatedContent[index] = { ...updatedContent[index], [name]: value };
      return updatedContent;
    });
  };
  

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        'http://localhost:3000/adminlan/editaboutus',
        { content: aboutUsContent },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('About Us content updated successfully!');
        setShowAlert(true);
      } else {
        console.error('Failed to update About Us content.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleSubmitWhyUs = async (e: FormEvent<HTMLFormElement>, index: number, id: string) => {
    e.preventDefault();
    const updatedWhyUs = whyUsContent[index]; // Retrieve the updated content for the specific index
    try {
      const response = await axios.put(
        'http://localhost:3000/adminlan/editwhyus',
        { id, ...updatedWhyUs }, // Include the ID in the request payload
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        console.log('Whyus content updated successfully!');
        setShowAlert(true);
      } else {
        console.error('Failed to update Whyus content.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addWhyUsItem = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/adminlan/addwhyus',
        { title: 'New Title', contentwhy: 'New Content' },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      // If successful, add the new item to the state
      if (response.status === 201) {
        setWhyUsContent(prevWhyUsContent => [...prevWhyUsContent, response.data]);
      }
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  const deleteWhyUsItem = async (itemId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/adminlan/deletewhyus/${itemId}`);

      if (response.status === 200) {
        setWhyUsContent(prevWhyUsContent => prevWhyUsContent.filter(item => item._id !== itemId));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  

  return (
    <Layout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <Breadcrumb pageName="Edit About Us" />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              About Us Content
            </label>
              <textarea
                rows={4}
                value={aboutUsContent}
                onChange={handleChange}
                placeholder="Enter About Us content"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
          </div>
          <div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-sm bg-[#28A471] p-2 text-sm font-medium text-gray hover:bg-opacity-90"
              >
                Edit About Us section
              </button>
            </div>
            {showAlert && (
              <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                  {/* Icon here */}
                </div>
                <div className="w-full">
                  <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399]">
                    About Us content edited Successfully
                  </h5>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
  
      {whyUsContent.map((content, index) => (
        <div key={index} className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <Breadcrumb pageName={`Edit Why Choose Us ${index + 1}`} />
          <form onSubmit={(e) => handleSubmitWhyUs(e, index, content._id)}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Why Choose Us Title
              </label>
              <textarea
                value={content.title}
                onChange={handleWhyUsChange(index)}
                name="title"
                placeholder="Enter why choose Us title"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Why Choose Us Content
              </label>
              <textarea
                rows={4}
                value={content.contentwhy}
                onChange={handleWhyUsChange(index)}
                name="contentwhy"
                placeholder="Enter Why choose Us content"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
            <div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-sm bg-[#28A471] p-2 text-sm font-medium text-gray hover:bg-opacity-90"
                >
                  Edit Why Choose Us section {index + 1}
                </button>
              </div>
              {showAlert && (
                <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                  <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                    {/* Icon here */}
                  </div>
                  <div className="w-full">
                    <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399]">
                      Why choose us content edited Successfully
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </form>
          <button onClick={() => deleteWhyUsItem(content._id)}>Delete</button>
        </div>
      ))}
      
      <div className="flex justify-end">
        <button
          onClick={addWhyUsItem}
          className="rounded-sm bg-[#28A471] p-2 text-sm font-medium text-gray hover:bg-opacity-90 mt-4"
        >
          Add Why Choose Us Section
        </button>
      </div>
    </Layout>
    );
};

export default AboutUs;
