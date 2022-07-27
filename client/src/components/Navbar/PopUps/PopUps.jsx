import React from "react";
import Nav from "react-bootstrap/Nav";
import UserPopOut from "./UserPopOut";
import s from './PopUps.module.css';
import FavoritesPopOut from "./FavoritePopOut";
import CartPopOut from './CartPopUp';
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";


export default function PopUps() {
  
  return (
    <Nav fill variant="tabs" className={s.popUpContainer}>
      {/* <Nav.Item >
        <AiOutlineHeart />
      </Nav.Item> */}
      <Nav.Item className={s.tabNav}>  
      <FavoritesPopOut />
      </Nav.Item>
      {/* <Nav.Item >
        <BsPersonPlusFill />
        </Nav.Item> */}
      <Nav.Item className={s.tabNav}>  
       <UserPopOut />
      </Nav.Item>
      {/* <Nav.Item >
      <AiOutlineShoppingCart />
      </Nav.Item> */}
      <Nav.Item className={s.tabNav}>  
        <CartPopOut/>
      </Nav.Item>
    </Nav>
  );
}
