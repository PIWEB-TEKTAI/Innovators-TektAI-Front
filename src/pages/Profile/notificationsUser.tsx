import { Link } from 'react-router-dom';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationUser = () => {
  const [Data, setData] = useState<Notification[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // État pour la page actuelle
  const [notificationsPerPage, setNotificationsPerPage] = useState<number>(10); // Nombre de challenges par page


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

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = Data?.slice(
    indexOfFirstNotification,
    indexOfLastNotification,
  );

  const paginate = (pageNumber: number) => {
    console.log('Page number:', pageNumber);
    setCurrentPage(pageNumber);
  };


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
                  {currentNotifications !== null &&
                    currentNotifications.map((item: any, index: any) => (
                    
                  <li key={index}>
                    {item.UserConcernedId && item.UserConcernedId.FirstName && item.UserConcernedId.LastName && (
                            <Link
                            className="flex gap-3 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                            to={item.ChallengeConcernedId ? `/challenge/details/${item.ChallengeConcernedId}` : (item.SubmittionConcernedId ? `/submission/details/${item.SubmittionConcernedId}` : (item.TeamInvitation ? `/teams/myInvitations` : ''))  }>

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
                    ) }

                    {  item.TeamConcernedId &&  item.TeamConcernedId.imageUrl && item.TeamConcernedId.name && (

                      <Link
                      className="flex gap-3 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      to={item.ChallengeConcernedId ? `/challenge/details/${item.ChallengeConcernedId}` : (item.SubmittionConcernedId ? `/submission/details/${item.SubmittionConcernedId}` : '')}>
                      <img
                        src={item.TeamConcernedId.imageUrl}
                        alt="profile"
                        className="rounded-full max-h-36 w-10"
                    />
                     
                      <div className="flex flex-col">
                        <p className="text-sm">
                          <span className="font-semibold">
                            {toTitleCase(item.TeamConcernedId.name)}{' '}
                          </span>{' '}
                          {item.content}
                        </p>

                        <p className="text-xs text-primary font-medium">
                         { formatDate(item.createdAt)}
                        </p>
                      </div>
                    </Link>
                    )}
                  
                    </li>
                   
                    ))}
                </ul>
              </div>
              <div className="pagination mb-5 cursor-pointer">
              <a onClick={() => paginate(currentPage - 1)}>&laquo;</a>
              {Array.from({
                length: Math.ceil(
                  Data.length / notificationsPerPage,
                ),
              }).map((_, index) => (
                <a
                  key={index + 1}
                  className={currentPage === index + 1 ? 'active' : ''}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </a>
              ))}
              <a onClick={() => paginate(currentPage + 1)}>&raquo;</a>
            </div>
            </div>
          </div>
    </ConnectedClientLayout>
  );
};

export default NotificationUser;
