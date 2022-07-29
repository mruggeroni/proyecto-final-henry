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
} from "./../../redux/actions/index";
import Paginado from "../Paginado/paginado";
import s from "./Search.module.css";
import style from "./Select.module.css";

export default function FilteredSearch() {
  /* 
    cuando estas parado en /search y refrescas, no se carga el estado de allPackages
    YA ESTA SOLICIONADO.. LOS DESTINOS QUE SE DEBEN CARGAR EN EL FILTRO TAMBIEN... 
    se soliciono con el useEffect

    Arreglar que cuando se filtra en el home y manda un array vacio, poner un mensaje [no hay paquetes para mostrar]
  */

  const dispatch = useDispatch();
  const allPackages = useSelector((state) =>state.filteredPackages);
  const allDestinations = useSelector((state) => state.destinationsWithPackages);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage, setPackagesPerPage] = useState(10);
  const indexOfLastPackages = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackages - packagesPerPage;
  const currentPackage = allPackages.length && allPackages.slice(
    indexOfFirstPackage,
    indexOfLastPackages
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(filterPackagesByDestination(e.target.value));
    dispatch(getAllPackage());
    setCurrentPage(1);
  };

  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    await dispatch(getAllPackage(1000));
    await dispatch(getAllDestinations());
    await dispatch(getOnSale());
    await dispatch(getAllActivities());
    await dispatch(getDestinationsWithPackages());
    setLoading(false);
  }, []);

  useEffect(() => {
    return async () => {
      await dispatch(getAllPackage());
      await dispatch(getAllDestinations());
      await dispatch(getOnSale());
      await dispatch(getAllActivities());
      await dispatch(getDestinationsWithPackages());
    };
  }, [dispatch]);

  return (
    <div className={s.container}>
      {loading ? (
        <div className={s.contenedorSpinner}>
          <div className={s.spinner}></div>
        </div>
      ) : (
        <div>
          <div className={s.view}>
            <SortPrice setOrder={setOrder} setCurrentPage={setCurrentPage} />
            <div>
              <label>Search Package from: </label>
              <select
                id="searchDestinations"
                className={style.select}
                onChange={(e) => handleChange(e)}
              >
                {" "}
                <option selected={true} disabled="disabled">
                  Seleccionar un Destino
                </option>
                <option value="all">Todos los destinos</option>
                {allDestinations?.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            <View
              currentPackage={currentPackage}
              allPackages={allPackages}
              indexOfFirstPackage={indexOfFirstPackage}
              setPackagesPerPage={setPackagesPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
          <Paginado
            packagesPerPage={packagesPerPage}
            allPackages={allPackages.length}
            paginado={paginado}
            currentPage={currentPage}
          />
          <div className={s.cards}>
            {currentPackage ?
              currentPackage.map((p) => {
                return (
                  <div className={s.eachcard} key={p.id}>
                    <Link to={"/detail/" + p.id} key={p.id}>
                      <Card
                        name={p.name}
                        image={p.main_image}
                        description={p.description}
                        price={p.price}
                        id={p.id}
                        key={p.id}
                      />
                    </Link>
                  </div>
                );
              }):
              (<div className={s.noPaq}>No hay paquetes que cumplan con las condiciones solicitadada</div>)}
          </div>
        </div>
      )}
    </div>
  );
}
