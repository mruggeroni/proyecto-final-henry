import React, { useState } from "react";
import { FaPlane } from "react-icons/fa";
import s from './CheckoutPassengers.module.css';
import PassengerInfo from './PassengerInfo.jsx'

export default function CheckoutPassengers({ showCheckoutPassengers, handleCheckoutPayment, cart }) {
    // cart.forEach()
  
    return (
    !showCheckoutPassengers ? null :
    <div className={s.passengerContainer}>
        <div className={s.containerDesign}>
            <div className={s.headerPassenger}>
                <div className={s.titlePassenger}>
                    <div className={s.avioncito}>
                        <FaPlane />
                    </div>
                    <h3>¿Quién viaja?</h3>
                </div>
                <p>Asegurese de usar el nombre tal cual aparezca en su documentación</p>
            </div>
            <div>
                <PassengerInfo cart={cart}/>
            </div>   
            <button onClick={handleCheckoutPayment} className={s.profile_btn}>Siguiente</button>
        </div> 
    </div>   
  );
}
