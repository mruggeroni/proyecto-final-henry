import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { MdBuild } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../../redux/actions";
import s from './UserOrders.module.css';

export default function UserOrders({ showUserOrders, setShowUserOrders }) {
  const dispatch = useDispatch();
  const user = useSelector( (state) => state.user );
  const orders = useSelector( (state) => state.orders );
  const ordersUser = orders.filter( (o) => o.userId === user.id );
  
    useEffect( () => {
        dispatch(getOrders());
    }, [])

  const validateStatus = (status) => {
    switch (status) {
        case 'cancel':
        return 'fl_table_false';
        case 'paid':
        return 'fl_table_true';
        case 'pending':
        return 'fl_table_pending';
    }
  }

  return (
    !showUserOrders ? null
    : <div className={s.orders_container}>
        <div className={s.title}>
          <h2 className={s.orders_title}>Lista de ordenes</h2>
        </div>
        <hr />
        { ordersUser?.length > 0 ? <div className={s.tbl_container}>
          <div className={s.table_wrapper}>
            <table className={s.fl_table}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                { ordersUser.map((o) => {
                    return (
                      <tr key={"orderList" + o.first_name}>
                        <td>{o.id}</td>
                        <td>{o.date}</td>
                        <td>$ {o.total_order}</td>
                        <td>
                            <div className={s[validateStatus(o.status)]}>{o.status}</div>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        : <span>No hay ordenes para mostrar</span> 
        }
    </div>
  );
}
