import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getAllActivities,
  getAllDestinations,
  getAllPackage,
  getDestinationsWithPackages,
  getOnSale,
  borrarPaquete,
} from "../../redux/actions";
import Dashboard from "./Dashboard";
import s from "./ListPackages.module.css";

export default function ListPackages({
  showListPackages,
  setShowListPackages,
}) {
  const allPackages = useSelector((state) => state.allPackages);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm("seguro que desea eliminar")) {
      dispatch(borrarPaquete(id));
      dispatch(getAllPackage(1000));
      alert("Perro eliminado guau guau!!");
    } else {
      alert("Para que apretas si no vas a borrar");
    }
  };

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
      await dispatch(getAllPackage(1000));
      //       await dispatch(getAllDestinations());
      //       await dispatch(getOnSale());
      //       await dispatch(getAllActivities());
      //       await dispatch(getDestinationsWithPackages());
    };
  }, [dispatch]);

  return (
    // !showListPackages ? null
    // :
    <div>
      <Dashboard />
      <div className={s.dashboard_container}>
        <div className={s.tbl_container}>
          <div class={s.table_wrapper}>
            <table class={s.fl_table}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Destacado</th>
                  <th>Disponible</th>
                  <th>Promoción</th>
                  <th>Editar/Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {allPackages.length &&
                  allPackages.map((p) => {
                    return (
                      <tr>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>${p.price}</td>
                        <td>{p.feature ? "true" : "false"}</td>
                        <td>{p.available ? "true" : "false"}</td>
                        <td>%{p.on_sale}</td>
                        <td>
                          <NavLink to={`/dashboard/modifyPackage/${p.id}`}>
                            Editar
                          </NavLink>
                          <button onClick={(e) => handleDelete(e, p.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
