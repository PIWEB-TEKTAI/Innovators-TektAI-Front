import React from 'react';

interface Props {
  onClose: () => void;
}

const ErrorMessageModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg">
        <div className="text-center mt-8">
          <p className="text-xl text-red-500">Vous n'êtes pas connecté !</p>
        </div>
        <button onClick={onClose} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Close</button>
      </div>
    </div>
  );
};

export default ErrorMessageModal;
