import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllPackage, getCategories } from "../../redux/actions";
import { AiFillEdit } from 'react-icons/ai';
import Dashboard from "./Dashboard";
import s from "./Table.module.css";
import ModalCategoriaModificar from "./ModalCategoriaModificar";

export default function ListPackages() {
  const dispatch = useDispatch();
  const allPackages = useSelector((state) => state.allPackages);
  const categories = useSelector((state) => state.categories);

  const [showModificar, setShowModificar] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories(1000));
    }
  }, [dispatch]);

  const handleModificar = (id) => {
    setShowModificar(true);
    setId(id);
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
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {categories.length &&
                  categories.map((p) => {
                    return (
                      <tr key={"packagesList" + p.name}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.image}</td>
                        <td>
                          <button
                            className={s.fl_table_btn}
                            onClick={(e) => handleModificar(p.id)}
                          >
                            <AiFillEdit />
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
      <ModalCategoriaModificar
        showModificar={showModificar}
        setShowModificar={setShowModificar}
        id={id}
      />
    </div>
  );
}

// import { getAllPackage, getCategories } from "../../redux/actions";
// import ModalCategoriaModificar from "./ModalCategoriaModificar";

// export default function ListCategories() {
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.categories);

//   const [showModificar, setShowModificar] = useState(false);
//   const [id, setId] = useState();

//   useEffect(() => {
//     if (!categories.length) {
//       dispatch(getCategories(1000));
//     }
//   }, [dispatch]);

//   const handleModificar = (id) => {
//     setShowModificar(true);
//     setId(id);
//   };

//   return (
//     <div>
//       <Dashboard />
//       <div className={s.dashboard_container}>
//         <div className={s.tbl_container}>
//           <div className={s.table_wrapper}>
//             <table className={s.fl_table}>
//               <thead>
//                 <tr>
//                   <th>Id</th>
//                   <th>Nombre</th>
//                   <th>Imagen</th>
//                   <th>Modificar</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categories.length &&
//                   categories.map((p) => {
//                     return (
//                       <tr key={"categoriesList" + p.id}>
//                         <td>{p.id}</td>
//                         <td>{p.name}</td>
//                         <td>{p.image}</td>
//                         <td>
//                           {/* <NavLink
//                             to={`/dashboard/modifyPackage/${p.id}`}
//                             className={s.fl_table_btn}
//                           >
//                             Editar
//                           </NavLink> */}
//                           <button
//                             className={s.fl_table_btn}
//                             onClick={handleModificar(p.id)}
//                           >
//                             Modificar
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       {/* <ModalCategoriaModificar
//         showModificar={showModificar}
//         setShowModificar={setShowModificar}
//         id={id}
//       /> */}
//     </div>
//   );
// }
