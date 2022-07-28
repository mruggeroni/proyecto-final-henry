import React from "react";
import { useState } from "react";
import CreatePackage from './CreatePackage.jsx'
import CreateActivity from './CreateActivity.jsx'
import style from "./Dashboard.module.css";
import ListPackages from "./ListPackages.jsx";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'

export default function Dashboard() {

  const [showDashboard, setShowDashboard] = useState(false)
  const [showCreatePackage, setShowCreatePackage] = useState(false)
  const [showCreateActivity, setShowCreateActivity] = useState(false)
  const [showListPackages, setShowListPackages] = useState(false)
  const handleShowCreatePackage = () => {
    setShowCreatePackage(true);
    setShowCreateActivity(false);
    setShowListPackages(false);
  }
  const handleShowCreateActivity = () => {
    setShowCreateActivity(true);
    setShowCreatePackage(false);
    setShowListPackages(false);
  }
  const handleShowListPackages = () => {
    setShowListPackages(true);
    setShowCreateActivity(false);
    setShowCreatePackage(false);
  }


  return (
    <div className={ showDashboard ? style.dashboard_container : style.dashboard_container_close }>
      <div className={showDashboard ? style.dashboard_panel : style.dashboard_panel_close}>
        <div className={style.dashboard_panel_title}>
        { showDashboard && <h1>Dashboard</h1> }
          <hr className={style.create_line} />
        </div>
        {
        showDashboard && <button onClick={handleShowCreatePackage} className={style.links_item}>
          Crear un paquete
        </button>
        }
        {
        showDashboard && <button onClick={handleShowListPackages} className={style.links_item}>
          Lista de paquetes
        </button>
        }
        {
        showDashboard && <button onClick={handleShowCreateActivity} className={style.links_item}>
          Crear un actividad
        </button>
        }
        {
        showDashboard && <button className={style.links_item}>
          Lista de actividades
        </button>
        }
        {
        showDashboard && <button className={style.links_item}>
          Lista de usuarios
        </button>
        }
        <button onClick={ () => setShowDashboard(!showDashboard) } className={style.links_item}> { showDashboard ? <BsFillArrowLeftCircleFill /> : <BsFillArrowRightCircleFill /> }</button>
      </div>
      <div className={style.dashboard_show} >
        <CreatePackage showCreatePackage={showCreatePackage} setShowCreatePackage={setShowCreatePackage} />
        <CreateActivity showCreateActivity={showCreateActivity} setShowCreateActivity={setShowCreateActivity} />
        <ListPackages showListPackages={showListPackages} setShowListPackages={setShowListPackages} />
      </div>
    </div>
  );
}