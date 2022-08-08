import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import {MdBuild} from 'react-icons/md'
import s from './Settings.module.css';
import {useDispatch, useSelector } from "react-redux";
import { WebAuth } from 'auth0-js';
import { useAuth0 } from "@auth0/auth0-react";
import { ModifyUser } from "../../../../redux/actions";

export default function Settings({ showSettings, setShowSettings }) {
  const { getAccessTokenSilently } = useAuth0();
  const user = useSelector( (state) => state.user );
  const [email, setemail] = useState({
    currentEmail: '',
    newEmail: ''
  });
  let [ showPassword, setShowPassword ] = useState(false);

  const handlePassword = async (e, user) => {
    e.preventDefault()
    var options = { domain: "dev-33fzkaw8.us.auth0.com", clientID: "x5cL1uiTL2R0BR0VXYS0dIeqkA5gSdDm"};
    var webAuth = new WebAuth(options);
      console.log('HERE')
      console.log(user.email)
    const change = await webAuth.changePassword({
       connection: 'Username-Password-Authentication',
        email: user.email
        }, function (err, resp){
             if(err){
               console.log('ERROR')
               console.log(err);
            }else{
               console.log(resp);
      }});
      console.log('HERE FUNCTION')
      console.log(change)
  }
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setShowSettings(false);
   
    setTimeout(() => {
      setShowSettings(true)
      console.log('reset')
    }, 0);
    setShowSettings(false) 
  };

  const handleChange = (e) => {
    e.preventDefault(); 
   

  };

  const handleDelete = (e) => {
    e.preventDefault();
    if(window.alert('Seguro desea eliminar esta cuenta?')) {
    }
  };

  return (
    !showSettings ? null
    : <div className={s.settings_container}>
        <div className={s.title}>
          <h2 className={s.settings_title}>Configuracion de la Cuenta <MdBuild className={s.setting_build} /> </h2>
        </div>
        <hr />
        {/* <div className={s.settings_email_container}>
          <h3 className={s.settings_email}>Email</h3>
            <input type='email' value={user.email} className={s.settings_input}/>
          //<button className={s.settings_email_btn}>Cambiar</button>
        </div>
        </div> */}
        <form className={s.settings_password_container}>
          <button onClick={(e) => handlePassword(e, user)} className={s.settings_btn_save}>Cambiar Contraseña</button>
        </form>
        <button onClick={handleDelete} disabled={true} className={s.settings_btn_delete}>Eliminar cuenta</button>
        
    </div>
  );
}
