import React from "react";
import styles from "./Footer.module.css";
// import iconoFacebook from "../../assets/img/facebook.png";
// import iconoYoutube from "../../assets/img/youtube.png";
// import iconoInstagram from "../../assets/img/instagrammm.png";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <div className={styles.Footer_Container}>
      <div className={styles.Info_Container}>
        <div className={styles.div}>
          <h2>Sobre nosotros</h2>
          <a className={styles.a} href="http://localhost:3000/">
            <h3 className={styles.hh3}>¿Que es lalala?</h3>
          </a>
          <a className={styles.a} href="http://localhost:3000/">
            <h3 className={styles.hh3}>Terminos y condiciones generales</h3>
          </a>
        </div>
        <div className={styles.div}>
          <h2>Contactános</h2>
          <h3>Tel: 0810 345 0014 5217-6328</h3>
          <h3>Lunes a viernes de 9 a 18hs y sábados de 9 a 13hs.</h3>
          <h3>E-mail: info@lalala.com.ar // ventas@lalala.com.ar</h3>
        </div>
        <div className={styles.divSeguinos}>
          <h2>Seguínos!</h2>
          <br />
          <div className={styles.icons}>
            <a href="https://www.facebook.com/">
              <img src={"iconoFacebook"} alt="img" />
            </a>
            <a href="https://www.youtube.com/">
              <img src={"iconoYoutube"} alt="img" />
            </a>
            <a href="https://www.instagram.com/">
              <img src={"iconoInstagram"} alt="img" />
            </a>
          </div>
        </div>
      </div>
      <div>
        {/* <hr /> */}
        <br />
        <p>© Copyright. All rights reserved.</p>
      </div>
    </div>
  );
}
