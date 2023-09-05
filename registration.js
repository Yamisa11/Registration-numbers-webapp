export default function RegistrationNumbers() {
  let theRegNumber = "";
  let locIndicator;
  let regex = /[@!#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
  let allRegTowns = ['CA', 'CJ', 'EC','GP'];
  let townRegistrations = [];

  function setRegistration(regNumber) {
    theRegNumber = regNumber;
    return theRegNumber.toUpperCase();
  }
  function getRegistration() {
    return theRegNumber.toUpperCase();
  }
  function checklocIndicator(theRegNumber) {
    locIndicator = theRegNumber.slice(0, 2);
    return locIndicator.toUpperCase();
  }
  async function errors(theRegNumber, loc,database) {
    let theRegistrations = await database.getAllRegistrations()
      let errMsg;
      let loca = loc.toUpperCase()
      if (theRegNumber == "") {
        errMsg = "Please enter registration number";
      }else if (allRegTowns.includes(loca) == false) {
      errMsg = 'Please enter valid registration'
     }else if (theRegistrations.includes(theRegNumber.toUpperCase())) {
      errMsg = "Registration number already exists"
     }else{ errMsg = ''}
      return errMsg;
    }

  async function setAllRegistrations(theRegNumber, database) {
    let loca = theRegNumber.slice(0, 2);
    let loc = loca.toUpperCase();
    let message = "Yamisa"

    if (errors(theRegNumber, loc,database) == '') {
      if (regex.test(theRegNumber) === false) {
        await database.insertValues(theRegNumber.toUpperCase());
        
      }
      message= "Errors passed"
    }
    return message
   
  }
  async function getTownRegistrations(id, database) {
    if (id == "ALL") {
      townRegistrations = await database.getAllRegistrations();
    } else {
      townRegistrations = await database.getAllFromTown(id);
    }
    return townRegistrations;
  }

 
  return {
    setRegistration,
    getRegistration,
    checklocIndicator,
    setAllRegistrations,
    getTownRegistrations,
    errors,
  };
}
