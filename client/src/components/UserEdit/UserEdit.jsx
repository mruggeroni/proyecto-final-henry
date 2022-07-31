import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MyProfile from './Menus/MyProfile/MyProfile';
import Settings from './Menus/Settings/Settings';
import s from './UserEdit.module.css';

export default function UserEdit() {
  const { logout } = useAuth0();
  const user = useSelector( (state) => state.user );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showProfile, setShowProfile] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [render, setRender] = useState('');
  const handleShowProfile = () => {
    setShowProfile(true);
    setShowSettings(false);
  }
  const handleShowSettings = () => {
    setShowSettings(true);
    setShowProfile(false);
  }

  return (
    <div>
      <button onClick={handleShow} className={s.user_btn}>
        Mi Perfil
      </button>
      <div className={ show ? s.open_profile : s.close_profile }>
        <div onClick={(handleClose)} className={s.profile_back}>
        
        </div>
        <div className={s.profile_container}>
            <div className={s.profile_menu}>
                <div className={s.profile_menu_title}>
                    <span>Hola,</span>
                    <h3>{user.full_name}</h3>
                </div>
                <hr className={s.create_line} />
                <div className={s.profile_btn}>
                  <div>
                    <button className={s.profile_menu_btn} onClick={(handleShowProfile)} >Perfil</button>
                    <button className={s.profile_menu_btn} onClick={(handleShowSettings)}>Configuraciones</button>
                  </div>
                  <div>
                    <button className={s.profile_menu_btn} onClick={(logout)}>Finalizar Sesión</button>
                    <button className={s.profile_menu_btn} onClick={(handleClose)}>Cerrar</button>
                  </div>
                </div>
            </div>
            <div className={s.profile_menu_item}>
                <MyProfile user={user} setRender={setRender} showProfile={showProfile} setShowProfile={setShowProfile} />
                <Settings user={user} showSettings={showSettings} setShowSettings={setShowSettings} />
            </div>
        </div>
      </div>
    </div>
  );
}
