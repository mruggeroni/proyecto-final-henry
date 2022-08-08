import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import s from '../Login.module.css';

export default function CheckoutPayment({ showCheckoutPayment, setShowCheckoutPayment,  handleCheckoutConfirmation }) {

    let [ showPassword, setShowPassword ] = useState(false);
  const handlePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }

  return (
    !showCheckoutPayment ? null
    :   
    <div className={s.profile_container}>
      {/* <button onClick={handleCheckoutConfirmation} >Siguiente</button> */}
       <div>
          <h2>Aguarde un momento que será redirigido...</h2>
       </div>
    </div>   
  );
}