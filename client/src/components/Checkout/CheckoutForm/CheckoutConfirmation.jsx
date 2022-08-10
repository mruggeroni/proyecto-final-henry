import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPatchCheckFill } from "react-icons/bs";
import s from "./CheckoutConfirmation.module.css";
import { useEffect } from "react";
import { createUser } from "../../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export default function CheckoutConfirmation({
  showCheckoutConfirmation,
  setShowCheckoutConfirmation,
}) {
  const user = useSelector((state) => state.user);
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
          <BsFillPatchCheckFill className={s.confirmation_icon} />
        </span>
        <h1>Su compra fue realizada con éxito!</h1>
        <p>Recibirá un mail a {user.email} con los datos de su compra.</p>
        <button className={s.confirmation_btn}>Inicio</button>
      </div>
    </div>
  );
}
