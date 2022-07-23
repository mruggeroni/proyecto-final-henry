import React, { useState } from "react";
import { BsPlusLg, BsDashLg,BsDash } from 'react-icons/bs';
import style from './CreatePackage.module.css';

export default function CreatePackage() {

    const dataNow = new Date().toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(dataNow)
    const [untilDate, setUntilDate] = useState(dataNow)

    const [ input, setInput ] = useState({
        name: '',
        price: 0,
        description: '',
        main_image: '',
        images: [''],
        featured: false,
        destinations: [],
        start_date: "",
        end_date: "",
        available: false,
        on_sale: 0,
        region: "",
        seasson: "",
        type: ""
    })

    const handleAddImage = (e) => {
        e.preventDefault();
        if(input.images.length < 4) {
            setInput({...input, images: [...input.images, '']});
        }
    }

    function handleRemoveImage(e) {
        e.preventDefault();
        const images = input.images;
        if (images.length > 1) images.pop();
        setInput({ ...input, images: images });
    }

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.id === 'from') {
            setFromDate(e.target.value)
            setUntilDate(e.target.value);
        } else {
            setUntilDate(e.target.value)
        }
    }


    return (
        <div className={style.create_container} >
            <h2>Create a Package</h2>
            <hr className={style.create_line} />
            <div className={style.create_form_container}>

                    <div className={style.create_input_container}>
                        <label className={style.create_label}>Name</label>
                        <input type="text" className={style.create_input} />
                    </div>
                    <div className={style.create_input_container}>
                        <label className={style.create_label}>Price</label>
                        <input type="text" className={style.create_input} />
                    </div>
                    <div className={style.create_textarea_container}>
                        <label className={style.create_label}>Description</label>
                        <textarea cols="30" rows="10" className={style.create_input_textarea}></textarea>
                    </div>
                    <div className={style.create_input_date_container}>
                        <div className={style.create_input_date}>
                            <label className={style.create_label}>Start Date</label>
                            <input type="date"
                                    id='from'
                                    value={fromDate}
                                    min={dataNow}
                                    onChange={ (e) => handleChange(e) }
                                    className={style.create_input}/>
                        </div>
                        <div className={style.create_input_date}>
                            <label className={style.create_label}>End Date</label>
                            <input type="date"
                                    id='until'
                                    value={untilDate}
                                    min={fromDate}
                                    onChange={ (e) => handleChange(e) }
                                    className={style.create_input}/>
                        </div>
                    </div>
                    <div className={style.create_input_container}>
                        <label className={style.create_label}>Destination</label>
                        <select className={style.create_input}>
                            <option value="x">Argentina</option>
                            <option value="x">Canada</option>
                            <option value="x">Suiza</option>
                        </select>
                    </div>
                    <div className={style.create_input_container}>
                        <label className={style.create_label}>Region</label>
                        <select className={style.create_input}>
                            <option value="x">Argentina</option>
                            <option value="x">Canada</option>
                            <option value="x">Suiza</option>
                        </select>
                    </div>
                    <div className={style.create_input_container}>
                        <label className={style.create_label}>Season</label>
                        <select className={style.create_input}>
                            <option value="x">Sudamérica</option>
                            <option value="x">Norte América</option>
                            <option value="x">Europa Central</option>
                        </select>
                    </div>
                    <div className={style.create_input_container}>
                        <label className={style.create_label}>Types</label>
                        <select className={style.create_input}>
                            <option value="x">Crucero</option>
                            <option value="x">Pack Short</option>
                            <option value="x">Pack Large</option>
                            <option value="x">Multidestino</option>
                        </select>
                    </div>
                <div id='create_images' className={style.create_input_images_container}>
                    <div className={style.create_input_images}>
                        <label className={style.create_label}>Main image</label>
                        <input type="text" className={style.create_input} /> 
                        <button onClick={ (e) => handleAddImage(e) } className={style.create_input_btn} >
                            <BsPlusLg />
                        </button>
                        <button onClick={ (e) => handleRemoveImage(e) } className={style.create_input_btn} >
                            <BsDashLg />
                        </button>
                    </div>
                    {
                        input.images?.map( (i, index) => {
                            return <div key={i + index} className={style.create_input_images}>
                                <label className={style.create_label}>Image {index+1}</label>
                                <input type="text" className={style.create_input} /> 
                        </div>
                        })
                    }
                </div>
            </div>
           
            

            <div className={style.create_input_container}>            
                <button className={style.create_btn}>Crear Paquete</button>
                <span className={style.create_term}>By clicking 'Create Package' you agree to the BLABLA Terms & Privacy Policy</span>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    )
}