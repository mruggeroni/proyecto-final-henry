import React from "react";
import { MdPlayArrow } from "react-icons/md";
import s from "./Paginado.module.css";

export default function Paginado({
  packagesPerPage,
  allPackages,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPackages / packagesPerPage); i++) {
    pageNumbers.push(i);
  }

  pageNumbers.push();

  return (
    <nav className={s.container}>
      <ul className={s.paginado}>
        {pageNumbers.length > 1 && (
          <button
            key="prev"
            className={s.number}
            onClick={() => {
              if (currentPage > 1) {
                paginado(currentPage - 1);
              }
            }}
          >
            &lt;
          </button>
        )}
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li
              onClick={() => paginado(number)}
              className={currentPage === number ? s.selectedNum : s.number}
              key={number + "asdasddas"}
            >
              {number}
            </li>
          ))}
        {pageNumbers.length > 1 && (
          <button
            key="next"
            className={s.number}
            onClick={() => {
              if (currentPage < pageNumbers.length) {
                paginado(currentPage + 1);
              }
            }}
          >
            &gt;
          </button>
        )}
      </ul>
    </nav>
  );
}
