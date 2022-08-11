import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card/Card.jsx";
import View from "./View.jsx";
import SortPrice from "./SortPrice.jsx";
import {
  filterPackagesByDestination,
  getAllActivities,
  getAllDestinations,
  getAllPackage,
  getDestinationsWithPackages,
  getOnSale,
  getFavoritesLocalStorage,
  filtrar,
  getTypes,
  getAllFavorites,
  createUser,
  getAllCart,
} from "./../../redux/actions/index";
import Paginado from "../Paginado/paginado";
import s from "./Search.module.css";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { useAuth0 } from "@auth0/auth0-react";

export default function FilteredSearch() {
  const dispatch = useDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const user = useSelector((state) => state.user);
  const allPackages = useSelector((state) => state.allPackages);
  const filteredPackages = useSelector((s) => s.filteredPackages);
  const allDestinations = useSelector(
    (state) => state.destinationsWithPackages
  );

  const regionesFiltradas = [
    "Europa Occidental",
    "Europa Central",
    "Europa Oriental",
    "Asia Oriental",
    "Asia del Sur",
    "Asia Sudoriental Continental",
    "Norte América",
    "Sudamérica",
    "América Central",
  ];
  // filteredPackages &&
  //   filteredPackages.forEach((i) => {
  //     i.destinations.forEach((i) => {
  //       if (!regionesFiltradas.includes(i.region))
  //         regionesFiltradas.push(i.region);
  //     });
  //   });
  const destinosFiltrados = [];
  filteredPackages &&
    filteredPackages.forEach((i) => {
      i.destinations.forEach((i) => {
        if (!destinosFiltrados.includes(i.name)) destinosFiltrados.push(i.name);
      });
    });

  const fechaDesde = useSelector((s) => s.filtradoDateMin);
  const fechaHasta = useSelector((s) => s.filtradoDateMax);
  const estadoDestino = useSelector((s) => s.filtradoDestino);
  const estadoRegion = useSelector((s) => s.filtradoRegion);
  const allTypes = useSelector((s) => s.types);
  const filtradoType = useSelector((s) => s.filtradoType);
  const estadoPrecioMin = useSelector((s) => s.priceFilterMin);
  const estadoPrecioMax = useSelector((s) => s.priceFilterMax);

  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage, setPackagesPerPage] = useState(10);
  const indexOfLastPackages = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackages - packagesPerPage;
  const currentPackage =
    filteredPackages.length &&
    filteredPackages.slice(indexOfFirstPackage, indexOfLastPackages);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const dataNow = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(fechaDesde);
  const [untilDate, setUntilDate] = useState(fechaHasta);
  const [destination, setDestination] = useState("x");
  const [type, setType] = useState("all");
  const [precioDesde, setPrecioDesde] = useState(estadoPrecioMin);
  const [precioHasta, setPrecioHasta] = useState(estadoPrecioMax);
  const [region, setRegion] = useState(estadoRegion);
  const [loading, setLoading] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setLoading(true);
    if (e.target.id === "region") {
      setRegion(e.target.value);
      dispatch(filtrar(e.target.value, e.target.id));
    }
    if (e.target.id === "searchDestinations") {
      setDestination(e.target.value);
      dispatch(filtrar(e.target.value, e.target.id));
    }

    if (e.target.id === "from") {
      // dispatch(getAllPackage(10000));
      if (new Date(e.target.value) > new Date(untilDate)) {
        setFromDate(e.target.value);
        setUntilDate(e.target.value);
        dispatch(filtrar(e.target.value, e.target.id));
      } else {
        setFromDate(e.target.value);
        dispatch(filtrar(e.target.value, e.target.id));
      }
    }
    if (e.target.id === "until") {
      // dispatch(getAllPackage(1000));
      setUntilDate(e.target.value);
      dispatch(filtrar(e.target.value, e.target.id));
    }

    if (e.target.id === "searchType") {
      setType(e.target.value);
      // dispatch(getAllPackage(1000));
      dispatch(filtrar(e.target.value, e.target.id));
    }

    if (e.target.id === "precioDesde") {
      // dispatch(getAllPackage(10000));
      if (e.target.value > precioHasta) {
        setPrecioDesde(e.target.value);
        setPrecioHasta(e.target.value);
        dispatch(filtrar(e.target.value, e.target.id));
      } else {
        setPrecioDesde(e.target.value);
        dispatch(filtrar(e.target.value, e.target.id));
      }
    }
    if (e.target.id === "precioHasta") {
      // dispatch(getAllPackage(1000));
      setPrecioHasta(e.target.value);
      dispatch(filtrar(e.target.value, e.target.id));
    }
    if (e.target.id === "reset") {
      dispatch(filtrar("", e.target.id));
      setUntilDate(estadoPrecioMax);
      setLoading(false);
    }
    setCurrentPage(1);
    // dispatch(filterPackagesByDestination(e.target.value));
    // dispatch(getAllPackage(10000));
    setLoading(false);
  };

  useEffect(async () => {
    setLoading(true);
    await dispatch(getAllPackage(10000));
    await dispatch(getAllDestinations());
    await dispatch(getOnSale());
    await dispatch(getAllActivities());
    await dispatch(getDestinationsWithPackages());
    await dispatch(getTypes());
    if (!isAuthenticated) {
      dispatch(getFavoritesLocalStorage());
    }
    const fetch = async () => {
      const token = await getAccessTokenSilently();
      const usuario = await dispatch(createUser(token));
      dispatch(getAllCart(usuario.payload.id));
      dispatch(getAllFavorites(token, usuario.payload.email));
    };
    fetch();
    setLoading(false);
  }, []);

  useEffect(() => {
    return async () => {
      await dispatch(getAllPackage(10000));
      await dispatch(getAllDestinations());
      await dispatch(getOnSale());
      await dispatch(getAllActivities());
      await dispatch(getDestinationsWithPackages());
      await dispatch(getTypes());
      await dispatch(filtrar("", "reset"));
    };
  }, [dispatch]);

  return (
    <div className={s.container}>
      {loading ? (
        <div className={s.contenedorSpinner}>
          <div className={s.spinner}></div>
        </div>
      ) : (
        <div className={s.containerSearch}>
          <div className={mostrar ? s.view : s.contenedorFiltrosEsconder}>
            <div className={s.verticalHideFilter}>
              <div
                className={
                  mostrar ? s.contenedorFiltros : s.contenedorFiltrosEsconder
                }
              >
                {/* <label>
                <select
                  onChange={(e) => handleChange(e)}
                  id="region"
                  className={s.create_input}
                >
                  <option
                    value=""
                    selected={estadoRegion === "" ? true : false}
                    disabled="disabled"
                  >
                    Regiones
                  </option>
                  <option
                    selected={estadoRegion === "all" ? true : false}
                    value="all"
                  >
                    Todas las regiones
                  </option>
                  {regionesFiltradas?.sort().map((el) => (
                    <option
                      selected={estadoRegion === el ? true : false}
                      key={el}
                      value={el}
                    >
                      {el}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <select
                  onChange={(e) => handleChange(e)}
                  id="searchDestinations"
                  className={s.create_input}
                >
                  <option
                    value=""
                    selected={estadoDestino === "" ? true : false}
                    disabled="disabled"
                  >
                    Destinos
                  </option>
                  <option
                    selected={estadoDestino === "all" ? true : false}
                    value="all"
                  >
                    Todos los destinos
                  </option>
                  {destinosFiltrados?.sort().map((el) => (
                    <option
                      selected={estadoDestino === el ? true : false}
                      key={el}
                      value={el}
                    >
                      {el}
                    </option>
                  ))}
                </select>
              </label> */}
                <SortPrice
                  setOrder={setOrder}
                  setCurrentPage={setCurrentPage}
                />
                <div className={s.otrodiv}>
                  <label className={s.create_label}>Filtrar x</label>
                  <select
                    className={s.create_input}
                    id="searchType"
                    onChange={(e) => handleChange(e)}
                  >
                    <option
                      selected={filtradoType === "" ? true : false}
                      value="all"
                      disabled
                    >
                      Tipo
                    </option>
                    <option
                      selected={filtradoType === "all" ? false : true}
                      value="all"
                    >
                      Todos los tipos
                    </option>
                    {allTypes?.map((el) => (
                      <option
                        selected={filtradoType === el ? true : false}
                        key={el}
                        value={el}
                      >
                        {el}
                      </option>
                    ))}
                  </select>

                  <select
                    id="precioDesde"
                    className={s.create_input}
                    onChange={(e) => handleChange(e)}
                  >
                    <option
                      value=""
                      selected={estadoPrecioMin === "" ? true : false}
                      disabled="disabled"
                    >
                      Precio minimo
                    </option>
                    <option
                      selected={estadoPrecioMin === 0 ? true : false}
                      value={0}
                      disabled={precioHasta < 0 ? true : false}
                    >
                      U$S 0
                    </option>
                    <option
                      selected={estadoPrecioMin === 1000 ? true : false}
                      value={1000}
                      disabled={precioHasta < 1000 ? true : false}
                    >
                      U$S 1.000
                    </option>

                    <option
                      selected={estadoPrecioMin === 2000 ? true : false}
                      value={2000}
                      disabled={precioHasta < 2000 ? true : false}
                    >
                      U$S 2.000
                    </option>

                    <option
                      selected={estadoPrecioMin === 3000 ? true : false}
                      value={3000}
                      disabled={precioHasta < 3000 ? true : false}
                    >
                      U$S 3.000
                    </option>
                    <option
                      selected={estadoPrecioMin === 4000 ? true : false}
                      value={4000}
                      disabled={precioHasta < 4000 ? true : false}
                    >
                      U$S 4.000
                    </option>
                  </select>

                  <select
                    id="precioHasta"
                    onChange={(e) => handleChange(e)}
                    className={s.create_input}
                  >
                    <option
                      value=""
                      selected={estadoPrecioMax > 5000 ? true : false}
                      disabled="disabled"
                    >
                      Precio maximo
                    </option>
                    <option
                      selected={estadoPrecioMax === 5000 ? true : false}
                      value={5000}
                    >
                      U$S 5.000
                    </option>
                    <option
                      selected={estadoPrecioMax === 4000 ? true : false}
                      value={4000}
                    >
                      U$S 4.000
                    </option>
                    <option
                      selected={estadoPrecioMax === 3000 ? true : false}
                      value={3000}
                      disabled={estadoPrecioMin > 3000 ? true : false}
                    >
                      U$S 3.000
                    </option>
                    <option
                      selected={estadoPrecioMax === 2000 ? true : false}
                      value={2000}
                      disabled={estadoPrecioMin > 2000 ? true : false}
                    >
                      U$S 2.000
                    </option>
                    <option
                      selected={estadoPrecioMax === 1000 ? true : false}
                      value={1000}
                      disabled={estadoPrecioMin > 1000 ? true : false}
                    >
                      U$S 1.000
                    </option>
                  </select>
                </div>
                <button
                  className={s.create_btn}
                  id="reset"
                  onClick={(e) => handleChange(e)}
                >
                  Reiniciar Filtros
                </button>
              </div>
              <div>
                <hr />
              </div>
            </div>
          </div>

          <div onClick={() => setMostrar(!mostrar)} className={s.moreFilters}>
            <VscChevronDown
              className={s.flechaFiltros}
              display={mostrar ? "none" : true}
            />
            <VscChevronUp
              className={s.flechaFiltros}
              display={mostrar ? true : "none"}
            />
            <p>+ filtros</p>
          </div>

          {/* <div className={s.contenedorOrdenar}>
            <SortPrice setOrder={setOrder} setCurrentPage={setCurrentPage} />
          </div> */}

          <div className={s.mainFilters}>
            <div>
              <select
                onChange={(e) => handleChange(e)}
                id="region"
                className={s.create_input}
              >
                <option
                  value=""
                  selected={estadoRegion === "" ? true : false}
                  disabled="disabled"
                >
                  Regiones
                </option>

                {regionesFiltradas?.sort().map((el) => (
                  <option
                    selected={estadoRegion === el ? true : false}
                    key={el}
                    value={el}
                  >
                    {" "}
                    {el}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                onChange={(e) => handleChange(e)}
                id="searchDestinations"
                className={s.create_input}
              >
                <option
                  value=""
                  selected={estadoDestino === "" ? true : false}
                  disabled="disabled"
                >
                  Destinos
                </option>
                <option
                  selected={estadoDestino === "all" ? true : false}
                  value="all"
                >
                  Todos los destinos
                </option>
                {destinosFiltrados?.sort().map((el) => (
                  <option
                    selected={estadoDestino === el ? true : false}
                    key={el}
                    value={el}
                  >
                    {el}
                  </option>
                ))}
              </select>
            </div>
            <div className={s.create_input_date}>
              <input
                type="date"
                id="from"
                value={fechaDesde}
                min={dataNow}
                // disabled={destination === "x"}
                onChange={(e) => handleChange(e)}
                className={s.create_input}
              />
            </div>
            <div className={s.create_input_date}>
              <input
                type="date"
                id="until"
                value={untilDate}
                min={fechaDesde ? fechaDesde : dataNow}
                // disabled={destination === "x"}
                onChange={(e) => handleChange(e)}
                className={s.create_input}
              />
            </div>
          </div>

          {currentPackage ? (
            <div className={s.pag}>
              {/* <div className={s.divVacio}></div> */}
              <div className={s.paginadoSearch}>
                <Paginado
                  packagesPerPage={packagesPerPage}
                  allPackages={filteredPackages.length}
                  paginado={paginado}
                  currentPage={currentPage}
                />
              </div>
              <div className={s.viewComponent}>
                <View
                  currentPackage={currentPackage}
                  allPackages={allPackages}
                  indexOfFirstPackage={indexOfFirstPackage}
                  setPackagesPerPage={setPackagesPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            </div>
          ) : (
            " "
          )}
          {/* </div> */}
          <div className={s.cards}>
            {currentPackage ? (
              currentPackage.map((p) => {
                return (
                  <div className={s.eachcard} key={p.id}>
                    <Link to={"/detail/" + p.id} key={p.id}>
                      <Card
                        name={p.name}
                        image={p.main_image}
                        description={p.description}
                        price={p.price}
                        on_sale={p.on_sale}
                        id={p.id}
                        key={p.id}
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className={s.noPaq}>
                No hay paquetes que cumplan con las condiciones solicitadada
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
