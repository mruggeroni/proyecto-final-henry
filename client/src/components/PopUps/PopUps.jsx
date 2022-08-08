import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import s from "./PopUps.module.css";
import UserPopOut from "../PopUps/UserPopOut";
import FavoritesPopOut from "../PopUps/FavoritePopOut";
import CartPopOut from "../PopUps/CartPopUp";

export default function PopUps() {
  return (
    <div className={s.popUpContainer}>
      <div className={s.tabNav}> 
        <FavoritesPopOut/> 
      </div>
      <div className={s.tabNav}>
        <CartPopOut /> 
      </div>
      <div className={s.tabNav}>
        <UserPopOut /> 
      </div>
    </div>
  );
}