import Accordion from "react-bootstrap/Accordion";
import s from "./CheckoutPassengers.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCart, createUser } from "./../../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import PassengerForm from "./PassengerForm.jsx";

export default function PassengerInfo(packageCart) {
  // const dispatch = useDispatch();

  function handleNextPage(e) {
    e.prevent.default();
    if (
      !localStorage.getItem(`passengers${packageCart.name.replace(/\s/g, "")}`)
    ) {
      let passengers = [];
      // passengers.push(input);
      localStorage.setItem(
        `passengers${packageCart.name.replace(/\s/g, "")}`,
        JSON.stringify(passengers)
      );
    } else {
      let passengers = JSON.parse(
        localStorage.getItem(`passengers${packageCart.name.replace(/\s/g, "")}`)
      );
      // passengers.push(input);
      localStorage.setItem(
        `passengers${packageCart.name.replace(/\s/g, "")}`,
        JSON.stringify(passengers)
      );
    }
  }

  return (
    packageCart && (
      <div>
        <h3>{packageCart.name}</h3>
        <div>
          {packageCart.quantity?.map((p) => (
            <PassengerForm />
          ))}
        </div>
      </div>
    )
  );
}

// const dispatch = useDispatch();
// const cart = useSelector((state) => state.cart);
// const user = useSelector((state) => state.user);
// const { getAccessTokenSilently } = useAuth0();

// const [error, setError] = useState({});
// const [input, setInput] = useState({
//   firstName: "",
//   middleName: "",
//   lastName: "",
//   numberDni: "",
//   gender: "",
//   birthdate: "",
//   id: "",
// });

// useEffect(async () => {
//   const token = await getAccessTokenSilently();
//   await dispatch(createUser(token));
//   await dispatch(getAllCart(user.id));
//   return () => {
//     // localStorage.remove("passenger");
//     setInput({
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       numberDni: "",
//       gender: "",
//       birthdate: "",
//       id: "",
//     });
//   };
// }, []);

// function handlePassenger(namePack, e, i) {
//   e.preventDefault();

//   // if()
//   setInput({
//     ...input,
//     id: i,
//     [e.target.name]: firstCap(e.target.value),
//   });
//   setError(validate({
//     ...input,
//     [e.target.name]: e.target.value,
//    }));
// }

// function handleNextPassenger(nameP, e, index) {
//   e.preventDefault();
//   let isMatch = false;
//   let tagNamePack = (e.target.children[nameP].getAttribute('name'));
//   let tagNamePackageNoSpace = tagNamePack.replace(/\s/g, '');
//   let namePack = nameP.replace(/\s/g, '');
//   let passenger = JSON.parse(localStorage.getItem(`passenger${namePack}`)) || [];

//   // let passenger = [];

//   if (input.firstName && input.lastName && !isMatch) {
//     if (!localStorage.getItem(`passenger${namePack}`)) {
//       let passenger = [];
//       passenger.push(input);
//       localStorage.setItem(`passenger${namePack}`, JSON.stringify(passenger));
//     } else {
//       let passenger = JSON.parse(localStorage.getItem(`passenger${namePack}`));
//       let match = false;
//       for (let i = 0; i < passenger.length; i++) {
//         if (tagNamePackageNoSpace === namePack && passenger[i].id !== index) {
//           passenger.push(input);
//           localStorage.setItem(`passenger${namePack}`, JSON.stringify(passenger));
//           match = true;

//           setInput({
//             firstName: "",
//             middleName: "",
//             lastName: "",
//             numberDni: "",
//             gender: "",
//             birthdate: "",
//             id: "",
//           });

//           break;
//         }

//       }

//       setInput({
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         numberDni: "",
//         gender: "",
//         birthdate: "",
//         id: "",
//       });

//       if(localStorage.getItem(`passenger${namePack}`)){
//         let thisPaq = localStorage.getItem(`passenger${namePack}`);
//         for (let i = 0; i < thisPaq.length; i++) {
//           if (thisPaq[i].id === index){
//             // isMatch = true;
//             setInput({ ...thisPaq[i] });
//             document.getElementById(`titleP${parseInt(thisPaq[i].id) + 1}`).innerHTML = `Pasajero #${parseInt(thisPaq[i].id) + 1}: ` + thisPaq[i].firstName + " " + thisPaq[i].lastName;
//             return;
//           }
//       }
//     }

//       // if(!isMatch) {

//       // }
//       //   if(!match) {
//       // passenger.push(input);
//       // localStorage.setItem("passenger", JSON.stringify(passenger));
//       //   }
//     }

//     // let passenger = JSON.parse(localStorage.getItem("passenger"));

//   } else {
//     setInput({
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       numberDni: "",
//       gender: "",
//       birthdate: "",
//       id: "",
//     });
//   }
// }

// function handleSelect(e) {
//   e.preventDefault();
//   setInput({
//     ...input,
//     [e.target.name]: e.target.value,
//   });
// }

// return (
//   <div>
//     {cart.packages?.map((p) => (
//       <div className={s.eachAccordion}>
//         <Accordion defaultActiveKey={0}>
//           <h4>{p.name}</h4>
//           {new Array(parseInt(p.quantity)).fill(true).map((el, i) => {
//             return (
//               <Accordion.Item eventKey={i}>
//                 <Accordion.Header name={p.name} onClick={(e) => handleNextPassenger(p.name, e, i)}>
//                   <p id={`titleP${i}`} name={p.name}>Pasajero #{i + 1}: </p>
//                 </Accordion.Header>
//                 <Accordion.Body name={p.name}>
//                   <div className={s.firstRow}>
//                     <div>
//                       <label className={s.profile_label}>Nombre</label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         onChange={(e) => handlePassenger(p.name, e, i)}
//                         value={input.firstName}
//                         className={s.profile_input}
//                       />
//                     </div>
//                     {error.name ? (<div className={s.error}>{error.name}</div>) : ( <br /> )}
//                     <div>
//                       <label className={s.profile_label}>
//                         Segundo Nombre
//                       </label>
//                       <input
//                         type="text"
//                         name="middleName"
//                         value={input.middleName}
//                         onChange={(e) => handlePassenger(p.name, e, i)}
//                         className={s.profile_input}
//                       />
//                     </div>
//                     {error.middleName ? (<div className={s.error}>{error.middleName}</div>) : ( <br /> )}
//                     <div>
//                       <label className={s.profile_label}>Apellido</label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={input.lastName}
//                         onChange={(e) => handlePassenger(p.name, e, i)}
//                         className={s.profile_input}
//                       />
//                     </div>
//                     {error.lastname ? (<div className={s.error}>{error.lastname}</div>) : ( <br /> )}
//                   </div>
//                   <div className={s.firstRow}>
//                     <div>
//                       <label className={s.profile_label}>
//                         Fecha de Nacimiento
//                       </label>
//                       <input
//                         type="date"
//                         name="birthdate"
//                         value={input.birthdate}
//                         onChange={(e) => handlePassenger(p.name, e, i)}
//                         className={s.profile_input}
//                         max= '2022-08-09'
//                         min='1925-01-01'
//                       />
//                     </div>
//                     {error.birthdate ? (<div className={s.error}>{error.birthdate}</div>) : ( <br /> )}
//                     <div>
//                       <label className={s.profile_label}>Sexo</label>
//                       <select onChange={(e) => handlePassenger(p.name, e, i)} name='gender'>
//                         <option selected hidden>
//                           Seleccionar
//                         </option>
//                         <option name= 'gender' value="Femenino">Femenino</option>
//                         <option name= 'gender' value="Masculino">Masculino</option>
//                         <option name= 'gender' value="No Binario">No Binario</option>
//                       </select>
//                     </div>
//                     {error.gender ? (<div className={s.error}>{error.gender}</div>) : ( <br /> )}
//                     <div>
//                       <label className={s.profile_label}>
//                         Número de DNI/Pasaporte
//                       </label>
//                       <input
//                         type="number"
//                         name="numberDni"
//                         value={input.numberDni}
//                         onChange={(e) => handlePassenger(p.name, e, i)}
//                         className={s.profile_input}
//                       />
//                     </div>
//                     {error.dni ? (<div className={s.error}>{error.dni}</div>) : ( <br /> )}
//                   </div>
//                 </Accordion.Body>
//               </Accordion.Item>
//             );
//           })}
//         </Accordion>
//       </div>
//     ))}
//   </div>
// );
// }

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
