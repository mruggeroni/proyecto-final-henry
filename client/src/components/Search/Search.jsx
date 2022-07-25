import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card/Card.jsx";
import View from "./View.jsx";
import SortPrice from "./SortPrice.jsx";
import { filterPackagesByDestination } from "./../../redux/actions/index";
import Paginado from "../Paginado/paginado";
import s from "./Search.module.css";
import style from "./Select.module.css";

export default function FilteredSearch() {
  const dispatch = useDispatch();
  const allPackages = useSelector((state) =>
    state.filteredPackages.length ? state.filteredPackages : state.allPackages
  );
  const allDestinations = useSelector((state) => state.destinations);
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
  };

  // useEffect(() => {
  //   dispatch(filterPackagesByDestination());
  // }, [dispatch]);

  return (
    <div className={s.container}>
      <div className={s.view}>
        <SortPrice setOrder={setOrder} />
        <div>
          <label>Search Package from: </label>
          <select
            id="searchDestinations"
            className={style.select}
            onChange={(e) => handleChange(e)}
          >
            <option value="all">All destinations</option>
            {allDestinations?.map((el) => (
              <option key={el.name} value={el.name}>
                {el.name}
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
      <div className={s.cards}>
        {currentPackage &&
          currentPackage?.map((p) => {
            return (
              <div className={s.eachcard} key={p.id}>
                <Link to={"/detail/" + p.id} key={p.id}>
                  <Card
                    name={p.name}
                    image={p.main_image}
                    description={p.description}
                    price={p.price}
                    key={p.id}
                  />
                </Link>
              </div>
            );
          })}
      </div>
      <Paginado
        packagesPerPage={packagesPerPage}
        allPackages={allPackages.length}
        paginado={paginado}
        currentPage={currentPage}
      />
    </div>
  );
}
