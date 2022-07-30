import React, { useState } from "react";
import * as yup from "yup";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import s from './Settings.module.css';

// const schema = yup.object().shape({
//   name: yup
//     .string()
//     .min(2, "Muy corto")
//     .max(20, "Maximo 20")
//     .required("Requerido"),
//   image: yup.string().required("Requerido"),
// }); 



export default function Settings({ showSettings, setShowSettings }) {

  let [ showPassword, setShowPassword ] = useState(false);
  const handlePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }
  const handleSubmit = (e) => {
  };

  const handleChange = (e) => {
  };

  const handleClose = () => {
  };

  return (
    !showSettings ? null
    : <div className={s.settings_container}>
        <h2>Configuracion de la Cuenta</h2>
        <hr />
        <div className={s.settings_email_container}>
          <h3 className={s.settings_email}>Email</h3>
            <input type='email' value='email@gmail.com' className={s.settings_input}/>
          <button className={s.settings_email_btn}>Cambiar</button>
        </div>
        <form className={s.settings_password_container}>
        <h3>Contraseña</h3>
          <div className={s.settings_input_container}>
                <label className={s.settings_label}>Contraseña Actual</label>
                <input type={showPassword ? 'text' : 'password'} className={s.settings_input} />
          </div>
          <div className={s.settings_input_container}>
                <label className={s.settings_label}>Nueva Contraseña</label>
                <input type={showPassword ? 'text' : 'password'} className={s.settings_input} />
                <span onClick={ (e) =>  handlePassword(e) }>{ showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill /> }</span>
          </div>
          <button className={s.settings_btn_save}>Guardar Contraseña</button>
        </form>
        <button className={s.settings_btn_delete}>Eliminar cuenta</button>
        
    </div>
  );
}
