import React, { useState } from "react";
import s from "./MyProfile.module.css";

export default function UserEdit() {
  return (
    <form className={s.form_container}>
      <div className={s.form_col1}>
        <input type="text" className={s.form_input} />
        <input type="text" className={s.form_input} />
        <input type="text" className={s.form_input} />
      </div>
      <div className={s.form_col2}>
        <img src="" alt="" className={s.form_img} />
        <input type="text" className={s.form_input} />
      </div>
      <div className={s.form_col3}>
        <input type="text" className={s.form_input} />
        <input type="text" className={s.form_input} />
      </div>
    </form>
  );
}
