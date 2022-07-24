import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./../Hero.module.css";

export default function FilterSearch({ destinations }) {
  const navigate = useNavigate();
  const dataNow = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(dataNow);
  const [untilDate, setUntilDate] = useState(dataNow);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "from") {
      setFromDate(e.target.value);
      setUntilDate(e.target.value);
    } else {
      setUntilDate(e.target.value);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    console.log(fromDate);
    console.log(untilDate);
    navigate("/search");
  };

  return (
    <form className={style.form_container}>
      <select
        id="destinations"
        onChange={(e) => handleChange(e)}
        className={style.form_select}
      >
        <option value="all">All destinations</option>
        {destinations?.map((el) => (
          <option key={el.name} value={el.name}>
            {el.name}
          </option>
        ))}
      </select>
      <input
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
