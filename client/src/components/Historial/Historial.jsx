import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { HiOutlineEmojiSad } from "react-icons/hi";
import {
  cleanOrderDetail,
  filterPackagesByDestination,
  getAllPackage,
  getOrderDetail,
  getOrders,
} from "./../../redux/actions/index";
import s from "./Historial.module.css";
import style from "../Search/Select.module.css";
import HistorialCard from "./HistorialCard";
import SortPrice from "../Search/SortPrice.jsx";
import View from "../Search/View";
import Paginado from "../Paginado/paginado";

export default function Historial() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector( (state) => state.user );
  const orderDetails = useSelector( (state) => state.orderDetails );
    
  useEffect( async () => {
      await dispatch(cleanOrderDetail());
      setTimeout( async () => {
        await dispatch(getOrders());
        await dispatch(getOrderDetail(id));
      }, 0);
  }, [id]);

  return (
    <div className={s.containerHistorial}>
      <h1 className={s.historialTitle}>
        Historial ({orderDetails.packages ? orderDetails.packages.length : "0"})
      </h1>
      <hr />
      <div className={s.cardsHistorial}>
        {Object.keys(orderDetails).length ? (
          orderDetails.packages?.map((p) => {
            return (
              <div className={s.eachHistoryCard} key={p.id}>
                <Link to={"/detail/" + p.id} key={p.id}>
                  <HistorialCard
                    name={p.name}
                    image={p.main_image}
                    date={orderDetails.date}
                    price={p.price}
                    start_date={p.start_date}
                    end_date={p.end_date}
                    key={p.id}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <div>
            {/* <div className={s.noPaq}>
                <div className={s.sadFace}>
                  <HiOutlineEmojiSad />
                </div>
                <p className={s.vacioPaq}>No tienes compras pasadas, pero no te preocupes que eso se puede solucionar! COMPRANOS PAQUETEEEEEES!!!!!!!!!!!!!!!</p>
              </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
