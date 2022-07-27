import React from "react";
import Nav from "react-bootstrap/Nav";
import UserPopOut from "./UserPopOut";
import s from './PopUps.module.css';
import FavoritesPopOut from "./FavoritePopOut";
import CartPopOut from './CartPopUp';


export default function PopUps() {
  
  return (
    <Nav fill variant="tabs" className={s.popUpContainer}>
      <Nav.Item className={s.tabNav}>
        <FavoritesPopOut />
      </Nav.Item>
      <Nav.Item className={s.tabNav}>
        <Nav.Link><UserPopOut /></Nav.Link>
      </Nav.Item>
      <Nav.Item className={s.tabNav}>
        <Nav.Link><CartPopOut/></Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
