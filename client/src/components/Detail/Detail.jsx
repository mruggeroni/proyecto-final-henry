import React, { useEffect, useState } from "react";
import s from "./Detail.module.css";
import { Link, useNavigate } from "react-router-dom";
import ControlledCarousel from "./Carousel"
import BotonFav from "./BotonFav"
import Card from "../CardGeneric/CardGeneric"

export default function Detail(props) {

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            // setLoading(true);
            // setTimeout(function () {
            //     setLoading(false);
            // }, 2000);
            setPrecio(price)
            setChechboxEstado(new Array(activities.length).fill(false))
        })();
    }, []);

    const [precio, setPrecio] = useState(0);
    const [checkboxEstado, setChechboxEstado] = useState([])

    const detallePaquete = {
        name: "Joyas del Mediterráneo – Grecia e Italia 8 días desde Atenas",
        description: "Lorem 1000  dolor sit, amet consectetur adipisicing elit. Numquam ullam, tenetur animi dicta excepturi temporibus iste reprehenderit esse a officiis asperiores, perferendis quam ex maiores maxime quos earum at! Non!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ullam, tenetur animi dicta excepturi temporibus iste reprehenderit esse a officiis asperiores, perferendis quam ex maiores maxime quos earum at! Non!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ullam, tenetur animi dicta excepturi temporibus iste reprehenderit esse a officiis asperiores, perferendis quam ex maiores maxime quos earum at! Non!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ullam, tenetur animi dicta excepturi temporibus iste reprehenderit esse a officiis asperiores, perferendis quam ex maiores maxime quos earum at! Non!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ullam, tenetur animi dicta excepturi temporibus iste reprehenderit esse a ",
        main_image: "https://images.unsplash.com/photo-1503152394-c571994fd383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        images: ["https://images.unsplash.com/photo-1504512485720-7d83a16ee930?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1808&q=80", "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1968&q=80", "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1808&q=80"],
        price: 2500,
        featured: false,
        start_date: "2022-07-20",
        end_date: "2022-07-21",
        available: false,
        on_sale: 0,
        region: "string (datatype.ENUM)",
        destinations: ["Alemania", "Holanda", "Japon"],
        seasson: "season (datatype.ENUM)",
        type: "string (datatype.ENUM)",
        activities: [{ name: "Actividad 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolore libero obcaecati ipsam cumque! Voluptatum incidunt voluptates necessitatibus eligendi, eos nulla ullam commodi excepturi minima dignissimos. Eius reiciendis ipsum odit!", image: "https://images.unsplash.com/photo-1558980394-0a06c4631733?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", price: 1, classification: "" }, { name: "Actividad 2", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolore libero obcaecati ipsam cumque! Voluptatum incidunt voluptates necessitatibus eligendi, eos nulla ullam commodi excepturi minima dignissimos. Eius reiciendis ipsum odit!", image: "https://images.unsplash.com/photo-1558980394-0a06c4631733?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", price: 2, classification: "" }, { name: "Actividad 3", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolore libero obcaecati ipsam cumque! Voluptatum incidunt voluptates necessitatibus eligendi, eos nulla ullam commodi excepturi minima dignissimos. Eius reiciendis ipsum odit!", image: "https://images.unsplash.com/photo-1558980394-0a06c4631733?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", price: 300, classification: "" }],
    }; //useSelector((state) => state.detallepaquete);

    const {
        name, description, main_image, images, price, featured, start_date, end_date,
        available, on_sale, region, destinations, seasson, type, activities
    } = detallePaquete;

    function handleCheckbox(posicion) {

        const checkboxSeleccionados = checkboxEstado.map((item, index) =>
            index === posicion ? !item : item
        );
        let totalPaquete = price;
        checkboxSeleccionados.forEach((i, index) => {
            if (i === true) totalPaquete += parseInt(activities[index].price)
        })
        setChechboxEstado(checkboxSeleccionados)
        setPrecio(totalPaquete)
    }

    const navigate = useNavigate()
    const handleBotonRegresar = () => {
        navigate(-1)
    }

    const handleBotonComprar = () => {

    }


    //para el desmonte del componente
    useEffect(() => {
        return () => {
            setPrecio(0)
            setChechboxEstado(new Array(activities.length).fill(false))
        };
    }, [setPrecio, setChechboxEstado]);

    return (
        <div style={{
            backgroundImage: `url(${main_image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}>
            <div className={s.body}>
                {/* si loading esta activo mostramos el spinner */}
                {loading ? (
                    <div className={s.contenedorSpinner}>
                        <div className={s.spinner}></div>
                    </div>
                ) : (
                    <div className={s.contenedor} >
                        <div className={s.contenedorBarraSuperior}>
                            <div onClick={() => handleBotonRegresar}>Return</div>
                            <BotonFav />
                        </div>
                        <div className={s.contenedorDetalles}>
                            <h1 >{name}</h1>
                            <ControlledCarousel name={name} main_image={main_image} images={images} />
                            <div className={s.resto} >
                                <h3 >
                                    {start_date} / {end_date}
                                </h3>
                                <h3>
                                    U$S {price}
                                </h3>
                                <h3>Destinos:{" "}
                                    {destinations?.map((i) => {
                                        return (
                                            <span key={i}>
                                                {i}{"  "}
                                            </span>
                                        );
                                    })}
                                </h3>
                            </div>

                            <div className={s.resto}>
                                <h3 className={s.description}>
                                    {description}
                                </h3>
                            </div >

                        </div>
                        <div className={s.contenedorActividades}>
                            {activities?.map((i, index) => {
                                return (
                                    <div className={s.actividad} key={i.name}>
                                        <div className={s.nombreActividad}>
                                            <div> {i.name} </div>
                                            <div>
                                                <input className={s.styledcheckbox} id={i.name} type="checkbox" value={i.name} onChange={() => handleCheckbox(index)} />
                                                <label htmlFor={i.name}>U$S {i.price}{"       "}</label>
                                            </div>
                                        </div>
                                        <div className={s.descriptionActividad}>
                                            <img src={i.image} alt="" />
                                            <div>{i.description}</div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className={s.total}>   <span>TOTAL U$S </span>{precio}</div>
                        </div>
                        <div className={s.contenedorBotonComprar}>
                            <button onClick={() => handleBotonComprar} className={s.botonComprar}>COMPRAR</button>
                        </div>
                        <div className={s.tituloDestacados}>Quizas tambien te interesen estos paquetes!!</div>
                        <div className={s.cards_container}>
                            {
                                // Para probar como se ven las cartas de descatados/ofertas
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <Card feature={{
                                        id: 1,
                                        img: main_image,
                                        title: 'Package Title (10 days)',
                                        description: 'Starting from $$$ per person'
                                    }} />
                                ))
                            }
                        </div>
                    </div>
                )}





            </div >
        </div>
    )
}



