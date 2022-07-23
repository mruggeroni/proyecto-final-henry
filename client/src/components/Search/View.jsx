import React from 'react';
import { useState } from 'react';
import s from './Select.module.css';

export default function ViewButton() {

    return (
            <select className={s.select}>
                <option value="10">View 10</option>
                <option value="25">View 25</option>
                <option value="50">View 50</option>
            </select>
    )
}
