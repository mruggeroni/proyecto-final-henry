import React from 'react';
import { useState } from 'react';
import s from './Select.module.css';

export default function SortPrice() {

    return (
        <div>
            <label>Sort by: </label>
            <select className={s.select}>
                <option selected={true} disabled="disabled">Price</option>
                <option value="min">Cheapest to More Expensive</option>
                <option value="max">More Expensive to Cheapest</option>
            </select>
        </div>
    )
}
