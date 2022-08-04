import React from "react";
import Footer from "../Footer/Footer";
import s from "./Information.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function Faq() {
  const nameCompany = "Travel";
  return (
    <div className={s.information_container}>
      <div className={s.information_content}>
        <h2 className={s.information_title}>Preguntas frecuentes</h2>
        <Tabs
          defaultActiveKey="p1"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="p1" title="¿Cómo cambiar mi reserva?">
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit! Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Dolorum assumenda ut, quae iure laborum facilis
              iusto hic minus perferendis itaque autem unde asperiores totam
              error quas vero blanditiis ullam suscipit!
            </p>
          </Tab>
          <Tab eventKey="p2" title="¿Cómo cancelar mi reserva?">
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit!
            </p>
          </Tab>
          <Tab eventKey="p3" title="¿Cómo dejar mi ticket abierto?">
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit! Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Dolorum assumenda ut, quae iure laborum facilis
              iusto hic minus perferendis itaque autem unde asperiores totam
              error quas vero blanditiis ullam suscipit!s
            </p>
          </Tab>
          <Tab eventKey="p4" title="Me arrepentí de mi compra, ¿Qué hago?">
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit!
            </p>
          </Tab>
        </Tabs>
        <br></br>
        <br></br>
        <Tabs
          defaultActiveKey="p5"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="p5" title={`¿Cómo me contacto con ${nameCompany}?`}>
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit! Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Dolorum assumenda ut, quae iure laborum facilis
              iusto hic minus perferendis itaque autem unde asperiores totam
              error quas vero blanditiis ullam suscipit!
            </p>
          </Tab>
          <Tab eventKey="p6" title="¿Cómo verificar el estado de mi solicitud?">
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit!
            </p>
          </Tab>
          <Tab
            eventKey="p7"
            title="¿Cómo puedo enterarme de las mejores ofertas?"
          >
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit!
            </p>
          </Tab>
          <Tab
            eventKey="p8"
            title="No he recibido la confirmación de reserva, ¿qué hago?"
          >
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit! Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Dolorum assumenda ut, quae iure laborum facilis
              iusto hic minus perferendis itaque autem unde asperiores totam
              error quas vero blanditiis ullam suscipit!
            </p>
          </Tab>
        </Tabs>
        <br></br>
        <br></br>
        <Tabs
          defaultActiveKey="p10"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="p10" title={`¿Cómo veo o descargo mi factura?`}>
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit! Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Dolorum assumenda ut, quae iure laborum facilis
              iusto hic minus perferendis itaque autem unde asperiores totam
              error quas vero blanditiis ullam suscipit!
            </p>
          </Tab>
          <Tab eventKey="p11" title="Estoy en destino y necesito ayuda, ¿Cómo me contacto?">
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit!
            </p>
          </Tab>
          <Tab
            eventKey="p12"
            title="¿Qué tengo que saber antes de comprar con mi tarjeta de crédito?"
          >
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit!
            </p>
          </Tab>
          <Tab
            eventKey="p13"
            title="¿Qué formas de pago tengo disponibles?"
          >
            <p className={s.information_text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              assumenda ut, quae iure laborum facilis iusto hic minus
              perferendis itaque autem unde asperiores totam error quas vero
              blanditiis ullam suscipit! Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Dolorum assumenda ut, quae iure laborum facilis
              iusto hic minus perferendis itaque autem unde asperiores totam
              error quas vero blanditiis ullam suscipit!
            </p>
          </Tab>
        </Tabs>

      </div>
      <Footer />
    </div>
  );
}
