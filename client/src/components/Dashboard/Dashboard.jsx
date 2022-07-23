import React from "react";
import { NavLink } from "react-router-dom";
import CreatePackage from "./CreatePackage";
import style from './Dashboard.module.css';

export default function Dashboard() {
    return (
        <div className={style.dashboard_container}>
            <h1>Dashboard</h1>
            <div className={style.links_container}>
                <NavLink to='/dashboard/paquetes' className={style.links_item}>Paquetes</NavLink>
                |<NavLink to='/dashboard/actividades' className={style.links_item}>Actividades</NavLink>
            </div>
            <CreatePackage/>
        </div>
    )
}