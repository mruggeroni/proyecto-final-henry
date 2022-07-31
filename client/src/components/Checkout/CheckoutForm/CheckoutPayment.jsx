import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import s from '../Login.module.css';

export default function CheckoutPayment({ showProfile, setShowProfile }) {

    let [ showPassword, setShowPassword ] = useState(false);
  const handlePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }

  return (
    !showProfile ? null
    :   
    <div className={s.profile_container}>
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
        <div className={s.questions}>
            <div>
                <input type='checkbox'></input>
                <label className={s.rememberMe}>Recordarme</label>
            </div>
            <p>Haz olvidado tu contraseña?</p>
        </div>
        <div>
        <button type="submit" className={s.profile_btn_save}>Iniciar Sesión</button>
        </div>
    </div>   
  );
}