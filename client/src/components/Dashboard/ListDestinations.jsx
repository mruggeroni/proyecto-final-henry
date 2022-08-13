import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllActivities, getAllDestinations } from "../../redux/actions";
import { AiFillEdit } from "react-icons/ai";
import Dashboard from "./Dashboard";
import s from "./Table.module.css";
import ModalModificarDestinos from "./ModalModificarDestinos";

export default function ListDestinations() {
  const dispatch = useDispatch();
  const destinations = useSelector((state) => state.destinations);

  useEffect(() => {
    dispatch(getAllDestinations());
  }, [dispatch]);

  const [showDestinos, setShowDestinos] = useState(false);
  const [destino, setDestino] = useState({});

  const handleShow = (e, id) => {
    e.preventDefault();
    setDestino(destinations.filter((e) => e.id === id));
    setShowDestinos(true);
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
                  <th>Imagen</th>
                  <th>Region</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {destinations.length &&
                  destinations?.map((a) => {
                    return (
                      <tr key={"destinationList" + a.name}>
                        <td>{a.id}</td>
                        <td>{a.name}</td>
                        <td>{a.image}</td>
                        <td>{a.region}</td>
                        <td
                          className={s.fl_table_btn}
                          onClick={(e) => handleShow(e, a.id)}
                        >
                          <AiFillEdit />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalModificarDestinos
        showDestinos={showDestinos}
        setShowDestinos={setShowDestinos}
        destino={destino}
      />
    </div>
  );
}
