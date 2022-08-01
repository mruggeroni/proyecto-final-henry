import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './PaymentDetails.module.css';
import { validations } from "./validations";
import axios from 'axios';
import { getUserById } from "../../../../redux/actions";

export default function PaymentDetails({ showPaymentDetails, setShowPaymentDetails }) {

    const dispatch = useDispatch();
    const user = useSelector( (state) => state.user );
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({...user});
  
    useEffect( async () => {
        await dispatch(getUserById(user.id))
        setInput({...user})
    }, [user])

    const handleChange = (e) => {
        e.preventDefault();
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
               
    }
  
  return (
    !showPaymentDetails ? null
    :  
    <div className={s.payment_container}>
        <h2>Datos de Pago</h2>
        <hr />
        <form className={s.payment_information_container}>
            <div className={s.payment_input_container}>
                <label className={s.payment_label}>Nombre</label>
                <input type='text' 
                        name='first_name' 
                        value={input.first_name} 
                        onChange={handleChange} 
                        className={s.payment_input} />
            {
                errors.first_name && <h4 className={s.payment_error}>{errors.first_name}</h4>
            }
            </div>
            <div className={s.payment_input_container}>
                <label className={s.payment_label}>Apellido</label>
                <input type='text' 
                        name='last_name' 
                        value={input.last_name} 
                        onChange={handleChange} 
                        className={s.payment_input} />
            {
                errors.last_name && <h4 className={s.payment_error}>{errors.last_name}</h4>
            }
            </div>
            <div className={s.payment_input_container}>
                <label className={s.payment_label}>Numero de telefono</label>
                <input type='text' 
                        name='phone' 
                        value={input.phone} 
                        onChange={handleChange} 
                        className={s.payment_input} />
            {
                errors.phone && <h4 className={s.payment_error}>{errors.phone}</h4>
            }
            </div>
            <div className={s.payment_input_container}>
                <label className={s.payment_label}>Ciudad</label>
                <input type='text' 
                        name='city' 
                        value={input.city} 
                        onChange={handleChange} 
                        className={s.payment_input} />
            {
                errors.city && <h4 className={s.payment_error}>{errors.city}</h4>
            }
            </div>
            <div className={s.payment_input_container}>
                <label className={s.payment_label}>Estado</label>
                <input type='text' 
                        name='state' 
                        value={input.state} 
                        onChange={handleChange} 
                        className={s.payment_input} />
            {
                errors.state && <h4 className={s.payment_error}>{errors.state}</h4>
            }
            </div>

            <button onClick={handleSubmit} disabled={Object.keys(errors).length} className={s.payment_btn_save}>Guardar cambios</button>
        </form>
    </div>
  );
}