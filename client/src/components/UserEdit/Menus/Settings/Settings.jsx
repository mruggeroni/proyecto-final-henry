import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useSelector } from "react-redux";
import s from './Settings.module.css';

export default function Settings({ user, showSettings, setShowSettings }) {
  // const user = useSelector( (state) => state.user );
  // console.log(user)
  /* const user = {
    first_name: 'Ezequiel',
    last_name: 'Bamio',
    phone: 1136457522,
    address_line1: '',
    city: 'Buenos Aires',
    state: '',
    postal_code: 2200,
    country: 'Argentina',
    email: 'eze@gmail.com',
    image: ''
  } */


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
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input)
    setShowSettings(false);
    setInput({
      email: user.email,
      currentPassword: '',
      newPassword: ''
    });
  };

  const handleChange = (e) => {
    e.preventDefault(); 
    setInput({
      ...input,
      [e.target.name]: e.target.value 
    });
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
        <h2>Configuracion de la Cuenta</h2>
        <hr />
        <div className={s.settings_email_container}>
          <h3 className={s.settings_email}>Email</h3>
            <input type='email' 
                    name='email'
                    onChange={handleChange} 
                    value={input.email}
                    className={s.settings_input}/>
          <button onClick={handleSubmit} className={s.settings_email_btn}>Cambiar</button>
        </div>
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
                <span onClick={ (e) =>  handlePassword(e) }>{ showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill /> }</span>
          </div>
          <button onClick={handleSubmit} className={s.settings_btn_save}>Guardar Contraseña</button>
        </form>
        <button onClick={handleDelete} className={s.settings_btn_delete}>Eliminar cuenta</button>
        
    </div>
  );
}
