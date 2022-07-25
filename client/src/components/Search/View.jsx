import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./Select.module.css";

export default function ViewButton({
  currentPackage,
  allPackages,
  indexOfFirstPackage,
  setPackagesPerPage,
  setCurrentPage,
}) {
  const dispatch = useDispatch();

  function handleView(e) {
    e.preventDefault();
    setCurrentPage(1);

    const currentPackage = allPackages.slice(
      indexOfFirstPackage,
      parseInt(e.target.value)
    );

    setPackagesPerPage(parseInt(e.target.value));
  }

  return (
    <select className={s.select} onChange={(e) => handleView(e)}>
      <option value="10">View 10</option>
      <option value="25">View 25</option>
      <option value="50">View 50</option>
    </select>
  );
}
