import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getCartLocalStorage } from "../../redux/actions";
import CardCheckout from './CardCheckout';
import Login from './Login.jsx';
import CreateAccount from './CrateAccount.jsx'
import s from './Checkout.module.css';
import { HiOutlineEmojiSad } from "react-icons/hi";
import style from '../UserEdit/UserEdit.module.css'

export default function(){
    const cart = useSelector((state) =>state.cart);
    const [showLogin, setShowLogin] = useState(true);
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartLocalStorage());
    },[dispatch])

    const handleShowLogin = () => {
        setShowLogin(true);
        setShowCreateAccount(false);
    }

    const handleShowCreateAccount = () => {
        setShowCreateAccount(true);
        setShowLogin(false);
      }

    return(
       <div className={s.checkoutContainer}>
            <div className={s.logInCreateAcc}>
                    <div className={s.right}>
                        <div className={s.headerCheckout}>
                            <button onClick={(handleShowLogin)} >Login</button>
                            <button onClick={(handleShowCreateAccount)}>Crear Cuenta</button>
                       </div>
                      { !showLogin ? <div className={s.lines}><hr className={s.line}/><hr className={s.create_line}/></div> : <div className={s.lines}><hr className={s.create_line}/><hr className={s.line}/></div>}
                    </div>
                <div>
                    <Login showProfile={showLogin} setShowProfile={setShowLogin} />
                    <CreateAccount showSettings={showCreateAccount} setShowSettings={setShowCreateAccount} />
                </div>
            </div>
            <div className={s.left}>
                <h1 className={s.resumenCarrito}>Resumen del Carrito</h1>
                {cart?.length ? cart.map((p) => {
                return (
                  <div className={s.cardCheckoutContainer} key={p.paquete.id}>
                    <Link to={"/detail/" + p.paquete.id} key={p.paquete.id}>
                      <CardCheckout
                        name={p.paquete.name}
                        image={p.paquete.main_image}
                        qty={p.cantidad}
                        price={p.paquete.price}
                        total={p.total}
                        activities={p.actividades}
                        id={p.paquete.id}
                        key={p.id}
                      />
                    </Link>
                  </div>
                );
              }):
              (<div className={s.cardCheckoutContainer}>
                  <div className={s.noPaq}>
                      <div className={s.sadFace}>
                        <HiOutlineEmojiSad />
                      </div>
                      <p className={s.vacioPaq}>Tu carrito se encuentra vacío</p>
                  </div>
                </div>
                )}
                {/* </div> */}
            </div>
       </div>
    )
}