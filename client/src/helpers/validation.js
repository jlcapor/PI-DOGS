const validation = (dogData) =>{
   const errors = {}

   if (!dogData.name) {
      errors.name = "Required field"
   }

   if (!dogData.heightMin) {
      errors.heightMin = "Required field"
   }else if (!/^[0-9]\d*(\.\d+)?$/.test(dogData.heightMin)) {
      errors.heightMin = "Ingrese solo números enteros"
   }

   if (!dogData.heightMax) {
      errors.heightMax = "Required field"
   }else if (!/^[0-9]\d*(\.\d+)?$/.test(dogData.heightMax)) {
      errors.heightMax = "Ingrese solo números enteros"
   }

   if (!dogData.weightMin) {
      errors.weightMin = "Required field"
   }

   if (!dogData.weightMax) {
      errors.weightMax = "Required field"
   }

   if (!dogData.lifeSpanMin) {
      errors.lifeSpanMin = "Required field"
   }

   if (!dogData.lifeSpanMax) {
      errors.lifeSpanMax = "Required field"
   }

   if (parseInt(dogData.heightMin) > parseInt(dogData.heightMax)) {
      errors.heightMin= 'La altura mínima no puede ser mayor que la altura máxima.'
   }

   if (parseInt(dogData.weightMin) > parseInt(dogData.weightMax)) {
      errors.weightMin = 'El peso mínimo no puede ser mayor que el peso máximo.';
   }

   if (parseInt(dogData.lifeSpanMin) > parseInt(dogData.lifeSpanMax)) {
      errors.lifeSpanMin = 'El año de vida mínimo no puede ser mayor al año de vida máximo.';
   }
   return errors
}

export default validation