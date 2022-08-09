import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getAllPackage,
  getCartLocalStorage,
  getAllCart,
  getDestinationsWithPackages,
  createUser,
  Payment,
} from "../../redux/actions";
import CardCheckout from "./CardCheckout";
import Login from "./Login.jsx";
import CreateAccount from "./CrateAccount.jsx";
import s from "./Checkout.module.css";
import { HiOutlineEmojiSad } from "react-icons/hi";
import Carousel from "../Detail/Carousel";

export default function CheckoutCart() {
  let cart = {};
  const allPackage = useSelector((state) => state.allPackages);
  const [showLogin, setShowLogin] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, loginWithPopup, logout, getAccessTokenSilently } = useAuth0();
  const user = useSelector( (state) => state.user )
  let stateCart = useSelector((state) => state.cart);
  let stateCartLocalStorage = useSelector((state) => state.cartLocalStorage);
  if (!isAuthenticated) {
    cart = { ...stateCartLocalStorage };
  } else {
    cart = { ...stateCart };
  }

  // let sum = 0;
  // cart.packages?.forEach((p) => p.total === 0 ? sum +=(p.paquete.price*p.cantidad) : sum += p.total);

  useEffect(() => {
    dispatch(getAllPackage(10000));
    dispatch(getDestinationsWithPackages());
   const fetch = async () => {
       if (!isAuthenticated) {
        dispatch(getCartLocalStorage());
        console.log("deslogueado")
      } else {
        const token = await getAccessTokenSilently();
        const usuario = await dispatch(createUser(token));
        console.log(usuario)
        dispatch(getAllCart(usuario.payload.id));
      }
    };
    fetch();
  }, [dispatch]);

  useEffect(() => {
    const fetch = async () => {
      if (!isAuthenticated) {
       dispatch(getCartLocalStorage());
       console.log("deslogueado")
     } else {
       const token = await getAccessTokenSilently();
       const usuario = await dispatch(createUser(token));
       console.log(usuario)
       dispatch(getAllCart(usuario.payload.id));
     }
   };
   fetch();
  }, []);

  const handlePay = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently()
    await dispatch(Payment(cart, token))
  }

  // const handleShowLogin = () => {
  //     setShowLogin(true);
  //     setShowCreateAccount(false);
  // }

  // const handleShowCreateAccount = () => {
  //     setShowCreateAccount(true);
  //     setShowLogin(false);
  //   }

  return (
    <div className={s.checkoutContainer}>
      {
        // !isAuthenticated ? (
      //   <div className={s.logInCreateAcc}>
            //<div className={s.right}>
      //       <div className={s.headerCheckout}>
      //         <button>Login</button>
      //         {/* <button ></button> */}
      //         {/* <button onClick={(handleShowLogin)} >Login</button> */}
      //         {/* <button onClick={(handleShowCreateAccount)}>Crear Cuenta</button> */}
      //       </div>
      //       {!showLogin ? (
      //         <div className={s.lines}>
      //           <hr className={s.line} />
      //           <hr className={s.create_line} />
      //         </div>
      //       ) : (
      //         <div className={s.lines}>
      //           <hr className={s.create_line} />
      //           <hr className={s.line} />
      //         </div>
      //       )}
      //     </div>
      //     <div>
      //       <Login
      //         showProfile={showLogin}
      //         setShowProfile={setShowLogin}
      //         loginWithPopup={loginWithPopup}
      //       />
      //       {/* <CreateAccount showSettings={showCreateAccount} setShowSettings={setShowCreateAccount} /> */}
      //     </div>
      //   </div>
      // ) : (
      <div className={s.right}>
        <div className={s.containerCarrousel}>
          {Object.keys(cart).length ? (
            cart.packages?.map((p) => {
              return (
                <div className={s.carrouselTravel}>
                  <Carousel
                    main_image={p.main_image}
                    images={p.images}
                    componente={"checkout"}
                  />
                </div>
              );
            })
          ) : (
            <div className={s.carrouselTravel}>
              <Carousel
                main_image={allPackage?.length && allPackage[0].main_image}
                images={allPackage?.length && allPackage[0].images}
                componente={"checkout"}
              />
            </div>
          )}
        </div>
        </div>
      }
      <div className={s.left}>
        <div className={s.headerResumenCheckout}>
          <h3 className={s.resumenCarrito}>Resumen del Carrito</h3>
          {!Object.keys(cart).total_order > 0 && (
            <div className={s.totalCartPrice}>
              <h4>{cart.total_order ? "Total: $" + cart.total_order : " "}</h4>
            </div>
          )}
        </div>
        <hr />
        {Object.keys(cart).length ? (
          cart.packages?.map((p) => {
            return (
              <div className={s.cardCheckoutContainer} key={p.id}>
                <Link to={"/detail/" + p.id} key={p.id}>
                  <CardCheckout
                    name={p.name}
                    image={p.main_image}
                    qty={p.quantity}
                    price={p.price}
                    total={cart.total_order}
                    activities={p.activities}
                    on_sale={p.on_sale}
                    id={p.id}
                    key={p.id}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <div className={s.noPaqCheckout}>
            <div className={s.noPaq}>
              <div className={s.sadFace}>
                <HiOutlineEmojiSad />
              </div>
              <p className={s.vacioPaq}>Tu carrito se encuentra vacío</p>
            </div>
          </div>
        )}
        {Object.keys(cart).length > 0 && isAuthenticated && (
          <div className={s.buttonContainer}>
            <Link to={"/checkout"}>
              <button className={s.comprarBtn}>Comprar</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
