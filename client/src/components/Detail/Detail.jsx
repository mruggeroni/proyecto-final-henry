import React, { useState, useEffect } from "react";
import s from "./Detail.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ControlledCarousel from "./Carousel";
import BotonFav from "./BotonFav";
import CardGenericContainer from "../Cards/CardGenericContainer";
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
  const relationatedPackage = useSelector((state) => state.relationated);
  const allActivities = useSelector((state) => state.activities);

  useEffect(async () => {
    setLoading(true);
    await dispatch(getPackageById(id));
    await dispatch(getRelationated(id));
    await dispatch(getAllActivities());
    setLoading(false);
  }, [dispatch]);
  const [loading, setLoading] = useState(false);

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
  const [precio, setPrecio] = useState(price);

  useEffect(() => {
    // const paquete = await dispatch(getPackageById(id));
    // const precioPaquete = paquete.price
    // dispatch(getPackageById(id));
    // dispatch(getRelationated(id));
    // dispatch(getAllActivities());
    setPrecio(price);
    setChechboxEstado(new Array(10).fill(false));
  }, []);

  // const temperamentosEstado = useSelector((state) => state.temperamentsFilter);

  // const handleFiltroTemp = (posicion) => {
  //   const temperamentosTrueFalse = temperamentosEstado.map((item, index) =>
  //     index === posicion ? !item : item
  //   );
  //   dispatch(filtros(temperamentosTrueFalse));
  //   setCurentPage(1);
  // };

  // console.log(new Array(packageDetail.activities?.length).fill(false));
  function handleCheckbox(posicion) {
    // console.log(packageDetail.activities);
    const checkboxSeleccionados = checkboxEstado.map((item, index) =>
      index === posicion ? !item : item
    );
    // console.log(checkboxSeleccionados);
    let totalPaquete = price;
    checkboxSeleccionados.forEach((i, index) => {
      if (i === true)
        totalPaquete += parseInt(packageDetail.activities[index].price);
    });
    setChechboxEstado(checkboxSeleccionados);
    setPrecio(totalPaquete);
  }

  const navigate = useNavigate();
  const handleBotonRegresar = () => {
    navigate(-1);
  };

  const handleBotonComprar = () => {};

  //para el desmonte del componente
  // useEffect(() => {
  //   return () => {
  //     setPrecio(0);
  //     // setChechboxEstado(new Array(activities.length).fill(false));
  //   };
  // }, [setPrecio, setChechboxEstado]);

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
                          key={`actasdsad${i.name}`}
                          id={i.name}
                          type="checkbox"
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
                {precio ? precio : price}
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
            <CardGenericContainer listCards={relationatedPackage} />
          </div>
        )}
      </div>
    </div>
  );
}
