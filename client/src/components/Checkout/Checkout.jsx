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
  crearPago,
} from "../../redux/actions";
import CardCheckout from "./CardCheckout";
import Login from "./Login.jsx";
import CreateAccount from "./CrateAccount.jsx";
import s from "./Checkout.module.css";
import { HiOutlineEmojiSad } from "react-icons/hi";
import Carousel from "../Detail/Carousel";
import Footer from "../Footer/Footer.jsx";
import Swal from "sweetalert2";
import logoSTRIPE from "../../assets/img/logo-stripe.png";
import logoMP from "../../assets/img/logo-MP.png";

export default function CheckoutCart() {
  let cart = {};
  let carrouselImg = [];
  const allPackage = useSelector((state) => state.allPackages);
  const [showLogin, setShowLogin] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, loginWithPopup, logout, getAccessTokenSilently } =
    useAuth0();
  const user = useSelector((state) => state.user);
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
        console.log("deslogueado");
      } else {
        const token = await getAccessTokenSilently();
        const usuario = await dispatch(createUser(token));
        console.log(usuario);
        dispatch(getAllCart(usuario.payload.id));
      }
    };
    fetch();
  }, [dispatch]);

  useEffect(() => {
    const fetch = async () => {
      if (!isAuthenticated) {
        dispatch(getCartLocalStorage());
        console.log("deslogueado");
      } else {
        const token = await getAccessTokenSilently();
        const usuario = await dispatch(createUser(token));
        console.log(usuario);
        dispatch(getAllCart(usuario.payload.id));
      }
    };
    fetch();
  }, []);

  // const handleShowLogin = () => {
  //     setShowLogin(true);
  //     setShowCreateAccount(false);
  // }

  // const handleShowCreateAccount = () => {
  //     setShowCreateAccount(true);
  //     setShowLogin(false);
  //   }

  const handlepay = async (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      const usuario = await dispatch(createUser(token));
      console.log(usuario);
      let cart = await dispatch(getAllCart(usuario.payload.id));
      console.log("CART");
      console.log(cart);
      await dispatch(Payment(cart, token));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Inicia sesión para comprar",
      });
    }
  };

  const handlePayML = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        const respuestaPago = await dispatch(crearPago(cart));
        console.log(respuestaPago);
        window.location.href = `${respuestaPago.data.init_point}`;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops algo fallo...",
          text: error.message,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Inicia sesión para comprar",
      });
    }
  };

  return (
    <div>
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
              {Object.keys(cart).length && cart.packages?.length ? (
                <div>
                  <div className={s.carrouselTravel}>
                    {cart.packages.length &&
                      cart.packages.map((p, i) =>
                        i !== 0
                          ? carrouselImg.push(p.main_image)
                          : carrouselImg.push(p.main_image)
                      ) && (
                        <Carousel
                          main_image={cart.packages[0].main_image}
                          images={carrouselImg}
                          componente={"checkout"}
                        />
                      )}
                  </div>
                  <div>
                    <p>
                      Para realizar una compra tiene que inciar sesión o crearse
                      una cuenta
                    </p>
                  </div>
                </div>
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
            {Object.keys(cart).length > 0 && cart.total_order > 0 && (
              <div className={s.totalCartPrice}>
                <h4>
                  {cart.total_order ? "Total: $" + cart.total_order : " "}
                </h4>
              </div>
            )}
          </div>
          <hr />
          {Object.keys(cart) && cart.packages?.length ? (
            cart.packages?.map((p) => {
              return (
                <div className={s.cardCheckoutContainer} key={p.id}>
                  <Link to={"/detail/" + p.id} key={p.id}>
                    <CardCheckout
                      packageDetail={p}
                      name={p.name}
                      image={p.main_image}
                      qty={p.quantity}
                      price={p.price}
                      totalPack={p.total}
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

          {Object.keys(cart).length > 0 && cart.packages.length > 0 && (
            <div className={s.botones}>
              <h3 className={s.metodoPago}>Metodos de pago</h3>
              <div className={s.botonPasarela} onClick={(e) => handlePayML(e)}>
                <img
                  className={s.botonImg}
                  src={logoMP}
                  alt="Logo MercadoPago"
                />
              </div>
              <div className={s.botonPasarela} onClick={(e) => handlepay(e)}>
                <img
                  className={s.botonImg}
                  src={logoSTRIPE}
                  alt="Logo Stripe"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
