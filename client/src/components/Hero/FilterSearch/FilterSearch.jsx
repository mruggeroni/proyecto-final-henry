import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  filterPackagesByDestination,
  getAllPackage,
} from "./../../../redux/actions/index";
import style from "./../Hero.module.css";

export default function FilterSearch({ destinations }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataNow = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(dataNow);
  const [untilDate, setUntilDate] = useState(dataNow);

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(filterPackagesByDestination(e.target.value));
    dispatch(getAllPackage());
    if (e.target.id === "from") {
      if (new Date(e.target.value) > new Date(untilDate)) {
        setFromDate(e.target.value);
        setUntilDate(e.target.value);
      } else {
        setFromDate(e.target.value);
      }
    } else if (e.target.id === "until") {
      setUntilDate(e.target.value);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    // let value = document.getElementById("searchDestinations").value;
    // dispatch(filterPackagesByDestination(value));
    // console.log(value);
    // console.log(fromDate);
    // console.log(untilDate);
    // dispatch(filterPackagesByDestination(value));
    navigate("/search");
  };

  return (
    <form className={style.form_container}>
      <select
        id="searchDestinations"
        onChange={(e) => handleChange(e)}
        className={style.form_select}
      >
        <option selected={true} value={"x"} disabled="disabled">
          Seleccionar un Destino
        </option>
        <option value="all">Todos los destinos</option>
        {destinations?.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
      <input
        disab
        type="date"
        id="from"
        value={fromDate}
        min={dataNow}
        onChange={(e) => handleChange(e)}
        className={style.form_date}
      />
      <input
        type="date"
        id="until"
        value={untilDate}
        min={fromDate}
        onChange={(e) => handleChange(e)}
        className={style.form_date}
      />

      <button onClick={(e) => handleClick(e)} className={style.form_button}>
        Buscar
      </button>
    </form>
  );
}
