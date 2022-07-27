import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import style from "./User.module.css";
import s from './PopUps.module.css'
import Card from '../../Favorites/FavoriteCard.jsx';

export default function CartPopOut(){

  // const carrito = useSelector((state) => state.user.favorites);
  const [isVisible, setIsVisible] = useState(false);

  function handleCartClick(e) {
    e.preventDefault();
    setIsVisible(!isVisible);
  }

  const carrito = [
      {
          name: "Joyas del Mediterráneo – Grecia e Italia 8 días desde Atenas",
          description: "Lorem 1000  dolor sit, amet consectetur adipisicing elit. Numquam ullam, tenetur animi dicta excepturi temporibus iste reprehenderit esse a officiis asperiores, perferendis quam ex maiores maxime quos earum at! Non!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ullam, tenetur animi dicta excepturi temporibus iste reprehenderit esse a officiis asperiores, perferendis quam ex maiores maxime quos earum at! Non!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ullam, tenetur animi dicta excepturi temporibus iste reprehenderit esse a officiis asperiores, perferendis quam ex maiores maxime quos earum at! Non!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ullam, tenetur animi dicta excepturi temporibus iste reprehenderit esse a officiis asperiores, perferendis quam ex maiores maxime quos earum at! Non!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ullam, tenetur animi dicta excepturi temporibus iste reprehenderit esse a ",
          main_image: "https://images.unsplash.com/photo-1503152394-c571994fd383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          images: ["https://images.unsplash.com/photo-1504512485720-7d83a16ee930?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1808&q=80", "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1968&q=80", "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1808&q=80"],
          price: 2500,
          featured: false,
          start_date: "2022-07-20",
          end_date: "2022-07-21",
          available: false,
          on_sale: 0,
          region: "string (datatype.ENUM)",
          destinations: ["Alemania", "Holanda", "Japon"],
          seasson: "season (datatype.ENUM)",
          type: "string (datatype.ENUM)",
          activities: [{ name: "Actividad 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolore libero obcaecati ipsam cumque! Voluptatum incidunt voluptates necessitatibus eligendi, eos nulla ullam commodi excepturi minima dignissimos. Eius reiciendis ipsum odit!", image: "https://images.unsplash.com/photo-1558980394-0a06c4631733?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", price: 1, classification: "" }, { name: "Actividad 2", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolore libero obcaecati ipsam cumque! Voluptatum incidunt voluptates necessitatibus eligendi, eos nulla ullam commodi excepturi minima dignissimos. Eius reiciendis ipsum odit!", image: "https://images.unsplash.com/photo-1558980394-0a06c4631733?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", price: 2, classification: "" }, { name: "Actividad 3", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolore libero obcaecati ipsam cumque! Voluptatum incidunt voluptates necessitatibus eligendi, eos nulla ullam commodi excepturi minima dignissimos. Eius reiciendis ipsum odit!", image: "https://images.unsplash.com/photo-1558980394-0a06c4631733?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", price: 300, classification: "" }],
      }
      ]

      return(
        <div onClick={(e) => handleCartClick(e)} className={style.nav_item}>
          <div className={s.favIcon}>
          <AiOutlineShoppingCart />
          </div>
          <div className={isVisible ? s.open_favorite : s.user_profile_container}>
            <div>
              <p className={s.favTitle}>Mi Carrito ({carrito.length})</p>
              <hr />
              <div  className={style.user_profile_link}>
                {carrito && carrito.map((p) => {
                  return(
                    <div key= {p.id}>
                        <Card name={p.name} image={p.main_image} price={p.price} id={p.id} key= {p.id}/>
                    </div>
                  );
                })}
              </div>
              <hr />
          <Link to= '/checkout'>
            <button className={s.allFavorite_btn}>Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  )
}