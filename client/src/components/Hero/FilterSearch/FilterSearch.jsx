import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDestinations, searchPackages } from "../../../redux/actions";
import style from './../Hero.module.css';

export default function FilterSearch({ regions }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const destinations = [];

    const handleChange = (e) => {
        dispatch(searchPackages(e.target.value));
    }

    const handleClick = (e) => {
        e.preventDefault();
        // actions filter
        // dispatch()
        navigate("/search");
    }

    return (
        <form className={style.form_container}>
            <select id="destinations" onChange={ (e) => handleChange(e) } className={style.form_select}>
                <option value="all">All destinations</option>
                {
                    regions?.map( (r) => <option key={`restination-${r}`} value={r}>
                        { r }
                    </option> )
                }
            </select>
            <select id="destinations" className={style.form_select}>
            <option value="all">From...</option>
                {
                    destinations?.map( (d) => <option key={`from-${d.name}`} value={d.name}>
                        { d.name }
                    </option> )
                }
            </select>
            <select id="destinations" className={style.form_select}>
            <option value="all">Until...</option>
                {
                    destinations?.map( (d) => <option key={`until-${d.name}`} value={d.name}>
                        { d.name }
                    </option> )
                }
            </select>
            <button onClick={ (e) => handleClick(e) } className={style.form_button}>
                Buscar
            </button>
        </form>
    )
}