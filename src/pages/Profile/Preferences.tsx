import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import axios from 'axios';
import { User } from '../../types/User';

const Preferences = () => {
  const [autoAcceptRequests, setAutoAcceptRequests] = useState(() => {
    // Retrieve the initial state from localStorage, default to false if not found
    return JSON.parse(localStorage.getItem('autoAcceptRequests') || 'false');
  });
  const [error, setError] = useState<string | null>(null); // Provide null as the default value
  const [Data, setData] = useState<User[] | null>(null);
  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/getpreferences', {
          withCredentials: true,
        });
        
        console.log(response.data); // Log the response data to the console
  
        // Check if the response contains the expected structure
        if (response.data && response.data.user && response.data.user.company) {
          const fetchedAutoAcceptRequests = response.data.user.company.autoAcceptRequests;
          setAutoAcceptRequests(fetchedAutoAcceptRequests);
          localStorage.setItem('autoAcceptRequests', JSON.stringify(fetchedAutoAcceptRequests));
        } else {
          setError('Heeeeeeeeeeey');
        }
      } catch (error) {
        setError('Error fetching user preferences. Please try again later.');
        console.error('Error fetching user preferences:', error);
      }
    };
  
    fetchUserPreferences();
  }, []);
  
  

  const handleAutoAcceptRequestsChange = async (checked: boolean) => {
    setAutoAcceptRequests(checked);
    try {
      // Update the server with the new preference
      await axios.put('http://localhost:3000/user/preferences', { autoAcceptRequests: checked }, {
        withCredentials: true,
      });
      // Update localStorage with the new preference
      localStorage.setItem('autoAcceptRequests', JSON.stringify(checked));
    } catch (error) {
      setError('Error updating user preferences. Please try again later.');
      console.error('Error updating user preferences:', error);
    }
  };

  return (
    <ConnectedClientLayout>
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Challenge</h3>
          </div>
        </div>

        <div className="rounded-sm border mt-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Challenge Preferences</h3>
          </div>

          <div className="px-7 py-4">
            <p>Do you want to automatically accept all the participant requests to all your challenges or challenge by challenge?</p>
            <Switch
              checked={autoAcceptRequests}
              onChange={handleAutoAcceptRequestsChange}
              className="react-switch"
              id="auto-accept-requests-switch"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </ConnectedClientLayout>
  );
};

export default Preferences;
