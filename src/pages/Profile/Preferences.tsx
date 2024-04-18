import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import axios from 'axios';

const Preferences = () => {
  const [autoAcceptRequests, setAutoAcceptRequests] = useState(false);

  useEffect(() => {
    // Fetch company preferences when the component mounts
    fetchCompanyPreferences();
  }, []);

  const fetchCompanyPreferences = async () => {
    try {
      const response = await axios.get('/api/company/preferences');
      if (response.data) {
        setAutoAcceptRequests(response.data.autoAcceptRequests);
      }
    } catch (error) {
      console.error('Error fetching company preferences:', error);
    }
  };

  const handleAutoAcceptRequestsChange = async (checked:any) => {
    setAutoAcceptRequests(checked);
    try {
      await axios.post('/api/company/preferences', { autoAcceptRequests: checked });
    } catch (error) {
      console.error('Error updating company preferences:', error);
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
          </div>
        </div>
      </div>
    </ConnectedClientLayout>
  );
};

export default Preferences;
