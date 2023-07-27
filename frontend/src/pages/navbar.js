import React, { useState, useContext, useRef } from 'react';
import NotificationIcon from '../images/Icons/notification';
import { AuthContext } from '../authContext';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import '../index.css';
import avatar from '../images/defaultAvatar.jpeg';

const modalStyle = {
  height: '20px',
  width: '150px',
  backgroundColor: 'white',
  position: 'absolute',
  top: '70px',
  textAlign: 'center',
  borderRadius: '10px',
  fontWeight: 'bold',
  fontSize: '12px',
  cursor: 'pointer',
};

const Navbar = ({ username }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };
  const [modal, setModal] = useState(false);
  const [avatarImage, setAvatarImage] = useState(avatar);
  const handleAvatar = () => {
    if (modal) setModal(false);
    else setModal(true);
  };

  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const avatarImage = event.target.result;

        console.log('Selected image:', avatarImage);
        setAvatarImage(avatarImage);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className='Navbar'>
      <div className='logo'>Scooby Savings</div>
      <div className='navbar-items'>
        <NotificationIcon onClick={() => {}} />
        <div className='user'>
          <div className='user-photo'>
            <img
              className='avatar'
              src={avatarImage}
              onClick={handleAvatarClick}
              style={{ cursor: 'pointer' }}
            />
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
          <p>{username}</p>
        </div>
        <button type='button' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Navbar;
