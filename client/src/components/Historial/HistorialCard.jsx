import React from "react";
import s from "../Search/Card/Card";

export default function Card({ name, image, description, price, id, start_date, end_date }) {

  return (
    <div className={s.card}>
      <img src={image} alt="img not found" width="300vw" height="250vw" />
      <div className={s.cardBody}>
        <h3>{name}</h3>
        <br />
        <h5>
          {description.length > 310
            ? description.slice(0, 310) + "..."
            : description}
        </h5>
      </div>
      <div className={s.rightGroup}>
      <div className={s.date}>
          <h3>{start_date}</h3>
          <h3>{end_date}</h3>
        </div>
        <div className={s.price}>
          <h3>${price}</h3>
        </div>
      </div>
    </div>
  );
}
