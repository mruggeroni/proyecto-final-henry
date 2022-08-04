import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Payment } from "../../redux/actions";
export default function(){
    const user = useSelector( (state) => state.user );
    const { getAccessTokenSilently} = useAuth0();
    const dispatch = useDispatch();

    const handlepay = async (e) => {
        e.preventDefault();
        console.log(user)
        const cart = {items: [
            {id: 1,quantity:2 },
            {id: 2, quantity: 1}
        ]}
        const token = await getAccessTokenSilently()
        dispatch(Payment(cart, token))
      };
    return(
       <div>
            <h1>Checkout</h1>
            <div>
                <h3>Detalles del Pasajero</h3>
                <p>Asegurate que el nombre coincidan con el nombre de su documentación</p>
                <div className="left">
                    <form>
                        <label>Nombre Completo</label>
                        <input type='text'></input>
                        <label>Apellido</label>
                        <input type='text'></input>
                        <label>Día de Nacimiento</label>
                        <select>
                            <option selected hidden>Día</option>
                        </select>
                        <select>
                            <option selected hidden>Mes</option>
                        </select>
                        <select>
                            <option selected hidden>Año</option>
                        </select>
                        <label>Género</label>
                        <select>
                            <option selected hidden>Seleccionar</option>
                        </select>
                        <h3>Billing Detalles</h3>
                        <button onClick={(e) => handlepay(e)}>Go to pay</button>
                    </form>
                </div>
            </div>
       </div>
    )
}