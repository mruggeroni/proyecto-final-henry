import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './MyProfile.module.css';
import { validations } from "./validations";

export default function MyProfile({ user, showProfile, setShowProfile }) {

    // const user = useSelector( (state) => state.user );
   /*  const user = {
        first_name: 'Ezequiel',
        last_name: 'Bamio',
        phone: 1136457522,
        address_line1: '',
        city: 'Buenos Aires',
        state: '',
        postal_code: 2200,
        country: 'Argentina',
        email: 'eze@gmail.com',
        photo: 'https://www.avesdeuruguay.com/cres.jpg'
    } */
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({...user});

    useEffect( () => {
        setInput({...user})
    }, [user])

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value 
        });
        setErrors(validations({
            ...input,
            [e.target.name]: e.target.value 
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(window.alert('Seguro desea modificar los datos?')) {
            console.log(input);
        }
    };
  
  return (
    !showProfile ? null
    :  
    <div className={s.profile_container}>
        <h2>Perfil</h2>
        <hr />
        <form className={s.profile_information_container}>
        <div className={s.profile_image_container}>
            <img src={user.photo || 'https://www.avesdeuruguay.com/cres.jpg'} 
                onError={ (e) => e.target.src = 'https://www.avesdeuruguay.com/cres.jpg' } 
                alt={user.full_name} />
            <div className={s.profile_input_container}>
            <label className={s.profile_label}>Imagen</label>
            <input type='text' 
                    name='photo'
                    onChange={handleChange}
                    value={input.photo} 
                    className={s.profile_input} />
            </div>
            {
                errors.photo && <h4 className={s.profile_error}>{errors.photo}</h4>
            }
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Nombre</label>
            <input type='text' 
                    name='first_name' 
                    value={input.first_name} 
                    onChange={handleChange} 
                    className={s.profile_input} />
                    <div></div>
        {
            errors.first_name && <h4 className={s.profile_error}>{errors.first_name}</h4>
        }
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Apellido</label>
            <input type='text' 
                    name='last_name' 
                    value={input.last_name} 
                    onChange={handleChange} 
                    className={s.profile_input} />
        {
            errors.last_name && <h4 className={s.profile_error}>{errors.last_name}</h4>
        }
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Numero de telefono</label>
            <input type='text' 
                    name='phone' 
                    value={input.phone} 
                    onChange={handleChange} 
                    className={s.profile_input} />
        {
            errors.phone && <h4 className={s.profile_error}>{errors.phone}</h4>
        }
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Dirección</label>
            <input type='text' 
                    name='address_line1' 
                    value={input.address_line1} 
                    onChange={handleChange} 
                    className={s.profile_input} />
        {
            errors.address_line1 && <h4 className={s.profile_error}>{errors.address_line1}</h4>
        }
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Ciudad</label>
            <input type='text' 
                    name='city' 
                    value={input.city} 
                    onChange={handleChange} 
                    className={s.profile_input} />
        {
            errors.city && <h4 className={s.profile_error}>{errors.city}</h4>
        }
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Estado</label>
            <input type='text' 
                    name='state' 
                    value={input.state} 
                    onChange={handleChange} 
                    className={s.profile_input} />
        {
            errors.state && <h4 className={s.profile_error}>{errors.state}</h4>
        }
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Codigo postal</label>
            <input type='text' 
                    name='postal_code' 
                    value={input.postal_code} 
                    onChange={handleChange} 
                    className={s.profile_input} />
        {
            errors.postal_code && <h4 className={s.profile_error}>{errors.postal_code}</h4>
        }
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Pais</label>
            <input type='text' 
                    name='country' 
                    value={input.country} 
                    onChange={handleChange} 
                    className={s.profile_input} />
            {
                errors.postal_code && <h4 className={s.profile_error}>{errors.postal_code}</h4>
            }   
        </div>
        
        <button onClick={handleSubmit} disabled={Object.keys(errors).length} className={s.profile_btn_save}>Guardar cambios</button>
        
        </form>
    </div>
  );
}