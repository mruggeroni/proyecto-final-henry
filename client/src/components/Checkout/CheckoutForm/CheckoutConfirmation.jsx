import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import s from './CheckoutConfirmation.module.css';

export default function CheckoutConfirmation({ showCheckoutConfirmation, setShowCheckoutConfirmation }) {
  const user = useSelector((state) => state.user);

  return (
<<<<<<< HEAD
    !showCheckoutConfirmation ? null
    :   
=======
    // !showCheckoutConfirmation ? null
    // :   
>>>>>>> 6619fdc4664f95d4d74e30022e796b228847e293
    <div className={s.confirmation_container}>
      <div className={s.textConfirmation}>
        <h1>Su compra fue realizada con éxito!</h1>
        <p>Recibirá un mail a {user.email} con los datos de su compra.</p>
      </div>
    </div>   
  );
}