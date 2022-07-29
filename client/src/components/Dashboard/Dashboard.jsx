import React from "react";
import { useState } from "react";
import CreatePackage from './CreatePackage.jsx'
import CreateActivity from './CreateActivity.jsx'
import style from "./Dashboard.module.css";
import ListPackages from "./ListPackages.jsx";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { NavLink } from "react-router-dom";

export default function Dashboard() {

  return (
    <div className={style.dashboard_container}>
      <div className={style.dashboard_panel}>
        <div className={style.dashboard_panel_title}>
          <h1>Dashboard</h1>
          <hr className={style.create_line} />
        </div>
        <NavLink to='/dashboard/packages' className={style.links_item} >Crear paquete</NavLink>
        <NavLink to='/dashboard/listPackages' className={style.links_item} >Lista paquete</NavLink>
        <NavLink to='/dashboard/activities' className={style.links_item} >Crear un actividad</NavLink>
        <NavLink to='/dashboard/activities' className={style.links_item} >Lista de actividades</NavLink>
        <NavLink to='/dashboard/activities' className={style.links_item} >Lista de usuarios</NavLink>
        
      </div>
    </div>
  );
}