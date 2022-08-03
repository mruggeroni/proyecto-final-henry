import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/actions";
import Dashboard from "./Dashboard";
import s from "./Table.module.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function ListUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const { getAccessTokenSilently} = useAuth0();
 
  useEffect(async() => {
     const token = await getAccessTokenSilently()
      if(!users.length) {
    
          dispatch(getUsers(token))
      }
  }, [dispatch]);


  const handleDelete = async (e, id, nombre) => {
    // console.log(e);
    if (prompt(`Para borrar el paquete escribe '${nombre}'`) === nombre) {
      const token = await getAccessTokenSilently()
      dispatch(deleteUser(id, token))
      dispatch(getUsers(token));
      alert("El paquete se borro");
    } else {
      alert("El paquete no se borro");
    }
  };

  
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
                  <th>Fecha de creación</th>
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
                        <td>{u.created_date}</td>
                        <td>
                          {u.is_admin ? (
                            <div className={s.fl_table_true}>true</div>
                          ) : (
                            <div className={s.fl_table_false}>false</div>
                          )}
                        </td>
                        <td>
                          <button onClick={(e) => handleDelete(e, u.id, u.first_name) } className={s.fl_table_btn}>Delete</button>
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
