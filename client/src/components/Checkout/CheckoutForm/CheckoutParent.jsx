import React, { useEffect, useState } from "react";
// import s from "../../PopUps/PopUps.module.css";
import { MdCheckCircle  } from 'react-icons/md'
import { FaPlane } from 'react-icons/fa'
import CheckoutPassengers from './CheckoutPassengers.jsx';
import CheckoutPayment from './CheckoutPayment.jsx';
import CheckoutConfirmation from './CheckoutConfirmation';
import { useDispatch, useSelector } from "react-redux";
import { getCartLocalStorage } from "../../../redux/actions";
import s from './CheckoutParent.module.css';

export default function CheckoutSteps() {
    const cart = useSelector((state) => state.cart);
    const [showCheckoutPassengers, setShowCheckoutPassengers] = useState(true);
    const [showCheckoutPayment, setShowCheckoutPayment] = useState(false);
    const [showCheckoutConfirmation, setShowCheckoutConfirmation] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartLocalStorage());
    }, [dispatch])

    const handleCheckoutPassengers = () => {
        setShowCheckoutPassengers(true);
        setShowCheckoutPayment(false);
        setShowCheckoutConfirmation(false);
    }

    const handleCheckoutPayment = () => {
        setShowCheckoutPayment(true);
        setShowCheckoutPassengers(false);
        setShowCheckoutConfirmation(false);
    }

    const handleCheckoutConfirmation = () => {
        setShowCheckoutConfirmation(true);
        setShowCheckoutPassengers(false);
        setShowCheckoutPayment(false);
      }

  return (
    <div className={s.checkoutStepsContainer}>
        <div className={s.logInCreateAcc}>
                    <div className={s.right}>
                        <div className={s.headerCheckout}>
                            <button onClick={(handleCheckoutPassengers)} >Información del Pasajero</button>
                            <button onClick={(handleCheckoutPayment)}>Información de Pago</button>
                            <button onClick={(handleCheckoutConfirmation)}>Confirmación</button>
                       </div>
                    </div>
                <div>
                    <div className={s.header_container}>
                        <h1>Información de los Pasajeros</h1>
                        <div className={s.icons_container} >
                            <div className={`${s.icons_item} ${ showCheckoutPayment ? s.icons_complete : s.null }`}>
                                <MdCheckCircle />
                            </div>
                            <hr className={s.icons_line} />
                            <div className={`${s.icons_item} ${ !showCheckoutConfirmation ? null : s.icons_complete }`}>
                                { showCheckoutPayment ? <MdCheckCircle /> : <FaPlane /> }
                            </div>
                            <hr className={`${s.icons_line} ${ showCheckoutPayment ? s.null : s.icons_line_incomplete}`} />
                            <div className={`${s.icons_item} ${s.icons_incomplete}`}>
                            { showCheckoutConfirmation ? <MdCheckCircle /> : <FaPlane /> }
                            </div>    
                        </div>
                    </div>
                    <CheckoutPassengers showProfile={showCheckoutPassengers} setShowProfile={setShowCheckoutPassengers} cart={cart} FaPlane={FaPlane}/>
                    <CheckoutPayment showSettings={showCheckoutPayment} setShowSettings={setShowCheckoutPayment} />
                    <CheckoutConfirmation showSettings={showCheckoutConfirmation} setShowSettings={setShowCheckoutConfirmation} />
                </div>
            </div>
    </div>
  );
}

