import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsFillPatchCheckFill } from "react-icons/bs";
import s from './CheckoutConfirmation.module.css';

export default function CheckoutConfirmation({ showCheckoutConfirmation, setShowCheckoutConfirmation }) {
  const user = useSelector((state) => state.user);

  return (
    // !showCheckoutConfirmation ? null
    // :   
    <div className={s.confirmation_container}>
      <div className={s.textConfirmation}>
        <span><BsFillPatchCheckFill className={s.confirmation_icon}/></span>
        <h1>Su compra fue realizada con éxito!</h1>
        <p>Recibirá un mail a {user.email} con los datos de su compra.</p>
        <button className={s.confirmation_btn}>Inicio</button>
      </div>
    </div>   
  );
}