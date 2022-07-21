import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRegions } from "../../redux/actions";
import style from './Hero.module.css';
import FilterSearch from "./FilterSearch/FilterSearch.jsx";

export default function Hero() {
    const dispatch = useDispatch();
    const regions = useSelector( (state) => state.regions )

    useEffect( () => {
        dispatch(getRegions());
    }, [])

    return (
        <div className={style.hero_container}>
            <div className={style.hero_filter}>
                <div className={style.filter_container}>
                    <FilterSearch regions={regions} />
                </div>
            </div>
        </div>
    )
}