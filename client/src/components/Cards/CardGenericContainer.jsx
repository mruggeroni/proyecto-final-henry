import React, { useEffect } from "react";
import CardGeneric from "./CardGeneric.jsx";
import style from "./CardGenericContainer.module.css";

export default function CardGenericContainer({ listCards, component }) {

  console.log(listCards)
  return (
    <div className={style.cards_container}>
      {listCards.length &&
        listCards?.map((i, idx) => (
          <CardGeneric
            key={idx}
            feature={{
              id: i.id,
              img: i.images[0],
              title: i.name,
              on_sale: i.on_sale,
              component: component,
              description: i.description.slice(0, 200) + "...",
            }}
          />
        ))}
    </div>
  );
}
