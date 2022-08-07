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
  updateCart,
  getRating,
} from "../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import Rating from 'react-rating';
import { BsFillStarFill, BsStar } from 'react-icons/bs';

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
  const rating = useSelector((s) => s.rating);
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

  useEffect(async () => {
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

  useEffect(async () => {
    dispatch(cleanPackageById());
    dispatch(getPackageById(id));
    const rating = await dispatch(getRating(id));
    console.log(rating);
    dispatch(getRelationated(id));
    dispatch(getAllActivities());
    dispatch(getFavoritesLocalStorage());
    const fetch = async () => {
      const token = await getAccessTokenSilently();
      // console.log(token)
      dispatch(createUser(token));
    };
    fetch();
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
    let match = false;
    if (!isAuthenticated) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart?.forEach((p) => p.paquete.id === parseInt(id) && (match = true));
    } else {
      cart?.forEach((p) => p.paquete.id === parseInt(id) && (match = true));
    }
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
    e.preventDefault();
    navigate("/");
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

  async function handleBotonComprar(e) {
    e.preventDefault();
    input.paquete = packageDetail;
    if(!input.actividades.length && input.total === 0) {
      input.total = packageDetail.price;
    }
    if(packageDetail.on_sale != '0') {
      input.total = input.total - (packageDetail.on_sale * input.total) / 100;
    }
    console.log(input)


    /* if (!isAuthenticated) {
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

      // setCheckboxEstado(new Array(10).fill(false));

      setTimeout(() => {
        dispatch(getPackageById(id));
      }, 1);
      dispatch(getCartLocalStorage());
    } else {
      try {
        // if (localStorage.getItem("cart")) {
        //   let cart = JSON.parse(localStorage.getItem("cart"));
        //   cart.forEach((c) => dispatch(updateCart(user.id, c)))
        //   //NO FALTARIA BORRAR EL CARRITO DEL LOCAL??
        // }
        if (!Object.keys(cart).length) {
          dispatch(postCartPackage(user.id, [input]));
          // dispatch(getAllCart(user.id));
        } else {
          dispatch(updateCart(cart.id, [input]));
          // dispatch(getAllCart(user.id));
        }
      } catch (error) {
        console.log(error.message);
      }
    } */
  }

  const handleEstrellas = async (value) => {
    try {
      const token = await getAccessTokenSilently();
      await dispatch(crearRating(id, token, value));
      dispatch(getRating(id))
      setInput({...input})
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
        
         <div className={`${s.onSale} ${s.musRibbon} ${s.optionsRibbon} ${s.right}`}>
            <span>{packageDetail.on_sale}% OFF</span>
          </div>
        
          <div className={s.contenedorBarraSuperior}>
            <div onClick={(e) => handleBotonRegresar(e)}>Inicio</div>
            <div onClick={(e) => handleFavorite(e)}>
              <BotonFav
                setChecked={setCheckeado}
                checked={checkeado}
                id={parseInt(id)}
                componente={"detail"}
              />
            </div>
          </div>
          {/* <div>
            <button
              onClick={(e) => {
                dispatch(deleteCartPackage(cart.id));
              }}
            >
              delete cart
            </button>
          </div>
          <div>
            <button
              onClick={(e) => {
                dispatch(getAllCart(user.id));
              }}
            >
              reset cart
            </button>
          </div> */}
          {/* <div>
            <button onClick={(e) => handleFavorito(e)}>postear favorito</button>
          </div>
          <div>
            <button onClick={(e) => handleFavoritoBorrar(e)}>
              borrar favorito
            </button>
          </div> */}
          {/* <div>
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
          </div> */}
          <div className={s.card_rating}>
          

            <p className={s.card_text}>
              <b>
                Rating:{" "}
                {`${
                  isNaN(parseInt(rating))
                    ? (isAuthenticated ? "Se el primero en puntuar este paquete" : "S/R")
                    : rating
                }`}
              </b>
            </p>
            <Rating 
              onClick={(value) => handleEstrellas(value)}
              initialRating={rating}
              readonly={!isAuthenticated}
              emptySymbol={<BsFillStarFill style={{color: '#fafafa', fontSize: '24px'}} />}
              placeholderSymbol={<BsFillStarFill style={{color: 'red'}} />}
              fullSymbol={<BsFillStarFill style={{color: '#4a9eab', fontSize: '24px'}} />}
            />
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
              <span>{input.total ? input.total : packageDetail.price}</span>
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
