import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Layout from '../../layout/DefaultLayout';

const AboutUs = () => {
  const [aboutUsContent, setAboutUsContent] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Fetch current About Us content when component mounts
    fetchAboutUsContent();
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const fetchAboutUsContent = async () => {
    try {
      const response = await axios.get('http://localhost:3000/adminlan/aboutus');
      console.log('About Us content response:', response.data);
      setAboutUsContent(response.data.content);
    } catch (error) {
      console.error('Error fetching About Us content:', error);
    }
  };
  
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAboutUsContent(e.target.value);
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
    </Layout>
  );
};

export default AboutUs;
