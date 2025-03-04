/* eslint-disable react/prop-types */
import { HiOutlineX } from 'react-icons/hi';

export default function Modal({ children, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="fixed inset-0 bg-gray-600 opacity-50"></div>
          <div className="relative bg-white p-4 rounded-lg shadow-lg w-3/8 h-4/5 z-50">
            <div className="flex justify-end pb-2">
              <button
                className="flex w-5 h-5 rounded-full hover:bg-instock-gray justify-center items-center"
                onClick={onClose}
              >
                <HiOutlineX className="w-4 h-4 text-gray-600 hover:text-red-500" />
              </button>
            </div>
            <div className="w-full h-full">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
