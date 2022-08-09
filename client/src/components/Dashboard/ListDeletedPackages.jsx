import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDeletedPackages, patchRestorePackages } from "../../redux/actions";
import Dashboard from "./Dashboard";
import { FaTrashRestoreAlt } from 'react-icons/fa';
import s from "./Table.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2';
import Loading from "../Loading/Loading";

export default function ListDeletedPackages() {
  const dispatch = useDispatch();
  const deletedPackages = useSelector((state) => state.deletedPackages );
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently} = useAuth0();
  
  useEffect( async () => {
      setLoading(true);
      const token = await getAccessTokenSilently();
      await dispatch(getDeletedPackages(token));
      setLoading(false);
  }, [dispatch]);

  const handleRestorePackage = async (id, name) => {
    Swal.fire({
      title: `Esta seguro que desea restablecer el paquete ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then( async (result) => {
      if (result.isConfirmed) {
        try{
          const token = await getAccessTokenSilently();
          await dispatch(patchRestorePackages(id, token))
          Swal.fire(
            `Paquete: ${id} | ${name}.`,
            'Fue restaurado exitosamente!',
            'success'
          )
        } catch(error){
          Swal.fire(
            `Paquete: ${id} | ${name}.`,
            `${error.message}`,
            'error'
          )
        }
      }
    })
  }

  return (
    loading ? <Loading />
    : <div>
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
                  <th>Promoción</th>
                  <th>Destacado</th>
                  <th>Disponible</th>
                  <th>Estatus</th>
                  <th>Restaurar</th>
                </tr>
              </thead>
              <tbody>
                {deletedPackages?.length > 0 ?
                  deletedPackages?.map((p) => {
                    return (
                      <tr key={"packagesListDeleted" + p.name}>
                        <td>{p.id}</td>
                        <td>
                          <Link to={`/detail/${p.id}`} className={s.fl_table_link} >
                            {p.name}
                          </Link>
                        </td>
                        <td>${p.price}</td>
                        <td>%{p.on_sale}</td>
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
                        <td>{ p.destroyTime }</td>
                        <td>
                          <button onClick={ () => handleRestorePackage(p.id, p.name) } className={s.fl_table_btn} >
                            <FaTrashRestoreAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : <span>No hay paquetes eliminados</span> }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
