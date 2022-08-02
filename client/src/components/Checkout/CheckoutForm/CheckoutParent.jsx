import React, { useEffect, useState } from "react";
// import s from "../../PopUps/PopUps.module.css";
import { MdCheckCircle } from "react-icons/md";
import { FaPlane } from "react-icons/fa";
import CheckoutPassengers from "./CheckoutPassengers.jsx";
import CheckoutPayment from "./CheckoutPayment.jsx";
import CheckoutConfirmation from "./CheckoutConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { getCartLocalStorage } from "../../../redux/actions";
import s from "./CheckoutParent.module.css";

export default function CheckoutSteps() {
  const cart = useSelector((state) => state.cart);
  const [showCheckoutPassengers, setShowCheckoutPassengers] = useState(true);
  const [showCheckoutPayment, setShowCheckoutPayment] = useState(false);
  const [showCheckoutConfirmation, setShowCheckoutConfirmation] =
    useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartLocalStorage());
  }, [dispatch]);

  const handleCheckoutPassengers = () => {
    setShowCheckoutPassengers(true);
    setShowCheckoutPayment(false);
    setShowCheckoutConfirmation(false);
  };

  const handleCheckoutPayment = () => {
    setShowCheckoutPayment(true);
    setShowCheckoutPassengers(false);
    setShowCheckoutConfirmation(false);
  };

  const handleCheckoutConfirmation = () => {
    setShowCheckoutConfirmation(true);
    setShowCheckoutPassengers(false);
    setShowCheckoutPayment(false);
  };

  return (
    <div className={s.checkoutStepsContainer}>
      <div className={s.logInCreateAcc}>
        <div className={s.right}>
          <div className={s.headerCheckout}>
            <button onClick={handleCheckoutPassengers}>
              Información del Pasajero
            </button>
            <button onClick={handleCheckoutPayment}>Información de Pago</button>
            <button onClick={handleCheckoutConfirmation}>Confirmación</button>
          </div>
        </div>
        <div>
          <div className={s.header_container}>
            <h1>Información de los Pasajeros</h1>
            <div className={s.icons_container}>
                {/* icons_line | icons_line_complete | icons_line_incomplete */}
                {/* icons_item | icons_item_complete | icons_item_incomplete */}
                {/* <MdCheckCircle /> <FaPlane /> */}
                {/* showCheckoutPassengers | showCheckoutPayment | showCheckoutConfirmation */}
                <div className={`${showCheckoutPayment || showCheckoutConfirmation ? s.icons_item_complete : s.icons_item}`} >
                    <MdCheckCircle /> 
                </div>
                <hr className={`${showCheckoutPayment || showCheckoutConfirmation ? s.icons_line_complete : s.icons_line}`} />
                <div className={`${showCheckoutPassengers ? s.icons_item_incomplete : showCheckoutConfirmation ? s.icons_item_complete : s.icons_item}`} >
                    <MdCheckCircle />
                </div>

                <hr className={`${showCheckoutPassengers || showCheckoutPayment ? s.icons_line_incomplete : showCheckoutConfirmation ? s.icons_line_complete : s.icons_line}`} />
                <div className={`${showCheckoutPassengers || showCheckoutPayment ? s.icons_item_incomplete : s.icons_item}`} >
                    <MdCheckCircle />
                </div>  
            </div>
          </div>
          <CheckoutPassengers
            showCheckoutPassengers={showCheckoutPassengers}
            setShowCheckoutPassengers={setShowCheckoutPassengers}
            handleCheckoutPayment={handleCheckoutPayment}
            cart={cart}
          />
          <CheckoutPayment
            showCheckoutPayment={showCheckoutPayment}
            setShowCheckoutPayment={setShowCheckoutPayment}
            handleCheckoutPassengers={handleCheckoutPassengers}
            handleCheckoutConfirmation={handleCheckoutConfirmation}
          />
          <CheckoutConfirmation
            showCheckoutConfirmation={showCheckoutConfirmation}
            setShowCheckoutConfirmation={setShowCheckoutConfirmation}
            handleCheckoutPayment={handleCheckoutPayment}
          />
        </div>
      </div>
    </div>
  );
}