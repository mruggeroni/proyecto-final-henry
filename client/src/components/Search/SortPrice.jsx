import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordenar, orderByPrice } from "../../redux/actions/index";
import s from "./Select.module.css";

export default function SortPrice({ setOrder, setCurrentPage }) {
  const dispatch = useDispatch();
  const ordenado = useSelector((s) => s.ordenado);

  async function handlePriceSort(e) {
    e.preventDefault();
    setOrder(`Ordenado ${e.target.value}`);
    console.log(e.target.value);
    dispatch(ordenar(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={s.contenedorOrdenar}>
      <label>
        Ordenar
        <select className={s.select} onChange={(e) => handlePriceSort(e)}>
          <option
            selected={ordenado.tipo === "precio" ? true : false}
            value="precio"
          >
            Precio
          </option>
          <option
            selected={ordenado.tipo === "duracion" ? true : false}
            value="duracion"
          >
            Duración
          </option>
        </select>
      </label>
      <label>
        <select
          id="ascDes"
          className={s.select}
          onChange={(e) => handlePriceSort(e)}
        >
          <option
            selected={ordenado.forma === "asc" ? true : false}
            value="asc"
          >
            Menor a mayor
          </option>
          <option
            selected={ordenado.forma === "desc" ? true : false}
            value="desc"
          >
            Mayor a menor
          </option>
        </select>
      </label>
    </div>
  );
}
