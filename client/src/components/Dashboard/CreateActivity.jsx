import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validate from './validationActivity';
import Dashboard from './Dashboard';
import style from "./CreatePackage.module.css";

function firstCap(name){
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export default function ActivityCreate(){
	const dispatch = useDispatch();
	// const activities = useSelector((state) => state.activities);
	// const countries = useSelector((state) => state.allCountries);
	const [error, setError] = useState({});
	const createBtn = document.getElementById('create');
	const [input, setInput] = useState({
		name: '',
		description: '',
		price: '',
		image: '',
        classification: ''
	})

	const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: firstCap(e.target.value),
        });
        setError(validate({
            ...input,
            [e.target.name]: e.target.value,
         }));
    };

	function handleCheck(e){
		let checkboxes = document.getElementsByName('check');

        checkboxes.forEach((item) => {
            if(item.value !== e.target.value) item.checked = false
        })

		if(e.target.checked){
			setInput({
				...input,
				season: e.target.value
			})
			setError(validate({
                ...input,
                season: e.target.value
            }));

		} else{
			setError(validate({
                ...input,
                season: '',
            }));

            createBtn.setAttribute('disabled', true);
		}
	}

	function handleSubmit(e){
		e.preventDefault();
		// dispatch(postActivity(input));
		// if(error) alert('The Form is not completed correctly. Try again!');

		if(!Object.keys(error).length) {
			setInput({
				name: '',
		        description: '',
		        price: '',
		        image: '',
                classification: ''
			})
            // Alert bootstrap
			alert('Activity created!');
		}
	}

	// useEffect(() => {
	// 	dispatch(getActivities());
	// 	dispatch(getCountries());
	// }, []);

	return(
		<div>
            <Dashboard />
			{/* <Link to= '/'><button>Return...</button></Link> */}
            <div className={style.create_container}>
			<h2>Create an Activity!</h2>
            <hr className={style.create_line} />
			<form onSubmit= {(e) => handleSubmit(e)} className={style.create_form_container}>
                <div className={style.create_form_container}>
                    <div className={style.create_input_container}>
                        <label className={style.create_label}><b>Name</b></label>
                        <input type= 'text' className={style.create_input} value= {input.name} name= 'name' onChange={(e) => handleInputChange(e)}/>
                        {/* {error.name ? (<p>{error.name}</p>) : <br />} */}
                    </div>
				</div>
                <div className={style.create_textarea_container}>
					<label className={style.create_label}><b>Description</b></label>
					<textarea
                        name="description"
                        cols="20"
                        rows="10"
                         className={style.create_input_textarea}
                    ></textarea>
					{/* {error.description ? (<p>{error.description}</p>) : <br />} */}
				</div>
				<div className={style.create_input_container}>
					<label className={style.create_label}><b>Price</b></label>
					<input type= 'number' className={style.create_input} value= {input.duration} name= 'price' min= '0' onChange={(e) => handleInputChange(e)}/>
					{/* {error.price ? (<p>{error.price}</p>) : <br />} */}
				</div>
                <div>
					<label><b>Classification:</b></label>
						<label><span>Familiar</span>
  						<input type="checkbox" name='check' value='Familiar' onChange={(e)=> handleCheck(e)}/>
  						<span></span></label>
  						<label><span >Autumn</span>
  						<input type="checkbox" name='check' value='Autumn' onChange={(e)=> handleCheck(e)}/>
  						<span></span></label>
  						<label><span >Winter</span>
  						<input type="checkbox" name='check' value='Winter' onChange={(e)=> handleCheck(e)}/>
  						<span></span></label>
  						<label><span >Spring</span>
  						<input type="checkbox" name='check' value='Spring' onChange={(e)=> handleCheck(e)}/>
  						<span ></span></label><br/>
  						{/* {error.season ? (<p >{error.season}</p>) : <br />} */}
				</div>
				<br/>
                <div id="create_images" className={style.create_input_images_container} >
                    <div className={style.create_input_images}>
                        <label className={style.create_label}>Image</label>
                    <input
                    name="main_image"
                    type="text"
                    className={style.create_input}
                    />
                    </div>
                </div>
				<button type='submit' className={style.create_btn} id='create' disabled={true}>Create Activity</button>
				</form>
		</div>
        </div>
	)
}