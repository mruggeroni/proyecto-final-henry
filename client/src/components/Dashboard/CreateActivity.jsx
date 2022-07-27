import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import validate from "./validationActivity.js";
import Dashboard from "./Dashboard";
import style from "./CreatePackage.module.css";

function validate(input) {
  let error = {};
  let regName = /^[a-zA-Z]*$/;
  let regInteger = /^\d+$/;
  let checkboxes = document.getElementsByName("check");

  if (!input.name) {
    error.name = "El nombre es requerido";
  } else if (!regName.test(input.name)) {
    error.name = "El nombre es inválido";
  } else if (input.name.length > 20) {
    error.name = "El nombre debe tener menos de 20 caracteres";
  }

  if (!input.description) {
    error.description = "La descripción es requerida";
  } else if (input.description.length > 280) {
    error.description = "El nombre debe tener menos de 280 caracteres";
  }

  if (!input.price) {
    error.price = "El precio es requerido";
  } else if (!regInteger.test(input.price)) {
    error.price = "El precio debe ser un número entero";
  } else if (input.price <= 0) {
    error.price = "El precio es inválido";
  } else if (input.price >= 1000) {
    error.price = "La actividad no puede costar más de U$S1000";
  }

  if (!input.classification) {
    error.classification = "La clasificación es requerida";
  } else {
    let createBtn = document.getElementById("create");
    createBtn.removeAttribute("disabled");
  }
  return error;
}

function firstCap(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export default function ActivityCreate() {
  const dispatch = useDispatch();
  // const activities = useSelector((state) => state.activities);
  // const countries = useSelector((state) => state.allCountries);
  const [error, setError] = useState({});
  const createBtn = document.getElementById("create");
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    classification: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: firstCap(e.target.value),
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function handleCheck(e) {
    let checkboxes = document.getElementsByName("check");

    checkboxes.forEach((item) => {
      if (item.value !== e.target.value) item.checked = false;
    });

    if (e.target.checked) {
      setInput({
        ...input,
        season: e.target.value,
      });
      setError(
        validate({
          ...input,
          season: e.target.value,
        })
      );
    } else {
      setError(
        validate({
          ...input,
          season: "",
        })
      );

      createBtn.setAttribute("disabled", true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch(postActivity(input));
    // if(error) alert('The Form is not completed correctly. Try again!');

    if (!Object.keys(error).length) {
      setInput({
        name: "",
        description: "",
        price: "",
        image: "",
        classification: "",
      });
      // Alert bootstrap
      alert("Activity created!");
    }
  }

  // useEffect(() => {
  // 	dispatch(getActivities());
  // 	dispatch(getCountries());
  // }, []);

  return (
    <div>
      <Dashboard />
      {/* <Link to= '/'><button>Return...</button></Link> */}
      <div className={style.create_container}>
        <h2>Crear una Actividad</h2>
        <hr className={style.create_line} />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={style.create_form_container}
        >
            <div className={style.create_input_container}>
              <label className={style.create_label}>
                <b>Nombre</b>
              </label>
              <input
                type="text"
                className={style.create_input}
                value={input.name}
                name="name"
                onChange={(e) => handleInputChange(e)}
              />
              {/* {error.name ? (<p>{error.name}</p>) : <br />} */}
            </div>
          <div className={style.create_textarea_container}>
            <label className={style.create_label}>
              <b>Descripción</b>
            </label>
            <textarea
              name="description"
              cols="20"
              rows="10"
              className={style.create_input_textarea}
            ></textarea>
            {/* {error.description ? (<p>{error.description}</p>) : <br />} */}
          </div>
          <div className={style.create_input_container}>
            <label className={style.create_label}>
              <b>Precio</b>
            </label>
            <input
              type="number"
              className={style.create_input}
              value={input.duration}
              name="price"
              min="0"
              onChange={(e) => handleInputChange(e)}
            />
            {/* {error.price ? (<p>{error.price}</p>) : <br />} */}
          </div>
          <div className={style.create_input_checks_container}>
            <label className={style.create_label}>
              <b>Clasificación:</b>
            </label>
            <br />
              <span>Familiar</span>
              <input
                type="checkbox"
                name="check"
                value="Familiar"
                onChange={(e) => handleCheck(e)}
              />
              <span>Crucero</span>
              <input
                type="checkbox"
                name="check"
                value="Crucero"
                onChange={(e) => handleCheck(e)}
              />
              <span>Pack Short</span>
              <input
                type="checkbox"
                name="check"
                value="Pack Short"
                onChange={(e) => handleCheck(e)}
              />
              <span>Pack Large</span>
              <input
                type="checkbox"
                name="check"
                value="Pack Large"
                onChange={(e) => handleCheck(e)}
              />
              <span>Multidestino</span>
              <input
                type="checkbox"
                name="check"
                value="Multidestino"
                onChange={(e) => handleCheck(e)}
              />
              <span></span>
            <br />
            {/* {error.season ? (<p >{error.season}</p>) : <br />} */}
          </div>
          <br />
          <div
            id="create_images"
            className={style.create_input_images_container}
          >
            <div className={style.create_input_images}>
              <label className={style.create_label}>Imágen</label>
              <input
                name="main_image"
                type="text"
                className={style.create_input}
              />
            </div>
          </div>
          <button
            type="submit"
            className={style.create_btn}
            id="create"
            disabled={true}
          >
            Create Activity
          </button>
        </form>
      </div>
    </div>
  );
}
