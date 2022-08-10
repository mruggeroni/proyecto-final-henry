import Accordion from "react-bootstrap/Accordion";
import s from "./CheckoutPassengers.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCart, createUser } from "./../../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";

function validate(input) {
  let error = {};

  if (!input.name) {
    error.name = "El nombre es requerido";
  } else if (input.name.length > 20) {
    error.name = "El nombre debe tener menos de 20 caracteres";
  }
  if (input.middleName.length > 20) {
    error.middleName = "El nombre debe tener menos de 20 caracteres";
  }
  if (!input.lastname) {
    error.lastname = "El apellido es requerido";
  } else if (input.lastname.length > 20) {
    error.lastname = "El apellido debe tener menos de 20 caracteres";
  }
  if (!input.birthdate) {
    error.birthdate = "La fecha de nacimiento es requerida";
  } else if(!/^\d{4}-\d{2}-\d{2}$/.test(input.birthdate))  {
    error.birthdate = "La fecha es inválida";
  } 
  else if (input.birthdate) {
    let parts = input.birthdate.split('-');
    let now = new Date();
    let year = parseInt(parts[0], 10);
    let currentYear = now.getFullYear();
    
    if(year > currentYear) error.birthdate = "La fecha es inválida";
    // if((currentYear - year) < 18 || (currentYear - year) > 90) error.birthdate = "La fecha es inválida";
};
  if (!input.gender) {
    error.gender = "El género es requerido";
  }

  if (!input.dni) {
    error.dni = "La documentación es requerida";
  } else if(input.dni.length > 10) {
    error.dni = "La documentación es inválida";
  }
  return error;
}

function firstCap(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}



export default function PassengerInfo() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const { getAccessTokenSilently } = useAuth0();

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    numberDni: "",
    gender: "",
    birthdate: "",
    id: "",
  });

  useEffect(async () => {
    const token = await getAccessTokenSilently();
    console.log("user");
    await dispatch(createUser(token));
    await dispatch(getAllCart(user.id));
    console.log("cart");
    return () => {
      localStorage.remove("passenger");
      setInput({
        firstName: "",
        middleName: "",
        lastName: "",
        numberDni: "",
        gender: "",
        birthdate: "",
        id: "",
      });
    };
  }, []);

  function handlePassenger(e, i) {
    e.preventDefault();
    setInput({
      ...input,
      id: i,
      [e.target.name]: firstCap(e.target.value),
    });
    setError(validate({
      ...input,
      [e.target.name]: e.target.value,
     }));
  }

  function handleNextPassenger(nameP, e, index) {
    e.preventDefault();
    let isMatch = false;
    console.log(nameP);
    console.log(e.target.children[nameP].id);
    let tagNamePack = (e.target.children[nameP].getAttribute('name'));
    let tnpnoSpace = tagNamePack.replace(/\s/g, '');
    let namePack = nameP.replace(/\s/g, '');
    console.log(namePack);
    let passenger = [];

    if (input.firstName && input.lastName && !isMatch) {
      if (!localStorage.getItem(`passenger${namePack}`)) {
        let passenger = [];
        passenger.push(input);
        localStorage.setItem(`passenger${namePack}`, JSON.stringify(passenger));
      } else {
        let passenger = JSON.parse(localStorage.getItem(`passenger${namePack}`));
        let match = false;
        for (let i = 0; i < passenger.length; i++) {
          if (tnpnoSpace === namePack && passenger[i].id !== index) {
            passenger.push(input);
            localStorage.setItem(`passenger${namePack}`, JSON.stringify(passenger));
            setInput({
              firstName: "",
              middleName: "",
              lastName: "",
              numberDni: "",
              gender: "",
              birthdate: "",
              id: "",
            });
              match = true;
            break;
          }

          let passenger = JSON.parse(localStorage.getItem(`passenger${namePack}`)) || [];
          // COMO HAGO XA TRAERME EL NOMBRE DEL ACORDION
         
          for (let i = 0; i < passenger.length; i++) {
            if (tnpnoSpace === namePack && passenger[i].id === index){
              isMatch = true;
              setInput({ ...passenger[i] });
              document.getElementById(`titleP${parseInt(passenger[i].id) + 1}`).innerHTML = `Pasajero #${parseInt(passenger[i].id) + 1}: ` + passenger[i].firstName + " " + passenger[i].lastName;
              return;
            }
          }
        }

        if(!isMatch) {
          setInput({
            firstName: "",
            middleName: "",
            lastName: "",
            numberDni: "",
            gender: "",
            birthdate: "",
            id: "",
          });
        }
        //   if(!match) {
        // passenger.push(input);
        // localStorage.setItem("passenger", JSON.stringify(passenger));
        //   }
      }

      // let passenger = JSON.parse(localStorage.getItem("passenger"));
      
      
      
    }
  }

  function handleSelect(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      {cart.packages?.map((p) => (
        <div className={s.eachAccordion}>
          <Accordion defaultActiveKey={0}>
            <h4>{p.name}</h4>
            {new Array(parseInt(p.quantity)).fill(true).map((el, i) => {
              return (
                <Accordion.Item eventKey={i}>
                  <Accordion.Header name={p.name} onClick={(e) => handleNextPassenger(p.name, e, i)}>
                    <p id={`titleP${i}`} name={p.name}>Pasajero #{i + 1}: </p>
                  </Accordion.Header>
                  <Accordion.Body name={p.name}>
                    <div className={s.firstRow}>
                      <div>
                        <label className={s.profile_label}>Nombre</label>
                        <input
                          type="text"
                          name="firstName"
                          onChange={(e) => handlePassenger(e, i)}
                          value={input.firstName}
                          className={s.profile_input}
                        />
                      </div>
                      {error.name ? (<div className={s.error}>{error.name}</div>) : ( <br /> )}
                      <div>
                        <label className={s.profile_label}>
                          Segundo Nombre
                        </label>
                        <input
                          type="text"
                          name="middleName"
                          value={input.middleName}
                          onChange={(e) => handlePassenger(e, i)}
                          className={s.profile_input}
                        />
                      </div>
                      {error.middleName ? (<div className={s.error}>{error.middleName}</div>) : ( <br /> )}
                      <div>
                        <label className={s.profile_label}>Apellido</label>
                        <input
                          type="text"
                          name="lastName"
                          value={input.lastName}
                          onChange={(e) => handlePassenger(e, i)}
                          className={s.profile_input}
                        />
                      </div>
                      {error.lastname ? (<div className={s.error}>{error.lastname}</div>) : ( <br /> )}
                    </div>
                    <div className={s.firstRow}>
                      <div>
                        <label className={s.profile_label}>
                          Fecha de Nacimiento
                        </label>
                        <input
                          type="date"
                          name="birthdate"
                          value={input.birthdate}
                          onChange={(e) => handlePassenger(e, i)}
                          className={s.profile_input}
                          max= '2022-08-09'
                          min='1925-01-01'
                        />
                      </div>
                      {error.birthdate ? (<div className={s.error}>{error.birthdate}</div>) : ( <br /> )}
                      <div>
                        <label className={s.profile_label}>Sexo</label>
                        <select onChange={(e) => handlePassenger(e, i)} name='gender'>
                          <option selected hidden>
                            Seleccionar
                          </option>
                          <option name= 'gender' value="Femenino">Femenino</option>
                          <option name= 'gender' value="Masculino">Masculino</option>
                          <option name= 'gender' value="No Binario">No Binario</option>
                        </select>
                      </div>
                      {error.gender ? (<div className={s.error}>{error.gender}</div>) : ( <br /> )}
                      <div>
                        <label className={s.profile_label}>
                          Número de DNI/Pasaporte
                        </label>
                        <input
                          type="number"
                          name="numberDni"
                          value={input.numberDni}
                          onChange={(e) => handlePassenger(e, i)}
                          className={s.profile_input}
                        />
                      </div>
                      {error.dni ? (<div className={s.error}>{error.dni}</div>) : ( <br /> )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      ))}
    </div>
  );
}

/* import s from './CheckoutPassengers.module.css';
import React, { useState } from 'react';

export default function PassengerInfo({ cart }) {
    const [input, setInput] = useState({
		firstName: '',
		middleName: '',
		lastName: '',
		numberDni: '',
		gender: '',
        birthdate: '',
        id: '',
	});

    function handlePassenger(e, i){
        e.preventDefault();
        setInput({
            ...input,
            id: i + 1,
            [e.target.name]: e.target.value
        }) 

        console.log(input)
       
    }

    function nextPassenger(e, i){
        e.preventDefault();   
        let passenger = JSON.parse(localStorage.getItem('passenger'));
        let title = `Pasajero #${i + 1}: `; //CHEQUEADO QUE ES SOLO I
        // if(title.length < 15){ 
            title += ' ' + passenger[i]?.firstName + ' ' + passenger[i]?.lastName;
            console.log(title)
            document.getElementById(`titleP${i + 1}`).innerHTML = title;
        // };


        // console.log(title)        
        if(!localStorage.getItem('passenger')){ 
            let passenger = [];
            passenger.push(input);
            localStorage.setItem('passenger', JSON.stringify(passenger));
        } else {
            let passenger = JSON.parse(localStorage.getItem('passenger'));
            // console.log(passenger)
            passenger.forEach((p) => p.id != i+1 && passenger.push(input))
            localStorage.setItem('passenger', JSON.stringify(passenger))
        }
        
        
        
        setInput({
            firstName: '',
		    middleName: '',
		    lastName: '',
		    numberDni: '',
		    gender: '',
            birthdate: '',
            id: ''
        })
        
        passenger?.forEach((p) => parseInt(p.id) === i + 1 && setInput({ ...p }))
        console.log(passenger);
        
    }
    

    function handleSelect(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }



  return (
    cart.length === 1 ?
    <Accordion defaultActiveKey={0}>
        <h2>{cart[0].paquete.name}</h2>
        {   
        new Array(parseInt(cart[0].cantidad)).fill(true).map( (el, i) => {
            return <Accordion.Item eventKey={i}>
                <Accordion.Header onClick={(e) => nextPassenger(e, i)}><p id={`titleP${i + 1}`}>Pasajero #{i + 1}:</p></Accordion.Header>
                <Accordion.Body>
                    <div className={s.firstRow}>
                        <div>
                            <label className={s.profile_label}>Nombre</label>
                            <input type='text' name='firstName' value={input.firstName} className={s.profile_input} onChange={(e) => handlePassenger(e, i)}/>
                        </div>
                        <div>
                            <label className={s.profile_label}>Segundo Nombre</label>
                            <input type='text' name='middleName' className={s.profile_input} onChange={(e) => handlePassenger(e, i)}/>
                        </div>
                        <div>
                            <label className={s.profile_label}>Apellido</label>
                            <input type='text' name='lastName' value={input.lastName} className={s.profile_input} onChange={(e) => handlePassenger(e, i)}/>
                        </div>
                    </div>
                    <div className={s.firstRow}>
                        <div>
                            <label className={s.profile_label}>Fecha de Nacimiento</label>
                            <input type='date' name='birthdate' className={s.profile_input} onChange={(e) => handlePassenger(e, i)}/>
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
                            <input type='number' name='numberDni' className={s.profile_input} onChange={(e) => handlePassenger(e, i)}/>
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
        <Accordion.Header id='titleP'>Pasajero #{i + 1}: </Accordion.Header>
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
  */
