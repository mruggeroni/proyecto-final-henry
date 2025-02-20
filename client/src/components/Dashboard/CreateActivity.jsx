import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import style from "./CreatePackage.module.css";
import {
  createActivities,
  getCategories,
  getAllActivities,
} from "../../redux/actions";
import ModalCategorias from "./ModalCategoria";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

function validate(input) {
  let error = {};

  if (!input.name) {
    error.name = "El nombre es requerido";
  } else if (input.name.length > 20) {
    error.name = "El nombre debe tener menos de 20 caracteres";
  }

  if (!input.description) {
    error.description = "La descripción es requerida";
  } else if (input.description.length > 280) {
    error.description = "El nombre debe tener menos de 280 caracteres";
  }

  if (!input.price || isNaN(input.price)) {
    error.price = "El precio es requerido";
  } else if (input.price <= 0) {
    error.price = "El precio es inválido";
  } else if (input.price >= 1000) {
    error.price = "La actividad no puede costar más de U$S 1.000";
  }

  if (!input.image) {
    error.image = "La imagen es requerida";
  }

  if (!input.classification) {
    error.classification = "La clasificación es requerida";
  }
  return error;
}

function firstCap(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export default function ActivityCreate({
  showCreateActivity,
  setShowCreateActivity,
}) {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  // const activities = useSelector((state) => state.activities);
  // const countries = useSelector((state) => state.allCountries);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    classification: "",
  });
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: firstCap(e.target.value),
    });
  };

  const handleSelectCategorias = (e) => {
    if (e.target.value === "otro") {
      e.target.value = "default";
      handleShow();
    } else {
      setInput({
        ...input,
        classification: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    console.log("HERE");
    console.log(token);
    e.price = parseInt(e.price);
    const valida = validate({ ...input });
    setError(valida);

    // if (!Object.keys(error).length) {
    if (
      valida.name ||
      valida.price ||
      valida.description ||
      valida.image ||
      valida.classification
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops algo fallo...",
        text: "Presta mas atencion al completar!",
      });
    } else {
      try {
        dispatch(getAllActivities());
        dispatch(createActivities(input, token));
        // Alert bootstrap
        Swal.fire({
          icon: "success",
          title: "Actividad creada!",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops algo fallo...",
          text: error.message,
        });
      }
      setInput({
        name: "",
        description: "",
        price: "",
        image: "",
        classification: "",
      });
    }
  };

  const categorias = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <Dashboard />
      <div className={style.create_container}>
        <h2>Crear una Actividad</h2>
        <hr className={style.create_line} />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={style.create_form_container}
        >
          <div className={style.create_input_container}>
            <label
              className={
                error.name ? style.create_label_error : style.create_label
              }
            >
              <b>Nombre</b>
            </label>
            <input
              type="text"
              className={style.create_input}
              value={input.name}
              name="name"
              onChange={(e) => handleInputChange(e)}
            />
            {error.name && <span className={style.error}>{error.name}</span>}
            {/* {error.name ? (
              <div className={style.error}>{error.name}</div>
            ) : (
              <br />
            )} */}
          </div>
          <div className={style.create_textarea_container}>
            <label className={style.create_label}>
              <b>Descripción</b>
            </label>
            <textarea
              onChange={(e) => handleInputChange(e)}
              name="description"
              cols="20"
              rows="10"
              value={input.description}
              className={style.create_input_textarea}
            ></textarea>
            {error.description && (
              <span className={style.error}>{error.description}</span>
            )}
            {/* {error.description ? (
              <div className={style.error}>{error.description}</div>
            ) : (
              <br />
            )} */}
          </div>
          <div className={style.create_input_container}>
            <label
              className={
                error.price ? style.create_label_error : style.create_label
              }
            >
              <b>Precio</b>
            </label>
            <input
              type="number"
              className={style.create_input}
              value={input.price}
              name="price"
              min="0"
              onChange={(e) => handleInputChange(e)}
            />
            {error.price && <span className={style.error}>{error.price}</span>}
            {/* {error.price ? (
              <div className={style.error}>{error.price}</div>
            ) : (
              <br />
            )} */}
          </div>
          <div className={style.create_input_container}>
            <label className={style.create_label}>Categoria</label>
            <select
              name="type"
              onChange={(e) => handleSelectCategorias(e)}
              className={style.create_input}
            >
              <option
                value="default"
                selected={
                  input.classification === "default" ||
                  input.classification === ""
                    ? true
                    : false
                }
                disabled="disabled"
              >
                Seleccionar una categoria para la actividad
              </option>
              {categorias?.map((el) => (
                <option
                  selected={input.classification === el.name ? true : false}
                  key={el.id}
                  value={el.name}
                >
                  {el.name}
                </option>
              ))}
              <option value="otro">Crear categoria</option>
            </select>
            {error.categorie && (
              <span className={style.error}>{error.categorie}</span>
            )}
          </div>

          <ModalCategorias
            show={show}
            setShow={setShow}
            setInput={setInput}
            input={input}
          />

          <br />
          <div
            id="create_images"
            className={style.create_input_images_container}
          >
            <div className={style.create_input_images}>
              <label
                className={
                  error.image ? style.create_label_error : style.create_label
                }
              >
                Imágen
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                name="image"
                type="text"
                value={input.image}
                className={style.create_input}
              />
              {error.image && <div className={style.error}>{error.image} </div>}
            </div>
          </div>
          <button
            type="submit"
            className={style.create_btn}
            id="create"
            disabled={
              !input.name ||
              !input.price ||
              !input.description ||
              !input.classification ||
              !input.image
            }
          >
            Crear actividad
          </button>
        </form>
      </div>
    </div>
  );
}
