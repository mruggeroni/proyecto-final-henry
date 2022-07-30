import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions";
import Dashboard from "./Dashboard";
import s from "./Table.module.css";

export default function ListUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers(1000));
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
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Ciudad</th>
                  <th>Estado</th>
                  <th>Codigo postal</th>
                  <th>Admin</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {users.length &&
                  users.map((u) => {
                    return (
                      <tr key={"usersList" + u.first_name}>
                        <td>{u.id}</td>
                        <td>{u.first_name}</td>
                        <td>{u.last_name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>{u.city}</td>
                        <td>{u.state}</td>
                        <td>{u.postal_code}</td>
                        <td>
                          {u.is_admin ? (
                            <div className={s.fl_table_true}>true</div>
                          ) : (
                            <div className={s.fl_table_false}>false</div>
                          )}
                        </td>
                        <td>
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
