import React from "react";
import s from "./CardCheckout.module.css";
import Remove from '../Favorites/RemoveFavorite';

export default function Card({ name, image, qty, price, total, id, activities }) {

  return (
    <div className={s.checkoutCard}>    
        <div className={s.removeCard}>
            <Remove popUp={'cart'} id={id}/>
        </div>
        <div className={s.topGroup}>
            <div>
                <img src={image} alt="img not found" width="250vw" height="200vw" />
            </div>
            <div className={s.cardBody}>
                <div><h3 className={s.checkoutPackTitle}>{name}</h3><br /></div>
                <div className={s.inlineGroup}>
                    <h4>QTY : {qty}</h4>  
                    <h4>${price}</h4> 
                </div>
                
            </div>
        </div>
        <div className={s.bottomGroup}>
            <div className={s.deglose}>
                <p>{qty}x Paquetes {name.length > 30 ? name.slice(0, 310) + "..." : name}</p>
                <p> ${price*qty}</p>
            </div>
            {activities && activities.map((a) => {
                return (
                    <div className={s.deglose}>
                        <p>{qty}x {a.name}</p>
                        <p> ${a.price*qty}</p>
                    </div>
            )})}
             <div className={s.price}>
                <hr />
                <div className={s.totalPaq}>
                    <h3>Total: </h3><h3>${total}</h3>
                </div>
            </div> 
        </div>
    </div>
  );
}
