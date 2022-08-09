import React,  { useState, useEffect } from "react";
import s from "./CardCheckout.module.css";
import Remove from '../Favorites/RemoveFavorite';
import { Payment } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import {useDispatch, useSelector } from "react-redux";
import {
    deleteCartPackage,
    postCartPackage,
    getAllCart,
    updateCart
  } from "../../redux/actions/index";


export default function Card({ name, image, qty, price, totalPack, id, activities, on_sale, packageDetail }) {
    const dispatch = useDispatch();
    const [modify, setModify] = useState(false);
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
    const { getAccessTokenSilently} = useAuth0();
    let sumAct = 0;
    activities.forEach((a) => sumAct += a.price*qty);
    
    const [input, setInput] = useState({
        cantidad: qty,
        total: totalPack,
        actividades: activities,
    });
    
    useEffect(() => {
        let sQty = document.getElementById(`select${qty}${id}`);
        sQty?.setAttribute('selected', true);
    }, [dispatch]);
    
    async function handleModify(e){
        e.preventDefault();
        setModify(!modify);
        // console.log(packageDetail)
        // let sQty = document.getElementById(`select${qty}`);
        // sQty?.setAttribute('selected', {true});
    }

    function handleSelectQty(e){
        e.preventDefault();
    }

    async function handleModifyPq(e){
        const token = await getAccessTokenSilently();
        let newTotal = 0;
		await dispatch(deleteCartPackage(cart.id, id));
        await dispatch(getAllCart(user.id));
        // input.paquete = packageDetail;
        // setInput({
        //     ...input,
        //     cantidad: e.target.value,
        //     total: totalPack,
        // });
        updateCart(cart.id, {
            packageId: id,
            // activitiesId:
            //   input.actividades?.map((a) => a.Package_Activity.activityId) ||
            //   [],
            quantity: e.target.value,
            total_package: price*e.target.value + (activities.forEach((a) => newTotal += a.price*e.target.value)),
          })
        //   HaHgo un pull de la rama develop  DALEPP 
		await dispatch(getAllCart(user.id));
    }

  return (
    <div className={s.checkoutCard}>    
        <div className={s.removeCard}>
            <a onClick={(e) => handleModify(e)} className={s.modifybutton}>Modificar</a>
            <Remove popUp={'cart'} id={id}/>
        </div>
        <div className={s.topGroup}>
            <div>
                <img src={image} alt="img not found" width="250vw" height="200vw" />
            </div>
            <div className={s.cardBody}>
                <div><h3 className={s.checkoutPackTitle}>{name}</h3><br /></div>
                <div className={s.inlineGroup}>
                    <div className={ modify ? s.qtySelect : s.qtyInput }>
                        <h4>QTY :</h4>  
                        <select id={`qtySelect${id}`} disabled={ !modify } onClick={(e) => handleSelectQty(e)} onChange={(e) => handleModifyPq(e)}>
                            <option value="1" id={`select1${id}`}>1</option>
                            <option value="2" id={`select2${id}`}>2</option>
                            <option value="3" id={`select3${id}`}>3</option>
                            <option value="4" id={`select4${id}`}>4</option>
                            <option value="5" id={`select5${id}`}>5</option>
                            <option value="6" id={`select6${id}`}>6</option>
                            <option value="7" id={`select7${id}`}>7</option>
                            <option value="8" id={`select8${id}`}>8</option>
                        </select>
                    </div>
                    {/* <h4>${on_sale ? price*((100 - on_sale)/100) : price}</h4>  */}
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
                    <p>Total Descuento: ${(price*qty + sumAct) - totalPack}</p> 
                </div> : ''}
                <div className={s.totalPaq}>
                    <h3>{totalPack === 0 ? ' ' : 'Total:'}</h3><h3>{totalPack === 0 ? ' ' : '$' + totalPack}</h3>
                    {/* <button onClick={(e) => handlepay(e)}>Go to pay</button> */}

                </div>
            </div> 
        </div>
    </div>
  );
}
