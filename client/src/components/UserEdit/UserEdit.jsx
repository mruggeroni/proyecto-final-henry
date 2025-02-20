import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyProfile from './Menus/MyProfile/MyProfile';
import PaymentDetails from './Menus/PaymentDetails/PaymentDetails';
import Settings from './Menus/Settings/Settings';
import UserOrders from './Menus/UserOrders/UserOrders';
import s from './UserEdit.module.css';

export default function UserEdit({ handleClickUser }) {
  const { logout } = useAuth0();
  let user = useSelector( (state) => state.user );
  
  const [showProfile, setShowProfile] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  // const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showUserOrders, setShowUserOrders] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShowSettings(false)
    // setShowPaymentDetails(false)
    setShow(false)
    setShowProfile(true)
    handleClickUser();
  };

  const handleShow = () => setShow(true);

  const [render, setRender] = useState('');

  const handleShowProfile = () => {
    setShowProfile(true);
    setShowSettings(false);
    // setShowPaymentDetails(false);
    setShowUserOrders(false);
  }
  const handleShowSettings = () => {
    setShowSettings(true);
    setShowProfile(false);
    // setShowPaymentDetails(false);
    setShowUserOrders(false);
  }
  const handleShowPaymentDetails = () => {
    // setShowPaymentDetails(true);
    setShowProfile(false);
    setShowSettings(false);
    setShowUserOrders(false);
  }
  const handleShowUserOrders = () => {
    setShowUserOrders(true);
    setShowProfile(false);
    setShowSettings(false);
    // setShowPaymentDetails(false);
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
                  <div className={s.profile_main_btn}>
                    <div>
                    <button className={s.profile_menu_btn} onClick={(handleShowProfile)} >Configuración</button>
                    <button className={s.profile_menu_btn} onClick={(handleShowUserOrders)}>Lista de ordenes</button>
                    </div>
                    {/* <button className={s.profile_menu_btn} onClick={(handleShowPaymentDetails)}>Datos de pago</button> */}
                    {/* <button className={s.profile_menu_btn} onClick={(handleShowSettings)}>Configuraciones</button> */}
                  </div>
                  <div>
                    <button className={s.profile_menu_btn} onClick={(logout)}>Finalizar Sesión</button>
                    <button className={s.profile_menu_btn} onClick={(handleClose)}>Cerrar</button>
                  </div>
                </div>
            </div>
            <div className={s.profile_menu_item}>
                <MyProfile showProfile={showProfile} setShowProfile={setShowProfile} />
                {/* <Settings user={user} showSettings={showSettings} setShowSettings={setShowSettings} /> */}
                {/* <PaymentDetails showPaymentDetails={showPaymentDetails} setShowPaymentDetails={setShowPaymentDetails} /> */}
                <UserOrders handleClose={handleClose} showUserOrders={showUserOrders} setShowUserOrders={setShowUserOrders} />
            </div>
        </div>
      </div>
    </div>
  );
}
