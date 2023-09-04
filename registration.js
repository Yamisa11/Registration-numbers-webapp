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

  async function setAllRegistrations(theRegNumber, database) {
    let loca = theRegNumber.slice(0, 2);
    let loc = loca.toUpperCase();

    if (errors(theRegNumber, loc) == "") {
      if (regex.test(theRegNumber) === false) {
        await database.insertValues(theRegNumber.toUpperCase());
      }
    }
  }
  async function getTownRegistrations(id, database) {
    if (id == "ALL") {
      townRegistrations = await database.getAllRegistrations();
    } else {
      townRegistrations = await database.getAllFromTown(id);
    }
    return townRegistrations;
  }

  function errors(theRegNumber, loc) {
    let errMsg = "";
    let loca = loc.toUpperCase()
    if (theRegNumber == "") {
      errMsg = "Please enter registration number";
    }
   if (allRegTowns.includes(loca) == false) {
    errMsg = 'Please enter valid registration'
   }
    return errMsg;
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
