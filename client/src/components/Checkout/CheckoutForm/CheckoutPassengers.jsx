import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { FaPlane } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Payment } from "./../../../redux/actions/index"; 
import s from './CheckoutPassengers.module.css';
import PassengerInfo from './PassengerInfo.jsx'

export default function CheckoutPassengers({ showCheckoutPassengers, handleCheckoutPayment, cart }) {
    const { getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();

    const handlepay = async (e) => {
        e.preventDefault();
        handleCheckoutPayment();
        const cart = {items: [
          {id: 1,quantity:2 },
          {id: 2, quantity: 1}
        ]}
        const token = await getAccessTokenSilently()
        await dispatch(Payment(cart, token))
    };

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
            <button className={s.profile_btn} onClick={(e) => handlepay(e)}>Siguiente</button>
        </div> 
    </div>   
  );
}
