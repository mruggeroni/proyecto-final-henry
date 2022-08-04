import React from "react";
import s from './Loading.module.css';

export default function Loading() {
    return (
    <div className={s.contenedorSpinner}>
        <div className={s.spinner}></div>
    </div>
    )
}