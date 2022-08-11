import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUsers,
  getUserStatus,
  patchUserAdmin,
  patchUserRestore,
} from "../../redux/actions";
import Dashboard from "./Dashboard";
import { MdDelete } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import s from "./Table.module.css";

export default function ListUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const userStatus = useSelector((state) => state.userStatus);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(async () => {
    const token = await getAccessTokenSilently();
    if (!users.length) {
      dispatch(getUsers(token));
    }
  }, [dispatch]);

  const handleDelete = async (e, id, nombre) => {
    // console.log(e);
    // if (prompt(`Para borrar el paquete escribe '${nombre}'`) === nombre) {
    //   const token = await getAccessTokenSilently()
    //   dispatch(deleteUser(id, token))
    //   dispatch(getUsers(token));
    //   alert("El paquete se borro");
    // } else {
    //   alert("El paquete no se borro");
    // }
    try {
      Swal.fire({
        title: `Esta seguro que desea eliminar a ${nombre}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = await getAccessTokenSilently();
          await dispatch(deleteUser(id, token));
          await dispatch(getUsers(token));
        }
      });
    } catch (error) {
      Swal.fire(`Acesso denegado.`, ` `, "error");
    }
  };

  //  const handleDeleteUser = async (id) =>{
  //   const token = await getAccessTokenSilently()
  //       dispatch(deleteUser(id, token))
  //       dispatch(getUsers(token));
  //       Swal.fire(
  //         `Usuario: ${id} | ${nombre}.`,
  //         'Eliminado exitosamente!',
  //         'success'
  //       )
  //     }
  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      dispatch(getUsers(token));
    };

    fetchData().catch(console.error);
  }, [dispatch]);

  const handleClickAdmin = (e, id, isAdmin, first_name) => {
    e.preventDefault();
      Swal.fire({
        title: `${
          isAdmin
            ? "Esta seguro de eliminar como administrador "
            : "Esta seguro que desea hacer administrador"
        } a ${first_name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = await getAccessTokenSilently();
          let res = await dispatch(
            patchUserAdmin(id, { is_admin: !isAdmin }, token)
          );
          Swal.fire(
            `Usuario: ${id} | ${first_name}.`,
            `${
              res.data.is_admin
                ? "Ahora es administrador!"
                : "Dejo de ser administrador!"
            }`,
            "success"
          );
        }
      });

  };

  const handleClickStatus = async (e, id, name, status) => {
    e.preventDefault();
    if (status) {
        try {
        const token = await getAccessTokenSilently();
        let res = await dispatch(patchUserRestore(id, token));
        Swal.fire(`Se restauro el usuario ${name}`, ``, "success");
      } catch (error) {
        Swal.fire(`Acesso denegado.`, ` `, "error");
      }
      } else {
        Swal.fire(`El usuario ${name} ya esta activo`, ``, "error");
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
                  <th>Estatus</th>
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
                        <td
                          onClick={(e) =>
                            handleClickAdmin(e, u.id, u.is_admin, u.first_name)
                          }
                        >
                          {u.is_admin ? (
                            <div className={s.fl_table_true}>true</div>
                          ) : (
                            <div className={s.fl_table_false}>false</div>
                          )}
                        </td>
                        <td
                          onClick={(e) =>
                            handleClickStatus(
                              e,
                              u.id,
                              u.first_name,
                              u.destroyTime
                            )
                          }
                        >
                          {!u.destroyTime ? (
                            <div className={s.fl_table_true}>true</div>
                          ) : (
                            <div className={s.fl_table_false}>false</div>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={(e) => handleDelete(e, u.id, u.first_name)}
                            className={s.fl_table_btn}
                          >
                            <MdDelete />
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
