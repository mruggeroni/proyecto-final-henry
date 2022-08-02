import React from "react";
import { NavLink } from "react-router-dom";
import s from './Error404.module.css';

export default function Error404() {
    return (
        <div className={s.error_container}>
            <div className={s.error_right}>
                <span className={s.error_404}>404</span>
                <span className={s.error_message}>Parece que la página que estas buscando no existe</span>
                <NavLink to='/' className={s.error_back}>Ir al inicio</NavLink>
            </div>
        </div>
    )
}