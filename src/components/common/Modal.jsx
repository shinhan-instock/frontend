import { useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-20">
          <div className="fixed inset-0 bg-gray-600 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/5 h-3/5 z-30">
            <div className="flex justify-end">
              <button
                className="flex w-6 h-6 rounded-full hover:bg-instock-gray justify-center items-center"
                onClick={() => setIsOpen(false)}
              >
                <HiOutlineX className="w-4 h-4 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
