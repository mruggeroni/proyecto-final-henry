import React from "react";
import { NavLink } from 'react-router-dom';
import { BsFillCaretLeftFill } from 'react-icons/bs';
import style from './Navbar.module.css';

export default function NavDestinations({ handleClose }) {

    function handleBackMenu() { 
        document.getElementById('nav_menu_destinations').classList.remove(`${style.is_active}`);
    }

    return (
        <nav id='nav_menu_destinations' className={`${style.nav_menu}`}>
            <div className={style.nav_menu_container_close}>
                <button onClick={ () => handleClose() } className={style.nav_menu_close}>
                    X
                </button>
            </div>
            <button onClick={ () => handleBackMenu() } className={style.nav_menu_container_back}>
                <BsFillCaretLeftFill/> Volver al menu
            </button>    
            {
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map( (i) => (
                    <NavLink to='/' key={i} onClick={ () => handleClose() } className={style.nav_menu_item}>
                        Test {i}
                    </NavLink>
                )
            )
            }      
        </nav>        
    )
}