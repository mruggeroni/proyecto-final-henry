import React, { useEffect } from "react";
import style from './Hero.module.css';
import FilterSearch from "./FilterSearch/FilterSearch.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllDestinations } from "../../redux/actions";

export default function Hero() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAllDestinations());
    }, [dispatch]);
  
    const allDestinations = useSelector((state) => state.destinations);


    return (
        <div className={style.hero_container}>
            <div className={style.hero_filter}>
                <div className={style.filter_container}>
                    <FilterSearch destinations={allDestinations} />
                </div>
            </div>
        </div>
    )
}