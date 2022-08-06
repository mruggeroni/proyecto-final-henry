import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineEmojiSad } from "react-icons/hi";
import {
  filterPackagesByDestination,
  getAllPackage,
  getOrderDetail,
  getOrders,
} from "./../../redux/actions/index";
import s from './Historial.module.css'
import style from "../Search/Select.module.css";
import HistorialCard from "./HistorialCard";
import SortPrice from "../Search/SortPrice.jsx";
import View from "../Search/View";
import Paginado from "../Paginado/paginado";

export default function Historial() {
  // Filtrar todas las ordenes por id de usuario
  // dispachar el detalle de la orden
  const dispatch = useDispatch();
  const user = useSelector( (state) => state.user );
  const orders = useSelector( (state) => state.orders );
  const orderDetails = useSelector( (state) => state.orderDetails );
    
  useEffect( async () => {
    await dispatch(getOrders());

    const ordersUser = orders.filter( (o) => o.userId === user.id );
    ordersUser?.forEach( async (o) => {
      await dispatch(getOrderDetail(o.id)); 
    });
  }, [])

  return (
    <div className={s.container}>
          <div className={s.cardsHistorial}>
            {orderDetails?.length ?
              orderDetails?.map((p) => {
                return (
                  <div className={s.eachcard} key={p.id}>
                    <Link to={"/detail/" + p.id} key={p.id}>
                      <HistorialCard
                        name={p.name}
                        image={p.main_image}
                        description={p.description}
                        price={p.price}
                        start_date={p.start_date}
                        end_date={p.end_date}
                        key={p.id}
                      />
                    </Link>
                  </div>
                );
              }) :
            <div>
              <div className={s.noPaq}>
                <div className={s.sadFace}>
                  <HiOutlineEmojiSad />
                </div>
                <p className={s.vacioPaq}>No tienes compras pasadas, pero no te preocupes que eso se puede solucionar! COMPRANOS PAQUETEEEEEES!!!!!!!!!!!!!!!</p>
              </div>
            </div>
            }
          </div>
    </div>
  );
}
