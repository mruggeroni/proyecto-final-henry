import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllPackage, getCartLocalStorage } from "../../redux/actions";
import CardCheckout from './CardCheckout';
import Login from './Login.jsx';
import CreateAccount from './CrateAccount.jsx'
import s from './Checkout.module.css';
import { HiOutlineEmojiSad } from "react-icons/hi";
import Carousel from '../Detail/Carousel';
// import style from '../UserEdit/UserEdit.module.css'

export default function CheckoutCart(){
    const cart = useSelector((state) =>state.cart);
    const allPackage = useSelector((state) => state.allPackages);
    const [showLogin, setShowLogin] = useState(true);
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const dispatch = useDispatch();
    let sum = 0; 
    cart.forEach((p) => p.total === 0 ? sum +=(p.paquete.price*p.cantidad) : sum += p.total);

    const {
      isAuthenticated,
      loginWithPopup,
      logout,
      getAccessTokenSilently,
    } = useAuth0();

    useEffect(() => {
      dispatch(getAllPackage());
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
          {!isAuthenticated ?
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
            : <div className={s.containerCarrousel}>  
            { cart?.length ? cart.map((p) => {
              return (
              <div className={s.carrouselTravel}>
               <Carousel
                main_image={p.paquete.main_image}
                images={p.paquete.images}
                componente={'checkout'}
              />
              </div>
              );
            })
            : (<div className={s.carrouselTravel}>
              <Carousel
                main_image={allPackage?.length && allPackage[0].main_image}
                images={allPackage?.length && allPackage[0].images}
                componente={'checkout'}
                />
              </div>)
            }
            </div>
          }

            <div className={s.left}>
              <div className={s.headerResumenCheckout}>
                <h3 className={s.resumenCarrito}>Resumen del Carrito</h3>
                {cart?.length > 0 && 
                <div className={s.totalCartPrice}>
                  <h4> Total: ${sum !== 0 ? sum : ' '}</h4>
                </div>}
              </div>
              <hr />
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
              (<div className={s.noPaqCheckout}>
                  <div className={s.noPaq}>
                      <div className={s.sadFace}>
                        <HiOutlineEmojiSad />
                      </div>
                      <p className={s.vacioPaq}>Tu carrito se encuentra vacío</p>
                  </div>
                </div>
                )}
                <div className={s.buttonContainer}>
                  <Link to={'/checkout'}>
                    <button className={s.comprarBtn}>Comprar</button>
                  </Link>
                </div>
            </div>
       </div>
    )
}