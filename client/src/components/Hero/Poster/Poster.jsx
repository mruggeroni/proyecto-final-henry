import React from "react";
import s from "./Poster.module.css";

export default function Poster() {
  return (
    <div className={s.container}>
      <div className={s.header_wrapper}>
        <header className={s.header}>
          <span className={s.header_subtitle}>Viaja con</span>
          <h1 className={s.header_title}>HENRY TRAVEL</h1>
        </header>

        {/* <header className={s.header_ribbon}>
          <div className={s.header_ribbon_inner}>
            <span className={s.header_title_small}>Lorem ipsum dolor sit amet</span>
          </div>
        </header> */}
      </div>
    </div>
  );
}
