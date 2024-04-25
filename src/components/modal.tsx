import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  content: any;
  onClose?: () => void;
  onSave?: () => void;
  postSaveMessage?: string;
  error?:boolean,
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  title,
  content,
  onClose,
  onSave,
  postSaveMessage,
  error,
}) => {
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    // Reset showMessage when showModal changes
    setShowMessage(false);
  }, [showModal]);

  const handleSave = () => {
    onSave();
    setShowMessage(true);
   setTimeout(() => {
   setShowMessage(false);
     onClose();
     window.location.reload();

    }, 1000); 
  };
  const closeModal = () => {
    setShowModal(false);
    onClose();
  };
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
 <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleBackdropClick}
          />         
          <div className="relative z-50 bg-white rounded-lg overflow-hidden max-w-3xl  max-w-lg w-full ">
            {/* content */}
            <div className="flex flex-col max-h-screen">
              {/* header */}
              <div className="p-5 bg-gray-100 text-black rounded-t">
                <h3 className="text-3xl font-semibold">{title}</h3>
                <button
                  className="absolute top-0 right-0 p-2 focus:outline-none"
                  onClick={() => {
                    setShowModal(false);
                    onClose();
                  }}
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
              {/* body */}
              <div className="p-6 flex-grow overflow-y-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">{content}</p>
                {/* Display save message */}
                {postSaveMessage && !error ? (
                  <div className="text-green-500 text-sm">{postSaveMessage}</div>
                ):(
                  <div className="text-[#F87171] text-sm">{postSaveMessage}</div>
                )}
              </div>
              {/* footer */}
              <div className="p-5 bg-gray-100 rounded-b flex justify-end">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm focus:outline-none"
                  onClick={() => {
                    setShowModal(false);
                    onClose();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg text-sm focus:outline-none"
                  onClick={onSave}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;