import React from "react";
import s from "./HistorialCard.module.css";
// import s from "../Search/Card/Cards.module.css";

export default function Card({
  name,
  image,
  date,
  price,
  id,
  start_date,
  end_date,
}) {
  return (
    <div className={s.cardHistorial}>
      <img src={image} alt="img not found" width="300vw" height="250vw" />
      <div className={s.cardHistorialBody}>
        <h3>{name}</h3>
        <br />
        <h5>Fecha de compra: {date.split("-").reverse().join("-")}</h5>
        {/* <h5>Total: ${price}</h5> */}
        {/* <h5>
          {description?.length > 310
            ? description.slice(0, 310) + "..."
            : description}
        </h5> */}
      </div>
      {/* <div className={s.rightGroup}>
      <div className={s.date}>
          <h3>{start_date}</h3>
          <h3>{end_date}</h3>
        </div>
        <div className={s.price}>
          <h3>${price}</h3>
        </div>
      </div> */}
    </div>
  );
}
