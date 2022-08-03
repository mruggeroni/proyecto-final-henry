import React from "react";
import { BsFillCaretLeftFill } from 'react-icons/bs';
import style from './Navbar.module.css';

export default function NavPromotions({ handleClose }) {

    function handleBackMenu() { 
        document.getElementById('nav_menu_promotions').classList.remove(`${style.is_active}`);
    }

    return (
        <nav id='nav_menu_promotions' className={`${style.nav_menu}`}>
            <div className={style.nav_menu_container_close}>
                <button onClick={ () => handleClose() } className={style.nav_menu_close}>
                    X
                </button>
            </div>
            <button onClick={ () => handleBackMenu() } className={style.nav_menu_container_back}>
                <BsFillCaretLeftFill/> Volver
            </button>  
            <span className={style.nav_menu_item}>
                No hay promociones
            </span>   
            {/* <NavLink to='/' onClick={ () => handleClose() } className={style.nav_menu_item}>
                No hay promociones
            </NavLink>                */}
        </nav>       
    )
}