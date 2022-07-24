import React, { useState } from "react";
import { BsPlusLg, BsDashLg, BsDash } from "react-icons/bs";
import style from "./CreatePackage.module.css";
import Dashboard from "./Dashboard";
import validationPackage from "./validationPackage.js";

export default function CreatePackage() {
  const dataNow = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(dataNow);
  const [untilDate, setUntilDate] = useState(dataNow);

  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    main_image: "",
    images0: "",
    images1: "",
    images2: "",
    images: [],
    featured: false,
    destinations: [],
    start_date: dataNow,
    end_date: dataNow,
    available: true,
    on_sale: false,
    region: "",
    seasson: "",
    type: "",
  });

  const [error, setError] = useState({
    name: "",
    price: "",
    description: "",
    main_image: "",
    images0: "",
    images1: "",
    images2: "",
    featured: false,
    destinations: [],
    start_date: "",
    end_date: "",
    available: false,
    on_sale: 0,
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
    if (input.destinations.length <= 4) {
      if (!input.destinations.includes(e.target.value)) {
        setInput({
          ...input,
          destinations: [...input.destinations, e.target.value],
        });
      }
    }
    console.log(input.destinations);
  };

  const handleChangeInputs = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validationPackage({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleChangeDate = (e) => {
    e.preventDefault();
    if (e.target.id === "from") {
      if (new Date(e.target.value) > new Date(untilDate)) {
        setFromDate(e.target.value);
        setUntilDate(e.target.value);
      } else {
        setFromDate(e.target.value);
      }
    } else {
      setUntilDate(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
  };

  function handleBorrarDestinations(e) {
    setInput({
      ...input,
      destinations: input.destinations.filter((i) => i !== e.target.innerText),
    });
  }

  return (
    <div>
      <Dashboard />
      <div className={style.create_container}>
        <h2>Create a Package</h2>
        <hr className={style.create_line} />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={style.create_form_container}
        >
          <div className={style.create_form_container}>
            <div className={style.create_input_container}>
              {error.name && <span>{error.name}</span>}
              <label className={style.create_label}>Name</label>
              <input
                type="text"
                className={style.create_input}
                name="name"
                // value={input.name}
                onChange={(e) => handleChangeInputs(e)}
              />
            </div>
            <div className={style.create_input_container}>
              <label className={style.create_label}>Price</label>
              <input
                name="price"
                type="number"
                className={style.create_input}
              />
            </div>
            <div className={style.create_textarea_container}>
              <label className={style.create_label}>Description</label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                className={style.create_input_textarea}
              ></textarea>
            </div>
            <div className={style.create_input_date_container}>
              <div className={style.create_input_date}>
                <label className={style.create_label}>Start Date</label>
                <input
                  name="start_date"
                  type="date"
                  id="from"
                  value={fromDate}
                  min={dataNow}
                  onChange={(e) => handleChangeDate(e)}
                  className={style.create_input}
                />
              </div>
              <div className={style.create_input_date}>
                <label className={style.create_label}>End Date</label>
                <input
                  name="end_date"
                  type="date"
                  id="until"
                  value={untilDate}
                  min={fromDate}
                  onChange={(e) => handleChangeDate(e)}
                  className={style.create_input}
                />
              </div>
            </div>
            <div className={style.create_input_container}>
              <label className={style.create_label}>On sale</label>
              <select
                name="on_sale"
                className={style.create_input}
                onChange={(e) => handleSelect(e)}
              >
                <option selected={true} disabled="disabled">
                  Selecciona si el paquete esta en oferta..
                </option>
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
            <div className={style.create_input_container}>
              <label className={style.create_label}>Featured</label>
              <select
                name="featured"
                onChange={(e) => handleSelect(e)}
                className={style.create_input}
              >
                <option selected={true} disabled="disabled">
                  Selecciona si el paquete es destacado..
                </option>
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
            <div className={style.create_input_container}>
              <label className={style.create_label}>Stock</label>
              <select
                name="available"
                onChange={(e) => handleSelect(e)}
                className={style.create_input}
              >
                <option value="false">False</option>
                <option selected={true} value="true">
                  True
                </option>
              </select>
            </div>
            <div className={style.create_input_container}>
              <label className={style.create_label}>Destination</label>
              <select
                id="destinationsSelect"
                name="destinations"
                onChange={(e) => handleSelectDestinations(e)}
                className={style.create_input}
              >
                <option selected={true} disabled="disabled">
                  Selecciona un destino..
                </option>
                <option value="Argentina">Argentina</option>
                <option value="Canada">Canada</option>
                <option value="Suiza">Suiza</option>
              </select>
            </div>

            {input.destinations
              .sort(function (a, b) {
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
                  className={style.create_destinations_items}
                  onClick={(e) => handleBorrarDestinations(e)} >
                    {i}
                </div>
              ))}

            {/* Final destinos */}
            <div className={style.create_input_container}>
              <label className={style.create_label}>Region</label>
              <select
                name="region"
                onChange={(e) => handleSelect(e)}
                className={style.create_input}
              >
                <option selected={true} disabled="disabled">
                  Selecciona una region..
                </option>
                <option value="x">Sudamérica</option>
                <option value="x">Norte América</option>
                <option value="x">Europa Central</option>
              </select>
            </div>
            <div className={style.create_input_container}>
              <label className={style.create_label}>Season</label>
              <select
                onChange={(e) => handleSelect(e)}
                className={style.create_input}
              >
                <option selected={true} disabled="disabled">
                  Selecciona una temporada..
                </option>
                <option value="x">Verano</option>
                <option value="x">Invierno</option>
                <option value="x">Primavera</option>
              </select>
            </div>
            <div className={style.create_input_container}>
              <label className={style.create_label}>Types</label>
              <select
                name="type"
                onChange={(e) => handleSelect(e)}
                className={style.create_input}
              >
                <option selected={true} disabled="disabled">
                  Selecciona un tipo de paquete..
                </option>
                <option value="x">Crucero</option>
                <option value="x">Pack Short</option>
                <option value="x">Pack Large</option>
                <option value="x">Multidestino</option>
              </select>
            </div>
            <div
              id="create_images"
              className={style.create_input_images_container}
            >
              <div className={style.create_input_images}>
                <label className={style.create_label}>Main image</label>
                <input
                  name="main_image"
                  type="text"
                  className={style.create_input}
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
              </div>
              {input.images?.map((i, index) => {
                return (
                  <div key={i + index} className={style.create_input_images}>
                    <label className={style.create_label}>
                      Image {index + 1}
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
          </div>

          <div className={style.create_input_container}>
            <button
              onClick={(e) => handleSubmit(e)}
              className={style.create_btn}
            >
              Crear Paquete
            </button>
            <span className={style.create_term}>
              By clicking 'Create Package' you agree to the BLABLA Terms &
              Privacy Policy
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
