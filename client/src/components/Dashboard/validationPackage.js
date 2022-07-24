export default function validation(input) {
  let error = {};
  let regName = /^[a-zA-Z]*$/;
  let regNumberBetween = /^[1-5]+$/;
  let regInteger = /^\d+$/;
  let checkboxes = document.getElementsByName('check');

  if(!input.name){
    error.name = 'Name is required';
  } else if(input.name[0] === ' '){
    error.name = 'Name must begin with a letter and cannot start with a space';
  } else if(input.name.length > 60){
    error.name = 'Name must be under 60 characters'
  }
  if (input.price < 0) {
    error.price = "Price is required";
  } else if (input.price > 1000000) {
    error.price = "Package cannot cost more than U$S 1.000.000";
  }
  if(!input.description){
    error.description = 'Description is required';
  }else if(input.description[0] === ' '){
    error.description = 'Description must begin with a letter and cannot start with a space';
   }else if(input.description.length > 1000){
    error.description = 'Description must be under 1000 characters'
  }
  //----- preguntamos por las imagenes o que?
  //   if (input.main_image.length < 0) {
  //     error.main_image = "Se requiere una imagen principal";
  //   }
  // (input.main_image) => {
  // }
  //   if (input.images.length < 0) {
  //     input.images.map((i) => {
  //       if (input.images[i].length < 0) {
  //         error.description = "Se requiere una imagen secundaria n° " + i + 1;
  //       }
  //     });
  //   }


  if(!input.duration){
    error.duration = 'Duration is required';
  }else if(!regInteger.test(input.duration)){
    error.duration = 'Duration must be an interger number';
  }else if(input.duration <= 0){
      error.duration = 'Duration is invalid'
  }else if(input.duration > 24){
      error.duration = 'Activity cannot last longer than 24hs';
  }



  
  if(!input.season){
    error.season = 'Season is required';
  }
  if(!regNumberBetween.test(input.difficulty)){
    error.difficulty = 'Difficulty is required';
  }
  
  if(input.destinations.length === 0){
    error.destinations = 'At least one country is required';
  }else if(input.destinations.length === 5){
      error.destinations = 'You reached the maximum amount of countries';
      document.getElementById('destinationsSelect').setAttribute('disabled', true);
  }else{
      let createBtn = document.getElementById('create');
      createBtn.removeAttribute('disabled');
  }

}


/* const [input, setInput] = useState({
  name: "",
  price: 0,
  description: "",
  main_image: "",
  images0: "",
  images1: "",
  images2: "",

  featured: false,
  destinations: [],
  start_date: "",
  end_date: "",
  available: false,
  on_sale: 0,
  region: "",
  seasson: "",
  type: "",
}); */