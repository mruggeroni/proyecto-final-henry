/* import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { FaPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  Payment,
  createUser,
  getAllCart,
  crearPago,
} from "./../../../redux/actions/index";
import s from "./CheckoutPassengers.module.css";
import PassengerInfo from "./PassengerInfo.jsx";
import Swal from "sweetalert2";

export default function CheckoutPassengers({
  showCheckoutPassengers,
  handleCheckoutPayment,
}) {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  let cart = useSelector((state) => state.cart);

  const handlepay = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const usuario = await dispatch(createUser(token));
    console.log(usuario);
    let cart = await dispatch(getAllCart(usuario.payload.id));
    console.log("CART");
    console.log(cart);
    await dispatch(Payment(cart, token));
  };

  const handlePayML = async (e) => {
    e.preventDefault();
    try {
      const respuestaPago = await dispatch(crearPago(cart));
      console.log(respuestaPago);
      window.location.href = `${respuestaPago.data.init_point}`;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops algo fallo...",
        text: error.message,
      });
    }
  };

  return !showCheckoutPassengers ? null : (
    <div className={s.passengerContainer}>
      <div className={s.containerDesign}>
        <div className={s.headerPassenger}>
          <div className={s.titlePassenger}>
            <div className={s.avioncito}>
              <FaPlane />
            </div>
            //<div>
            //        <PassengerInfo cart={cart}/>
          //  </div>   
        //    <button className={s.profile_btn} onClick={(e) => handlepay(e)}>Siguiente</button>
      //  </div> 
    //</div>   
            <h3>¿Quién viaja?</h3>
          </div>
          <p>
            Asegurese de usar el nombre tal cual aparezca en su documentación
          </p>
        </div>
        <div>
          {cart.packages?.map((p) => (
            <PassengerInfo packageCart={p} />
          ))}
        </div>
        <button className={s.profile_btn} onClick={(e) => handlepay(e)}>
          Pago con STRIPE
        </button>
        <button className={s.profile_btn} onClick={(e) => handlePayML(e)}>
          Pago con Mercado Pago
        </button>
      </div>
    </div>
  );
}
 */