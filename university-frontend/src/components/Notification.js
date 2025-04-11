import React from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { showToast } from '../utils/toastService';

const Notification = ({ setOpenNotify }) => {
  const notifications = [
    { id: 1, title: 'Withdraw Request', time: '12 Mar, 2022 - 02:15PM', type: 'info' },
    { id: 2, title: 'Admission Approved', time: '14 Mar, 2022 - 10:45AM', type: 'success' },
    { id: 3, title: 'Library Due!', time: '15 Mar, 2022 - 01:30PM', type: 'warning' },
    { id: 4, title: 'Form Submission Failed', time: '16 Mar, 2022 - 09:00AM', type: 'error' },
  ];

  const handleNotificationClick = (note) => {
    showToast({ title: note.title, time: note.time }, note.type);
    setOpenNotify(false);
  };

  return (
    <>
      <ul className="notification-list">
        <div className="header">
          <h4>You have notifications</h4>
        </div>
        {notifications.map((note) => (
          <li key={note.id} onClick={() => handleNotificationClick(note)}>
            <div className="image">
              <IoMdNotificationsOutline />
            </div>
            <div className="notification_content">
              <h2>{note.title}</h2>
              <p>{note.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Notification;
