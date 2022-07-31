import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  filterPackagesByDate,
  filterPackagesByDestination,
  filtrar,
  getAllPackage,
} from "./../../../redux/actions/index";
import style from "./../Hero.module.css";

export default function FilterSearch({ destinations }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataNow = new Date().toISOString().split("T")[0];
  const [destination, setDestination] = useState("x");
  const [fromDate, setFromDate] = useState(dataNow);
  const [untilDate, setUntilDate] = useState(dataNow);

  const handleChange = (e) => {
    console.log(e.target.id);
    e.preventDefault();
    if (e.target.id === "searchDestinations") {
      dispatch(getAllPackage(10000));
      setDestination(e.target.value);
      // dispatch(filterPackagesByDestination(e.target.value));
      dispatch(filtrar(e.target.value, e.target.id));
      console.log("jklasdhvbipasjdvbapi");
    }

    if (e.target.id === "from") {
      dispatch(getAllPackage(10000));
      if (new Date(e.target.value) > new Date(untilDate)) {
        setFromDate(e.target.value);
        setUntilDate(e.target.value);
        console.log(e.target.value, e.target.id);
        dispatch(filtrar(e.target.value, e.target.id));
      } else {
        setFromDate(e.target.value);
        console.log(e.target.value, e.target.id);
        dispatch(filtrar(e.target.value, e.target.id));
      }
    } else if (e.target.id === "until") {
      dispatch(getAllPackage(1000));
      setUntilDate(e.target.value);
      dispatch(filtrar(e.target.value, e.target.id));
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    let value = document.getElementById("searchDestinations").value;
    if (value !== "x") {
      if (fromDate === "" && untilDate === "") {
        alert("Los calendario no pueden estar vacios");
      } else {
        // dispatch(filterPackagesByDate([fromDate, untilDate]));
        navigate("/search");
      }
    }
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
        type="date"
        id="from"
        // value={fromDate}
        min={dataNow}
        disabled={destination === "x"}
        onChange={(e) => handleChange(e)}
        className={style.form_date}
      />
      <input
        type="date"
        id="until"
        // value={untilDate}
        min={fromDate}
        disabled={destination === "x"}
        onChange={(e) => handleChange(e)}
        className={style.form_date}
      />

      <button onClick={(e) => handleClick(e)} className={style.form_button}>
        Buscar
      </button>
    </form>
  );
}
