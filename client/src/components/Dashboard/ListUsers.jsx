import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUsers } from "../../redux/actions";
import Dashboard from "./Dashboard";
import s from './Table.module.css';
import { useAuth0 } from "@auth0/auth0-react";



export default  function ListUsers() {
    const dispatch = useDispatch();
    const users = useSelector( (state) => state.users )
    const { getAccessTokenSilently} = useAuth0();
    useEffect( async () => {
      
        const token = await getAccessTokenSilently()
        if(!users.length) {
            
            dispatch(getUsers(token))
        }
    }, [dispatch]);

    return (
        <div>
            <Dashboard />
            <div className={s.dashboard_container}>
            <div className={s.tbl_container}>
                <div class={s.table_wrapper}>
                    <table class={s.fl_table}>
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
                            {
                                users.length && users.map( (u) => {
                                    return  <tr>
                                        <td>{u.id}</td>
                                        <td>{u.first_name}</td>
                                        <td>{u.last_name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.phone}</td>
                                        <td>{u.city}</td>
                                        <td>{u.state}</td>
                                        <td>{u.postal_code}</td>
                                        <td>
                                            {u.is_admin ? <div className={s.fl_table_true}>true</div> : <div className={s.fl_table_false}>false</div>}
                                        </td>
                                        <td>
                                            <button className={s.fl_table_btn}>Delete</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>)
}