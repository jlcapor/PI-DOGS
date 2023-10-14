const validation = (dogData) =>{
   const errors = {}    
   const urlRegex =/^(https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/\S*)?\.(jpg|jpeg|png|gif)(?:\?.*)?$/i;
   const isValidUrl = urlRegex.test(dogData.image);
   if (!dogData.name) {
      errors.name = "Required field"
   }else if(dogData.name.length > 60) {
      errors.name = "The name must not exceed 35 characters"
   }else if(!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s()¡!@#$%^&*_\-+=?¿¡.,;:']+$/u.test(dogData.name)){
      errors.name = 'The text contains numbers or other unauthorized characters.'
   }

   if (!dogData.heightMin) {
      errors.heightMin = "Required field";
    } else if (isNaN(dogData.heightMin)) {
      errors.heightMin = "Enter only numbers";
    } else if (parseFloat(dogData.heightMin) < 0) {
      errors.heightMin = "Enter only positive numbers";
    } else if (1 / parseFloat(dogData.heightMin) === -Infinity) {
      errors.heightMin = "Avoid entering the value of -0";
    }

    if (!dogData.heightMax) {
      errors.heightMax = "Required field";
    } else if (isNaN(dogData.heightMax)) {
      errors.heightMax = "Enter only numbers";
    } else if (parseFloat(dogData.heightMax) < 0) {
      errors.heightMax = "Enter only positive numbers";
    } else if (1 / parseFloat(dogData.heightMax) === -Infinity) {
      errors.heightMax = "Avoid entering the value of -0";
    } else if (parseFloat(dogData.heightMax) === 0) {
      errors.heightMax = "Must be a number greater than zero";
    }

   

    if (!dogData.weightMin) {
      errors.weightMin = "Required field";
    } else if (isNaN(dogData.weightMin)) {
      errors.weightMin = "Enter only numbers";
    } else if (parseFloat(dogData.weightMin) < 0) {
      errors.weightMin = "Enter only positive numbers";
    } else if (1 / parseFloat(dogData.weightMin) === -Infinity) {
      errors.weightMin = "Avoid entering the value of -0";
    }

   if (!dogData.weightMax) {
      errors.weightMax = "Required field";
    } else if (isNaN(dogData.weightMax)) {
      errors.weightMax = "Enter only numbers";
    } else if (parseFloat(dogData.weightMax) < 0) {
      errors.weightMax = "Enter only positive numbers";
    } else if (Object.is(parseFloat(dogData.weightMax), -0)) {
      errors.weightMax = "Avoid entering the value of -0";
    } else if (parseFloat(dogData.weightMax) === 0) {
      errors.weightMax = "Must be a number greater than zero";
    }

    

   if (!dogData.lifeSpanMin) {
      errors.lifeSpanMin = "Required field"
   }else if (isNaN(dogData.lifeSpanMin)) {
      errors.lifeSpanMin = "Enter only numbers"
   }else if (parseFloat(dogData.lifeSpanMin) < 0) {
      errors.lifeSpanMin = "Enter only positive numbers"
   } else if (1 / parseFloat(dogData.lifeSpanMin) === -Infinity) {
      errors.lifeSpanMin = "Avoid entering the value of -0";
   }

   if (!dogData.lifeSpanMax) {
      errors.lifeSpanMax = "Required field"
   }else if (isNaN(dogData.lifeSpanMax)) {
      errors.lifeSpanMax = "Enter only numbers"
   }else if (parseFloat(dogData.lifeSpanMax) < 0) {
      errors.lifeSpanMax = "Enter only positive numbers"
   }else if (parseFloat(dogData.lifeSpanMax) === 0) {
         errors.lifeSpanMax = "Must be a number greater than zero";
   }else if (1 / parseFloat(dogData.lifeSpanMax) === -Infinity) {
      errors.lifeSpanMax = "Avoid entering the value of -0";
   }

   if (dogData.heightMin > 100) {
      errors.heightMin = 'Height outside the allowed range';
   }

   if(dogData.heightMax > 100){
      errors.heightMax = 'Height outside the allowed range'
   }

   if (dogData.weightMin > 100) {
      errors.weightMin = 'Weight outside the allowed range';
   }

   if(dogData.weightMax > 100){
      errors.weightMax = 'Weight outside the allowed range'
   }

   if(dogData.lifeSpanMin < 0 || dogData.lifeSpanMin > 19){
      errors.lifeSpanMin = 'Require field, please write a valid number between 1 and 19'
  }
  if(dogData.lifeSpanMax < 0 || dogData.lifeSpanMax > 19){
      errors.lifeSpanMax = 'Require field, please write a valid number between 1 and 19'
  }




   if (parseInt(dogData.heightMin) > parseInt(dogData.heightMax)) {
      errors.heightMin= 'the minimum height cannot be greater than the maximum height.'
   }

   if (parseInt(dogData.weightMin) > parseInt(dogData.weightMax)) {
      errors.weightMin = 'the minimum weight cannot be greater than the maximum weight.';
   }

   if (parseInt(dogData.lifeSpanMin) > parseInt(dogData.lifeSpanMax)) {
      errors.lifeSpanMin = 'the minimum lifespan cannot be greater than the maximum lifespan.';
   }

   if (!dogData.image) {
      errors.image = "the image is required"
   }else if (!isValidUrl) {
      errors.image="Please enter a valid URL";
   }
   
   if (dogData.temperaments.length === 0) {
      errors.temperaments = "You must select at least one temperament"
   }else{
      errors.temperaments = ""
   }

   return errors
}

export default validation