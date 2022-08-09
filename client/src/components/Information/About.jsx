import React from "react";
import s from "./Information.module.css";

export default function About() {
  return (
    <div className={s.information_container}>
      <div className={s.information_content}>
      <h2 className={s.information_title}>About us</h2>
          <div className={s.about_image_container}></div>
      </div>
    </div>
  );
}
