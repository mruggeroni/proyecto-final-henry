import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllActivities } from "../../redux/actions";
import Dashboard from "./Dashboard";
import s from "./Table.module.css";

export default function ListActivities() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    if (!activities.length) {
      dispatch(getAllActivities());
    }
  }, [dispatch]);

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
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Categoria</th>
                  <th>Editar/Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {activities.length &&
                  activities.map((a) => {
                    return (
                      <tr key={"activitiesList" + a.name}>
                        <td>{a.id}</td>
                        <td>{a.name}</td>
                        <td>{a.description}</td>
                        <td>${a.price}</td>
                        <td>{a.classification.name}</td>
                        <td>
                          <NavLink
                            to={`/dashboard/modifyActivities/${a.id}`}
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
