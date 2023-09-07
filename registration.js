export default function RegistrationNumbers() {
  let theRegNumber = "";
  let locIndicator;
  let regex = /[@!#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
  let allRegTowns = ['CA', 'CJ', 'EC','GP'];
  let townRegistrations = [];

  
  function checklocIndicator(theRegNumber) {
    locIndicator = theRegNumber.slice(0, 2);
    return locIndicator.toUpperCase();
  }
  async function errors(theRegNumber, loc) {
    let errMsg=''
    if (theRegNumber == "") {
      errMsg = "Please enter registration number";
    }else if (allRegTowns.includes(loc) == false) {
    errMsg = 'Please enter valid registration'
   }else{
    errMsg = ''
   }
    return errMsg;
  }

  async function setAllRegistrations(theRegNumber, database) {
    let theRegistrations = await database.getAllRegistrations()
    let loca = theRegNumber.slice(0,2);
    let loc = loca.toUpperCase();
    let msg = ''

    let theErrors = await errors(theRegNumber, loc);
    if (theErrors == '') {
      if (regex.test(theRegNumber) === false) {
       if (theRegistrations.includes(theRegNumber.toUpperCase()) == false) {
        await database.insertValues(theRegNumber.toUpperCase());
       }else{
        msg = "Registration number already exists"
       }
      }

    }
   return msg
  }
  
  async function getTownRegistrations(id, database) {
    if (id == "ALL") {
      townRegistrations = await database.getAllRegistrations();
    } else if (id >=1 ){
      townRegistrations = await database.getAllFromTown(id);
    }
    return townRegistrations;
  }

  async function townErrors(id,database){
    let msg = ''
    let idReg = await database.getAllFromTown(id)

    if (id) {
      if (idReg.length < 1) {
        msg = "No available registration for this town"
      } 
    }

    return msg
  }

 
  return {
    checklocIndicator,
    setAllRegistrations,
    getTownRegistrations,
    errors,
    townErrors
  };
}
