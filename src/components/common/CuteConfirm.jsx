// CuteConfirm.js (귀엽고 뽀짝한 확인 모달)

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const CuteConfirm = (message, onConfirm) => {
  confirmAlert({
    title: '정말 삭제할까요?',
    message: message,
    buttons: [
      {
        label: '네 🗑️',
        onClick: onConfirm,
      },
      {
        label: '아니요 😢',
        onClick: () => console.log('삭제 취소'),
      },
    ],
    overlayClassName: 'custom-overlay',
    customUI: ({ onClose }) => (
      <div
        className="bg-pink-100 p-6 rounded-lg shadow-lg text-center"
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#AA00AA',
        }}
      >
        <h2 className="text-lg mb-4">정말 삭제할까요?</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
        >
          네 🗑️
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          아니요 😢
        </button>
      </div>
    ),
  });
};
