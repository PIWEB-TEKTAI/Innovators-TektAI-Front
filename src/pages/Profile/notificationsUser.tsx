import { Link } from 'react-router-dom';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationUser = () => {
  const [Data, setData] = useState<Notification[] | null>(null);

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
};

  const url = 'http://localhost:3000/notif';

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${url}/list/user`, {
          withCredentials: true,
        });
        const data = await response.data;
        if (data.notifications) {
          setData(data.notifications);
        }
        console.log(Data);
      } catch (error) {
        console.error('Error fetching data notif:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <ConnectedClientLayout>
      <div className="mx-auto max-w-270">
       
            
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Notifications
                </h3>
              </div>
              <div>
                <ul className="flex h-auto flex-col overflow-y-auto">
                  {Data !== null &&
                    Data.map((item: any, index: any) => (
                      <li key={index}>
                        <Link
                          className="flex gap-3 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                          to="#"
                        >
                          <img
                            src={item.UserConcernedId.imageUrl}
                            alt="profile"
                            className="rounded-full max-h-36 w-10"
                          />
                          <div className="flex flex-col">
                            <p className="text-sm">
                              <span className="font-semibold">
                                {toTitleCase(item.UserConcernedId.FirstName)}{' '}
                                {toTitleCase(item.UserConcernedId.LastName)}{' '}
                              </span>{' '}
                              {item.content}
                            </p>

                            <p className="text-xs text-primary font-medium">
                              {formatDate(item.createdAt)}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
    </ConnectedClientLayout>
  );
};

export default NotificationUser;