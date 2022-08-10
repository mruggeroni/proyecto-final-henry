import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import s from "./Detail.module.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
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
  getOrders,
  getOrderDetail,
} from "../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import Rating from "react-rating";
import { BsFillStarFill, BsStar } from "react-icons/bs";

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
  const [canScore, setCanScore] = useState(false);

  useEffect(async () => {
    setLoading(true);

    if (
      Object.keys(packageDetail).length &&
      relationatedPackage.length &&
      allActivities.length
    ) {
      if (document.getElementsByName("selectCantidad").length) {
        setInput({
          cantidad: 1,
          total: 0,
          actividades: [],
        });
        document.getElementsByName("selectCantidad")[0].value = "1";
      }
      setInput({
        cantidad: 1,
        total: packageDetail.price,
        actividades: [],
      });
      setCanScore(false);
      setCheckeado(false);
      if (!isAuthenticated) {
        let favorites = JSON.parse(localStorage.getItem("favorites"));
        favorites?.forEach((f) => f.id === parseInt(id) && setCheckeado(true));
      } else {
        const fetch = async () => {
          const token = await getAccessTokenSilently();
          try {
            await dispatch(getAllFavorites(token, user.email));
            favorites.forEach(
              (f) => f.id === parseInt(id) && setCheckeado(true)
            );
          } catch (error) {
            alert("No se puede realizar esta acción");
          }
        };
        fetch();
      }
      if (!packageDetail.available && user.is_admin !== true) {
        navigate("/");
      }

      if (user.id) {
        let res = await dispatch(getOrders());
        let userOrders = res.payload.filter((o) => o.userId === user.id);
        userOrders?.forEach(async (o) => {
          if (canScore) return;
          let res = await dispatch(getOrderDetail(o.id));
          res.payload.packages?.forEach((p) => {
            if (p.id === parseInt(id)) {
              setCanScore(true);
              return;
            }
          });
        });
      }
      setLoading(false);
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
    dispatch(getCartLocalStorage());
    setCanScore(false);
    const fetch = async () => {
      const token = await getAccessTokenSilently();
      const usuario = await dispatch(createUser(token));
      console.log(usuario.payload);
      dispatch(getAllCart(usuario.payload.id));
      dispatch(getAllFavorites(token));
    };
    fetch();
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
      let cart = JSON.parse(localStorage.getItem("cart")) || {};
      cart.packages?.forEach((p) => p.id === parseInt(id) && (match = true));
    } else {
      cart.packages?.forEach((p) => p.id === parseInt(id) && (match = true));
    }
    console.log(match);
    return match;
  };

  async function handleFavorite(e) {
    e.preventDefault();
    // if (checkPackageInCart(id)) {
    //   return alert("ya esta en el carrito");
    // }
    // console.log(checkPackageInCart(id))
    // if (checkPackageInCart(id)) {
    //   return alert("ya esta en el carrito");
    // }
    console.log(checkPackageInCart(id));

    if (!isAuthenticated) {
      packageDetail.image = packageDetail.main_image;
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
        console.log(token);
        await dispatch(deleteFavorites(id, token, user.email));
        setCheckeado(false);
      } else {
        await dispatch(postFavorites(id, token, user.email));
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

  async function handleBotonComprar(e) {
    e.preventDefault();
    input.paquete = packageDetail;
    if (!input.actividades.length && input.total === 0) {
      input.total = packageDetail.price;
    }
    // if (packageDetail.on_sale != "0") {
    //   input.total = input.total - (packageDetail.on_sale * input.total) / 100;
    // }
    console.log(input);
    let descuento = 0;
    if (packageDetail.on_sale != "0") {
      descuento = input.total - (packageDetail.on_sale * input.total) / 100;
    }
    if (!isAuthenticated) {
      if (!localStorage.getItem("cart")) {
        let cart = {
          total_order: 0,
          packages: [],
        };
        cart.total_order = descuento != 0 ? descuento : parseInt(input.total);
        input.paquete.total =
          descuento != 0 ? descuento : parseInt(input.total);
        input.paquete.quantity = input.cantidad;
        input.paquete.activities = input.actividades;
        cart.packages.push(input.paquete);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let match = false;
        cart.packages?.forEach((p) => p.id === parseInt(id) && (match = true));
        if (!match) {
          cart.total_order +=
            descuento != 0 ? descuento : parseInt(input.total);
          input.paquete.total =
            descuento != 0 ? descuento : parseInt(input.total);
          input.paquete.quantity = input.cantidad;
          input.paquete.activities = input.actividades;
          cart.packages.push(input.paquete);
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops algo fallo...",
            text: "El paquete ya debe estar en el carrito",
          });
          // alert("ya esta en el carrito");
        }
      }
      // let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      // favorites = favorites?.filter((f) => f.id !== parseInt(id));
      // localStorage.setItem("favorites", JSON.stringify(favorites));
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

      dispatch(getCartLocalStorage());
      setTimeout(() => {
        dispatch(getPackageById(id));
      }, 1);
    } else {
      try {
        if (!Object.keys(cart).length) {
          console.log(input);
          await dispatch(postCartPackage(user.id, [input]));
        } else {
          await dispatch(getAllCart(user.id));
          await dispatch(
            updateCart(cart.id, {
              packageId: input.paquete.id,
              activitiesId:
                input.actividades?.map((a) => a.Package_Activity.activityId) ||
                [],
              quantity: input.cantidad,
              total_package: descuento != 0 ? descuento : parseInt(input.total),
            })
          );
          scrollToTop();
        }
        await dispatch(getAllCart(user.id));
      } catch (error) {
        try {
          await dispatch(
            updateCart(cart.id, {
              packageId: input.paquete.id,
              activitiesId:
                input.actividades?.map((a) => a.Package_Activity.activityId) ||
                [],
              quantity: input.cantidad,
              total_package: descuento != 0 ? descuento : parseInt(input.total),
            })
          );
          dispatch(cleanPackageById());
          dispatch(getPackageById(id));
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops algo fallo...",
            text: "El paquete ya debe estar en el carrito",
          });
        }
      }
    }
  }

  const handleEstrellas = async (value) => {
    try {
      const token = await getAccessTokenSilently();
      await dispatch(crearRating(id, token, value));
      dispatch(getRating(id));
      setInput({ ...input });
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
          {packageDetail.on_sale != "0" && (
            <div
              className={`${s.onSale} ${s.musRibbon} ${s.optionsRibbon} ${s.right}`}
            >
              <span>{packageDetail.on_sale}% OFF</span>
            </div>
          )}

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
          <div className={s.card_rating}>
            <p className={s.card_text}>
              <b>
                Rating:{" "}
                {`${
                  isNaN(parseInt(rating))
                    ? canScore
                      ? "Se el primero en puntuar este paquete"
                      : "S/R"
                    : rating
                }`}
              </b>
            </p>
            {console.log("Score ", canScore)}
            <Rating
              onClick={(value) => handleEstrellas(value)}
              initialRating={rating}
              readonly={!canScore}
              emptySymbol={
                <BsFillStarFill
                  style={{ color: "#fafafa", fontSize: "24px" }}
                />
              }
              placeholderSymbol={<BsFillStarFill style={{ color: "red" }} />}
              fullSymbol={
                <BsFillStarFill
                  style={{ color: "#4a9eab", fontSize: "24px" }}
                />
              }
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
              <div className={s.pricePaq}>
                <h3>
                  U$S{" "}
                  {packageDetail.on_sale ? (
                    <s>{packageDetail.price}</s>
                  ) : (
                    packageDetail.price
                  )}
                </h3>
                {packageDetail.on_sale ? (
                  <h4>
                    {packageDetail.price *
                      ((100 - packageDetail.on_sale) / 100)}
                  </h4>
                ) : (
                  " "
                )}
              </div>
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
                        U$S{" "}
                        {packageDetail.on_sale
                          ? (i.price * (100 - packageDetail.on_sale)) / 100
                          : i.price}
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
            {packageDetail.on_sale ? (
              <div className={s.total}>
                <div className={s.discountTotal}>
                  Subtotal: U$S{input.total ? input.total : packageDetail.price}
                </div>
                <div className={s.discountTotal}>
                  Total Descuento: U$S
                  {input.total -
                    input.total * ((100 - packageDetail.on_sale) / 100)}
                </div>
              </div>
            ) : (
              " "
            )}
            <div className={s.total}>
              <span>TOTAL U$S </span>
              {/* <span>{input.total ? input.total : packageDetail.price}</span> */}
              {packageDetail.on_sale ? (
                <span>
                  {(input.total ? input.total : packageDetail.price) *
                    ((100 - packageDetail.on_sale) / 100)}
                </span>
              ) : (
                <span>{input.total ? input.total : packageDetail.price}</span>
              )}
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

/* 


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


*/
