import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllPackage } from "../../redux/actions";
import Dashboard from "./Dashboard";
import s from "./Table.module.css";

export default function ListPackages() {
  const dispatch = useDispatch();
  const allPackages = useSelector((state) => state.allPackages);

  useEffect(() => {
    if (!allPackages.length) {
      dispatch(getAllPackage(1000));
    }
  }, [dispatch]);

  const handleDelete = () => {
    
  }

  return (
    <div>
      <Dashboard />
      <div className={s.dashboard_container}>
        <div className={s.tbl_container}>
          <div className={s.table_wrapper}>
            <table className={s.fl_table}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha de fin</th>
                  <th>Temporada</th>
                  <th>Tipo</th>
                  <th>Destinos</th>
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
                      <tr key={"packagesList" + p.name}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>${p.price}</td>
                        <td>{p.start_date}</td>
                        <td>{p.end_date}</td>
                        <td>{p.seasson}</td>
                        <td>{p.type}</td>
                        <td>{p.destinations.map( (d) => p.destinations.length > 1 ? `${d.name} | ` : d.name)}</td>
                        <td>
                          {p.featured ? (
                            <div className={s.fl_table_true}>true</div>
                          ) : (
                            <div className={s.fl_table_false}>false</div>
                          )}
                        </td>
                        <td>
                          {p.available ? (
                            <div className={s.fl_table_true}>true</div>
                          ) : (
                            <div className={s.fl_table_false}>false</div>
                          )}
                        </td>
                        <td>{p.on_sale ? `%${p.on_sale}` : p.on_sale }</td>
                        <td>
                          <NavLink
                            to={`/dashboard/modifyPackage/${p.id}`}
                            className={s.fl_table_btn}
                          >
                            Editar
                          </NavLink>
                          <button className={s.fl_table_btn}>Delete</button>
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
