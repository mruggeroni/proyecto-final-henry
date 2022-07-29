import React, { useState } from "react";
import s from '../UserEdit/Menus/MyProfile/MyProfile.module.css';

export default function MyProfile({ showProfile, setShowProfile }) {
  return (
    !showProfile ? null
    :  
    <div className={s.profile_container}>
        <h2>Perfil</h2>
        <hr />
        <form className={s.profile_information_container}>
        <div className={s.profile_image_container}>
            <img src="https://www.avesdeuruguay.com/cres.jpg" alt="" />
            <div className={s.profile_input_container}>
            <label className={s.profile_label}>Imagen</label>
            <input type='text' value='https://www.avesdeuruguay.com/cres.jpg' className={s.profile_input} />
            </div>
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Nombre</label>
            <input type='text' className={s.profile_input} />
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Apellido</label>
            <input type='text' className={s.profile_input} />
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Username</label>
            <input type='text' className={s.profile_input} />
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Otro</label>
            <input type='text' className={s.profile_input} />
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Otro otro</label>
            <input type='text' className={s.profile_input} />
        </div>
        <button className={s.profile_btn_save}>Guardar cambios</button>
        </form>
    </div>
  );
}