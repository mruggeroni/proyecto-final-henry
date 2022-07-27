import React from "react";
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
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li
              className={currentPage === number ? s.selectedNum : s.number}
              key={number + "asdasddas"}
            >
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
