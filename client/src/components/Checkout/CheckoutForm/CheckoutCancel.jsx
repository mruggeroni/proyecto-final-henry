import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import s from "./CheckoutConfirmation.module.css";
import { useEffect } from "react";
import { createUser } from "../../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export default function CheckoutCancel() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetch = async () => {
      const token = await getAccessTokenSilently();
      await dispatch(createUser(token));
    };
    fetch();
  }, []);

  return (
    // !showCheckoutConfirmation ? null
    // :
    <div className={s.confirmation_container}>
      <div className={s.textConfirmation}>
        <span>
          <MdCancel className={s.cancel_icon} />
        </span>
        <h1>Compra cancelada!</h1>
        <p>{'     '}</p>
        <button onClick={ () => navigate('/') } className={s.confirmation_btn}>Inicio</button>
      </div>
    </div>
  );
}
