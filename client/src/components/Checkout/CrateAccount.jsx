import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import s from './Login.module.css';

export default function CreateAccount({ showSettings, setShowSettings }) {
  let [ showPassword, setShowPassword ] = useState(false);
  
  const handlePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }

  return (
    !showSettings ? null
    : <div className={s.createAcc_container}>
        <div className={s.profile_input_container}>
          <label className={s.profile_label}>Nombre</label>
          <input type='text' className={s.profile_input} />
    </div>
    <div className={s.profile_input_container}>
          <label className={s.profile_label}>Apellido</label>
          <input type='text' className={s.profile_input} />
    </div>
    <div className={s.halfandhalf}>
      <div className={s.date_input_container}>
          <label className={s.profile_label}>Fecha de Nacimiento</label>
          <input type='date' className={s.profile_input} />
      </div>
      <div className={s.telefono_input_container}>
          <label className={s.profile_label}>Teléfono</label>
          <input type='tel' className={s.profile_input} />
      </div>
    </div>
    <div className={s.profile_input_container}>
          <label className={s.profile_label}>Email</label>
          <input type='text' className={s.profile_input} />
    </div>
    <div className={s.settings_password_container}>
      <div className={s.password}>
            <label className={s.settings_label}>Contraseña</label>
            <input type={showPassword ? 'text' : 'password'} className={s.profile_input} />
            <span className={s.eyeHide} onClick={ (e) =>  handlePassword(e)}>{ showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill /> }</span>
      </div>
    </div>
    <div>
      <button type="submit" className={s.profile_btn_save}>Crear Cuenta</button>
    </div>
</div>   
  );
}
