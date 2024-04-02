import React from 'react';
import ClientLayout from '../layout/clientLayout';

const NotFound: React.FC = () => {
  return (
    <ClientLayout>
        
        <div className='flex flex-col justify-center items-center'>
            <span className="mt-5 inline-block">
                <img src="/src/images/auth/404_error.png" alt="error" className='w-125'/>
            </span>

        </div>
      
    </ClientLayout>
  );
};

export default NotFound;