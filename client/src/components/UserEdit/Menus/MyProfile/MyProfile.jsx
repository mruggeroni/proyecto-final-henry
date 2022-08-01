import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './MyProfile.module.css';
import { validations } from "./validations";
import axios from 'axios';
import { getUserById, updateUser } from "../../../../redux/actions";
export default function MyProfile({ showProfile, setShowProfile }) {

    const dispatch = useDispatch();
    const user = useSelector( (state) => state.user );
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({...user});
    const [imagen, setImagen] = useState("");
    const [loading, setLoading] = useState(false);
    const [archivo, setArchivo] = useState("");

    useEffect( async () => {
        await dispatch(getUserById(user.id))
        setInput({...user})
    }, [user])

    useEffect( () => {
        return () => {
            setTimeout(() => {
                // reset page
                setInput({...user})
                setShowProfile(true)
            }, 0);
            setShowProfile(false)  
        }
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.name === 'file') {
            setArchivo(e.target.files);
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value 
            });
            setErrors(validations({
                ...input,
                [e.target.name]: e.target.value 
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(window.confirm('Seguro desea modificar los datos?')) {
            let resUpdated;
            if(archivo[0]) {
                const files = e.target.files;
                const data = new FormData();
                data.append("file", archivo[0]);
                data.append("upload_preset", "emhwd5ue");
                const res = await axios.post(
                  "https://api.cloudinary.com/v1_1/duie0xk67/image/upload",
                  data
                );
                resUpdated = await dispatch(updateUser(user.id, {...input, photo: res.data.secure_url}));
            } else {
                resUpdated = await dispatch(updateUser(user.id, input));
            }
            setTimeout(() => {
                // reset page
                dispatch(getUserById(user.id))
                setShowProfile(true)
            }, 0);
            setShowProfile(false)            
        }

    const handleClickImage = async (e) => {
        e.preventDefault();
        if(archivo[0]) {
            const files = e.target.files;
            const data = new FormData();
            data.append("file", archivo[0]);
            data.append("upload_preset", "kdrl9hzn");
            const res = await axios.post(
              "https://api.cloudinary.com/v1_1/dmfmud5fb/image/upload",
              data
            );
            setInput({
                ...input,
                photo: res.data.secure_url
            });
        }
        alert('Debes seleccionar una imagen');
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
            <div className={s.profile_input_image_container}>
                <img src={input.photo || 'https://www.avesdeuruguay.com/cres.jpg'} 
                className={s.profile_image}
                    onError={ (e) => e.target.src = 'https://www.avesdeuruguay.com/cres.jpg' } 
                    alt={user.full_name} />
                <div className={s.profile_input_container}>
                <input type="file"
                    name="file"
                    onChange={handleChange} 
                    className={s.profile_input_image} 
                />
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
        
        <button onClick={handleSubmit} disabled={Object.keys(errors).length} className={s.profile_btn_save}>Guardar cambios</button>
        </div>
        </form>
    </div>
  );
}