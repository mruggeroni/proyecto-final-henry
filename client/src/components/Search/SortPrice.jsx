import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordenar, orderByPrice } from "../../redux/actions/index";
import s from "./Select.module.css";

export default function SortPrice({ setOrder, setCurrentPage }) {
  const dispatch = useDispatch();
  const ordenado = useSelector((s) => s.ordenado);

  async function handlePriceSort(e) {
    e.preventDefault();
    setOrder(`Ordenado ${e.target.value}`);
    console.log(e.target.value);
    dispatch(ordenar(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div>
      <label>
        Ordenar por:
        <select className={s.select} onChange={(e) => handlePriceSort(e)}>
          <option
            selected={ordenado.tipo === "precio" ? true : false}
            value="precio"
          >
            Precio
          </option>
          <option
            selected={ordenado.tipo === "duracion" ? true : false}
            value="duracion"
          >
            Duración
          </option>
        </select>
      </label>
      <label>
        <select
          id="ascDes"
          className={s.select}
          onChange={(e) => handlePriceSort(e)}
        >
          <option
            selected={ordenado.forma === "asc" ? true : false}
            value="asc"
          >
            Menor a mayor
          </option>
          <option
            selected={ordenado.forma === "desc" ? true : false}
            value="desc"
          >
            Mayor a menor
          </option>
        </select>
      </label>
    </div>
  );
}

// import React, { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ordenar, orderByPrice } from "../../redux/actions/index";
// import s from "./Select.module.css";

// export default function SortPrice({ setOrder, setCurrentPage }) {
//   const dispatch = useDispatch();
//   const ordenado = useSelector((s) => s.ordenado);
//   const filtradoType = useSelector((s) => s.filtradoType);
//   const filtradoRegion = useSelector((s) => s.filtradoRegion);
//   const filtradoDestination = useSelector((s) => s.filtradoDestination);
//   const filtradoDateMin = useSelector((s) => s.filtradoDateMin);
//   const filtradoDateMax = useSelector((s) => s.filtradoDateMax);
//   const priceFilterMin = useSelector((s) => s.priceFilterMin);
//   const priceFilterMax = useSelector((s) => s.priceFilterMax);

//   function handleOrdenar(e) {
//     e.preventDefault();
//     let ruta = `/10000`;
//     if (e.target.value === "priceSort" || e.target.value === "durationSort") {
//       ruta += `?${e.target.value}=desc`;
//     }
//     if (e.target.value === "asc" || e.target.value === "desc") {
//       ruta += `?${ordenado.tipo}=${e.target.value}`;
//     }
//     if (filtradoType.length) ruta += `?type=${filtradoType}`;
//     if (filtradoRegion.length) ruta += `?type=${filtradoRegion}`;
//     if (filtradoDestination.length) ruta += `?type=${filtradoDestination}`;
//     if (filtradoDateMin.length) ruta += `?type=${filtradoDateMin}`;
//     if (filtradoDateMax.length) ruta += `?type=${filtradoDateMax}`;
//     if (priceFilterMin.length) ruta += `?type=${priceFilterMin}`;
//     if (priceFilterMax.length) ruta += `?type=${priceFilterMax}`;
//     console.log(ruta);
//     dispatch(ordenar(ruta));
//     setCurrentPage(1);
//   }

//   return (
//     <div>
//       <label>
//         Ordenar por:
//         <select className={s.select} onChange={(e) => handleOrdenar(e)}>
//           <option
//             selected={ordenado.tipo === "priceSort" ? true : false}
//             value="priceSort"
//           >
//             Precio
//           </option>
//           <option
//             selected={ordenado.tipo === "durationSort" ? true : false}
//             value="durationSort"
//           >
//             Duración
//           </option>
//         </select>
//       </label>
//       <label>
//         <select
//           id="ascDes"
//           className={s.select}
//           onChange={(e) => handleOrdenar(e)}
//         >
//           <option
//             selected={ordenado.forma === "asc" ? true : false}
//             value="asc"
//           >
//             Menor a mayor
//           </option>
//           <option
//             selected={ordenado.forma === "desc" ? true : false}
//             value="desc"
//           >
//             Mayor a menor
//           </option>
//         </select>
//       </label>
//     </div>
//   );
// }
