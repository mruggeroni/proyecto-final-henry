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
  getCartLocalStorage,
  getFavoritesLocalStorage,
  getAllPackage,
  cleanPackageById,
  postFavorites,
  deleteFavorites,
  crearRating,
  eliminarRating,
  getAllFavorites,
  createUser,
  deleteCartPackage,
  postCartPackage,
  getAllCart,
  updateCart

} from "../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const packageDetail = useSelector((state) => state.detailPackage);
  const relationatedPackage = useSelector((state) => state.relationated);
  const allActivities = useSelector((state) => state.activities);
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const [checkeado, setCheckeado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkboxEstado, setCheckboxEstado] = useState(
    new Array(10).fill(false)
  );
  const [input, setInput] = useState({
    cantidad: 1,
    total: 0,
    actividades: [],
  });
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect( async () => {
    setLoading(true);

    if (
      Object.keys(packageDetail).length &&
      relationatedPackage.length &&
      allActivities.length
    ) {
      setLoading(false);
      if (document.getElementsByName("selectCantidad").length) {
        setInput({
          cantidad: 1,
          total: 0,
          actividades: [],
        });
        document.getElementsByName("selectCantidad")[0].value = "1";
      }
      setCheckeado(false);
      if (!isAuthenticated) {
        let favorites = JSON.parse(localStorage.getItem("favorites"));
        favorites?.forEach((f) => f.id === parseInt(id) && setCheckeado(true));
      } else {
        const fetch = async () => {
          const token = await getAccessTokenSilently();
          await dispatch(getAllFavorites(token));
          favorites.forEach((f) => f.id === parseInt(id) && setCheckeado(true));
        };
        fetch();
      }
    }
  }, [packageDetail, relationatedPackage, allActivities]);

  useEffect( async () => {
    dispatch(cleanPackageById());
    dispatch(getPackageById(id));
    dispatch(getRelationated(id));
    dispatch(getAllActivities());
    dispatch(getFavoritesLocalStorage());
    const fetch = async () => {
      const token = await getAccessTokenSilently();
      // console.log(token)
      dispatch(createUser(token));
    };
    // fetch();
    // if (!isAuthenticated) {
    //   dispatch(getFavoritesLocalStorage());
    // } else {
    //   const fetch = async () => {
    //     const token = await getAccessTokenSilently();
    //     dispatch(getAllFavorites(token));
    //   };
    //   fetch();
    // }
  }, [dispatch]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const checkPackageInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let match = false;
    cart?.forEach((p) => p.paquete.id === parseInt(id) && (match = true));
    return match;
  };

  async function handleFavorite(e) {
    e.preventDefault();
    if (!isAuthenticated) {
      packageDetail.image = packageDetail.main_image;
      if (checkPackageInCart(id)) {
        return alert("ya esta en el carrito");
      }
      if (checkeado) {
        let favorites = JSON.parse(localStorage.getItem("favorites"));
        let remFav = favorites.filter((f) => {
          return f.id !== parseInt(id);
        });
        setCheckeado(false);
        localStorage.setItem("favorites", JSON.stringify(remFav));
        dispatch(getFavoritesLocalStorage());
      } else {
        if (!localStorage.getItem("favorites")) {
          let favorites = [];
          favorites.push(packageDetail);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        } else {
          let favorites = JSON.parse(localStorage.getItem("favorites"));
          let remFav = favorites?.filter((p) => p.id !== packageDetail.id);
          remFav.push(packageDetail);
          localStorage.setItem("favorites", JSON.stringify(remFav));
        }
        setCheckeado(true);
      }
      dispatch(getFavoritesLocalStorage());
    } else {
      const token = await getAccessTokenSilently();
      if (checkeado) {
        await dispatch(deleteFavorites(id, token));
        setCheckeado(false);
      } else {
        await dispatch(postFavorites(id, token));
        setCheckeado(true);
      }
    }
  }

  const handleSelectCantidad = (e) => {
    let totalPaquete = packageDetail.price * e.target.value;
    checkboxEstado.forEach((i, index) => {
      if (i === true) {
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
    let totalPaquete = packageDetail.price * input.cantidad;
    let actividadesSeleccionadas = [];
    checkboxSeleccionados.forEach((i, index) => {
      if (i === true) {
        totalPaquete +=
          parseInt(packageDetail.activities[index].price) * input.cantidad;
        actividadesSeleccionadas.push(packageDetail.activities[index]);
      }
    });
    setCheckboxEstado(checkboxSeleccionados);

    setInput({
      ...input,
      actividades: actividadesSeleccionadas,
      total: totalPaquete,
    });
  }

  const handleBotonRegresar = async (e) => {
    // e.preventDefault();
    setCheckeado(false);
    setLoading(true);
    scrollToTop();
    setInput({
      cantidad: 1,
      total: 0,
      actividades: [],
    });
    // await dispatch(cleanPackageById());
    navigate(-1);
    setTimeout(async () => {
      await dispatch(cleanPackageById());
      await dispatch(getPackageById(id));
      console.log(id)
      }, 0);
    // dispatch(cleanPackageById());
    // dispatch(getPackageById(id)); // TENDRIAMOS QUE VER SI CON LOCAL STORAGE SE PUEDE ENCONREAR EK ID
    // dispatch(getAllPackage());
  };

  const handleFavorito = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      dispatch(postFavorites(id, token));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoritoBorrar = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      dispatch(deleteFavorites(id, token));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePuntuar = async (e) => {
    try {
      const token = await getAccessTokenSilently();
      console.log(e.target.value);
      dispatch(crearRating(id, token, e.target.value));
    } catch (error) {
      console.log(error);
    }
  };
  const handleBorrarRating = async (e) => {
    try {
      const token = await getAccessTokenSilently();
      dispatch(eliminarRating(id, token));
    } catch (error) {
      console.log(error);
    }
  };

  async function handleBotonComprar(e){
    e.preventDefault();
    input.paquete = packageDetail;
    
    if(!isAuthenticated){
      if (!localStorage.getItem("cart")) {
        let cart = [];
        cart.unshift(input);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let match = false;
        cart?.forEach((p) => p.paquete.id === parseInt(id) && (match = true));
        if (!match) {
          cart.unshift(input);
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          alert("ya esta en el carrito");
        }
      }
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites = favorites?.filter((f) => f.id !== parseInt(id));
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setCheckeado(false);
      dispatch(cleanPackageById());
      setLoading(true);
      scrollToTop();
      setInput({
        cantidad: 1,
        total: 0,
        actividades: [],
      });
      /* 
      setCheckboxEstado(new Array(10).fill(false));
      */
      setTimeout(() => {
        dispatch(getPackageById(id));
      }, 1);
      dispatch(getCartLocalStorage());
    } else{
      try{
      //  console.log(input)
      //   input = packageDetail;
      //   console.log([packageDetail])
        if(cart?.length){
          dispatch(postCartPackage(user.id, [input]));
          dispatch(getAllCart(user.id));
        } else{
          dispatch(updateCart(cart.id, [input]));
          dispatch(getAllCart(user.id));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleEstrellas = async (e) => {
    e.preventDefault();
    try {
      console.log(e.target.outerHTML.slice(13, 14));
      const token = await getAccessTokenSilently();
      // dispatch(crearRating(id, token, e.target.id))
    } catch (error) {
      console.log(error.message);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div
      style={{
        backgroundImage: `url(${packageDetail.main_image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className={s.body}>
        <div className={s.contenedor}>
          <div className={s.contenedorBarraSuperior}>
            <div onClick={(e) => handleBotonRegresar(e)}>Volver</div>
            <div onClick={(e) => handleFavorite(e)}>
              <BotonFav
                setChecked={setCheckeado}
                checked={checkeado}
                id={parseInt(id)}
                componente={"detail"}
              />
            </div>
          </div>
          <div>
            <button onClick={(e) => handleFavorito(e)}>postear favorito</button>
          </div>
          <div>
            <button onClick={(e) => handleFavoritoBorrar(e)}>
              borrar favorito
            </button>
          </div>
          <div>
            <select
              onChange={(e) => handlePuntuar(e)}
              name="rating"
              id="rating"
            >
              <option selected disabled value="">
                puntua
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <button
              onClick={(e) => {
                handleBorrarRating(e);
              }}
            >
              eliminar rating
            </button>
          </div>
          <div onClick={(e) => handleEstrellas(e)} className={s.card_rating}>
            <p className={s.card_text}>
              <b>Rating: {`${3}`}</b>
            </p>

            <span value="1" className={Math.round(3) >= 1 ? s.star_rating : ""}>
              ★
            </span>
            <span value="2" className={Math.round(3) >= 2 ? s.star_rating : ""}>
              ★
            </span>
            <span value="3" className={Math.round(3) >= 3 ? s.star_rating : ""}>
              ★
            </span>
            <span value="4" className={Math.round(3) >= 4 ? s.star_rating : ""}>
              ★
            </span>
            <span
              value="5"
              className={Math.round(3) === 5 ? s.star_rating : ""}
            >
              ★
            </span>
          </div>
          <div className={s.contenedorDetalles}>
            <h1>{packageDetail.name}</h1>
            <ControlledCarousel
              name={packageDetail.name}
              main_image={packageDetail.main_image}
              images={packageDetail.images}
            />
            <div className={s.resto}>
              <h3>
                {packageDetail.start_date?.split("-").reverse().join("-")} /{" "}
                {packageDetail.end_date?.split("-").reverse().join("-")}
              </h3>
              <h3>U$S {packageDetail.price}</h3>
              <h3>
                Destinos:{" "}
                {packageDetail.destinations?.map((i, o) => {
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
              <h3 className={s.description}>{packageDetail.description}</h3>
            </div>
          </div>
          <div>
            <label className={s.cantidad} htmlFor="selectCantidad">
              Cantidad {"    "}
              <select
                onChange={(e) => handleSelectCantidad(e)}
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
                <option value="8">8</option>
              </select>
            </label>
          </div>

          <div className={s.contenedorActividades}>
            {packageDetail.activities?.map((i, index) => {
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
                        U$S {i.price}
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
                      src={i.image}
                      alt="Image not found"
                    />
                    <div>{i.description}</div>
                  </div>
                </div>
              );
            })}
            <div className={s.total}>
              {" "}
              <span>TOTAL U$S </span>
              {input.total ? input.total : packageDetail.price}
            </div>
          </div>

          <div className={s.contenedorBotonComprar}>
            <button
              onClick={(e) => handleBotonComprar(e)}
              className={s.botonComprar}
            >
              Agregar al carrito
            </button>
          </div>
          <div className={s.tituloDestacados}>
            Quizas tambien te interesen estos paquetes!!
          </div>
          <CardGenericContainer listCards={relationatedPackage} />
        </div>
      </div>
    </div>
  );
}
