import React from "react";
import Footer from "../Footer/Footer";
import s from "./Information.module.css";

export default function Contact() {
  return (
    <div className={s.information_container}>
      <div className={s.information_content}>
        <h2 className={s.information_title}>Contacto</h2>
        <p className={s.information_text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione sed
          ea, aut similique maiores quo.
        </p>
        <h4>Llamanos</h4>
        <hr />
        <div className={s.callus}>
          <div className={s.callus_item}>
            <div className={s.callus_item_left}>
              <h6>Reservas Individuales</h6>
              <span>Mon-Sun 7am-2am (EST)</span>
            </div>
            <p>866-562-7625</p>
          </div>
          <div className={s.callus_item}>
            <div className={s.callus_item_left}>
              <h6>Ayuda en el día del Embarque</h6>
              <span>24/7</span>
            </div>
            <p>800-256-6649</p>
          </div>
          <div className={s.callus_item}>
            <div className={s.callus_item_left}>
              <h6>Asistencia Online</h6>
              <span>Mon-Fri 8am-11pm EST / Sat-Sun 9am-6pm EST</span>
            </div>
            <p>800-398-9819</p>
          </div>
        </div>
        <hr />
        <h4>Envianos un mensaje</h4>
        <form className={s.form}>
          <div>
            <input
              type="text"
              className={s.input_container}
              placeholder="Nombre"
            />
            <input
              type="text"
              className={s.input_container}
              placeholder="Apellido"
            />
            <input
              type="text"
              className={s.input_container}
              placeholder="Email"
            />
            <input
              type="text"
              className={s.input_container}
              placeholder="Telefono"
            />
          </div>
          <textarea
            cols="51"
            rows="10"
            className={s.textarea_container}
            placeholder="Por favor describe el asunto"
          ></textarea>
        </form>
        <button className={s.form_btn}>Enviar</button>
      </div>

      <Footer />
    </div>
  );
}
