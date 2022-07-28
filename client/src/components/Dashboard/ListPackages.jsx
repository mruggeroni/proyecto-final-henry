import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import s from './ListPackages.module.css';

export default function ListPackages({ showListPackages, setShowListPackages }) {

    const allPackages = useSelector( (state) => state.allPackages )

    return (
        !showListPackages ? null
        :
    <div className={s.tbl_container}>
        <div class={s.table_wrapper}>
            <table class={s.fl_table}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Destacado</th>
                    <th>Disponible</th>
                    <th>Promoción</th>
                    <th>Editar/Eliminar</th>
                </tr>
            </thead>
                <tbody>
                    {
                        allPackages.length && allPackages.map( (p) => {
                            return  <tr>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>${p.price}</td>
                                <td>{p.feature ? 'true' : 'false'}</td>
                                <td>{p.available ? 'true' : 'false'}</td>
                                <td>%{p.on_sale}</td>
                                <td>
                                    <NavLink to={`/dashboard/modifyPackage/${p.id}`} >Editar</NavLink>
                                    <button >Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>)
}