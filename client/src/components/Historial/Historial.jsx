import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  filterPackagesByDestination,
  getAllPackage,
} from "./../../redux/actions/index";
import s from '../Search/Search.module.css'
import style from "../Search/Select.module.css";
import HistorialCard from "./HistorialCard";
import SortPrice from "../Search/SortPrice.jsx";
import View from "../Search/View";
import Paginado from "../Paginado/paginado";

export default function Historial() {

  const dispatch = useDispatch();
  const allPackages = useSelector((state) => state.allPackages);
  const allDestinations = useSelector((state) => state.allDestinations);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage, setPackagesPerPage] = useState(10);
  const indexOfLastPackages = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackages - packagesPerPage;
  const currentPackage = allPackages.slice(
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

  useEffect(() => {
		dispatch(getAllPackage());
	},[dispatch])

  return (
    <div className={s.container}>
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
            {currentPackage &&
              currentPackage?.map((p) => { console.log(p)
                return (
                  <div className={s.eachcard} key={p.id}>
                    <Link to={"/detail/" + p.id} key={p.id}>
                      <HistorialCard
                        name={p.name}
                        image={p.main_image}
                        description={p.description}
                        price={p.price}
                        start_date={p.start_date}
                        end_date={p.end_date}
                        key={p.id}
                      />
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
    </div>
  );
}
