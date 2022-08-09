import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa'
import s from "./Footer.module.css";
import BacktoTop from "../BacktoTop/BacktoTop";
// import iconoFacebook from "../../assets/img/facebook.png";
// import iconoYoutube from "../../assets/img/youtube.png";
// import iconoInstagram from "../../assets/img/instagrammm.png";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <div className={s.footer_container}>
      <div className={s.backToTop}>
        <div className={s.emptyDiv4Styles}></div>
        <div className={s.footer_social}>
          <a href="/" className={s.footer_social_icon}>
            <FaFacebookF />
          </a>
          <a href="/" className={s.footer_social_icon}>
            <FaTwitter />
          </a>
          <a href="/" className={s.footer_social_icon}>
            <FaYoutube />
          </a>
          <a href="/" className={s.footer_social_icon}>
            <FaInstagram />
          </a>
          <a href="/" className={s.footer_social_icon}>
            <FaLinkedinIn />
          </a>
        </div>
        <div className={s.topButton}>
          
      </div>
        </div>
      <div className={s.footer_links}>
        <NavLink to='/about' className={s.footer_link}>Nosotros</NavLink> 
        |<NavLink to='/privacy' className={s.footer_link}>Politica de privacidad</NavLink> 
        |<NavLink to='/terms-and-conditions' className={s.footer_link}>Terminos y condiciones</NavLink> 
        |<NavLink to='/faq' className={s.footer_link}>Preguntas frecuentes</NavLink> 
      </div>
      <hr className={s.footer_line} />
      <div className={s.footer_copyright}>
        <p>© Copyright. All rights reserved.</p>
      </div>
    </div>
  );
}

/* 

<div className={s.div}>
          <h2>Contactános</h2>
          <h3>Tel: 0810 345 0014 5217-6328</h3>
          <h3>Lunes a viernes de 9 a 18hs y sábados de 9 a 13hs.</h3>
          <h3>E-mail: info@lalala.com.ar // ventas@lalala.com.ar</h3>
        </div>
        
        
        */