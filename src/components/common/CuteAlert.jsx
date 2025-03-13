import { toast } from 'react-toastify';

export const CuteAlert = (message, type) => {
  toast[type](
    ({ closeToast }) => (
      <div className="text-center">
        <p className="mb-2">{message}</p>
      </div>
    ),
    {
      position: 'top-center',
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      theme: 'colored',
    }
  );
};
