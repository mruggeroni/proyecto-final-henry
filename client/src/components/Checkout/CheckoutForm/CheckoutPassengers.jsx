import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import s from './CheckoutPassengers.module.css';
import PassengerInfo from './PassengerInfo.jsx'

export default function CheckoutPassengers({ showProfile, setShowProfile, cart, FaPlane }) {
    // cart.forEach()
  
    return (
    !showProfile ? null :
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
        </div> 
    </div>   
  );
}
