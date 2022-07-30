import React, { useEffect, useState } from "react";
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllActivities,
  getAllDestinations,
  getPackageById,
  getTypes,
  modificarPaquete,
} from "../../redux/actions";
import style from "./ModifyPackage.module.css";
import Dashboard from "./Dashboard";
import validationModifyPackage from "./validationModifyPackage.js";
import ModalActividades from "./ModalActividades";
import ModalDestinos from "./ModalDestinos";

export default function ModifyPackages() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);
  const navigate = useNavigate();

  const allDestinations = useSelector((state) => state.destinations);
  const allActivities = useSelector((state) => state.activities);
  const types = useSelector((state) => state.types);
  const paquete = useSelector((state) => state.detailPackage);
  const dataNow = new Date().toISOString().split("T")[0];
  const categorias = useSelector((state) => state.categories);
  console.log(categorias);

  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    main_image: "",
    images0: "",
    images1: "",
    images2: "",
    images: [],
    destinations: [],
    activities: [],
    start_date: dataNow,
    end_date: dataNow,
    region: "",
    seasson: "",
    type: "",
    featured: "false",
    available: "true",
    on_sale: 0,
  });
  console.log(input.destinations);
  useEffect(() => {
    if (Object.keys(paquete)?.length) {
      setInput({
        name: paquete.name,
        price: paquete.price,
        description: paquete.description,
        main_image: paquete.main_image,
        images0: paquete.images[0],
        images1: paquete.images[1],
        images2: paquete.images[2],
        images: paquete.images,
        destinations: paquete.destinations.map((i) => i.name),
        activities: paquete.activities.map((i) => i.name),
        start_date: paquete.start_date,
        end_date: paquete.end_date,
        region: paquete.region,
        seasson: paquete.seasson,
        type: paquete.type,
        featured: paquete.featured,
        available: paquete.available,
        on_sale: paquete.on_sale,
      });
    }
  }, [paquete]);

  useEffect(async () => {
    if (!allActivities.length) {
      dispatch(getAllActivities());
    }
    if (!allDestinations.length) {
      dispatch(getAllDestinations());
    }
    dispatch(getTypes());
    dispatch(getPackageById(id));
  }, [dispatch, id]);

  const sortDestinations = allDestinations.sort(function (a, b) {
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
    return 0;
  });

  const sortActivities = allActivities.sort(function (a, b) {
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
    return 0;
  });

  const [error, setError] = useState({
    name: "",
    price: "",
    description: "",
    main_image: "",
    images0: "",
    images1: "",
    images2: "",
    featured: "",
    destinations: "",
    activities: "",
    start_date: "",
    end_date: "",
    available: "",
    on_sale: "",
    region: "",
    seasson: "",
    type: "",
  });

  const handleAddImage = (e) => {
    e.preventDefault();
    if (input.images.length < 3) {
      setInput({ ...input, images: [...input.images, ""] });
    }
  };

  function handleRemoveImage(e) {
    e.preventDefault();
    const images = input.images;
    if (images.length > 0) images.pop();
    setInput({ ...input, images: images });
  }

  const handleSelect = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectDestinations = (e) => {
    if (e.target.value === "otro") {
      console.log("soy otro");
      e.target.value = "default";
      handleShowDestinos();
    } else {
      if (input.destinations.length <= 4) {
        if (!input.destinations.includes(e.target.value)) {
          setInput({
            ...input,
            destinations: [...input.destinations, e.target.value],
          });
          e.target.value = "default";
        } else {
          e.target.value = "default";
          return alert("Ese país ya fue seleccionado!");
        }
      } else {
        e.target.value = "default";
        return alert("Maximo 5 destinos!");
      }
    }
  };
  const handleSelectActividades = (e) => {
    if (e.target.value === "otro") {
      console.log("soy otro");
      e.target.value = "default";
      handleShow();
    } else {
      if (input.activities.length <= 9) {
        if (!input.activities.includes(e.target.value)) {
          setInput({
            ...input,
            activities: [...input.activities, e.target.value],
          });
          e.target.value = "default";
        } else {
          e.target.value = "default";
          return alert("Esa actividad ya fue seleccionada!");
        }
      } else {
        e.target.value = "default";
        return alert("Maximo 10 actividades!");
      }
    }
  };

  const handleChangeInputs = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeDate = (e) => {
    e.preventDefault();
    if (e.target.id === "from") {
      if (new Date(e.target.value) > new Date(input.end_date)) {
        setInput({
          ...input,
          start_date: e.target.value,
          end_date: e.target.value,
        });
        console.log(input);
      } else {
        setInput({
          ...input,
          start_date: e.target.value,
        });
      }
    } else {
      setInput({
        ...input,
        end_date: e.target.value,
      });
    }
  };

  function handleBorrarDestinations(e) {
    setInput({
      ...input,
      destinations: input.destinations.filter((i) => i !== e.target.innerText),
    });
  }

  function handleBorrarActividades(e) {
    setInput({
      ...input,
      activities: input.activities.filter((i) => i !== e.target.innerText),
    });
  }

  const handleSubmit = (e) => {
    console.log(input);
    e.preventDefault();
    input.images = [input.images0, input.images1, input.images2];
    input.price = parseInt(input.price);
    input.on_sale = parseInt(input.on_sale);
    input.available = input.available === "true" ? true : false;
    input.featured = input.featured === "true" ? true : false;

    const valida = validationModifyPackage({ ...input });
    setError(valida);
    if (
      valida.name ||
      valida.price ||
      valida.description ||
      valida.main_image ||
      valida.images ||
      valida.featured ||
      valida.available ||
      valida.on_sale ||
      valida.region ||
      valida.type ||
      valida.seasson ||
      valida.destinations
    ) {
      console.log(valida);
      alert(
        "Presta mas atencion al completar el formulario y volve a intentar ;)"
      );
    } else {
      const patch = {};
      patch.featured = input.featured;
      patch.available = input.available;
      patch.available = input.available;
      const put = {};
      put.name = input.name;
      put.description = input.description;
      put.main_image = input.main_image;
      put.images = input.images;
      put.price = input.price;
      put.start_date = input.start_date;
      put.end_date = input.end_date;
      put.seasson = input.seasson;
      put.type = input.type;
      put.activities = input.activities;
      put.destinations = input.destinations;
      const modificar = [put, patch];

      dispatch(modificarPaquete(modificar, id));
      alert("Nuevo paquete creado..");
      setInput({
        name: "",
        price: "",
        description: "",
        main_image: "",
        images: "",
        images0: "",
        images1: "",
        images2: "",
        featured: "",
        destinations: [],
        start_date: "",
        end_date: "",
        available: "",
        on_sale: "",
        region: "",
        seasson: "",
        type: "",
      });
      // navigate("/dashboard");
    }
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [showDestinos, setShowDestinos] = useState(false);
  const handleShowDestinos = () => setShowDestinos(true);

  return (
    <div>
      <Dashboard />
      <div className={style.create_container}>
        <h2>Modificar un Paquete</h2>
        <hr className={style.create_line} />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={style.create_form_container}
        >
          <div className={style.create_input_container}>
            <label className={style.create_label}>Nombre</label>
            <input
              placeholder={paquete.name}
              type="text"
              className={style.create_input}
              name="name"
              value={input.name}
              onChange={(e) => handleChangeInputs(e)}
            />
            {error.name && <span className={style.error}>{error.name}</span>}
          </div>
          <div className={style.create_input_container}>
            <label className={style.create_label}>Precio</label>
            <input
              placeholder={paquete.price}
              value={input.price}
              name="price"
              min="1"
              step="1"
              type="number"
              className={style.create_input}
              onChange={(e) => handleChangeInputs(e)}
            />
            {error.price && <span className={style.error}>{error.price}</span>}
          </div>
          <div className={style.create_textarea_container}>
            <label className={style.create_label}>Descripción</label>
            <textarea
              placeholder={paquete.description}
              name="description"
              cols="30"
              rows="10"
              value={input.description}
              className={style.create_input_textarea}
              onChange={(e) => handleChangeInputs(e)}
            ></textarea>
            {error.description && (
              <span className={style.error}>{error.description}</span>
            )}
          </div>
          <div className={style.create_input_date_container}>
            <div className={style.create_input_date}>
              <label className={style.create_label}>Fecha de Inicio</label>
              <input
                name="start_date"
                type="date"
                id="from"
                value={input.start_date}
                min={dataNow}
                onChange={(e) => handleChangeDate(e)}
                className={style.create_input}
              />
            </div>
            <div className={style.create_input_date}>
              <label className={style.create_label}>Fecha de Fin</label>
              <input
                name="end_date"
                type="date"
                id="until"
                value={input.end_date}
                min={input.start_date}
                onChange={(e) => handleChangeDate(e)}
                className={style.create_input}
              />
            </div>
          </div>
          <div className={style.create_input_container}>
            <label className={style.create_label}>% Descuento</label>
            <input
              placeholder={paquete.on_sale}
              value={input.on_sale}
              name="on_sale"
              className={style.create_input}
              type="number"
              min="0"
              max="100"
              step="1"
              id="on_sale"
              onChange={(e) => handleChangeInputs(e)}
            />
            {error.on_sale && (
              <span className={style.error}>{error.on_sale}</span>
            )}
          </div>
          <div className={style.create_input_container}>
            <label className={style.create_label}>Destacado</label>
            <select
              name="featured"
              onChange={(e) => handleSelect(e)}
              className={style.create_input}
            >
              <option disabled="disabled">
                Seleccionar si tu Paquete esta destacado...
              </option>
              <option selected={paquete.featured ? true : false} value={true}>
                Destacado
              </option>
              <option selected={!paquete.featured ? true : false} value={false}>
                No destacado
              </option>
            </select>
            {error.featured && (
              <span className={style.error}>{error.featured}</span>
            )}
          </div>
          <div className={style.create_input_container}>
            <label className={style.create_label}>Disponibilidad</label>
            <select
              name="available"
              onChange={(e) => handleSelect(e)}
              className={style.create_input}
            >
              <option disable="disabled" value="true">
                Selecciona el stock
              </option>
              <option selected={paquete.available ? true : false} value="true">
                Disponible
              </option>
              <option
                selected={!paquete.available ? true : false}
                value="false"
              >
                No disponible
              </option>
            </select>
            {error.available && (
              <span className={style.error}>{error.available}</span>
            )}
          </div>

          <div className={style.create_input_container}>
            <label className={style.create_label}>Región</label>
            <select
              name="region"
              onChange={(e) => handleSelect(e)}
              className={style.create_input}
            >
              <option disabled="disabled" hidden>
                Seleccionar una Región...
              </option>
              <option
                selected={paquete.region === "Europa Occidental" ? true : false}
                value="Europa Occidental"
              >
                Europa Occidental
              </option>
              <option
                selected={paquete.region === "Europa Central" ? true : false}
                value="Europa Central"
              >
                Europa Central
              </option>
              <option
                selected={paquete.region === "Europa Oriental" ? true : false}
                value="Europa Oriental"
              >
                Europa Oriental
              </option>
              <option
                selected={paquete.region === "Asia Oriental" ? true : false}
                value="Asia Oriental"
              >
                Asia Oriental
              </option>
              <option
                selected={paquete.region === "Asia del Sur" ? true : false}
                value="Asia del Sur"
              >
                Asia del Sur
              </option>
              <option
                selected={
                  paquete.region === "Asia Sudoriental Continental"
                    ? true
                    : false
                }
                value="Asia Sudoriental Continental"
              >
                Asia Sudoriental Continental
              </option>
              <option
                selected={paquete.region === "Norte América" ? true : false}
                value="Norte América"
              >
                Norte América
              </option>
              <option
                selected={paquete.region === "Sudamérica" ? true : false}
                value="Sudamérica"
              >
                Sudamérica
              </option>
              <option
                selected={paquete.region === "América Central" ? true : false}
                value="América Central"
              >
                América Central
              </option>
            </select>
            {error.region && (
              <span className={style.error}>{error.region}</span>
            )}
          </div>

          <div className={style.create_input_container}>
            <label className={style.create_label}>Destinos</label>
            <select
              id="destinationsSelect"
              name="destinations"
              onChange={(e) => handleSelectDestinations(e)}
              className={style.create_input}
            >
              <option
                value="default"
                placeholder="Seleccionar Destinos..."
                selected
                disabled
                hidden
              >
                Seleccionar Destinos...
              </option>
              {sortDestinations?.map((el) => (
                <option key={el.name} value={el.name}>
                  {el.name}
                </option>
              ))}
              <option value="otro" placeholder="Nuevo destino">
                Nuevo destino
              </option>
              {/* TENEMOS Q
              {/* TENEMOS QUE CREAR UNA SITUACION EN EL "handleSelectDestinations" 
                PARA MANEJAR EL CASO DE CREAR UN DESTINO NUEVO*/}
              {/* <option value="crear">"Crear un destino nuevo.."</option> */}
            </select>
            {error.destinations && (
              <span className={style.error}>{error.destinations}</span>
            )}
          </div>
          <ModalDestinos
            showDestinos={showDestinos}
            setShowDestinos={setShowDestinos}
            setInput={setInput}
            input={input}
          />

          {input.destinations
            ?.sort(function (a, b) {
              if (a > b) {
                return 1;
              }
              if (b > a) {
                return -1;
              }
              return 0;
            })
            .map((i, o) => (
              <div
                key={"destinations" + o}
                id="input_destinations"
                className={style.create_destinations_items}
                onClick={(e) => handleBorrarDestinations(e)}
                value={i.name}
              >
                {i}
              </div>
            ))}

          {/* Final destinos */}

          <div className={style.create_input_container}>
            {error.destinations && <span>{error.destinations}</span>}
            <label className={style.create_label}>Actividades</label>
            <select
              id="actividadesSelect"
              name="actividadesSelect"
              onChange={(e) => handleSelectActividades(e)}
              className={style.create_input}
            >
              <option
                value="default"
                placeholder="Seleccionar Actividades..."
                selected
                disabled
                hidden
              >
                Seleccionar Actividades...
              </option>
              {sortActivities?.map((el) => (
                <option key={el.name} value={el.name}>
                  {el.name}
                </option>
              ))}
              <option value="otro" placeholder="Nueva actividad">
                Nueva actividad
              </option>
            </select>
          </div>
          <ModalActividades
            show={show}
            setShow={setShow}
            setInput={setInput}
            input={input}
            categorias={categorias}
          />

          {input.activities
            ?.sort(function (a, b) {
              if (a > b) {
                return 1;
              }
              if (b > a) {
                return -1;
              }
              return 0;
            })
            .map((i, o) => (
              <div
                key={"activities" + o}
                id="input_activities"
                className={style.create_destinations_items}
                onClick={(e) => handleBorrarActividades(e)}
                value={i.name}
              >
                {i}
              </div>
            ))}

          {/* Final actividades */}

          <div className={style.create_input_container}>
            {error.seasson && <span>{error.seasson}</span>}
            <label className={style.create_label}>Estación</label>
            <select
              name="seasson"
              onChange={(e) => handleSelect(e)}
              className={style.create_input}
            >
              <option disabled="disabled">Seleccionar una Estación...</option>
              <option
                selected={paquete.seasson === "Verano" ? true : false}
                value="Verano"
              >
                Verano
              </option>
              <option
                selected={paquete.seasson === "Otoño" ? true : false}
                value="Otoño"
              >
                Otoño
              </option>
              <option
                selected={paquete.seasson === "Invierno" ? true : false}
                value="Invierno"
              >
                Invierno
              </option>
              <option
                selected={paquete.seasson === "Primavera" ? true : false}
                value="Primavera"
              >
                Primavera
              </option>
              <option
                selected={paquete.seasson === "Especial" ? true : false}
                value="Especial"
              >
                Especial
              </option>
            </select>
          </div>
          <div className={style.create_input_container}>
            {error.type && <span>{error.type}</span>}
            <label className={style.create_label}>Tipo</label>
            <select
              name="type"
              onChange={(e) => handleSelect(e)}
              className={style.create_input}
            >
              <option disabled="disabled">
                Seleccionar un tipo para tu Paquete...
              </option>
              {types?.map((el) => (
                <option
                  selected={paquete.type === el ? true : false}
                  key={el}
                  value={el}
                >
                  {el}
                </option>
              ))}
            </select>
          </div>
          <div
            id="create_images"
            className={style.create_input_images_container}
          >
            <div className={style.create_input_images}>
              <label className={style.create_label}>Imágen Principal</label>
              <input
                onChange={(e) => handleChangeInputs(e)}
                name="main_image"
                type="text"
                className={style.create_input}
                value={input.main_image}
              />
              <button
                onClick={(e) => handleAddImage(e)}
                className={style.create_input_btn}
              >
                <BsPlusLg />
              </button>
              <button
                onClick={(e) => handleRemoveImage(e)}
                className={style.create_input_btn}
              >
                <BsDashLg />
              </button>
              {error.main_image && (
                <span className={style.error}>{error.main_image}</span>
              )}
            </div>

            {input.images?.map((i, index) => {
              return (
                <div key={i + index} className={style.create_input_images}>
                  <label className={style.create_label}>
                    Imágen {index + 1}
                  </label>
                  <input
                    id={index}
                    name={"images" + index}
                    value={input["images" + index]}
                    type="text"
                    onChange={(e) => handleChangeInputs(e)}
                    className={style.create_input}
                  />
                </div>
              );
            })}
          </div>

          <div className={style.create_input_container}>
            <button
              type="submit"
              disabled={
                !input.name.length &&
                !input.price.length &&
                !input.description.length &&
                !input.main_image.length &&
                !input.images0.length &&
                !input.images1.length &&
                !input.images2.length &&
                !input.destinations?.length
                  ? true
                  : false
              }
              className={style.create_btn}
              id="create"
            >
              Modificar Paquete
            </button>

            <span className={style.create_term}>
              Al presionar 'Modificar Paquete' usted acepta los Términos de
              BLABLA y la Política de Privacidad
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
