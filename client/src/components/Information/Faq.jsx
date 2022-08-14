import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import s from "./Information.module.css";
import Accordion from "react-bootstrap/Accordion";

export default function Faq() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const nameCompany = "HenryTravel";
  const faq = [
    "¿Cómo cambiar mi reserva?",
    "¿Cómo cancelar mi reserva?",
    "¿Cómo dejar mi ticket abierto?",
    "Me arrepentí de mi compra, ¿Qué hago?",
    `¿Cómo me contacto con ${nameCompany}?`,
    "¿Cómo verificar el estado de mi solicitud?",
    "¿Cómo puedo enterarme de las mejores ofertas?",
    "No he recibido la confirmación de reserva, ¿qué hago?",
    "¿Cómo veo o descargo mi factura?",
    "Estoy en destino y necesito ayuda, ¿Cómo me contacto?",
    "¿Qué tengo que saber antes de comprar con mi tarjeta de crédito?",
    "¿Qué formas de pago tengo disponibles?",
  ];

  return (
    <div className={s.information_container}>
      <div className={s.information_content}>
        <h2 className={s.information_title}>Preguntas frecuentes</h2>
        <Accordion defaultActiveKey="0">
          {faq.map((el, i) => {
            const numberRandom = Math.floor(Math.random() * 1000);
            return (
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{el}</Accordion.Header>
                <Accordion.Body>
                  {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".slice(0, numberRandom)
                }
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}
