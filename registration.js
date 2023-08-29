export default function RegistrationNumbers() {
  let theRegNumber = "";
  let locIndicator;
  let regex = /[@!#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;
  let allRegistrations = [];

  function setRegistration(regNumber) {
    theRegNumber = regNumber.trim();
    return theRegNumber.toUpperCase();
  }
  function getRegistration() {
    return theRegNumber.toUpperCase();
  }
  function checklocIndicator(theRegNumber) {
    locIndicator = theRegNumber.slice(0, 2);
    return locIndicator;
  }

  async function setAllRegistrations(theRegNumber,database) {
    if (regex.test(theRegNumber) === false && errors(theRegNumber) != "") {
      // if (allRegistrations.includes(theRegNumber.toUpperCase()) == false) {
      //   allRegistrations.push(theRegNumber.toUpperCase());
      // }
      await database.insertValues(theRegNumber.toUpperCase())
    }
  }
  async function getAllRegistrations() {
   allRegistrations = await database.getAll()
   return allRegistrations;
  }

  //   function classListDisplay() {
  //     return "displayReg";
  //   }
  // function regexRe() {
  //   if (regex.test(theRegNumber) === true) {
  //     return true;
  //   }
  // }
  // function existsReg() {
  //   if (allRegistrations.includes(theRegNumber.toUpperCase()) == true) {
  //     return true;
  //   }
  // }
  function errors(theRegNumber) {
    if (
      checklocIndicator(theRegNumber) != "CA" &&
      checklocIndicator(theRegNumber) != "CJ" &&
      checklocIndicator(theRegNumber) != "GP" &&
      checklocIndicator(theRegNumber) != "EC"
    ) {
      return "Please enter valid registration number! Valid Format CA, GP, EC or CJ";
    }
   
  }
  return {
    setRegistration,
    getRegistration,
    checklocIndicator,
    setAllRegistrations,
    getAllRegistrations,
    errors
  };
}
