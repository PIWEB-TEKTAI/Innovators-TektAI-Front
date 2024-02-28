import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  content: string;
  onClose: () => void;
  onSave: () => void;
  postSaveMessage?: string;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  title,
  content,
  onClose,
  onSave,
  postSaveMessage,
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

  return (
    <>
      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/* content */}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* header */}
              <div className="flex items-start justify-between p-5 text-primary rounded-t">
                <h3 className="text-3xl font-semibold">{title}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {
                    setShowMessage(false);
                    onClose();
                  }}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-4xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              {/* body */}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">{content}</p>
                {showMessage && (
                  <div className="text-green-500 text-sm">
                    {postSaveMessage || "Save successful! Message after save."}
                  </div>
                )}
              </div>
              {/* footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setShowMessage(false);
                    onClose();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleSave}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`opacity-25 fixed inset-0 z-40 bg-black ${showModal ? 'block' : 'hidden'}`}></div>
    </>
  );
};

export default Modal;
