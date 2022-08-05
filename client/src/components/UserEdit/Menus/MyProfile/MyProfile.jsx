import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowRight } from 'react-icons/ai'
import s from './MyProfile.module.css';
import { validations } from "./validations";
import axios from 'axios';
import { getUserById, updateUser } from "../../../../redux/actions";
import Swal from 'sweetalert2'
import { useAuth0 } from "@auth0/auth0-react";

export default function MyProfile({ showProfile, setShowProfile }) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({ ...user });
    const [archivo, setArchivo] = useState("");
    const [isChange, setIsChange] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessTokenSilently()
            dispatch(getUserById(user.id, token))
            setInput({ ...user })
        }
        fetchData().catch(console.error);
    }, [user, dispatch])

    useEffect(() => {
        return () => {
            setTimeout(() => {
                // reset page
                setInput({ ...user })
                setShowProfile(true)
            }, 0);
            setShowProfile(false)
        }
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setIsChange(false);
        if (e.target.name === 'file') {
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
        // if(input.first_name !== user.first_name || input.last_name !== user.last_name){

        Swal.fire({
            title: 'Estas seguro que desea modificar sus datos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Guardar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let resUpdated;
                if (archivo[0]) {
                    const files = e.target.files;
                    const data = new FormData();
                    data.append("file", archivo[0]);
                    data.append("upload_preset", "emhwd5ue");
                    const res = await axios.post(
                        "https://api.cloudinary.com/v1_1/duie0xk67/image/upload",
                        data);
                    resUpdated = await dispatch(updateUser(user.id, { ...input, photo: res.data.secure_url }));
                } else {
                    resUpdated = await dispatch(updateUser(user.id, input));
                }
                Swal.fire(
                    'Datos actualizados!',
                    'Se actualizaron tus datos correctamente!',
                    'success'
                )
                setTimeout(() => {
                    // reset page
                    const fetchData = async () => {
                        const token = await getAccessTokenSilently()
                        dispatch(getUserById(user.id, token))
                        setInput({ ...user })
                    }
                    fetchData().catch(console.error);
                    setShowProfile(true)
                }, 0);
                setShowProfile(false)
            }
        })
        // } else {
        //     Swal.fire({
        //         title: 'Ingresa datos diferentes',
        //         confirmButtonColor: '#4a9eab'
        //     })
        // }
    }


    return (
        !showProfile ? null
            :
            <div className={s.profile_container}>
                <h2>Configuración de la cuenta</h2>
                <hr />
                <form className={s.profile_information_container}>
                    <div className={s.profile_image_container}>
                        <div className={s.profile_input_image_container}>
                            <img src={input.photo || 'https://www.avesdeuruguay.com/cres.jpg'}
                                className={s.profile_image}
                                onError={(e) => e.target.src = 'https://www.avesdeuruguay.com/cres.jpg'}
                                alt={user.full_name} />
                            <div className={s.profile_input_container}>
                                <input type="file"
                                    name="file"
                                    onChange={handleChange}
                                    className={s.profile_input_image}
                                />
                            </div>
                        </div>
                        <div className={s.profile_input_container}>
                            <label className={s.profile_label}>Email</label>
                            <input type='text'
                                name='email'
                                disabled={true}
                                value={user.email}
                                className={s.profile_input} />
                        </div>
                        <div className={s.profile_input_container}>
                            <label className={s.profile_label}>Cambiar contraseña</label>
                            <div onClick={ () => alert('auth0 change password') } 
                                className={s.profile_input_password}>
                                <span>********</span>
                                <span><AiOutlineArrowRight/></span>
                            </div>
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

                        <button onClick={handleSubmit} disabled={isChange || Object.keys(errors).length > 0} className={s.profile_btn_save}>Guardar cambios</button>
                    </div>
                </form>
            </div>
    );
}

/* 
const handleClickImage = async (e) => {
            e.preventDefault();
            if (archivo[0]) {
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
        alert('Debes seleccionar una imagen');
        }
*/