import React from "react";
import Footer from "../Footer/Footer";
import s from './Information.module.css';

export default function Privacy() {
    const nameCompany = 'Travel'
    return (
        <div className={s.information_container}>
            <div className={s.information_content}>
                <h2 className={s.information_title}>Política de Privacidad</h2>
                <p className={s.information_text}>
                    El acceso a determinados servicios que se ofrecen en el Sitio puede requerir el ingreso de ciertos datos personales a saber: dirección de e-mail, nombre, apellido, domicilio completo, tipo y número de documento y otros datos opcionales, o cualquier otra información que permita individualizarlo. En todos los casos que usted brinde información personal, y de acuerdo a la legislación vigente, usted declara que la información brindada es cierta.
                    <br />
                    Los datos que usted ingrese al Sitio se utilizarán para: envío de información de Productos, Servicios y Promociones de la empresa, requerimiento de reserva de pasajes promociónales exclusivas del sitio, reserva y venta de pasajes, inscripción al programa de pasajeros frecuentes de  <b>{nameCompany}</b>,  obtener estadísticas, uso indistinto de marketing.
                    <br />
                    El ingreso de datos personales al Sitio por parte del usuario es voluntario, sin embargo  <b>{nameCompany}</b>. manifiesta que su ingreso facilitará el uso de los servicios que ofrece y la relación con el usuario. En los casos en que usted nos brinde su información personal, usted acepta y presta su consentimiento libre, expreso e informado para que dicha información personal sea utilizada en su propio beneficio optimizando la calidad del servicio que  le ofrecemos a fin de mantenerlo informado de posibles cambios, y autoriza a que la misma sea tratada, almacenada, recopilada en la base de datos de la compañía.
                    <br />
                    <b>{nameCompany}</b>. garantiza a los usuarios que ingresen sus datos en el Sitio, que los mismos serán encriptados para preservar la seguridad, integridad y confidencialidad de los datos considerados como personales. <b>{nameCompany}</b>. trata de evitar su adulteración, pérdida, consulta o tratamiento no autorizado, que permitan detectar desviaciones, intencionales o no, de información, ya sea que los riesgos provengan de la acción humana o del medio técnico utilizado.  Para ello, es que le notificamos de nuestras prácticas de privacidad, y le explicamos las alternativas que tiene sobre la manera que su información es recopilada y utilizada.
                    <br />
                    El sistema de encriptado implica que los datos solo podrán ser interpretados por <b>{nameCompany}</b>. y  ningún intermediario  tendrá acceso a la información.
                    <br />
                    El usuario podrá acceder a sus datos de carácter personal, rectificarlos, cancelarlos u oponerse a su tratamiento, mediante notificación al responsable de la base de datos (e-commerce@aerolineas.com.ar) sin cargo alguno.
                    <br />
                    <b>{nameCompany}</b>. no  cederá  esta información con terceros. No obstante <b>{nameCompany}</b>. podrá enviar a sus usuarios ofertas promociónales o comunicados especiales, donde el usuario siempre tendrá la opción de solicitar dejar de recibirlos.
                    <br />
                    El usuario responderá, en cualquier caso, de la veracidad de los datos facilitados, reservándose {nameCompany}. el derecho de excluir a todo usuario que haya facilitado datos falsos, sin perjuicio de iniciar acciones legales.
                    <br />
                    <b>{nameCompany}</b>. se reserva el derecho de brindar información a organismos de control de fronteras, autoridades de inmigración, aduanas de cualquier país y/o autoridades judiciales que así lo requieran y cuando medien razones fundadas relativas a la seguridad pública, la defensa nacional o la salud pública.
                </p>
            </div>
            
            <Footer />
        </div>
    )
}