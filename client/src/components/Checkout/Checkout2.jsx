import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function(){
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
                        
                    </form>
                </div>
            </div>
       </div>
    )
}