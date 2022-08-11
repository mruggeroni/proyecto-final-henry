import React, { useEffect, useState } from "react";
import { TbListDetails } from "react-icons/tb";
import { MdBuild } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { cleanOrderDetail, getOrders } from "../../../../redux/actions";
import s from "./UserOrders.module.css";

export default function UserOrders({
  handleClose,
  showUserOrders,
  setShowUserOrders,
  getOrderDetail,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const ordersUser = orders.filter((o) => o.userId === user.id);

  useEffect(async () => {
    await dispatch(getOrders());
    // await dispatch(cleanOrderDetail());
  }, []);

  const handleClick = async (e, id) => {
    e.preventDefault();
    await dispatch(getOrderDetail(id));
    navigate(`/historial/${id}`);
  }

  const validateStatus = (status) => {
    switch (status) {
      case "cancel":
        return "fl_table_false";
      case "paid":
        return "fl_table_true";
      case "pending":
        return "fl_table_pending";
    }
  };

  return !showUserOrders ? null : (
    <div className={s.orders_container}>
      <div className={s.title}>
        <h2 className={s.orders_title}>Lista de ordenes</h2>
      </div>
      <hr />
      {ordersUser?.length > 0 ? (
        <div className={s.tbl_container}>
          <div className={s.table_wrapper}>
            <table className={s.fl_table}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estatus</th>
                  <th>Detalle</th>
                </tr>
              </thead>
              <tbody>
                {ordersUser.map((o) => {
                  return (
                    <tr key={"orderList" + o.first_name}>
                      <td>{o.id}</td>
                      <td>{o.date}</td>
                      <td>$ {o.total_order}</td>
                      <td>
                        <div className={s[validateStatus(o.status)]}>
                          {o.status}
                        </div>
                      </td>
                      <td onClick={handleClose}>
                        <div
                          onClick={ (e) => handleClick(e, o.id) }
                          className={s.fl_table_btn}
                        >
                          <TbListDetails />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <span>No hay ordenes para mostrar</span>
      )}
    </div>
  );
}
