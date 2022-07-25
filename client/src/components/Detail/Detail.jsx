import React, { useState, useEffect } from "react";
import s from "./Detail.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ControlledCarousel from "./Carousel";
import BotonFav from "./BotonFav";
import CardGeneric from "../Cards/CardGeneric";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllActivities,
  getPackageById,
  getRelationated,
} from "../../redux/actions/index";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const packageDetail = useSelector((state) => state.detailPackage);
  // console.log(packageDetail.activities.length);
  const relationatedPackage = useSelector((state) => state.relationated);
  const allActivities = useSelector((state) => state.activities);
  useEffect(() => {
    dispatch(getPackageById(id));
    dispatch(getRelationated(id));
    dispatch(getAllActivities());
    console.log(activities);
  }, [dispatch]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getPackageById(id));
      await dispatch(getRelationated(id));
      await dispatch(getAllActivities());
      const paquete = await dispatch(getPackageById(id));
      console.log(price);
      setPrecio(price);
      setChechboxEstado(
        new Array(packageDetail.activities?.length).fill(false)
      );
      setLoading(false);
      // console.log(packageDetail);
    })();
  }, []);

  const [precio, setPrecio] = useState(0);
  const [checkboxEstado, setChechboxEstado] = useState([]);

  const {
    name,
    description,
    main_image,
    images,
    price,
    start_date,
    end_date,
    region,
    seasson,
    type,
    featured,
    available,
    on_sale,
    activities,
    destinations,
  } = packageDetail;

  function handleCheckbox(posicion) {
    console.log(packageDetail.activities);
    const checkboxSeleccionados = checkboxEstado.map((item, index) =>
      index === posicion ? !item : item
    );
    let totalPaquete = price;
    checkboxSeleccionados.forEach((i, index) => {
      console.log(i);
      if (i === true)
        totalPaquete += parseInt(packageDetail.activities[index].price);
    });
    setChechboxEstado(checkboxSeleccionados);
    setPrecio(totalPaquete);

    // console.log(precio);
  }

  const navigate = useNavigate();
  const handleBotonRegresar = () => {
    navigate(-1);
  };

  const handleBotonComprar = () => {};

  //para el desmonte del componente
  useEffect(() => {
    return () => {
      setPrecio(0);
      // setChechboxEstado(new Array(activities.length).fill(false));
    };
  }, [setPrecio, setChechboxEstado]);

  return (
    <div
      style={{
        backgroundImage: `url(${main_image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className={s.body}>
        {/* si loading esta activo mostramos el spinner */}
        {loading ? (
          <div className={s.contenedorSpinner}>
            <div className={s.spinner}></div>
          </div>
        ) : (
          <div className={s.contenedor}>
            <div className={s.contenedorBarraSuperior}>
              <div onClick={() => handleBotonRegresar}>Return</div>
              <BotonFav />
            </div>
            <div className={s.contenedorDetalles}>
              <h1>{name}</h1>
              <ControlledCarousel
                name={name}
                main_image={main_image}
                images={images}
              />
              <div className={s.resto}>
                <h3>
                  {start_date} / {end_date}
                </h3>
                <h3>U$S {price}</h3>
                <h3>
                  Destinos:{" "}
                  {destinations?.map((i, o) => {
                    return (
                      <span key={o}>
                        {i.name}
                        {"  "}
                      </span>
                    );
                  })}
                </h3>
              </div>

              <div className={s.resto}>
                <h3 className={s.description}>{description}</h3>
              </div>
            </div>
            <div className={s.contenedorActividades}>
              {activities?.map((i, index) => {
                return (
                  <div className={s.actividad} key={i.name}>
                    <div className={s.nombreActividad}>
                      <div> {i.name} </div>
                      <div>
                        <input
                          className={s.styledcheckbox}
                          key={`act${i.name}`}
                          id={i.name}
                          type="checkbox"
                          value={i.name}
                          onChange={() => handleCheckbox(index)}
                        />

                        <label htmlFor={i.name}>
                          U$S{" "}
                          {allActivities?.map(
                            (el) => el.name === i.name && el.price
                          )}
                          {"       "}
                        </label>
                      </div>
                    </div>
                    <div className={s.descriptionActividad}>
                      <img
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src =
                            "http://marcianosmx.com/wp-content/uploads/2015/10/Rascal-Deux.jpg";
                        }}
                        src={allActivities?.map(
                          (el) => el.name === i.name && el.image
                        )}
                        alt="Image not found"
                      />
                      <div>
                        {allActivities?.map(
                          (el) => el.name === i.name && el.description
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className={s.total}>
                {" "}
                <span>TOTAL U$S </span>
                {precio}
              </div>
            </div>
            <div className={s.contenedorBotonComprar}>
              <button
                onClick={() => handleBotonComprar}
                className={s.botonComprar}
              >
                COMPRAR
              </button>
            </div>
            <div className={s.tituloDestacados}>
              Quizas tambien te interesen estos paquetes!!
            </div>
            <div className={s.cards_container}>
              {
                // Para probar como se ven las cartas de descatados/ofertas
                relationatedPackage.map((i, idx) => (
                  <CardGeneric
                    key={idx}
                    feature={{
                      id: i.id,
                      img: i.main_image,
                      title: i.name,
                      description: i.description.slice(0, 200) + "...",
                    }}
                  />
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
