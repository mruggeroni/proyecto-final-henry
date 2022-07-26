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
  const [checkboxEstado, setCheckboxEstado] = useState([]);
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

  const [input, setInput] = useState({
    cantidad: 1,
    total: 0,
    actividades: [],
  });

  useEffect(() => {
    (async () => {
      await dispatch(getPackageById(id));
      await dispatch(getRelationated(id));
      await dispatch(getAllActivities());

      setInput({
        cantidad: 1,
        total: 0,
        actividades: [],
      });
      setCheckboxEstado(new Array(10).fill(false));
    })();
  }, []);

  const handleSelectCantidad = (e) => {
    console.log(e.target.value);
    let totalPaquete = price * e.target.value;
    let actividadesSeleccionadas = [];
    checkboxEstado.forEach((i, index) => {
      if (i === true) {
        console.log(parseInt(packageDetail.activities[index].price));
        totalPaquete +=
          parseInt(packageDetail.activities[index].price) * e.target.value;
      }
    });

    setInput({
      ...input,
      cantidad: e.target.value,
      total: totalPaquete,
    });
  };

  function handleCheckbox(posicion) {
    const checkboxSeleccionados = checkboxEstado.map((item, index) =>
      index === posicion ? !item : item
    );
    let totalPaquete = price * input.cantidad;
    let actividadesSeleccionadas = [];
    checkboxSeleccionados.forEach((i, index) => {
      if (i === true) {
        totalPaquete +=
          parseInt(packageDetail.activities[index].price) * input.cantidad;
        actividadesSeleccionadas.push(activities[index]);
      }
    });
    setCheckboxEstado(checkboxSeleccionados);

    setInput({
      ...input,
      actividades: actividadesSeleccionadas,
      total: totalPaquete,
    });
  }

  const navigate = useNavigate();
  const handleBotonRegresar = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleBotonComprar = (e) => {
    e.preventDefault();
    input.paquete = packageDetail;
    console.log(input);
  };

  // para el desmonte del componente
  useEffect(() => {
    (() => {
      return async () => {
        setLoading(true);
        setInput({});
        setCheckboxEstado(new Array(10).fill(false));
        await dispatch(getPackageById(id));
        await dispatch(getRelationated(id));
        setTimeout(function () {
          setLoading(false);
        }, 10000);
      };
    })();
  }, [dispatch, setCheckboxEstado, setInput]);

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
              <div onClick={(e) => handleBotonRegresar(e)}>Regresar</div>
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
            <div>
              <label className={s.cantidad} htmlFor="selectCantidad">
                Cantidad {"    "}
                <select
                  onClick={(e) => {
                    handleSelectCantidad(e);
                  }}
                  name="selectCantidad"
                  id="selectCantidad"
                >
                  <option selected={true} value="1">
                    1
                  </option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="1">8</option>
                </select>
              </label>
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
                {input.total ? input.total : price}
              </div>
            </div>
            <div className={s.contenedorBotonComprar}>
              <button
                onClick={(e) => handleBotonComprar(e)}
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
