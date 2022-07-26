export default function validate(input){
    let error = {};
    let regName = /^[a-zA-Z]*$/;
    let regInteger = /^\d+$/;
    let checkboxes = document.getElementsByName('check');
  
    if(!input.name){
        error.name = 'Name is required';
    }else if(!regName.test(input.name)){
      error.name = 'Name is invalid';
    }else if(input.name.length > 20){
        error.name = 'Name must be under 20 characters'
    }

    if(!input.description){
        error.description = 'Description is required';
    }else if(input.description[0] === ' '){
        error.description = 'Description must begin with a letter and cannot start with a space';
    }else if(input.description.length > 280){
        error.description = 'Name must be under 280 characters'
    }

    if(!input.price){
      error.price = 'Price is required';
    }else if(!regInteger.test(input.price)){
      error.price = 'Price must be an interger number';
    }else if(input.price <= 0){
        error.price = 'Price is invalid'
    }else if(input.price >= 1000){
        error.price = 'Activity cannot cost more than U$S1000';
    }

    if(!input.classification){
      error.classification = 'Classification is required';
    } else{
        let createBtn = document.getElementById('create');
        createBtn.removeAttribute('disabled');
    }
    return error;
  }