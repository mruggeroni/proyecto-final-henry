import React,  { useState } from "react";
import s from "./CardCheckout.module.css";
import Remove from '../Favorites/RemoveFavorite';
import { Payment } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import {useDispatch, useSelector } from "react-redux";


export default function Card({ name, image, qty, price, total, id, activities, on_sale }) {

    const [modify, setModify] = useState(false);
    const user = useSelector((state) => state.user);
    let sumAct = 0;
    activities.forEach((a) => sumAct += a.price*qty);

    
    // async function handleModify(e){
    //     e.preventDefault();
    //     setModify(!modify);
    //     let sQty = document.getElementById(`select${qty}`);
    //     console.log(sQty)
    //     sQty?.setAttribute('selected', true);
    // }

    const { getAccessTokenSilently} = useAuth0();
    const dispatch = useDispatch();

    // const handlepay = async (e) => {
    //    e.preventDefault();
    //    console.log(user)
    //    const cart = {items: [
    //        {id: 1,quantity:2 },
    //        {id: 2, quantity: 1}
    //     ]}
    //     const token = await getAccessTokenSilently()
    //     dispatch(Payment(cart, token))
    //   };

  return (
    <div className={s.checkoutCard}>    
        <div className={s.removeCard}>
            {/* <p onClick={(e) => handleModify(e)}>Modificar</p> */}
            <Remove popUp={'cart'} id={id}/>
        </div>
        <div className={s.topGroup}>
            <div>
                <img src={image} alt="img not found" width="250vw" height="200vw" />
            </div>
            <div className={s.cardBody}>
                <div><h3 className={s.checkoutPackTitle}>{name}</h3><br /></div>
                <div className={s.inlineGroup}>
                    {/* {!modify ? */}
                    <h4>QTY : {qty}</h4>
                    {/* : <div className={s.inlineGroup}>
                        <h4>QTY :</h4>  
                        <select id='qtySelect'>
                            <option value="1" id='select1'>1</option>
                            <option value="2" id='select2'>2</option>
                            <option value="3" id='select3'>3</option>
                            <option value="4" id='select4'>4</option>
                            <option value="5" id='select5'>5</option>
                            <option value="6" id='select6'>6</option>
                            <option value="7" id='select7'>7</option>
                            <option value="8" id='select8'>8</option>
                        </select>
                    </div>} */}
                    <h4>${on_sale ? price*((100 - on_sale)/100) : price}</h4> 
                </div>
            </div>
        </div>
        <div className={s.bottomGroup}>
            <div className={s.deglose}>
                <p>{qty}x Paquetes {name.length > 40 ? name.slice(0, 40) + "..." : name}</p>
                <p> ${on_sale ? price*qty*((100 - on_sale)/100) : price*qty}</p>
            </div>
            {activities.length > 0 && activities.map((a) => {
                return (
                    <div className={s.deglose}>
                        <p>{qty}x {a.name}</p>
                        <p> ${on_sale ? a.price*qty*((100 - on_sale)/100) : a.price*qty}</p>
                    </div>
            )})}
             <div className={s.price}>
                <hr />
                {on_sale ?
                <div className={s.discountTotal}>
                    <p>Subtotal: ${price*qty + sumAct}</p>
                    <p>Total Descuento: ${(price*qty + sumAct) - total}</p> 
                </div> : ''}
                <div className={s.totalPaq}>
                    <h3>{total === 0 ? ' ' : 'Total:'}</h3><h3>{total === 0 ? ' ' : '$' + total}</h3>
                    {/* <button onClick={(e) => handlepay(e)}>Go to pay</button> */}

                </div>
            </div> 
        </div>
    </div>
  );
}
