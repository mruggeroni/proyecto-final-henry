import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderByPrice } from "../../redux/actions/index";
import s from "./Select.module.css";

export default function SortPrice({ setOrder, setCurrentPage }) {
  const dispatch = useDispatch();

  function handlePriceSort(e) {
    e.preventDefault();
    dispatch(orderByPrice(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  }

  return (
    <div>
      <label>Sort by: </label>
      <select className={s.select} onChange={(e) => handlePriceSort(e)}>
        <option selected={true} disabled="disabled">
          Precio
        </option>
        <option value="minPrice">Más barato a más caro</option>
        <option value="maxPrice">Más caro a más barato</option>
      </select>
    </div>
  );
}
