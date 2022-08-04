import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
<<<<<<< HEAD
import s from './Settings.module.css';
import {useDispatch, useSelector } from "react-redux";
import { WebAuth } from 'auth0-js';
import { useAuth0 } from "@auth0/auth0-react";
import { ModifyUser } from "../../../../redux/actions";
=======
import { MdBuild } from 'react-icons/md';
import { useSelector } from "react-redux";
import s from './Settings.module.css';
>>>>>>> c5b3c1a7eb1de123eae93d5f4ee5fbc7ded1a8da


export default function Settings({ showSettings, setShowSettings }) {
  const { getAccessTokenSilently} = useAuth0();
  const user = useSelector( (state) => state.user );
<<<<<<< HEAD
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
=======
  const [input, setInput] = useState({
    email: '',
    currentPassword: '',
    newPassword: ''
  });
  let [ showPassword, setShowPassword ] = useState(false);

  useEffect( () => {
    setInput({
      ...input,
      email: user.email
    })
}, [user])

  const handlePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
>>>>>>> c5b3c1a7eb1de123eae93d5f4ee5fbc7ded1a8da
  }
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input)
    setShowSettings(false);
    setInput({
      email: user.email,
      currentPassword: '',
      newPassword: ''
    });
    setTimeout(() => {
      setShowSettings(true)
      console.log('reset')
    }, 0);
    setShowSettings(false) 
  };

<<<<<<< HEAD
  const handleChangeEmail = async (e) => {
    e.preventDefault();
 
=======
  const handleChange = (e) => {
    e.preventDefault(); 
    setInput({
      ...input,
      [e.target.name]: e.target.value 
    });
>>>>>>> c5b3c1a7eb1de123eae93d5f4ee5fbc7ded1a8da
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if(window.alert('Seguro desea eliminar esta cuenta?')) {
        console.log(input);
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
<<<<<<< HEAD
            <input type='email' value={user.email} className={s.settings_input}/>
          <button onClick={(e) => handleChangeEmail(e, user)} className={s.settings_email_btn}>Cambiar</button>
        </div>
        <form className={s.settings_password_container}>
          <button onClick={(e) => handlePassword(e, user)} className={s.settings_btn_save}>Cambiar Contraseña</button>
=======
            <input type='email' 
                    name='email'
                    disabled={true}
                    onChange={handleChange} 
                    value={input.email}
                    className={s.settings_input}/>
          <button onClick={handleSubmit} disabled={true} className={s.settings_email_btn}>Cambiar</button>
        </div> */}
        <form className={s.settings_password_container}>
        <h3>Contraseña</h3>
          <div className={s.settings_input_container}>
                <label className={s.settings_label}>Contraseña Actual</label>
                <input type={showPassword ? 'text' : 'password'} 
                        name='currentPassword'
                        onChange={ (e) => handleChange(e) }
                        value={input.currentPassword}
                        className={s.settings_input} />
          </div>
          <div className={s.settings_input_container}>
                <label className={s.settings_label}>Nueva Contraseña</label>
                <input type={showPassword ? 'text' : 'password'}
                        name='newPassword'
                        onChange={ (e) => handleChange(e) }
                        value={input.newPassword} 
                        className={s.settings_input} />
                <span onClick={ (e) => handlePassword(e) }>{ showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill /> }</span>
          </div>
          <button onClick={handleSubmit} disabled={true} className={s.settings_btn_save}>Guardar Contraseña</button>
>>>>>>> c5b3c1a7eb1de123eae93d5f4ee5fbc7ded1a8da
        </form>
        <button onClick={handleDelete} disabled={true} className={s.settings_btn_delete}>Eliminar cuenta</button>
        
    </div>
  );
}
