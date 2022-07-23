import React from 'react';
import { useState } from 'react';
import s from './Select.module.css';
import style from './SortPrice.module.css'

export default function SortPrice() {

    return (
        <div className={style.sortContainer}>
            <label>Sort by: </label>
            <select className={s.select}>
                <option selected={true} disabled="disabled">Price</option>
                <option value="min">Cheapest to More Expensive</option>
                <option value="max">More Expensive to Cheapest</option>
            </select>
        </div>
    )
}
