import React from 'react';
import Modal from 'react-modal'; // Make sure you have installed react-modal

interface SubmissionDetailsModalProps {
  submission: any; // Replace 'any' with the actual type of submission
  onClose: () => void;
}

const SubmissionDetailsModal: React.FC<SubmissionDetailsModalProps> = ({ submission, onClose }) => {
  return (
    <Modal
      isOpen
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '800px',
          height: '60vh',
          padding: '40px',
          borderRadius: '8px',
        },
      }}
    >
      <div className="modal-header flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
        <h2 className="text-xl font-bold">{submission.title}</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="modal-body flex items-center mb-4">
        <div className="w-[250px] rounded-lg mr-5 overflow-hidden">
          <img
            src="/src/images/landing/flight.jpeg" // Replace with the actual image source from submission
            className="card-img-top mt-3 w-50"
            alt="Card image"
          />
        </div>
        <div>
          <span className="font-semibold">Submitted By :</span>
          <p className="text-gray-700 dark:text-gray-300">{submission.submittedBy.email}</p> {/* Update with actual submission properties */}
          <hr className="my-2 border-gray-300" />

          <span className="font-semibold">Submitted At :</span>
          <p className="text-gray-700 dark:text-gray-300">{submission.submissionDate}</p> {/* Update with actual submission properties */}
          <hr className="my-2 border-gray-300" />

          <span className="font-semibold">Description</span>
          <p className="text-gray-700 dark:text-gray-300">{submission.description}</p> {/* Update with actual submission properties */}

          <hr className="my-2 border-gray-300" />
        </div>
      </div>
    </Modal>
  );
};

export default SubmissionDetailsModal;
