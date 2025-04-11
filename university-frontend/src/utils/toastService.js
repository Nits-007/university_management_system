// utils/toastService.js
import { toast } from 'react-toastify';
import { IoMdNotificationsOutline } from 'react-icons/io';

export const showToast = (message, type = 'info') => {
  toast[type](
    <div>
      <strong>{message.title}</strong>
      {message.time && (
        <div style={{ fontSize: '12px', color: '#555' }}>{message.time}</div>
      )}
    </div>,
    {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: <IoMdNotificationsOutline size={22} />,
    }
  );
};
