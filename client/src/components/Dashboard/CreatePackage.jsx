import React from "react";
import style from './CreatePackage.module.css';

export default function CreatePackage() {
    return (
        <div className={style.create_container} >
            <h2>Create a Package</h2>
            <hr className={style.create_line} />
            <div className={style.create_input_container}>
                <label htmlFor="" className={style.create_label}>Package Name</label>
                <input type="text" className={style.create_input} />
            </div>
        </div>
    )
}