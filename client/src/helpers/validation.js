const validation = (dogData) =>{
   const errors = {}
   if (!dogData.name) {
      errors.name = "Campo requerido"
   }else if (!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(dogData.name)) {
      errors.name= "Ingrese más de una letra , la primera letra en Mayúscula, solo letras y números"
   }

   
   if (parseInt(dogData.heightMin) > parseInt(dogData.heightMax)) {
      errors.heightMin= 'La altura mínima no puede ser mayor que la altura máxima.'
   }

   if (parseInt(dogData.weightMin) > parseInt(dogData.weightMax)) {
      errors.weightMin = 'El peso mínimo no puede ser mayor que el peso máximo.';
    }

   return errors
}

export default validation