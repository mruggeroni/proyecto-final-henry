import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getOrders, getUsers } from "../../redux/actions";
import Dashboard from "./Dashboard";
import { MdDelete } from 'react-icons/md';
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2'
import s from "./Table.module.css";

export default function ListOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const { getAccessTokenSilently} = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently()
      dispatch(getUsers(token))
      dispatch(getOrders());
    }
  
    fetchData().catch(console.error);
  }, [dispatch])

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
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Usuario</th>
                  <th>Nombre completo</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {orders.length &&
                  orders.map((o) => {
                    return (
                      <tr key={"orderList" + o.first_name}>
                        <td>{o.id}</td>
                        <td>{o.date}</td>
                        <td>$ {o.total_order}</td>
                        <td>{o.user.id}</td>
                        <td>{o.user.first_name} {o.user.last_name}</td>
                        <td>
                            {o.status === 'paid' 
                            ? <div className={s.fl_table_true}>Completo</div> 
                            : <div className={s.fl_table_false}>Pendiente</div>
                            }
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
