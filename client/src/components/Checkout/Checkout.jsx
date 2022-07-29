import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartLocalStorage } from "../../redux/actions";
import CardCheckout from './CardCheckout';
// import Login from './Login.jsx';
// import CreateAccount from './CrateAccount.jsx'
import s from './Checkout.module.css';
import style from '../UserEdit/UserEdit.module.css'

export default function(){
    const cart = useSelector((state) =>state.cart);
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
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
        setShowCreateAccount(false);
      }

    return(
       <div className={s.checkoutContainer}>
            <div className={s.logInCreateAcc}>
                    <div className={s.right}>
                        <div className={s.headerCheckout}>
                            <button onClick={(handleShowLogin)} >Login</button>
                            <button onClick={(handleShowCreateAccount)}>Crear Cuenta</button>
                        </div><hr />  
                    </div>
                {/* <div className={style.profile_menu_item}>
                    <Login showProfile={showLogin} setShowProfile={setShowLogin} />
                    <CreateAccount showSettings={showCreateAccount} setShowSettings={setShowCreateAccount} />
                </div> */}
            </div>
            <div className={s.left}>
                <h1 className={s.resumenCarrito}>Resumen del Carrito</h1>
                {/* <div> */}
                {cart ? cart.map((p) => {
                return (
                  <div className={s.cardCheckoutContainer} key={p.id}>
                    <Link to={"/detail/" + p.paquete.id} key={p.id}>
                      <CardCheckout
                        name={p.paquete.name}
                        image={p.paquete.main_image}
                        qty={p.cantidad}
                        price={p.paquete.price}
                        total={p.total}
                        activities={p.actividades}
                        id={p.id}
                        key={p.id}
                      />
                    </Link>
                  </div>
                );
              }):
              (<div className={s.noPaq}>Tu carrito se encuentra vacío</div>)}
                {/* </div> */}
            </div>
       </div>
    )
}