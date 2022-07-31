import Accordion from 'react-bootstrap/Accordion';
import s from './CheckoutPassengers.module.css';
import React, { useState } from 'react';

export default function PassengerInfo({ cart }) {
    const [input, setInput] = useState({
		name: '',
		middleName: '',
		lastName: '',
		numberDni: '',
		gender: '',
        birthdate: '',
	});

    function handlePassenger(e){
        e.preventDefault();
        setInput({
            [e.target.name]: e.target.value
        }) 
        console.log(input)
        document.getElementById('titleP').innerText += input.name + input.lastName; 
    }

    function handleSelect(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    // cart [{
    //     actividades: [{}, {}],
    //     cantidad: '', => PARSE INT
    //     paquete: {},
    //     total: 0
    // }, {}, {}]


  return (
    cart.length === 1 ?
    <Accordion defaultActiveKey={0}>
        <h2>{cart[0].paquete.name}</h2>
        {   
        new Array(cart[0].cantidad).fill(true).map( (el, i) => {
            return <Accordion.Item eventKey={i}>
                <Accordion.Header onClick={(e) => handlePassenger(e)} id='titleP'>Pasajero #{i + 1}: </Accordion.Header>
                <Accordion.Body>
                    <div className={s.firstRow}>
                        <div>
                            <label className={s.profile_label}>Nombre</label>
                            <input type='text' name='name' className={s.profile_input} />
                        </div>
                        <div>
                            <label className={s.profile_label}>Segundo Nombre</label>
                            <input type='text' name='middleName' className={s.profile_input} />
                        </div>
                        <div>
                            <label className={s.profile_label}>Apellido</label>
                            <input type='text' name='lastName' className={s.profile_input} />
                        </div>
                    </div>
                    <div className={s.firstRow}>
                        <div>
                            <label className={s.profile_label}>Fecha de Nacimiento</label>
                            <input type='date' name='birthdate' className={s.profile_input} />
                        </div>
                        <div>
                            <label className={s.profile_label}>Sexo</label>
                            <select name='gender' onChange={(e) => handleSelect(e)}>
                                <option selected hidden>Seleccionar</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="NoBinario">No Binario</option>
                            </select>
                        </div>
                        <div>
                        <label className={s.profile_label}>Número de DNI/Pasaporte</label>
                            <input type='number' name='numberDni' className={s.profile_input} />
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>  
        })}
    </Accordion> :
cart.map((p) =>
<div className={s.eachAccordion}>
<Accordion defaultActiveKey={0}>
    <h4>{p.paquete.name}</h4>
{new Array(parseInt(p.cantidad)).fill(true).map( (el, i) => {
    return <Accordion.Item eventKey={i}>
        <Accordion.Header>Pasajero #{i + 1}: </Accordion.Header>
        <Accordion.Body>
            <div className={s.firstRow}>
                <div>
                    <label className={s.profile_label}>Nombre</label>
                    <input type='text' value={input.name} className={s.profile_input} />
                </div>
                <div>
                    <label className={s.profile_label}>Segundo Nombre</label>
                    <input type='text' className={s.profile_input} />
                </div>
                <div>
                    <label className={s.profile_label}>Apellido</label>
                    <input type='text' className={s.profile_input} />
                </div>
            </div>
            <div className={s.firstRow}>
                <div>
                    <label className={s.profile_label}>Fecha de Nacimiento</label>
                    <input type='date' className={s.profile_input} />
                </div>
                <div>
                    <label className={s.profile_label}>Sexo</label>
                    <select>
                    <option selected hidden>Seleccionar</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="No Binario">No Binario</option>
                    </select>
                </div>
                <div>
                <label className={s.profile_label}>Número de DNI/Pasaporte</label>
                    <input type='number' className={s.profile_input} />
                </div>
            </div>
        </Accordion.Body>
    </Accordion.Item>  
})}
</Accordion>
</div>
  )
)}
