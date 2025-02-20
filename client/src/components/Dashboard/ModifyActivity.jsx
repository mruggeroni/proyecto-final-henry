import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
// import validate from "./validationActivity.js";
import Dashboard from "./Dashboard";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./CreatePackage.module.css";
import {
  getAllActivities,
  getAllPackageDashboard,
  getCategories,
  modificarActividad,
} from "../../redux/actions";
import ModalCategorias from "./ModalCategoria";

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

  if (!input.price) {
    error.price = "El precio es requerido";
  } else if (input.price <= 0) {
    error.price = "El precio es inválido";
  } else if (input.price >= 1000) {
    error.price = "La actividad no puede costar más de U$S 1.000";
  }

  if (!input.image) {
    error.image = "La imagen es requerida";
  } else if (input.image.length >= 1000) {
    error.price = "La actividad no puede costar más de U$S1000";
  }

  if (!input.classification) {
    error.classification = "La clasificación es requerida";
  }

  // if (!Object.keys(error).length) {
  //   let createBtn = document.getElementById("create");
  //   createBtn.removeAttribute("disabled");
  // }
  return error;
}

function firstCap(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export default function ModifyActivity() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const actividadesTodas = useSelector((state) => state.activities);
  const navigate = useNavigate()

  const [error, setError] = useState({});
  const createBtn = document.getElementById("create");
  //   const [input, setInput] = useState({
  //     name: "",
  //     description: "",
  //     price: "",
  //     image: "",
  //     classification: "",
  //   });

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

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

  const [input, setInput] = useState({
    id: "",
    name: "",
    description: "",
    image: "",
    classification: "",
  });

  //   useEffect(() => {}, []);

  const handleSelectCategorias = (e) => {
    if (e.target.value === "otro") {
      e.target.value = "default";
      handleShow();
    } else {
      setInput({
        ...input,
        classification: e.target.value,
      });
      setError(
        validate({
          ...input,
          classification: e.target.value,
        })
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently()
    e.price = parseInt(e.price);
    try {

      if (!Object.keys(error).length) {
        setInput({
          name: "",
          description: "",
          price: "",
          image: "",
          classification: "",
        });
        dispatch(modificarActividad(input, id, token));
        await dispatch(getAllPackageDashboard());
        Swal.fire({
          icon: 'success',
          title: 'Actividad modificada!',
        })
        navigate("/dashboard/listActivities")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops algo fallo...',
          text: error.message,
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops algo fallo...',
        text: error.message,
      })
    }
  }

  useEffect(() => {

    const fetch = async () => {
      const categorias = await dispatch(getCategories());
      const actividades = await dispatch(getAllActivities());
      const actividad = actividades.payload.filter(
        (i) => parseInt(i.id) === parseInt(id)
      );
      if (Object.keys(actividad)?.length) {
        setInput({
          id: actividad[0].id,
          name: actividad[0].name,
          description: actividad[0].description,
          image: actividad[0].image,
          classification: actividad[0].classification.name,
          price: actividad[0].price,
        });
      }
    }
    fetch()
  }, []);
  const categorias = useSelector((state) => state.categories);

  return (
    <div>
      <Dashboard />
      <div className={style.create_container}>
        <h2>Modificar Actividad</h2>
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
              //   placeholder={actividad.name}
              className={style.create_input}
              value={input.name}
              name="name"
              onChange={(e) => handleInputChange(e)}
            />
            {error.name ? (
              <div className={style.error}>{error.name}</div>
            ) : (
              <br />
            )}
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
              //   placeholder={actividad.description}
              className={style.create_input_textarea}
            ></textarea>
            {error.description ? (
              <div className={style.error}>{error.description}</div>
            ) : (
              <br />
            )}
          </div>
          <div className={style.create_input_container}>
            <label className={style.create_label}>
              <b>Precio</b>
            </label>
            <input
              type="number"
              className={style.create_input}
              value={input.price}
              name="price"
              min="0"
              //   placeholder={actividad.price}
              onChange={(e) => handleInputChange(e)}
            />
            {error.price ? (
              <div className={style.error}>{error.price}</div>
            ) : (
              <br />
            )}
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
                  selected={input.classification == el.name ? true : false}
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
              <label className={style.create_label}>Imágen</label>
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
            onClick={handleSubmit}
            className={style.create_btn}
            id="create"
            disabled={Object.keys(error).length !== 0}
          >
            Modificar actividad
          </button>
        </form>
      </div>
    </div>
  );
}
